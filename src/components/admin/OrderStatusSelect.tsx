"use client";

import { updateOrderStatus } from "@/app/admin/actions";

const STATUSES = ["pending", "paid", "shipped", "cancelled"] as const;

export function OrderStatusSelect({
  orderId,
  status,
}: {
  orderId: string;
  status: string;
}) {
  return (
    <select
      defaultValue={status}
      onChange={(e) => updateOrderStatus(orderId, e.target.value)}
      className="rounded border border-neutral-300 px-2 py-1 text-sm"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
