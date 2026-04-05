import { useLanguage } from "@/contexts/LanguageContext";
import { sampleDailyLedger } from "@/data/sampleData";
import { BookOpen, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DailyLedger() {
  const { t } = useLanguage();
  const finalBalance = sampleDailyLedger[sampleDailyLedger.length - 1].balance;
  const totalDebit = sampleDailyLedger.reduce((a, b) => a + b.debit, 0);
  const totalCredit = sampleDailyLedger.reduce((a, b) => a + b.credit, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-4 border border-emerald-500/20">
          <p className="text-xs text-white/50 mb-1">Total Credit</p>
          <p className="text-xl font-bold text-emerald-400">৳{totalCredit.toLocaleString()}</p>
        </div>
        <div className="glass-card p-4 border border-red-500/20">
          <p className="text-xs text-white/50 mb-1">Total Debit</p>
          <p className="text-xl font-bold text-red-400">৳{totalDebit.toLocaleString()}</p>
        </div>
        <div className="glass-card p-4 border border-sky-500/20">
          <p className="text-xs text-white/50 mb-1">Closing Balance</p>
          <p className="text-xl font-bold text-sky-400">৳{finalBalance.toLocaleString()}</p>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <BookOpen size={16} className="text-sky-400" />
            {t("nav.daily_ledger")} — 15 January 2024
          </h3>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white/60 hover:text-white hover:bg-white/10 transition-colors" data-testid="button-export-ledger">
            <Download size={12} />
            {t("common.export")}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-start py-3 px-4 text-xs font-medium text-white/40">#</th>
                <th className="text-start py-3 px-4 text-xs font-medium text-white/40">Particulars</th>
                <th className="text-end py-3 px-4 text-xs font-medium text-white/40">Debit (৳)</th>
                <th className="text-end py-3 px-4 text-xs font-medium text-white/40">Credit (৳)</th>
                <th className="text-end py-3 px-4 text-xs font-medium text-white/40">Balance (৳)</th>
              </tr>
            </thead>
            <tbody>
              {sampleDailyLedger.map((entry) => (
                <tr key={entry.id} className="border-b border-white/3 hover:bg-white/3 transition-colors" data-testid={`row-ledger-${entry.id}`}>
                  <td className="py-3 px-4 text-white/30 text-xs">{entry.id}</td>
                  <td className="py-3 px-4 text-white text-xs">{entry.particulars}</td>
                  <td className={cn("py-3 px-4 text-end text-xs font-medium", entry.debit > 0 ? "text-red-400" : "text-white/20")}>
                    {entry.debit > 0 ? entry.debit.toLocaleString() : "-"}
                  </td>
                  <td className={cn("py-3 px-4 text-end text-xs font-medium", entry.credit > 0 ? "text-emerald-400" : "text-white/20")}>
                    {entry.credit > 0 ? entry.credit.toLocaleString() : "-"}
                  </td>
                  <td className="py-3 px-4 text-end text-sky-400 font-semibold text-sm">
                    {entry.balance.toLocaleString()}
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
