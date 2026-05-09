"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction, type LoginState } from "../actions";

const INITIAL: LoginState = { error: null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        marginTop: 18,
        width: "100%",
        padding: "10px 14px",
        borderRadius: 8,
        border: 0,
        background: "#fff",
        color: "#000",
        fontWeight: 600,
        fontSize: 15,
        cursor: pending ? "wait" : "pointer",
        opacity: pending ? 0.6 : 1,
      }}
    >
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export default function OrganizerLoginPage() {
  const [state, formAction] = useActionState(loginAction, INITIAL);

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#0b0b0c", color: "#fff", fontFamily: "-apple-system,Segoe UI,Roboto,sans-serif", padding: 24 }}>
      <form action={formAction} style={{ width: "100%", maxWidth: 360, background: "#17171a", padding: 28, borderRadius: 12, border: "1px solid #2a2a2e" }}>
        <h1 style={{ fontSize: 22, marginBottom: 6, fontWeight: 600 }}>Seat Assignment</h1>
        <p style={{ fontSize: 14, color: "#a1a1aa", marginBottom: 20 }}>
          Belgium concert · CC De Factorij · 11 June 2026
        </p>
        <label htmlFor="pw" style={{ display: "block", fontSize: 13, color: "#d4d4d8", marginBottom: 6 }}>Organizer password</label>
        <input
          id="pw"
          name="password"
          type="password"
          autoFocus
          required
          style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #3f3f46", background: "#0b0b0c", color: "#fff", fontSize: 15 }}
        />
        {state.error && <p style={{ color: "#f87171", fontSize: 13, marginTop: 12 }}>{state.error}</p>}
        <SubmitButton />
      </form>
    </main>
  );
}
