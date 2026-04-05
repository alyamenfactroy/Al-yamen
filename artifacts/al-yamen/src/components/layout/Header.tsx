import { Menu, Bell, Globe } from "lucide-react";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onMenuClick: () => void;
  pageTitle: string;
}

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "bn", label: "বাংলা", flag: "🇧🇩" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
];

export default function Header({ onMenuClick, pageTitle }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);

  const current = languages.find(l => l.code === language);

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-white/5 glass-panel sticky top-0 z-30">
      {/* Left: Menu + Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
          data-testid="button-mobile-menu"
        >
          <Menu size={20} />
        </button>
        <h2 className="text-base font-semibold text-white">{pageTitle}</h2>
      </div>

      {/* Right: Language + Notifications */}
      <div className="flex items-center gap-2">
        {/* Language Switcher */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg glass-card hover:bg-white/10 transition-all text-white/80 hover:text-white text-sm"
            data-testid="button-language-switcher"
          >
            <Globe size={15} className="text-sky-400" />
            <span className="hidden sm:inline">{current?.flag} {current?.label}</span>
            <span className="sm:hidden">{current?.flag}</span>
          </button>

          {langOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
              <div className="absolute end-0 top-12 z-50 min-w-[140px] glass-panel rounded-xl overflow-hidden shadow-2xl border border-white/10">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors text-start",
                      language === lang.code
                        ? "bg-sky-400/10 text-sky-400"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    )}
                    data-testid={`button-lang-${lang.code}`}
                  >
                    <span>{lang.flag}</span>
                    <span className="font-medium">{lang.label}</span>
                    {language === lang.code && (
                      <span className="ms-auto w-1.5 h-1.5 rounded-full bg-sky-400" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-lg glass-card hover:bg-white/10 transition-all text-white/60 hover:text-white"
          data-testid="button-notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 end-1.5 w-2 h-2 rounded-full bg-sky-400 ring-1 ring-background" />
        </button>
      </div>
    </header>
  );
}
