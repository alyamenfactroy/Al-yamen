import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { sampleSuppliers } from "@/data/sampleData";
import { Search, Plus, Phone, Mail, MapPin, Edit2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Suppliers() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");

  const filtered = sampleSuppliers.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.contact.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5 page-enter">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-base font-bold text-white">{t("nav.suppliers")}</h1>
          <p className="text-xs text-white/40 mt-0.5">{sampleSuppliers.length} registered suppliers</p>
        </div>
        <button className="btn-primary"><Plus size={14} /> Add Supplier</button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5">
        {[
          { label: "Total Suppliers", value: sampleSuppliers.length, color: "text-sky-400" },
          { label: "Active", value: sampleSuppliers.filter(s => s.status === "active").length, color: "text-emerald-400" },
          { label: "Total Outstanding", value: `৳${(sampleSuppliers.reduce((a,b)=>a+b.outstanding,0)/1000).toFixed(0)}K`, color: "text-amber-400" },
        ].map(c => (
          <div key={c.label} className="glass-card p-4 stat-card">
            <p className="text-xs text-white/40 mb-1">{c.label}</p>
            <p className={cn("text-xl font-bold", c.color)}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="search-bar max-w-sm">
        <Search size={13} className="text-white/30 flex-shrink-0" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search suppliers..." />
      </div>

      {/* Supplier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((supplier) => (
          <div key={supplier.id} className="glass-card p-5 hover:border-sky-400/20 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 border border-white/08 flex items-center justify-center text-white font-bold">
                  {supplier.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white/90">{supplier.name}</h3>
                  <p className="text-xs text-white/40">{supplier.contact}</p>
                </div>
              </div>
              <span className={cn("badge", supplier.status === "active" ? "badge-green" : "badge-gray")}>
                {supplier.status}
              </span>
            </div>

            <div className="space-y-1.5 text-xs mb-4">
              <div className="flex items-center gap-2 text-white/50">
                <Phone size={11} className="text-white/25" /> {supplier.phone}
              </div>
              <div className="flex items-center gap-2 text-white/50">
                <Mail size={11} className="text-white/25" /> {supplier.email}
              </div>
              <div className="flex items-center gap-2 text-white/50">
                <MapPin size={11} className="text-white/25" /> {supplier.address}
              </div>
            </div>

            <div className="divider mb-3" />

            <div className="flex items-center justify-between text-xs mb-3">
              <div>
                <p className="text-white/35 mb-0.5">Total Purchase</p>
                <p className="font-bold text-white/80">৳{supplier.totalPurchase.toLocaleString()}</p>
              </div>
              <div className="text-end">
                <p className="text-white/35 mb-0.5">Outstanding</p>
                <p className={cn("font-bold", supplier.outstanding > 0 ? "text-amber-400" : "text-emerald-400")}>
                  ৳{supplier.outstanding.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="btn-secondary flex-1 text-xs py-1.5"><Edit2 size={12} /> Edit</button>
              <button className="btn-danger text-xs py-1.5 px-3"><Trash2 size={12} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
