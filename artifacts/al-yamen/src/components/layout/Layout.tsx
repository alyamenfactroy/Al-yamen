import { useState } from "react";
import { useLocation } from "wouter";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useLanguage } from "@/contexts/LanguageContext";

const pageTitles: Record<string, Record<string, string>> = {
  "/": { "nav.dashboard": "/" },
};

function usePageTitle(): string {
  const [location] = useLocation();
  const { t } = useLanguage();

  const titleMap: Record<string, string> = {
    "/": "nav.dashboard",
    "/transactions/add": "nav.add_transaction",
    "/transactions/all": "nav.all_transactions",
    "/transactions/recent": "nav.recent_transactions",
    "/sales/new-order": "nav.new_order",
    "/sales/order-history": "nav.order_history",
    "/sales/customers": "nav.customers",
    "/inventory/add-product": "nav.add_product",
    "/inventory/add-company": "nav.add_company",
    "/inventory/stock-list": "nav.stock_list",
    "/inventory/categories": "nav.categories",
    "/hr/employees": "nav.employees",
    "/hr/payroll": "nav.payroll",
    "/hr/attendance": "nav.attendance",
    "/accounting/daily-ledger": "nav.daily_ledger",
    "/accounting/expense-report": "nav.expense_report",
    "/settings/system": "nav.system_config",
    "/settings/user-roles": "nav.user_roles",
  };

  const key = titleMap[location] || "nav.dashboard";
  return t(key);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pageTitle = usePageTitle();

  return (
    <div className="flex min-h-screen">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setMobileOpen(true)} pageTitle={pageTitle} />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
