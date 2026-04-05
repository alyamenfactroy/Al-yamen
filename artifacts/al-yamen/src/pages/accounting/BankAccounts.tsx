import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { bankAccounts } from "@/data/sampleData";
import { Banknote, Plus, TrendingUp, TrendingDown, CreditCard, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const bankColors = [
  "from-sky-500/20 to-sky-600/10 border-sky-500/20",
  "from-emerald-500/20 to-emerald-600/10 border-emerald-500/20",
  "from-purple-500/20 to-purple-600/10 border-purple-500/20",
  "from-amber-500/20 to-amber-600/10 border-amber-500/20",
];

const recentTx = [
  { id: 1, desc: "Sales Revenue Deposit", amount: 45000, type: "credit", date: "2024-01-15", bank: "Dutch-Bangla Bank" },
  { id: 2, desc: "Rent Payment", amount: 12000, type: "debit", date: "2024-01-14", bank: "Dutch-Bangla Bank" },
  { id: 3, desc: "Wholesale Collection", amount: 72000, type: "credit", date: "2024-01-13", bank: "BRAC Bank" },
  { id: 4, desc: "Purchase Payment", amount: 84000, type: "debit", date: "2024-01-12", bank: "Islami Bank" },
  { id: 5, desc: "Service Income", amount: 8500, type: "credit", date: "2024-01-11", bank: "Dutch-Bangla Bank" },
  { id: 6, desc: "Salary Disbursement", amount: 38000, type: "debit", date: "2024-01-10", bank: "Dutch-Bangla Bank" },
];

export default function BankAccounts() {
  const { t } = useLanguage();

  const totalBalance = bankAccounts.reduce((a, b) => a + b.balance, 0);
  const totalDebit = recentTx.filter(t => t.type === "debit").reduce((a, b) => a + b.amount, 0);
  const totalCredit = recentTx.filter(t => t.type === "credit").reduce((a, b) => a + b.amount, 0);

  return (
    <div className="space-y-5 page-enter">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-base font-bold text-white">{t("nav.bank_accounts")}</h1>
          <p className="text-xs text-white/40 mt-0.5">Manage all bank accounts & cash</p>
        </div>
        <button className="btn-primary"><Plus size={14} /> Add Account</button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {[
          { label: "Total Balance", value: `৳${(totalBalance/1000).toFixed(0)}K`, icon: <Banknote size={18} />, color: "text-sky-400 bg-sky-400/10 border-sky-400/20" },
          { label: "Total Credited (6 txns)", value: `৳${totalCredit.toLocaleString()}`, icon: <TrendingUp size={18} />, color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
          { label: "Total Debited (6 txns)", value: `৳${totalDebit.toLocaleString()}`, icon: <TrendingDown size={18} />, color: "text-red-400 bg-red-400/10 border-red-400/20" },
        ].map(c => (
          <div key={c.label} className="glass-card p-5 stat-card">
            <div className="flex items-center gap-3">
              <div className={cn("w-11 h-11 rounded-xl border flex items-center justify-center", c.color)}>{c.icon}</div>
              <div>
                <p className="text-xl font-bold text-white">{c.value}</p>
                <p className="text-xs text-white/40 mt-0.5">{c.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Account Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {bankAccounts.map((acc, idx) => (
          <div key={acc.id} className={cn("glass-card p-5 bg-gradient-to-br border", bankColors[idx % bankColors.length])}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/08 flex items-center justify-center">
                <CreditCard size={18} className="text-white/60" />
              </div>
              <span className={cn("badge text-xs",
                acc.type === "current" ? "badge-blue" :
                acc.type === "savings" ? "badge-green" :
                "badge-amber"
              )}>
                {acc.type}
              </span>
            </div>
            <p className="text-xs text-white/40 mb-1">{acc.type === "cash" ? "Cash in Hand" : acc.branch}</p>
            <h3 className="text-sm font-bold text-white mb-0.5">{acc.bank}</h3>
            {acc.accountNo !== "-" && (
              <p className="text-xs font-mono text-white/30 mb-3">****{acc.accountNo.slice(-4)}</p>
            )}
            <div className="divider mb-3" />
            <p className="text-xs text-white/40 mb-0.5">Available Balance</p>
            <p className="text-2xl font-bold gradient-text">৳{acc.balance.toLocaleString()}</p>
            <div className="mt-3 progress-bar">
              <div className="progress-fill bg-sky-400 opacity-50" style={{ width: `${(acc.balance / totalBalance) * 100}%` }} />
            </div>
            <p className="text-xs text-white/25 mt-1 text-end">{((acc.balance / totalBalance) * 100).toFixed(1)}% of total</p>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="glass-card overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/05">
          <h3 className="text-sm font-bold text-white">Recent Bank Transactions</h3>
          <button className="btn-secondary text-xs flex items-center gap-1.5 py-1.5 px-3">
            <RefreshCw size={12} /> Refresh
          </button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th className="text-start">Description</th>
              <th className="text-start">Account</th>
              <th className="text-center">Date</th>
              <th className="text-center">Type</th>
              <th className="text-end">Amount</th>
            </tr>
          </thead>
          <tbody>
            {recentTx.map((tx) => (
              <tr key={tx.id}>
                <td className="font-medium text-white/80">{tx.desc}</td>
                <td className="text-white/50">{tx.bank}</td>
                <td className="text-center text-white/45">{tx.date}</td>
                <td className="text-center">
                  <span className={cn("badge text-xs", tx.type === "credit" ? "badge-green" : "badge-red")}>
                    {tx.type === "credit" ? "Credit" : "Debit"}
                  </span>
                </td>
                <td className={cn("text-end font-bold", tx.type === "credit" ? "text-emerald-400" : "text-red-400")}>
                  {tx.type === "credit" ? "+" : "-"}৳{tx.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
