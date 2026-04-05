import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Building2 } from "lucide-react";

export default function AddCompany() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); setTimeout(() => setSubmitted(false), 3000); };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-card p-6">
        <h2 className="text-base font-bold text-white mb-6 flex items-center gap-2">
          <Building2 size={18} className="text-sky-400" />
          {t("nav.add_company")}
        </h2>
        {submitted && <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">✓ Company added!</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-white/50 mb-1.5 block">Company Name</label>
            <input type="text" placeholder="Company name..." className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-sky-400/50 transition-colors" data-testid="input-company-name" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white/50 mb-1.5 block">{t("common.phone")}</label>
              <input type="tel" placeholder="+880..." className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-sky-400/50 transition-colors" data-testid="input-phone" />
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1.5 block">{t("common.email")}</label>
              <input type="email" placeholder="company@email.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-sky-400/50 transition-colors" data-testid="input-email" />
            </div>
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1.5 block">{t("common.address")}</label>
            <textarea rows={2} placeholder="Company address..." className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-sky-400/50 transition-colors resize-none" data-testid="input-address" />
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1.5 block">Type</label>
            <select className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-sky-400/50 transition-colors" data-testid="select-company-type">
              <option value="supplier" className="bg-[#0d1526]">Supplier</option>
              <option value="distributor" className="bg-[#0d1526]">Distributor</option>
              <option value="manufacturer" className="bg-[#0d1526]">Manufacturer</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="flex-1 py-2.5 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-xl text-sm transition-colors" data-testid="button-save-company">{t("common.save")}</button>
            <button type="button" className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white/70 rounded-xl text-sm transition-colors" data-testid="button-cancel-company">{t("common.cancel")}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
