import { useLanguage } from "@/contexts/LanguageContext";
import { sampleAttendance } from "@/data/sampleData";
import { cn } from "@/lib/utils";
import { Clock, UserCheck, UserX } from "lucide-react";

export default function Attendance() {
  const { t } = useLanguage();
  const present = sampleAttendance.filter(a => a.status === "present").length;
  const absent = sampleAttendance.filter(a => a.status === "absent").length;
  const leave = sampleAttendance.filter(a => a.status === "leave").length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-4 border border-emerald-500/20">
          <div className="flex items-center gap-2 mb-1">
            <UserCheck size={14} className="text-emerald-400" />
            <p className="text-xs text-white/50">{t("hr.present")}</p>
          </div>
          <p className="text-2xl font-bold text-emerald-400">{present}</p>
        </div>
        <div className="glass-card p-4 border border-red-500/20">
          <div className="flex items-center gap-2 mb-1">
            <UserX size={14} className="text-red-400" />
            <p className="text-xs text-white/50">{t("hr.absent")}</p>
          </div>
          <p className="text-2xl font-bold text-red-400">{absent}</p>
        </div>
        <div className="glass-card p-4 border border-amber-500/20">
          <div className="flex items-center gap-2 mb-1">
            <Clock size={14} className="text-amber-400" />
            <p className="text-xs text-white/50">{t("hr.leave")}</p>
          </div>
          <p className="text-2xl font-bold text-amber-400">{leave}</p>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/5">
          <h3 className="text-sm font-semibold text-white">Attendance — January 15, 2024</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-start py-3 px-4 text-xs font-medium text-white/40">Employee</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-white/40">Check In</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-white/40">Check Out</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-white/40">{t("common.status")}</th>
              </tr>
            </thead>
            <tbody>
              {sampleAttendance.map((att, i) => (
                <tr key={i} className="border-b border-white/3 hover:bg-white/3 transition-colors" data-testid={`row-attendance-${att.employeeId}`}>
                  <td className="py-3 px-4 text-white text-xs font-medium">{att.employeeName}</td>
                  <td className="py-3 px-4 text-center text-white/60 text-xs font-mono">{att.checkIn}</td>
                  <td className="py-3 px-4 text-center text-white/60 text-xs font-mono">{att.checkOut}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full",
                      att.status === "present" ? "bg-emerald-500/10 text-emerald-400" :
                      att.status === "absent" ? "bg-red-500/10 text-red-400" :
                      "bg-amber-500/10 text-amber-400")}>
                      {att.status === "present" ? t("hr.present") : att.status === "absent" ? t("hr.absent") : t("hr.leave")}
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
