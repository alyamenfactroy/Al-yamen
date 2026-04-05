import { useLanguage } from "@/contexts/LanguageContext";
import { sampleEmployees } from "@/data/sampleData";
import { cn } from "@/lib/utils";
import { Users, Search, Phone, Mail, Plus } from "lucide-react";
import { useState } from "react";

export default function Employees() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");

  const filtered = sampleEmployees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="glass-card p-4 flex gap-3">
        <div className="flex-1 relative">
          <Search size={14} className="absolute start-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input type="search" placeholder={t("common.search")} value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl ps-9 pe-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-sky-400/40 transition-colors"
            data-testid="input-search-employees" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium rounded-xl transition-colors" data-testid="button-add-employee">
          <Plus size={14} />
          {t("hr.add_employee")}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(emp => (
          <div key={emp.id} className="glass-card p-4 hover:border-sky-400/20 transition-all" data-testid={`card-employee-${emp.id}`}>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400/20 to-sky-500/20 flex items-center justify-center flex-shrink-0 border border-white/10">
                <span className="text-sm font-bold text-purple-400">{emp.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{emp.name}</p>
                <p className="text-xs text-sky-400">{emp.position}</p>
                <p className="text-xs text-white/40">{emp.department}</p>
              </div>
              <span className={cn("text-xs px-2 py-0.5 rounded-full flex-shrink-0",
                emp.status === "active" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400")}>
                {t(`common.${emp.status}`)}
              </span>
            </div>
            <div className="space-y-1.5 mb-3">
              <div className="flex items-center gap-2 text-xs text-white/50">
                <Phone size={11} />
                <span>{emp.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/50">
                <Mail size={11} />
                <span className="truncate">{emp.email}</span>
              </div>
            </div>
            <div className="flex justify-between pt-3 border-t border-white/5">
              <div>
                <p className="text-xs text-white/40">{t("common.salary")}</p>
                <p className="text-sm font-bold text-emerald-400">৳{emp.salary.toLocaleString()}</p>
              </div>
              <div className="text-end">
                <p className="text-xs text-white/40">ID</p>
                <p className="text-xs font-mono text-white/60">{emp.id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
