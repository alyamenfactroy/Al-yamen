import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { PlusCircle, ArrowUpRight, ArrowDownRight, ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AddTransaction() {
  const { t } = useLanguage();
  const [type, setType] = useState<"income" | "expense" | "transfer">("income");
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
          <PlusCircle size={18} className="text-sky-400" />
          {t("transactions.add_new")}
        </h2>

        {submitted && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
            ✓ Transaction added successfully!
          </div>
        )}

        {/* Type Selector */}
        <div className="flex gap-2 mb-6">
          {(["income", "expense", "transfer"] as const).map((tp) => (
            <button
              key={tp}
              onClick={() => setType(tp)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all border",
                type === tp
                  ? tp === "income" ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                    : tp === "expense" ? "bg-red-500/15 border-red-500/30 text-red-400"
                    : "bg-sky-500/15 border-sky-500/30 text-sky-400"
                  : "bg-white/3 border-white/10 text-white/40 hover:bg-white/5"
              )}
              data-testid={`button-type-${tp}`}
            >
              {tp === "income" ? <ArrowUpRight size={14} /> : tp === "expense" ? <ArrowDownRight size={14} /> : <ArrowLeftRight size={14} />}
              {t(`transactions.${tp}`)}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white/50 mb-1.5 block">{t("common.amount")} (৳)</label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-sky-400/50 transition-colors"
                data-testid="input-amount"
              />
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1.5 block">{t("common.date")}</label>
              <input
                type="date"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-sky-400/50 transition-colors"
                data-testid="input-date"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-white/50 mb-1.5 block">{t("common.category")}</label>
            <select className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-sky-400/50 transition-colors" data-testid="select-category">
              <option value="" className="bg-[#0d1526]">Select category</option>
              <option value="sales" className="bg-[#0d1526]">Sales</option>
              <option value="service" className="bg-[#0d1526]">Service</option>
              <option value="rent" className="bg-[#0d1526]">Rent</option>
              <option value="utilities" className="bg-[#0d1526]">Utilities</option>
              <option value="salaries" className="bg-[#0d1526]">Salaries</option>
              <option value="supplies" className="bg-[#0d1526]">Supplies</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-white/50 mb-1.5 block">{t("common.description")}</label>
            <input
              type="text"
              placeholder="Transaction description..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-sky-400/50 transition-colors"
              data-testid="input-description"
            />
          </div>

          <div>
            <label className="text-xs text-white/50 mb-1.5 block">{t("transactions.reference")}</label>
            <input
              type="text"
              placeholder="TXN-XXX"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-sky-400/50 transition-colors"
              data-testid="input-reference"
            />
          </div>

          <div>
            <label className="text-xs text-white/50 mb-1.5 block">{t("transactions.notes")}</label>
            <textarea
              rows={3}
              placeholder="Additional notes..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-sky-400/50 transition-colors resize-none"
              data-testid="input-notes"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="flex-1 py-2.5 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-xl text-sm transition-colors" data-testid="button-submit">
              {t("common.save")}
            </button>
            <button type="button" className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white/70 rounded-xl text-sm transition-colors" data-testid="button-cancel">
              {t("common.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
