import { useLanguage } from "@/contexts/LanguageContext";
import { Tag, Plus } from "lucide-react";

const categories = [
  { name: "Food Grain", count: 8, color: "#38bdf8" },
  { name: "Cooking Oil", count: 5, color: "#34d399" },
  { name: "Sugar & Salt", count: 3, color: "#fbbf24" },
  { name: "Flour", count: 4, color: "#a78bfa" },
  { name: "Pulses", count: 6, color: "#f87171" },
  { name: "Condiments", count: 12, color: "#fb923c" },
];

export default function Categories() {
  const { t } = useLanguage();
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium rounded-xl transition-colors" data-testid="button-add-category">
          <Plus size={14} />
          Add Category
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.name} className="glass-card p-5 hover:border-sky-400/20 transition-all cursor-pointer" data-testid={`card-category-${cat.name}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cat.color}20` }}>
                <Tag size={18} style={{ color: cat.color }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{cat.name}</p>
                <p className="text-xs text-white/40">{cat.count} products</p>
              </div>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1.5">
              <div className="h-1.5 rounded-full" style={{ width: `${(cat.count / 12) * 100}%`, backgroundColor: cat.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
