import { useLanguage } from "@/contexts/LanguageContext";
import StatCard from "@/components/ui/StatCard";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { monthlyData, categoryExpenses, sampleTransactions, sampleOrders } from "@/data/sampleData";
import {
  TrendingUp, DollarSign, ShoppingBag, Users,
  ArrowUpRight, ArrowDownRight, Package, Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel rounded-xl p-3 border border-white/10 text-xs">
        <p className="text-white/60 mb-2">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} style={{ color: entry.color }} className="font-medium">
            {entry.name}: ৳{entry.value?.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const { t } = useLanguage();

  const totalRevenue = monthlyData.reduce((a, b) => a + b.revenue, 0);
  const totalExpense = monthlyData.reduce((a, b) => a + b.expense, 0);
  const netProfit = totalRevenue - totalExpense;
  const totalOrders = sampleOrders.length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="glass-card p-5 bg-gradient-to-r from-sky-500/10 via-transparent to-purple-500/10 border border-sky-500/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-white mb-1">{t("dashboard.welcome")} 👋</h1>
            <p className="text-sm text-white/50">
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-sky-400/10 rounded-xl border border-sky-400/20">
            <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-xs text-sky-400 font-medium">System Online</span>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title={t("dashboard.total_revenue")}
          value={`৳${(totalRevenue / 1000).toFixed(0)}K`}
          change={12.5}
          changeLabel={t("stats.this_month")}
          icon={<DollarSign size={20} />}
          color="blue"
        />
        <StatCard
          title={t("dashboard.total_expenses")}
          value={`৳${(totalExpense / 1000).toFixed(0)}K`}
          change={-3.2}
          changeLabel={t("stats.this_month")}
          icon={<TrendingUp size={20} />}
          color="red"
        />
        <StatCard
          title={t("dashboard.net_profit")}
          value={`৳${(netProfit / 1000).toFixed(0)}K`}
          change={18.7}
          changeLabel={t("stats.this_month")}
          icon={<ShoppingBag size={20} />}
          color="green"
        />
        <StatCard
          title={t("dashboard.total_orders")}
          value={`${totalOrders}`}
          change={8.1}
          changeLabel={t("stats.this_month")}
          icon={<Package size={20} />}
          color="purple"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">{t("dashboard.monthly_overview")}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="profit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `৳${v / 1000}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#38bdf8" strokeWidth={2} fill="url(#revenue)" name="Revenue" />
              <Area type="monotone" dataKey="expense" stroke="#f87171" strokeWidth={2} fill="url(#expense)" name="Expense" />
              <Area type="monotone" dataKey="profit" stroke="#34d399" strokeWidth={2} fill="url(#profit)" name="Profit" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Breakdown */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={categoryExpenses} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                {categoryExpenses.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(val: any) => `৳${val.toLocaleString()}`} contentStyle={{ background: "rgba(10,15,30,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "11px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {categoryExpenses.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-white/60">{item.name}</span>
                </div>
                <span className="text-white/80 font-medium">৳{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions + Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Transactions */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">{t("dashboard.recent_activity")}</h3>
            <button className="text-xs text-sky-400 hover:text-sky-300 transition-colors">{t("common.view_all")}</button>
          </div>
          <div className="space-y-3">
            {sampleTransactions.slice(0, 5).map((tx) => (
              <div key={tx.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/3 hover:bg-white/5 transition-colors" data-testid={`tx-item-${tx.id}`}>
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                  tx.type === "income" ? "bg-emerald-500/10" : "bg-red-500/10"
                )}>
                  {tx.type === "income"
                    ? <ArrowUpRight size={15} className="text-emerald-400" />
                    : <ArrowDownRight size={15} className="text-red-400" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{tx.description}</p>
                  <p className="text-xs text-white/40">{tx.date}</p>
                </div>
                <span className={cn(
                  "text-sm font-semibold flex-shrink-0",
                  tx.type === "income" ? "text-emerald-400" : "text-red-400"
                )}>
                  {tx.type === "income" ? "+" : "-"}৳{tx.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">{t("nav.order_history")}</h3>
            <button className="text-xs text-sky-400 hover:text-sky-300 transition-colors">{t("common.view_all")}</button>
          </div>
          <div className="space-y-3">
            {sampleOrders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/3 hover:bg-white/5 transition-colors" data-testid={`order-item-${order.id}`}>
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <ShoppingBag size={15} className="text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{order.customer}</p>
                  <p className="text-xs text-white/40">{order.id} • {order.date}</p>
                </div>
                <div className="text-end flex-shrink-0">
                  <p className="text-sm font-semibold text-white">৳{order.total.toLocaleString()}</p>
                  <span className={cn(
                    "text-xs font-medium px-1.5 py-0.5 rounded-full",
                    order.status === "completed" ? "bg-emerald-500/10 text-emerald-400" :
                    order.status === "pending" ? "bg-amber-500/10 text-amber-400" :
                    order.status === "processing" ? "bg-sky-500/10 text-sky-400" :
                    "bg-red-500/10 text-red-400"
                  )}>
                    {t(`common.${order.status}`) || order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
