"use client";

const ticketVariantId = "43946996957227";
const quantityOptions = [1, 2, 3, 4, 5, 6];

export default function TicketSelector() {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md">
      <label className="w-full text-left text-[#B9C1D1] text-sm font-medium">
        Quantity / Aantal
        <select
          defaultValue="1"
          className="mt-2 w-full rounded-[16px] border border-white/15 bg-[#0F1117] px-4 py-4 text-[#F4F4F2] outline-none focus:border-white/40"
          onChange={(e) => {
            const quantity = e.target.value;
            window.location.href = `https://musicalbasics.com/cart/${ticketVariantId}:${quantity}`;
          }}
        >
          {quantityOptions.map((quantity) => (
            <option key={quantity} value={quantity}>
              {quantity} ticket{quantity > 1 ? "s" : ""} / {quantity} ticket{quantity > 1 ? "ten" : ""}
            </option>
          ))}
        </select>
      </label>
      <a
        href={`https://musicalbasics.com/cart/${ticketVariantId}:1`}
        className="bg-[#111111] text-[#F4F4F2] font-medium text-[16px] px-10 py-5 rounded-[999px] flex items-center justify-center gap-3 transition-transform hover:-translate-y-1 ring-1 ring-white/10 hover:ring-white/30 shadow-xl shadow-black/20 w-full"
      >
        Tickets kopen / Get Tickets
      </a>
      <p className="text-[#B9C1D1]/50 text-sm mt-4 font-light text-center">Zaventem, België / Belgium</p>
    </div>
  );
}
