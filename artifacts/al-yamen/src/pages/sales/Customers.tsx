import { useLanguage } from "@/contexts/LanguageContext";
import { sampleCustomers } from "@/data/sampleData";
import { cn } from "@/lib/utils";
import { Users, Search, Phone, Mail } from "lucide-react";
import { useState } from "react";

export default function Customers() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");

  const filtered = sampleCustomers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="glass-card p-4 flex gap-3">
        <div className="flex-1 relative">
          <Search size={14} className="absolute start-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input type="search" placeholder={t("common.search")} value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl ps-9 pe-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-sky-400/40 transition-colors"
            data-testid="input-search-customers" />
        </div>
        <button className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium rounded-xl transition-colors" data-testid="button-add-customer">
          + {t("common.add")}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(c => (
          <div key={c.id} className="glass-card p-4 hover:border-sky-400/20 transition-all" data-testid={`card-customer-${c.id}`}>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 border border-white/10">
                <span className="text-sm font-bold text-sky-400">{c.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{c.name}</p>
                <p className="text-xs text-white/40 truncate">{c.address}</p>
              </div>
              <span className={cn("text-xs px-2 py-0.5 rounded-full flex-shrink-0",
                c.status === "active" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400")}>
                {t(`common.${c.status}`)}
              </span>
            </div>
            <div className="space-y-1.5 mb-3">
              <div className="flex items-center gap-2 text-xs text-white/50">
                <Phone size={11} />
                <span>{c.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/50">
                <Mail size={11} />
                <span className="truncate">{c.email}</span>
              </div>
            </div>
            <div className="flex justify-between pt-3 border-t border-white/5">
              <div className="text-center">
                <p className="text-sm font-bold text-white">{c.totalOrders}</p>
                <p className="text-xs text-white/40">Orders</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-sky-400">৳{(c.totalSpent / 1000).toFixed(0)}K</p>
                <p className="text-xs text-white/40">Total</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
