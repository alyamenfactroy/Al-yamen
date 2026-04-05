import { useLanguage } from "@/contexts/LanguageContext";
import { sampleTransactions } from "@/data/sampleData";
import { ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RecentTransactions() {
  const { t } = useLanguage();
  const recent = sampleTransactions.slice(0, 6);
  const totalIn = recent.filter(t => t.type === "income").reduce((a, b) => a + b.amount, 0);
  const totalOut = recent.filter(t => t.type === "expense").reduce((a, b) => a + b.amount, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4 border border-emerald-500/20">
          <p className="text-xs text-white/50 mb-1">Total In</p>
          <p className="text-xl font-bold text-emerald-400">+৳{totalIn.toLocaleString()}</p>
        </div>
        <div className="glass-card p-4 border border-red-500/20">
          <p className="text-xs text-white/50 mb-1">Total Out</p>
          <p className="text-xl font-bold text-red-400">-৳{totalOut.toLocaleString()}</p>
        </div>
      </div>

      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Clock size={16} className="text-sky-400" />
          {t("nav.recent_transactions")}
        </h3>
        <div className="space-y-3">
          {recent.map(tx => (
            <div key={tx.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-colors" data-testid={`recent-tx-${tx.id}`}>
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                tx.type === "income" ? "bg-emerald-500/10" : "bg-red-500/10")}>
                {tx.type === "income"
                  ? <ArrowUpRight size={16} className="text-emerald-400" />
                  : <ArrowDownRight size={16} className="text-red-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{tx.description}</p>
                <p className="text-xs text-white/40">{tx.category} • {tx.date}</p>
              </div>
              <div className="text-end">
                <p className={cn("text-sm font-bold",
                  tx.type === "income" ? "text-emerald-400" : "text-red-400")}>
                  {tx.type === "income" ? "+" : "-"}৳{tx.amount.toLocaleString()}
                </p>
                <p className="text-xs text-white/30 font-mono">{tx.reference}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
