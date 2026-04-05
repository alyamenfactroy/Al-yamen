import { useLanguage } from "@/contexts/LanguageContext";
import { Settings, Save } from "lucide-react";
import { useState } from "react";

export default function SystemConfig() {
  const { t } = useLanguage();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="glass-card p-6">
        <h2 className="text-base font-bold text-white mb-6 flex items-center gap-2">
          <Settings size={18} className="text-sky-400" />
          {t("nav.system_config")}
        </h2>

        {saved && <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">✓ Settings saved!</div>}

        <div className="space-y-5">
          <div>
            <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Business Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-white/50 mb-1.5 block">{t("settings.company_name")}</label>
                <input type="text" defaultValue="Al-Yamen Business" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-sky-400/50 transition-colors" data-testid="input-company-name-setting" />
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1.5 block">{t("settings.business_type")}</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-sky-400/50 transition-colors" data-testid="select-business-type">
                  <option className="bg-[#0d1526]">Wholesale Trading</option>
                  <option className="bg-[#0d1526]">Retail</option>
                  <option className="bg-[#0d1526]">Manufacturing</option>
                  <option className="bg-[#0d1526]">Services</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/50 mb-1.5 block">{t("settings.currency")}</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-sky-400/50 transition-colors" data-testid="select-currency">
                    <option className="bg-[#0d1526]">BDT (৳)</option>
                    <option className="bg-[#0d1526]">USD ($)</option>
                    <option className="bg-[#0d1526]">SAR (ر.س)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1.5 block">{t("settings.timezone")}</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-sky-400/50 transition-colors" data-testid="select-timezone">
                    <option className="bg-[#0d1526]">Asia/Dhaka (GMT+6)</option>
                    <option className="bg-[#0d1526]">Asia/Riyadh (GMT+3)</option>
                    <option className="bg-[#0d1526]">UTC (GMT+0)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/5">
            <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">{t("settings.language_settings")}</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { code: "bn", label: "বাংলা", flag: "🇧🇩" },
                { code: "en", label: "English", flag: "🇬🇧" },
                { code: "ar", label: "العربية", flag: "🇸🇦" },
              ].map(l => (
                <div key={l.code} className="flex items-center gap-2 p-3 rounded-xl bg-white/3 border border-white/5">
                  <span>{l.flag}</span>
                  <span className="text-sm text-white">{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-xl text-sm transition-colors"
            data-testid="button-save-settings"
          >
            <Save size={14} />
            {t("common.save")}
          </button>
        </div>
      </div>
    </div>
  );
}
