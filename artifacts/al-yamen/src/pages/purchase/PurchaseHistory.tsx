import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { samplePurchases } from "@/data/sampleData";
import { Search, Filter, Download, Eye, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

const statusConfig: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
  received:  { label: "Received", className: "badge-green", icon: <CheckCircle size={10} /> },
  pending:   { label: "Pending", className: "badge-amber", icon: <Clock size={10} /> },
  ordered:   { label: "Ordered", className: "badge-blue", icon: <Truck size={10} /> },
  cancelled: { label: "Cancelled", className: "badge-red", icon: <AlertCircle size={10} /> },
};
const paymentConfig: Record<string, string> = {
  paid: "badge-green",
  partial: "badge-amber",
  unpaid: "badge-red",
};

export default function PurchaseHistory() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = samplePurchases.filter(p => {
    const matchSearch = p.supplier.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalAmount = samplePurchases.reduce((a, b) => a + b.total, 0);
  const pendingAmount = samplePurchases.filter(p => p.payment !== "paid").reduce((a, b) => a + b.total, 0);

  return (
    <div className="space-y-5 page-enter">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-base font-bold text-white">{t("nav.purchase_history")}</h1>
          <p className="text-xs text-white/40 mt-0.5">{samplePurchases.length} total purchases</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary"><Download size={14} /> Export</button>
          <Link href="/purchase/new" className="btn-primary">+ New Purchase</Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {[
          { label: "Total Purchases", value: `৳${(totalAmount/1000).toFixed(0)}K`, color: "text-sky-400" },
          { label: "Paid", value: `৳${(samplePurchases.filter(p=>p.payment==="paid").reduce((a,b)=>a+b.total,0)/1000).toFixed(0)}K`, color: "text-emerald-400" },
          { label: "Pending Due", value: `৳${(pendingAmount/1000).toFixed(0)}K`, color: "text-amber-400" },
          { label: "This Month", value: `${samplePurchases.length} orders`, color: "text-purple-400" },
        ].map(card => (
          <div key={card.label} className="glass-card p-4 stat-card">
            <p className="text-xs text-white/40 mb-1">{card.label}</p>
            <p className={cn("text-xl font-bold", card.color)}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="glass-card overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-white/05 flex items-center gap-3 flex-wrap">
          <div className="search-bar flex-1 min-w-[180px]">
            <Search size={13} className="text-white/30 flex-shrink-0" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search purchases..." />
          </div>
          <div className="flex items-center gap-2">
            {["all", "received", "pending", "ordered"].map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={cn("text-xs px-3 py-1.5 rounded-lg transition-all font-medium capitalize",
                  filterStatus === s ? "bg-sky-400/15 text-sky-400 border border-sky-400/25" : "text-white/45 hover:text-white hover:bg-white/05"
                )}
              >
                {s === "all" ? "All" : s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="text-start">Purchase ID</th>
                <th className="text-start">Supplier</th>
                <th className="text-center">Date</th>
                <th className="text-center">Items</th>
                <th className="text-end">Total</th>
                <th className="text-center">Status</th>
                <th className="text-center">Payment</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const sc = statusConfig[p.status] || { label: p.status, className: "badge-gray", icon: null };
                return (
                  <tr key={p.id}>
                    <td><span className="font-mono text-sky-400/80 text-xs">{p.id}</span></td>
                    <td><span className="font-semibold text-white/85">{p.supplier}</span></td>
                    <td className="text-center text-white/50">{p.date}</td>
                    <td className="text-center">
                      <span className="badge badge-gray">{p.items} items</span>
                    </td>
                    <td className="text-end font-bold text-white/85">৳{p.total.toLocaleString()}</td>
                    <td className="text-center">
                      <span className={cn("badge gap-1", sc.className)}>
                        {sc.icon} {sc.label}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className={cn("badge", paymentConfig[p.payment] || "badge-gray")}>{p.payment}</span>
                    </td>
                    <td className="text-center">
                      <button className="btn-icon text-sky-400/60 hover:text-sky-400 hover:bg-sky-400/10">
                        <Eye size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-white/30 text-sm">No purchases found</div>
        )}
      </div>
    </div>
  );
}
