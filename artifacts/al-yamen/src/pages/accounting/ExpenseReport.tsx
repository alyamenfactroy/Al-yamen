import { useLanguage } from "@/contexts/LanguageContext";
import { categoryExpenses, monthlyData } from "@/data/sampleData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { BarChart3 } from "lucide-react";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel rounded-xl p-3 border border-white/10 text-xs">
        <p className="text-white/60 mb-1">{label}</p>
        {payload.map((e: any, i: number) => (
          <p key={i} style={{ color: e.color }}>৳{e.value?.toLocaleString()}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ExpenseReport() {
  const { t } = useLanguage();
  const totalExpense = categoryExpenses.reduce((a, b) => a + b.value, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 size={16} className="text-sky-400" />
            Monthly Expenses
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `৳${v / 1000}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="expense" fill="#f87171" radius={[4, 4, 0, 0]} name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Category Breakdown</h3>
          <div className="space-y-3">
            {categoryExpenses.map((cat) => (
              <div key={cat.name} data-testid={`expense-cat-${cat.name}`}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/60 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                    {cat.name}
                  </span>
                  <span style={{ color: cat.color }} className="font-semibold">৳{cat.value.toLocaleString()}</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full transition-all" style={{ width: `${(cat.value / totalExpense) * 100}%`, backgroundColor: cat.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex justify-between text-sm">
            <span className="text-white/50">Total</span>
            <span className="font-bold text-red-400">৳{totalExpense.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
