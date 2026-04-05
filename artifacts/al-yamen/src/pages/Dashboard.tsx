import { useLanguage } from "@/contexts/LanguageContext";
import StatCard from "@/components/ui/StatCard";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import {
  monthlyData, categoryExpenses, sampleTransactions, sampleOrders,
  topProducts, weeklyActivity, salesByCategory, bankAccounts
} from "@/data/sampleData";
import {
  TrendingUp, DollarSign, ShoppingBag, Users, Package,
  ArrowUpRight, ArrowDownRight, Truck, AlertCircle,
  CreditCard, Activity, ChevronRight, Zap, Target,
  Calendar, PlusCircle, FileText, BarChart2, Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel rounded-2xl p-3.5 border border-white/10 text-xs shadow-2xl">
        <p className="text-white/50 mb-2 font-medium">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} style={{ color: entry.color }} className="font-semibold py-0.5">
            {entry.name}: ৳{entry.value?.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const BarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel rounded-2xl p-3 border border-white/10 text-xs shadow-2xl">
        <p className="text-white/50 mb-1">{label}</p>
        <p className="text-white font-semibold">{payload[0]?.value} orders</p>
        <p className="text-sky-400 font-semibold">৳{payload[1]?.value?.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const quickActions = [
  { icon: <PlusCircle size={18} />, label: "nav.add_transaction", path: "/transactions/add", color: "text-sky-400 bg-sky-400/10" },
  { icon: <ShoppingBag size={18} />, label: "nav.new_order", path: "/sales/new-order", color: "text-emerald-400 bg-emerald-400/10" },
  { icon: <Truck size={18} />, label: "nav.new_purchase", path: "/purchase/new", color: "text-purple-400 bg-purple-400/10" },
  { icon: <FileText size={18} />, label: "nav.profit_loss", path: "/reports/profit-loss", color: "text-amber-400 bg-amber-400/10" },
];

export default function Dashboard() {
  const { t } = useLanguage();

  const totalRevenue = monthlyData.reduce((a, b) => a + b.revenue, 0);
  const totalExpense = monthlyData.reduce((a, b) => a + b.expense, 0);
  const netProfit = totalRevenue - totalExpense;
  const totalPurchase = monthlyData.reduce((a, b) => a + b.purchase, 0);
  const totalOrders = sampleOrders.length;
  const totalCash = bankAccounts.reduce((a, b) => a + b.balance, 0);

  const lowStockCount = 2;

  return (
    <div className="space-y-5 page-enter">
      {/* Welcome Banner */}
      <div className="glass-card p-5 relative overflow-hidden shimmer-card" style={{
        background: "linear-gradient(135deg, rgba(56,189,248,0.08) 0%, rgba(99,102,241,0.06) 50%, rgba(168,85,247,0.05) 100%)",
        borderColor: "rgba(56,189,248,0.15)"
      }}>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 80% 50%, rgba(56,189,248,0.3) 0%, transparent 50%)"
        }} />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs text-sky-400 font-semibold mb-1 uppercase tracking-wider">{t("company.al_yamen")}</p>
            <h1 className="text-lg font-bold text-white mb-1">{t("dashboard.welcome")} 👋</h1>
            <p className="text-sm text-white/45">
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {lowStockCount > 0 && (
              <div className="flex items-center gap-2 px-3 py-2 bg-amber-400/10 rounded-xl border border-amber-400/20">
                <AlertCircle size={13} className="text-amber-400" />
                <span className="text-xs text-amber-400 font-medium">{lowStockCount} Low Stock</span>
              </div>
            )}
            <div className="flex items-center gap-2 px-3 py-2 bg-sky-400/10 rounded-xl border border-sky-400/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-sky-400 font-medium">System Online</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="relative mt-4 pt-4 border-t border-white/05">
          <p className="text-xs text-white/35 mb-3 font-medium uppercase tracking-wider">{t("dashboard.quick_actions")}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {quickActions.map((action) => (
              <Link key={action.path} href={action.path}
                className="quick-action-card group"
              >
                <span className={cn("w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", action.color)}>
                  {action.icon}
                </span>
                <span className="text-xs text-white/60 group-hover:text-white transition-colors font-medium">{t(action.label)}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Stat Cards — Row 1 */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3.5">
        <StatCard
          title={t("dashboard.total_revenue")}
          value={`৳${(totalRevenue / 1000).toFixed(0)}K`}
          change={12.5}
          changeLabel={t("stats.this_month")}
          icon={<DollarSign size={19} />}
          color="blue"
          className="animate-fade-in-up stagger-1"
        />
        <StatCard
          title={t("dashboard.total_expenses")}
          value={`৳${(totalExpense / 1000).toFixed(0)}K`}
          change={-3.2}
          changeLabel={t("stats.this_month")}
          icon={<TrendingUp size={19} />}
          color="red"
          className="animate-fade-in-up stagger-2"
        />
        <StatCard
          title={t("dashboard.net_profit")}
          value={`৳${(netProfit / 1000).toFixed(0)}K`}
          change={18.7}
          changeLabel={t("stats.this_month")}
          icon={<Activity size={19} />}
          color="green"
          className="animate-fade-in-up stagger-3"
        />
        <StatCard
          title={t("dashboard.total_orders")}
          value={`${totalOrders}`}
          change={8.1}
          changeLabel={t("stats.this_month")}
          icon={<Package size={19} />}
          color="purple"
          className="animate-fade-in-up stagger-4"
        />
      </div>

      {/* Stat Cards — Row 2 */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3.5">
        <StatCard
          title={t("dashboard.total_purchase")}
          value={`৳${(totalPurchase / 1000).toFixed(0)}K`}
          change={5.4}
          changeLabel={t("stats.this_month")}
          icon={<Truck size={19} />}
          color="amber"
          className="animate-fade-in-up stagger-1"
        />
        <StatCard
          title={t("dashboard.cash_balance")}
          value={`৳${(totalCash / 1000).toFixed(0)}K`}
          subtitle="All accounts"
          icon={<CreditCard size={19} />}
          color="cyan"
          className="animate-fade-in-up stagger-2"
        />
        <StatCard
          title={t("dashboard.total_customers")}
          value="7"
          change={14.3}
          changeLabel={t("stats.this_month")}
          icon={<Users size={19} />}
          color="indigo"
          className="animate-fade-in-up stagger-3"
        />
        <StatCard
          title={t("dashboard.stock_items")}
          value={`${2} Low`}
          subtitle="8 products tracked"
          icon={<Zap size={19} />}
          color="red"
          className="animate-fade-in-up stagger-4"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 glass-card p-5 animate-fade-in-up stagger-1">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-bold text-white">{t("dashboard.monthly_overview")}</h3>
              <p className="text-xs text-white/35 mt-0.5">Jul – Jan revenue, expense & profit</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              {[
                { color: "#38bdf8", label: "Revenue" },
                { color: "#f87171", label: "Expense" },
                { color: "#34d399", label: "Profit" },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
                  <span className="text-white/45">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyData}>
              <defs>
                {[
                  { id: "revenue", color: "#38bdf8" },
                  { id: "expense", color: "#f87171" },
                  { id: "profit", color: "#34d399" },
                ].map(g => (
                  <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={g.color} stopOpacity={0.22} />
                    <stop offset="95%" stopColor={g.color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `৳${v / 1000}K`} width={45} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#38bdf8" strokeWidth={2.5} fill="url(#revenue)" name="Revenue" dot={false} />
              <Area type="monotone" dataKey="expense" stroke="#f87171" strokeWidth={2} fill="url(#expense)" name="Expense" dot={false} />
              <Area type="monotone" dataKey="profit" stroke="#34d399" strokeWidth={2} fill="url(#profit)" name="Profit" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Breakdown */}
        <div className="glass-card p-5 animate-fade-in-up stagger-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">{t("dashboard.expense_breakdown")}</h3>
              <p className="text-xs text-white/35 mt-0.5">This month</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={categoryExpenses} cx="50%" cy="50%" innerRadius={42} outerRadius={70} paddingAngle={3} dataKey="value" strokeWidth={0}>
                {categoryExpenses.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val: any) => `৳${val.toLocaleString()}`}
                contentStyle={{ background: "rgba(10,15,30,0.95)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", fontSize: "11px", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-2">
            {categoryExpenses.slice(0, 5).map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-white/55 flex-1 min-w-0 truncate">{item.name}</span>
                <span className="text-xs text-white/75 font-semibold">৳{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Activity + Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Weekly Bar */}
        <div className="lg:col-span-3 glass-card p-5 animate-fade-in-up stagger-1">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-bold text-white">{t("dashboard.weekly_activity")}</h3>
              <p className="text-xs text-white/35 mt-0.5">Orders & Revenue this week</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyActivity} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }} axisLine={false} tickLine={false} width={20} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `৳${v/1000}K`} width={42} />
              <Tooltip content={<BarTooltip />} />
              <Bar yAxisId="left" dataKey="orders" name="Orders" fill="rgba(99,102,241,0.5)" radius={[5, 5, 0, 0]} />
              <Bar yAxisId="right" dataKey="revenue" name="Revenue" fill="rgba(56,189,248,0.55)" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="lg:col-span-2 glass-card p-5 animate-fade-in-up stagger-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">{t("dashboard.top_products")}</h3>
            <Link href="/inventory/stock-list" className="text-xs text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1">
              {t("common.view_all")} <ChevronRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {topProducts.map((product, idx) => (
              <div key={product.name} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/05 flex items-center justify-center flex-shrink-0 text-xs font-bold text-white/40">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white/80 truncate">{product.name}</p>
                  <div className="mt-1 progress-bar">
                    <div
                      className="progress-fill bg-sky-400 opacity-70"
                      style={{ width: `${(product.revenue / topProducts[0].revenue) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="text-end flex-shrink-0">
                  <p className="text-xs font-bold text-white/80">৳{(product.revenue / 1000).toFixed(0)}K</p>
                  <p className={cn("text-xs font-semibold", product.growth >= 0 ? "text-emerald-400" : "text-red-400")}>
                    {product.growth >= 0 ? "+" : ""}{product.growth}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions + Orders + Bank Accounts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Transactions */}
        <div className="glass-card p-5 animate-fade-in-up stagger-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">{t("dashboard.recent_activity")}</h3>
            <Link href="/transactions/all" className="text-xs text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1">
              {t("common.view_all")} <ChevronRight size={12} />
            </Link>
          </div>
          <div className="space-y-2">
            {sampleTransactions.slice(0, 6).map((tx) => (
              <div key={tx.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/04 transition-colors">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                  tx.type === "income" ? "bg-emerald-500/10" : "bg-red-500/10"
                )}>
                  {tx.type === "income"
                    ? <ArrowUpRight size={14} className="text-emerald-400" />
                    : <ArrowDownRight size={14} className="text-red-400" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white/80 truncate">{tx.description}</p>
                  <p className="text-xs text-white/35">{tx.date}</p>
                </div>
                <span className={cn(
                  "text-xs font-bold flex-shrink-0",
                  tx.type === "income" ? "text-emerald-400" : "text-red-400"
                )}>
                  {tx.type === "income" ? "+" : "-"}৳{tx.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="glass-card p-5 animate-fade-in-up stagger-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">{t("nav.order_history")}</h3>
            <Link href="/sales/order-history" className="text-xs text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1">
              {t("common.view_all")} <ChevronRight size={12} />
            </Link>
          </div>
          <div className="space-y-2">
            {sampleOrders.map((order) => (
              <div key={order.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/04 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <ShoppingBag size={14} className="text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white/80 truncate">{order.customer}</p>
                  <p className="text-xs text-white/35">{order.id}</p>
                </div>
                <div className="text-end flex-shrink-0">
                  <p className="text-xs font-bold text-white/80">৳{order.total.toLocaleString()}</p>
                  <span className={cn("badge text-[9px] px-1.5 py-0.5",
                    order.status === "completed" ? "badge-green" :
                    order.status === "pending" ? "badge-amber" :
                    order.status === "processing" ? "badge-blue" :
                    "badge-red"
                  )}>
                    {t(`common.${order.status}`) || order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bank Accounts */}
        <div className="glass-card p-5 animate-fade-in-up stagger-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">{t("nav.bank_accounts")}</h3>
            <Link href="/accounting/bank-accounts" className="text-xs text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1">
              {t("common.view_all")} <ChevronRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {bankAccounts.map((acc) => (
              <div key={acc.id} className="p-3 rounded-xl bg-white/03 hover:bg-white/05 transition-colors border border-white/04">
                <div className="flex items-start justify-between mb-2">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white/85 truncate">{acc.bank}</p>
                    <p className="text-xs text-white/35 mt-0.5">{acc.type === "cash" ? "Cash in Hand" : acc.branch}</p>
                  </div>
                  <span className={cn("badge text-[9px]",
                    acc.type === "current" ? "badge-blue" :
                    acc.type === "savings" ? "badge-green" :
                    "badge-amber"
                  )}>
                    {acc.type}
                  </span>
                </div>
                <p className="text-base font-bold gradient-text">৳{acc.balance.toLocaleString()}</p>
                <div className="mt-2 progress-bar">
                  <div
                    className="progress-fill bg-sky-400 opacity-50"
                    style={{ width: `${(acc.balance / totalCash) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sales by Category + Sales Targets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sales by Category */}
        <div className="glass-card p-5 animate-fade-in-up stagger-1">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">{t("dashboard.sales_by_category")}</h3>
              <p className="text-xs text-white/35 mt-0.5">This month's breakdown</p>
            </div>
          </div>
          <div className="space-y-3">
            {salesByCategory.map((cat, idx) => {
              const colors = ["#38bdf8", "#34d399", "#fbbf24", "#a78bfa", "#94a3b8"];
              return (
                <div key={cat.category}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[idx] }} />
                      <span className="text-xs text-white/65 font-medium">{cat.category}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-white/80">৳{(cat.sales / 1000).toFixed(0)}K</span>
                      <span className="text-xs text-white/35 w-8 text-end">{cat.percentage}%</span>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${cat.percentage}%`, backgroundColor: colors[idx] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats / KPIs */}
        <div className="glass-card p-5 animate-fade-in-up stagger-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">{t("dashboard.kpi_overview")}</h3>
              <p className="text-xs text-white/35 mt-0.5">Key performance indicators</p>
            </div>
            <Target size={16} className="text-sky-400" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Gross Margin", value: "41.7%", icon: <TrendingUp size={15} />, color: "text-emerald-400 bg-emerald-400/10", change: "+2.1%" },
              { label: "Avg Order Value", value: "৳47K", icon: <ShoppingBag size={15} />, color: "text-sky-400 bg-sky-400/10", change: "+5.8%" },
              { label: "Active Customers", value: "6 / 7", icon: <Users size={15} />, color: "text-purple-400 bg-purple-400/10", change: "85.7%" },
              { label: "Stock Turnover", value: "12.4x", icon: <Package size={15} />, color: "text-amber-400 bg-amber-400/10", change: "+0.8x" },
              { label: "Pending Orders", value: "2", icon: <Clock size={15} />, color: "text-red-400 bg-red-400/10", change: "↓1 today" },
              { label: "Payroll This Mo.", value: "৳182K", icon: <CreditCard size={15} />, color: "text-indigo-400 bg-indigo-400/10", change: "7 staff" },
            ].map((kpi) => (
              <div key={kpi.label} className="p-3 rounded-xl bg-white/03 hover:bg-white/05 transition-colors border border-white/04">
                <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center mb-2", kpi.color)}>
                  {kpi.icon}
                </div>
                <p className="text-sm font-bold text-white leading-tight">{kpi.value}</p>
                <p className="text-xs text-white/40 mt-0.5">{kpi.label}</p>
                <p className="text-xs text-sky-400/70 mt-1">{kpi.change}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
