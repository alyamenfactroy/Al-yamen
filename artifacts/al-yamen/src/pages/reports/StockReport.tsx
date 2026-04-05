import { useLanguage } from "@/contexts/LanguageContext";
import { sampleProducts } from "@/data/sampleData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Download, Package, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StockReport() {
  const { t } = useLanguage();

  const stockChartData = sampleProducts.map(p => ({
    name: p.name.split("(")[0].trim(),
    stock: p.stock,
    minStock: p.minStock,
  }));

  const totalItems = sampleProducts.reduce((a, b) => a + b.stock, 0);
  const totalValue = sampleProducts.reduce((a, b) => a + b.stock * b.price, 0);
  const lowStock = sampleProducts.filter(p => p.status === "low_stock").length;
  const outOfStock = sampleProducts.filter(p => p.status === "out_of_stock").length;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="glass-panel rounded-xl p-3 border border-white/10 text-xs">
        <p className="text-white/50 mb-1">{label}</p>
        <p className="text-sky-400 font-semibold">Stock: {payload[0]?.value}</p>
        <p className="text-amber-400 font-semibold">Min: {payload[1]?.value}</p>
      </div>
    );
  };

  return (
    <div className="space-y-5 page-enter">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-base font-bold text-white">{t("nav.stock_report")}</h1>
          <p className="text-xs text-white/40 mt-0.5">Current inventory status & valuation</p>
        </div>
        <button className="btn-secondary"><Download size={14} /> Export</button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {[
          { label: "Total Stock Items", value: totalItems, icon: <Package size={16} />, color: "text-sky-400 bg-sky-400/10" },
          { label: "Stock Value", value: `৳${(totalValue/1000).toFixed(0)}K`, icon: <CheckCircle size={16} />, color: "text-emerald-400 bg-emerald-400/10" },
          { label: "Low Stock", value: lowStock, icon: <AlertTriangle size={16} />, color: "text-amber-400 bg-amber-400/10" },
          { label: "Out of Stock", value: outOfStock, icon: <XCircle size={16} />, color: "text-red-400 bg-red-400/10" },
        ].map(c => (
          <div key={c.label} className="glass-card p-4 stat-card">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-3", c.color)}>{c.icon}</div>
            <p className="text-xl font-bold text-white">{c.value}</p>
            <p className="text-xs text-white/40 mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-bold text-white mb-4">Stock vs Minimum Level</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={stockChartData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="stock" name="Current Stock" radius={[5, 5, 0, 0]}>
              {sampleProducts.map((p, i) => (
                <Cell key={i} fill={
                  p.status === "out_of_stock" ? "rgba(248,113,113,0.6)" :
                  p.status === "low_stock" ? "rgba(251,191,36,0.6)" :
                  "rgba(56,189,248,0.6)"
                } />
              ))}
            </Bar>
            <Bar dataKey="minStock" name="Min Required" fill="rgba(255,255,255,0.12)" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Product Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/05">
          <h3 className="text-sm font-bold text-white">Inventory Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="text-start">Product</th>
                <th className="text-start">SKU</th>
                <th className="text-center">Category</th>
                <th className="text-center">Stock</th>
                <th className="text-center">Min Stock</th>
                <th className="text-end">Unit Price</th>
                <th className="text-end">Value</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {sampleProducts.map((p) => (
                <tr key={p.id}>
                  <td className="font-semibold text-white/85">{p.name}</td>
                  <td className="font-mono text-xs text-sky-400/70">{p.sku}</td>
                  <td className="text-center text-white/55">{p.category}</td>
                  <td className="text-center">
                    <span className={cn("font-bold", p.stock === 0 ? "text-red-400" : p.stock < p.minStock ? "text-amber-400" : "text-white/80")}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="text-center text-white/45">{p.minStock}</td>
                  <td className="text-end font-medium text-white/75">৳{p.price.toLocaleString()}</td>
                  <td className="text-end font-bold text-white/85">৳{(p.stock * p.price).toLocaleString()}</td>
                  <td className="text-center">
                    <span className={cn("badge text-xs",
                      p.status === "active" ? "badge-green" :
                      p.status === "low_stock" ? "badge-amber" :
                      "badge-red"
                    )}>
                      {p.status === "out_of_stock" ? "Out of Stock" :
                       p.status === "low_stock" ? "Low Stock" : "In Stock"}
                    </span>
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
