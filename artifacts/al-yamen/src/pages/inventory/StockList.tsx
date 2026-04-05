import { useLanguage } from "@/contexts/LanguageContext";
import { sampleProducts } from "@/data/sampleData";
import { cn } from "@/lib/utils";
import { Package, Search, AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function StockList() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");

  const filtered = sampleProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const lowStock = sampleProducts.filter(p => p.status === "low_stock").length;
  const outOfStock = sampleProducts.filter(p => p.status === "out_of_stock").length;

  return (
    <div className="space-y-4">
      {(lowStock > 0 || outOfStock > 0) && (
        <div className="flex flex-wrap gap-3">
          {lowStock > 0 && (
            <div className="glass-card p-3 border border-amber-500/30 flex items-center gap-2 text-sm text-amber-400">
              <AlertTriangle size={14} />
              {lowStock} {t("inventory.low_stock")}
            </div>
          )}
          {outOfStock > 0 && (
            <div className="glass-card p-3 border border-red-500/30 flex items-center gap-2 text-sm text-red-400">
              <AlertTriangle size={14} />
              {outOfStock} {t("inventory.out_of_stock")}
            </div>
          )}
        </div>
      )}

      <div className="glass-card p-4 flex gap-3">
        <div className="flex-1 relative">
          <Search size={14} className="absolute start-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input type="search" placeholder={t("common.search")} value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl ps-9 pe-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-sky-400/40 transition-colors"
            data-testid="input-search-products" />
        </div>
        <button className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium rounded-xl transition-colors" data-testid="button-add-product">
          + {t("nav.add_product")}
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-start py-3 px-4 text-xs font-medium text-white/40">SKU</th>
                <th className="text-start py-3 px-4 text-xs font-medium text-white/40">{t("inventory.product_name")}</th>
                <th className="text-start py-3 px-4 text-xs font-medium text-white/40">{t("common.category")}</th>
                <th className="text-end py-3 px-4 text-xs font-medium text-white/40">{t("common.price")}</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-white/40">{t("inventory.current_stock")}</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-white/40">{t("common.status")}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-white/3 hover:bg-white/3 transition-colors" data-testid={`row-product-${p.id}`}>
                  <td className="py-3 px-4 font-mono text-xs text-white/40">{p.sku}</td>
                  <td className="py-3 px-4 text-white text-xs font-medium">{p.name}</td>
                  <td className="py-3 px-4 text-white/50 text-xs">{p.category}</td>
                  <td className="py-3 px-4 text-end text-sky-400 font-semibold text-xs">৳{p.price.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={cn("text-sm font-bold",
                      p.stock === 0 ? "text-red-400" :
                      p.stock < p.minStock ? "text-amber-400" : "text-emerald-400")}>
                      {p.stock}
                    </span>
                    <span className="text-white/30 text-xs"> / {p.unit}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full",
                      p.status === "active" ? "bg-emerald-500/10 text-emerald-400" :
                      p.status === "low_stock" ? "bg-amber-500/10 text-amber-400" :
                      "bg-red-500/10 text-red-400")}>
                      {p.status === "active" ? t("common.active") :
                       p.status === "low_stock" ? t("inventory.low_stock") : t("inventory.out_of_stock")}
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
