"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ORGANIZER_COOKIE,
  ORGANIZER_COOKIE_MAX_AGE,
  checkOrganizerPassword,
  signSession,
  verifySession,
} from "@/lib/auth/organizer";
import { deleteTicketOrder, getTicketOrder, recordEvent, updateTicketOrder } from "@/lib/db/tickets";
import { sendSeatEmail } from "@/lib/email/send-seat-email";

const PATH = "/seat-assignment";

async function requireOrganizer(): Promise<{ actor: string }> {
  const c = await cookies();
  const session = verifySession(c.get(ORGANIZER_COOKIE)?.value);
  if (!session) {
    redirect("/seat-assignment/login");
  }
  return session;
}

// ---------------------------------------------------------------------------
// Login / logout
// ---------------------------------------------------------------------------

export type LoginState = { error: string | null };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") || "").trim();
  if (!password || !checkOrganizerPassword(password)) {
    await new Promise((r) => setTimeout(r, 400));
    return { error: "Wrong password." };
  }
  const c = await cookies();
  c.set(ORGANIZER_COOKIE, signSession("luc"), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ORGANIZER_COOKIE_MAX_AGE,
  });
  redirect(PATH);
}

export async function logoutAction(): Promise<void> {
  const c = await cookies();
  c.set(ORGANIZER_COOKIE, "", { path: "/", maxAge: 0 });
  redirect("/seat-assignment/login");
}

// ---------------------------------------------------------------------------
// Save seats (no email)
// ---------------------------------------------------------------------------

export type SaveResult = { ok: true } | { ok: false; error: string };

export async function saveSeatsAction(id: string, formData: FormData): Promise<SaveResult> {
  const session = await requireOrganizer();
  const seats = String(formData.get("seats") || "").trim();
  const notes = String(formData.get("notes") || "").trim();

  const before = await getTicketOrder(id);
  if (!before) return { ok: false, error: "Order not found." };

  const patch: Record<string, unknown> = {
    assigned_seats: seats || null,
    organizer_notes: notes || null,
  };
  if (seats) {
    patch.assigned_at = new Date().toISOString();
    patch.assigned_by = session.actor;
    if (before.seat_status === "pending") patch.seat_status = "assigned";
  }

  await updateTicketOrder(id, patch);
  await recordEvent({
    ticket_order_id: id,
    event_type: "updated",
    actor: `organizer:${session.actor}`,
    payload: { patch },
  });

  revalidatePath(PATH);
  return { ok: true };
}

// ---------------------------------------------------------------------------
// Save + email customer
// ---------------------------------------------------------------------------

export type SaveAndEmailResult =
  | { ok: true; dryRun: boolean }
  | { ok: false; error: string; needsConfirm?: boolean };

export async function saveAndEmailAction(
  id: string,
  formData: FormData
): Promise<SaveAndEmailResult> {
  const session = await requireOrganizer();
  const seats = String(formData.get("seats") || "").trim();
  const notes = String(formData.get("notes") || "").trim();
  const confirmResend = String(formData.get("confirmResend") || "") === "true";

  if (!seats) return { ok: false, error: "Enter seat numbers first." };

  const before = await getTicketOrder(id);
  if (!before) return { ok: false, error: "Order not found." };
  if (!before.customer_email) return { ok: false, error: "Customer email is missing." };

  if (before.seat_status === "emailed" && !confirmResend) {
    return { ok: false, error: "Already emailed — confirm to re-send.", needsConfirm: true };
  }

  // Persist seats + notes first.
  const seatPatch: Record<string, unknown> = {
    assigned_seats: seats,
    organizer_notes: notes || null,
    assigned_at: new Date().toISOString(),
    assigned_by: session.actor,
  };
  if (before.seat_status === "pending") seatPatch.seat_status = "assigned";
  await updateTicketOrder(id, seatPatch);

  const send = await sendSeatEmail({
    to: before.customer_email,
    vars: {
      firstName: before.customer_first_name,
      assignedSeats: seats,
      orderName: before.shopify_order_name,
    },
  });

  if (!send.ok) {
    await updateTicketOrder(id, { seat_status: "error", email_error: send.error });
    await recordEvent({
      ticket_order_id: id,
      event_type: "email_failed",
      actor: `organizer:${session.actor}`,
      payload: { error: send.error },
    });
    revalidatePath(PATH);
    return { ok: false, error: send.error };
  }

  await updateTicketOrder(id, {
    seat_status: "emailed",
    emailed_at: new Date().toISOString(),
    email_error: null,
    email_dry_run: send.dryRun,
  });
  await recordEvent({
    ticket_order_id: id,
    event_type: "email_sent",
    actor: `organizer:${session.actor}`,
    payload: { dryRun: send.dryRun, providerId: send.id },
  });

  revalidatePath(PATH);
  return { ok: true, dryRun: send.dryRun };
}

// ---------------------------------------------------------------------------
// Delete order (test-cleanup only — does NOT touch Shopify)
// ---------------------------------------------------------------------------

export async function deleteOrderAction(id: string): Promise<SaveResult> {
  const session = await requireOrganizer();
  const before = await getTicketOrder(id);
  if (!before) return { ok: false, error: "Order not found." };

  await deleteTicketOrder(id);
  // Audit row is cascade-deleted with the parent. Log a system-level note
  // so we have a trail of who deleted what.
  console.log(
    `[seat-assignment] deleted ticket_order id=${id} shopify=${before.shopify_order_id} by=${session.actor}`
  );
  revalidatePath(PATH);
  return { ok: true };
}
