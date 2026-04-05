import { useLanguage } from "@/contexts/LanguageContext";
import { sampleTransactions } from "@/data/sampleData";
import { Search, Filter, ArrowUpRight, ArrowDownRight, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function AllTransactions() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = sampleTransactions.filter(tx => {
    const matchSearch = tx.description.toLowerCase().includes(search.toLowerCase()) ||
      tx.reference.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || tx.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="glass-card p-4 flex flex-wrap gap-3 items-center">
        <div className="flex-1 min-w-48 relative">
          <Search size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="search"
            placeholder={t("common.search")}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl ps-9 pe-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-sky-400/40 transition-colors"
            data-testid="input-search-transactions"
          />
        </div>
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-400/40 transition-colors"
          data-testid="select-type-filter"
        >
          <option value="all" className="bg-[#0d1526]">All Types</option>
          <option value="income" className="bg-[#0d1526]">{t("transactions.income")}</option>
          <option value="expense" className="bg-[#0d1526]">{t("transactions.expense")}</option>
        </select>
        <button className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors" data-testid="button-export">
          <Download size={14} />
          {t("common.export")}
        </button>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-start py-3 px-4 text-xs font-medium text-white/40">{t("common.date")}</th>
                <th className="text-start py-3 px-4 text-xs font-medium text-white/40">{t("common.description")}</th>
                <th className="text-start py-3 px-4 text-xs font-medium text-white/40">{t("common.category")}</th>
                <th className="text-start py-3 px-4 text-xs font-medium text-white/40">{t("transactions.reference")}</th>
                <th className="text-end py-3 px-4 text-xs font-medium text-white/40">{t("common.amount")}</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-white/40">{t("common.status")}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx, i) => (
                <tr key={tx.id} className="border-b border-white/3 hover:bg-white/3 transition-colors" data-testid={`row-transaction-${tx.id}`}>
                  <td className="py-3 px-4 text-white/60">{tx.date}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0",
                        tx.type === "income" ? "bg-emerald-500/10" : "bg-red-500/10")}>
                        {tx.type === "income"
                          ? <ArrowUpRight size={12} className="text-emerald-400" />
                          : <ArrowDownRight size={12} className="text-red-400" />}
                      </div>
                      <span className="text-white text-xs">{tx.description}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-white/50 text-xs">{tx.category}</td>
                  <td className="py-3 px-4 text-white/40 text-xs font-mono">{tx.reference}</td>
                  <td className={cn("py-3 px-4 text-end font-semibold",
                    tx.type === "income" ? "text-emerald-400" : "text-red-400")}>
                    {tx.type === "income" ? "+" : "-"}৳{tx.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full",
                      tx.status === "completed" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400")}>
                      {t(`common.${tx.status}`) || tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-white/30 text-sm">{t("common.no_data")}</div>
        )}
      </div>
    </div>
  );
}
