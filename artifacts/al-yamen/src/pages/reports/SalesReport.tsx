import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { sampleOrders, monthlyData, salesByCategory, topProducts } from "@/data/sampleData";
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Download, ShoppingBag, TrendingUp, Users, DollarSign, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const COLORS = ["#38bdf8", "#34d399", "#fbbf24", "#a78bfa", "#94a3b8"];

export default function SalesReport() {
  const { t } = useLanguage();

  const totalSales = monthlyData.reduce((a, b) => a + b.revenue, 0);
  const totalOrders = sampleOrders.length;
  const avgOrderValue = Math.round(totalSales / 7 / totalOrders);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="glass-panel rounded-xl p-3 border border-white/10 text-xs">
        <p className="text-white/50 mb-1">{label}</p>
        <p className="text-sky-400 font-semibold">৳{payload[0]?.value?.toLocaleString()}</p>
      </div>
    );
  };

  return (
    <div className="space-y-5 page-enter">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-base font-bold text-white">{t("nav.sales_report")}</h1>
          <p className="text-xs text-white/40 mt-0.5">Sales performance — July 2023 to January 2024</p>
        </div>
        <button className="btn-secondary"><Download size={14} /> Export</button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {[
          { label: "Total Revenue", value: `৳${(totalSales/1000).toFixed(0)}K`, icon: <DollarSign size={16} />, color: "text-sky-400 bg-sky-400/10" },
          { label: "Total Orders", value: totalOrders, icon: <ShoppingBag size={16} />, color: "text-purple-400 bg-purple-400/10" },
          { label: "Avg Order Value", value: `৳${avgOrderValue.toLocaleString()}`, icon: <TrendingUp size={16} />, color: "text-emerald-400 bg-emerald-400/10" },
          { label: "Active Customers", value: 6, icon: <Users size={16} />, color: "text-amber-400 bg-amber-400/10" },
        ].map(card => (
          <div key={card.label} className="glass-card p-4 stat-card">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-3", card.color)}>{card.icon}</div>
            <p className="text-xl font-bold text-white">{card.value}</p>
            <p className="text-xs text-white/40 mt-0.5">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Trend */}
        <div className="lg:col-span-2 glass-card p-5">
          <h3 className="text-sm font-bold text-white mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `৳${v/1000}K`} width={45} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#38bdf8" strokeWidth={2.5} fill="url(#salesGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by Category Pie */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-bold text-white mb-3">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={salesByCategory} cx="50%" cy="50%" outerRadius={65} paddingAngle={3} dataKey="sales" strokeWidth={0}>
                {salesByCategory.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip formatter={(v: any) => `৳${v.toLocaleString()}`} contentStyle={{ background: "rgba(10,15,30,0.95)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", fontSize: "11px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {salesByCategory.map((cat, i) => (
              <div key={cat.category} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-xs text-white/55 flex-1 truncate">{cat.category}</span>
                <span className="text-xs font-semibold text-white/70">{cat.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products + Orders Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Products */}
        <div className="glass-card overflow-hidden">
          <div className="p-4 border-b border-white/05">
            <h3 className="text-sm font-bold text-white">Top Selling Products</h3>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th className="text-start">#</th>
                <th className="text-start">Product</th>
                <th className="text-center">Sales</th>
                <th className="text-end">Revenue</th>
                <th className="text-center">Growth</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p, i) => (
                <tr key={p.name}>
                  <td className="text-white/30 font-mono text-xs">{i + 1}</td>
                  <td className="font-semibold text-white/80">{p.name}</td>
                  <td className="text-center text-white/55">{p.sales}</td>
                  <td className="text-end font-bold text-white/80">৳{p.revenue.toLocaleString()}</td>
                  <td className="text-center">
                    <span className={cn("badge text-xs", p.growth >= 0 ? "badge-green" : "badge-red")}>
                      {p.growth >= 0 ? "+" : ""}{p.growth}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Orders */}
        <div className="glass-card overflow-hidden">
          <div className="p-4 border-b border-white/05">
            <h3 className="text-sm font-bold text-white">Recent Orders</h3>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th className="text-start">Order ID</th>
                <th className="text-start">Customer</th>
                <th className="text-end">Total</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {sampleOrders.map(o => (
                <tr key={o.id}>
                  <td className="font-mono text-sky-400/70 text-xs">{o.id}</td>
                  <td className="font-semibold text-white/80">{o.customer}</td>
                  <td className="text-end font-bold text-white/80">৳{o.total.toLocaleString()}</td>
                  <td className="text-center">
                    <span className={cn("badge text-xs",
                      o.status === "completed" ? "badge-green" :
                      o.status === "pending" ? "badge-amber" :
                      o.status === "processing" ? "badge-blue" : "badge-red"
                    )}>{o.status}</span>
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
