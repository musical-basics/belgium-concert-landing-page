import { listTicketOrders } from "@/lib/db/tickets";
import OrdersTable from "./_components/orders-table";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function SeatAssignmentPage() {
  const orders = await listTicketOrders();
  return <OrdersTable orders={orders} />;
}
