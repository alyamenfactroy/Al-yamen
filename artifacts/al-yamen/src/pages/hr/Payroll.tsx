import { useLanguage } from "@/contexts/LanguageContext";
import { sampleEmployees } from "@/data/sampleData";
import { Receipt, Download } from "lucide-react";

export default function Payroll() {
  const { t } = useLanguage();
  const total = sampleEmployees.reduce((a, e) => a + e.salary, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-4 border border-sky-500/20">
          <p className="text-xs text-white/50 mb-1">Total Payroll</p>
          <p className="text-xl font-bold text-sky-400">৳{total.toLocaleString()}</p>
        </div>
        <div className="glass-card p-4 border border-emerald-500/20">
          <p className="text-xs text-white/50 mb-1">Active Employees</p>
          <p className="text-xl font-bold text-emerald-400">{sampleEmployees.filter(e => e.status === "active").length}</p>
        </div>
        <div className="glass-card p-4 border border-amber-500/20">
          <p className="text-xs text-white/50 mb-1">Month</p>
          <p className="text-xl font-bold text-amber-400">January 2024</p>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Receipt size={16} className="text-sky-400" />
            {t("nav.payroll")}
          </h3>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white/60 hover:text-white hover:bg-white/10 transition-colors" data-testid="button-export-payroll">
            <Download size={12} />
            {t("common.export")}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-start py-3 px-4 text-xs font-medium text-white/40">Employee</th>
                <th className="text-start py-3 px-4 text-xs font-medium text-white/40">{t("common.department")}</th>
                <th className="text-start py-3 px-4 text-xs font-medium text-white/40">{t("common.position")}</th>
                <th className="text-end py-3 px-4 text-xs font-medium text-white/40">Basic Salary</th>
                <th className="text-end py-3 px-4 text-xs font-medium text-white/40">Bonus</th>
                <th className="text-end py-3 px-4 text-xs font-medium text-white/40">Net Pay</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-white/40">{t("common.status")}</th>
              </tr>
            </thead>
            <tbody>
              {sampleEmployees.map(emp => (
                <tr key={emp.id} className="border-b border-white/3 hover:bg-white/3 transition-colors" data-testid={`row-payroll-${emp.id}`}>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-purple-500/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-purple-400">{emp.name[0]}</span>
                      </div>
                      <span className="text-xs text-white">{emp.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-white/50 text-xs">{emp.department}</td>
                  <td className="py-3 px-4 text-white/50 text-xs">{emp.position}</td>
                  <td className="py-3 px-4 text-end text-white text-xs">৳{emp.salary.toLocaleString()}</td>
                  <td className="py-3 px-4 text-end text-emerald-400 text-xs">৳{Math.floor(emp.salary * 0.1).toLocaleString()}</td>
                  <td className="py-3 px-4 text-end text-sky-400 font-semibold text-sm">৳{(emp.salary + Math.floor(emp.salary * 0.1)).toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">Paid</span>
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
