import { useLanguage } from "@/contexts/LanguageContext";
import { sampleOrders } from "@/data/sampleData";
import { cn } from "@/lib/utils";
import { ShoppingBag, Search } from "lucide-react";
import { useState } from "react";

export default function OrderHistory() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");

  const filtered = sampleOrders.filter(o =>
    o.customer.toLowerCase().includes(search.toLowerCase()) ||
    o.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="glass-card p-4 flex gap-3">
        <div className="flex-1 relative">
          <Search size={14} className="absolute start-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="search"
            placeholder={t("common.search")}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl ps-9 pe-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-sky-400/40 transition-colors"
            data-testid="input-search-orders"
          />
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-start py-3 px-4 text-xs font-medium text-white/40">Order ID</th>
                <th className="text-start py-3 px-4 text-xs font-medium text-white/40">{t("common.customer")}</th>
                <th className="text-start py-3 px-4 text-xs font-medium text-white/40">{t("common.date")}</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-white/40">Items</th>
                <th className="text-end py-3 px-4 text-xs font-medium text-white/40">{t("common.total")}</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-white/40">{t("common.status")}</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-white/40">Payment</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => (
                <tr key={order.id} className="border-b border-white/3 hover:bg-white/3 transition-colors" data-testid={`row-order-${order.id}`}>
                  <td className="py-3 px-4 font-mono text-xs text-sky-400">{order.id}</td>
                  <td className="py-3 px-4 text-white text-xs">{order.customer}</td>
                  <td className="py-3 px-4 text-white/50 text-xs">{order.date}</td>
                  <td className="py-3 px-4 text-center text-white/50 text-xs">{order.items}</td>
                  <td className="py-3 px-4 text-end font-semibold text-white text-sm">৳{order.total.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full",
                      order.status === "completed" ? "bg-emerald-500/10 text-emerald-400" :
                      order.status === "pending" ? "bg-amber-500/10 text-amber-400" :
                      order.status === "processing" ? "bg-sky-500/10 text-sky-400" :
                      "bg-red-500/10 text-red-400")}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full",
                      order.payment === "paid" ? "bg-emerald-500/10 text-emerald-400" :
                      order.payment === "partial" ? "bg-amber-500/10 text-amber-400" :
                      order.payment === "refunded" ? "bg-purple-500/10 text-purple-400" :
                      "bg-red-500/10 text-red-400")}>
                      {order.payment}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
