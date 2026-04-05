import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Package, PlusCircle } from "lucide-react";

export default function AddProduct() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-card p-6">
        <h2 className="text-base font-bold text-white mb-6 flex items-center gap-2">
          <Package size={18} className="text-sky-400" />
          {t("inventory.add_product")}
        </h2>

        {submitted && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
            ✓ Product added successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs text-white/50 mb-1.5 block">{t("inventory.product_name")}</label>
              <input type="text" placeholder="Product name..." className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-sky-400/50 transition-colors" data-testid="input-product-name" />
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1.5 block">{t("inventory.sku")}</label>
              <input type="text" placeholder="SKU-000" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-sky-400/50 transition-colors" data-testid="input-sku" />
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1.5 block">{t("common.category")}</label>
              <input type="text" placeholder="Category..." className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-sky-400/50 transition-colors" data-testid="input-category" />
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1.5 block">{t("common.price")} (৳)</label>
              <input type="number" placeholder="0.00" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-sky-400/50 transition-colors" data-testid="input-price" />
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1.5 block">{t("inventory.unit")}</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-sky-400/50 transition-colors" data-testid="select-unit">
                <option value="Piece" className="bg-[#0d1526]">Piece</option>
                <option value="Bag" className="bg-[#0d1526]">Bag</option>
                <option value="Box" className="bg-[#0d1526]">Box</option>
                <option value="Bottle" className="bg-[#0d1526]">Bottle</option>
                <option value="Pack" className="bg-[#0d1526]">Pack</option>
                <option value="Kg" className="bg-[#0d1526]">Kg</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1.5 block">{t("inventory.current_stock")}</label>
              <input type="number" placeholder="0" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-sky-400/50 transition-colors" data-testid="input-stock" />
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1.5 block">{t("inventory.min_stock")}</label>
              <input type="number" placeholder="0" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-sky-400/50 transition-colors" data-testid="input-min-stock" />
            </div>
            <div className="col-span-2">
              <label className="text-xs text-white/50 mb-1.5 block">{t("common.description")}</label>
              <textarea rows={3} placeholder="Product description..." className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-sky-400/50 transition-colors resize-none" data-testid="input-product-description" />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="flex-1 py-2.5 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-xl text-sm transition-colors" data-testid="button-save-product">
              {t("common.save")}
            </button>
            <button type="button" className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white/70 rounded-xl text-sm transition-colors" data-testid="button-cancel-product">
              {t("common.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
