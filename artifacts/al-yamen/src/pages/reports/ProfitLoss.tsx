import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { monthlyData, categoryExpenses } from "@/data/sampleData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Download, Printer, TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfitLoss() {
  const { t } = useLanguage();
  const [period, setPeriod] = useState("monthly");

  const totalRevenue = monthlyData.reduce((a, b) => a + b.revenue, 0);
  const totalExpense = monthlyData.reduce((a, b) => a + b.expense, 0);
  const netProfit = totalRevenue - totalExpense;
  const profitMargin = ((netProfit / totalRevenue) * 100).toFixed(1);

  const incomeItems = [
    { label: "Sales Revenue", amount: 1350000 },
    { label: "Service Income", amount: 85000 },
    { label: "Commission Income", amount: 42000 },
    { label: "Other Income", amount: 21000 },
  ];
  const expenseItems = [
    { label: "Salaries & Wages", amount: 182000 },
    { label: "Office Rent", amount: 84000 },
    { label: "Purchase Cost", amount: 568000 },
    { label: "Marketing", amount: 59500 },
    { label: "Utilities", amount: 36400 },
    { label: "Transport", amount: 29400 },
    { label: "Supplies", amount: 26600 },
    { label: "Other Expenses", amount: 12600 },
  ];

  const totalIncome = incomeItems.reduce((a, b) => a + b.amount, 0);
  const totalExpenses = expenseItems.reduce((a, b) => a + b.amount, 0);
  const finalProfit = totalIncome - totalExpenses;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel rounded-xl p-3 border border-white/10 text-xs">
          <p className="text-white/50 mb-1">{label}</p>
          {payload.map((e: any, i: number) => (
            <p key={i} style={{ color: e.color }} className="font-semibold">{e.name}: ৳{e.value?.toLocaleString()}</p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-5 page-enter">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-base font-bold text-white">{t("nav.profit_loss")}</h1>
          <p className="text-xs text-white/40 mt-0.5">Profit & Loss Statement — January 2024</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary"><Printer size={14} /> Print</button>
          <button className="btn-secondary"><Download size={14} /> Export PDF</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {[
          { label: "Total Income", value: `৳${(totalIncome/1000).toFixed(0)}K`, icon: <DollarSign size={17} />, color: "from-sky-500/15 to-sky-600/5 text-sky-400 border-sky-500/20", badge: "+12.5%", badgeColor: "badge-green" },
          { label: "Total Expenses", value: `৳${(totalExpenses/1000).toFixed(0)}K`, icon: <TrendingDown size={17} />, color: "from-red-500/15 to-red-600/5 text-red-400 border-red-500/20", badge: "-3.2%", badgeColor: "badge-green" },
          { label: "Net Profit", value: `৳${(finalProfit/1000).toFixed(0)}K`, icon: <Activity size={17} />, color: "from-emerald-500/15 to-emerald-600/5 text-emerald-400 border-emerald-500/20", badge: "+18.7%", badgeColor: "badge-green" },
          { label: "Profit Margin", value: `${((finalProfit/totalIncome)*100).toFixed(1)}%`, icon: <TrendingUp size={17} />, color: "from-purple-500/15 to-purple-600/5 text-purple-400 border-purple-500/20", badge: "+2.1%", badgeColor: "badge-green" },
        ].map(card => (
          <div key={card.label} className="glass-card stat-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border bg-gradient-to-br", card.color)}>
                {card.icon}
              </div>
              <span className={cn("badge text-xs", card.badgeColor)}>{card.badge}</span>
            </div>
            <p className="text-xl font-bold text-white">{card.value}</p>
            <p className="text-xs text-white/45 mt-0.5">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Chart + P&L Statement */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Chart */}
        <div className="lg:col-span-3 glass-card p-5">
          <h3 className="text-sm font-bold text-white mb-4">Monthly Revenue vs Expense</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `৳${v/1000}K`} width={45} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" name="Revenue" fill="rgba(56,189,248,0.6)" radius={[5,5,0,0]} />
              <Bar dataKey="expense" name="Expense" fill="rgba(248,113,113,0.5)" radius={[5,5,0,0]} />
              <Bar dataKey="profit" name="Profit" fill="rgba(52,211,153,0.55)" radius={[5,5,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* P&L Table */}
        <div className="lg:col-span-2 glass-card overflow-hidden">
          <div className="p-4 border-b border-white/05">
            <h3 className="text-sm font-bold text-white">P&L Statement</h3>
          </div>
          <div className="overflow-y-auto max-h-72 scrollbar-thin">
            {/* Income */}
            <div className="px-4 py-2 bg-emerald-500/05">
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Income</p>
            </div>
            {incomeItems.map(item => (
              <div key={item.label} className="flex items-center justify-between px-4 py-2 border-b border-white/03 hover:bg-white/02">
                <span className="text-xs text-white/60">{item.label}</span>
                <span className="text-xs font-semibold text-white/80">৳{item.amount.toLocaleString()}</span>
              </div>
            ))}
            <div className="flex items-center justify-between px-4 py-2.5 bg-emerald-500/08 border-b border-white/06">
              <span className="text-xs font-bold text-emerald-400">Total Income</span>
              <span className="text-sm font-bold text-emerald-400">৳{totalIncome.toLocaleString()}</span>
            </div>

            {/* Expenses */}
            <div className="px-4 py-2 bg-red-500/05">
              <p className="text-xs font-bold text-red-400 uppercase tracking-wider">Expenses</p>
            </div>
            {expenseItems.map(item => (
              <div key={item.label} className="flex items-center justify-between px-4 py-2 border-b border-white/03 hover:bg-white/02">
                <span className="text-xs text-white/60">{item.label}</span>
                <span className="text-xs font-semibold text-white/80">৳{item.amount.toLocaleString()}</span>
              </div>
            ))}
            <div className="flex items-center justify-between px-4 py-2.5 bg-red-500/08 border-b border-white/06">
              <span className="text-xs font-bold text-red-400">Total Expenses</span>
              <span className="text-sm font-bold text-red-400">৳{totalExpenses.toLocaleString()}</span>
            </div>

            {/* Net */}
            <div className="flex items-center justify-between px-4 py-3 bg-sky-500/08">
              <span className="text-sm font-bold text-sky-400">Net Profit</span>
              <span className="text-base font-bold text-sky-400">৳{finalProfit.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
