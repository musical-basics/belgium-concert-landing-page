"use client";

import { useState } from "react";
import { Ticket } from "lucide-react";

const ticketVariantId = "43946996957227";
const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function TicketSelector() {
  const [quantity, setQuantity] = useState(1);

  const checkoutUrl = `https://musicalbasics.com/cart/${ticketVariantId}:${quantity}`;

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md">
      <div className="w-full space-y-2">
        <label htmlFor="quantity-select" className="block text-left text-[#B9C1D1] text-xs font-semibold uppercase tracking-widest">
          Quantity / Aantal
        </label>
        <select
          id="quantity-select"
          value={quantity}
          className="w-full rounded-[16px] border border-white/10 bg-[#0F1117] px-5 py-4 text-[#F4F4F2] outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23B9C1D1'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1.25rem' }}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        >
          {quantityOptions.map((q) => (
            <option key={q} value={q} className="bg-[#0F1117]">
              {q} ticket{q > 1 ? "s" : ""} / {q} ticket{q > 1 ? "ten" : ""}
            </option>
          ))}
        </select>
      </div>

      <a
        href={checkoutUrl}
        className="group relative w-full bg-[#111111] text-[#F4F4F2] font-semibold text-[16px] px-10 py-5 rounded-[999px] flex items-center justify-center gap-3 transition-all hover:-translate-y-1 ring-1 ring-white/10 hover:ring-white/30 shadow-2xl shadow-black/40 overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-3">
          Tickets kopen / Get Tickets
          <Ticket className="w-5 h-5 transition-transform group-hover:rotate-12" />
        </span>
      </a>
      
      <div className="flex flex-col items-center gap-1">
        <p className="text-[#B9C1D1]/40 text-[10px] uppercase tracking-[0.2em] font-medium">Zaventem, België / Belgium</p>
        <p className="text-[#B9C1D1]/20 text-[9px]">Theaterzaal Maupertuis, CC De Factorij</p>
      </div>
    </div>
  );
}
