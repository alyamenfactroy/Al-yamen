import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Layout from "@/components/layout/Layout";

// Pages — Core
import Dashboard from "@/pages/Dashboard";
import AddTransaction from "@/pages/transactions/AddTransaction";
import AllTransactions from "@/pages/transactions/AllTransactions";
import RecentTransactions from "@/pages/transactions/RecentTransactions";

// Pages — Sales
import NewOrder from "@/pages/sales/NewOrder";
import OrderHistory from "@/pages/sales/OrderHistory";
import Customers from "@/pages/sales/Customers";

// Pages — Purchase (NEW)
import NewPurchase from "@/pages/purchase/NewPurchase";
import PurchaseHistory from "@/pages/purchase/PurchaseHistory";
import Suppliers from "@/pages/purchase/Suppliers";

// Pages — Inventory
import AddProduct from "@/pages/inventory/AddProduct";
import AddCompany from "@/pages/inventory/AddCompany";
import StockList from "@/pages/inventory/StockList";
import Categories from "@/pages/inventory/Categories";

// Pages — HR
import Employees from "@/pages/hr/Employees";
import Payroll from "@/pages/hr/Payroll";
import Attendance from "@/pages/hr/Attendance";

// Pages — CRM (NEW)
import Loyalty from "@/pages/crm/Loyalty";

// Pages — Accounting
import DailyLedger from "@/pages/accounting/DailyLedger";
import ExpenseReport from "@/pages/accounting/ExpenseReport";
import BankAccounts from "@/pages/accounting/BankAccounts";

// Pages — Reports (NEW)
import ProfitLoss from "@/pages/reports/ProfitLoss";
import SalesReport from "@/pages/reports/SalesReport";
import StockReport from "@/pages/reports/StockReport";

// Pages — Settings
import SystemConfig from "@/pages/settings/SystemConfig";
import UserRoles from "@/pages/settings/UserRoles";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />

        {/* Transactions */}
        <Route path="/transactions/add" component={AddTransaction} />
        <Route path="/transactions/all" component={AllTransactions} />
        <Route path="/transactions/recent" component={RecentTransactions} />

        {/* Sales */}
        <Route path="/sales/new-order" component={NewOrder} />
        <Route path="/sales/order-history" component={OrderHistory} />
        <Route path="/sales/customers" component={Customers} />

        {/* Purchase */}
        <Route path="/purchase/new" component={NewPurchase} />
        <Route path="/purchase/history" component={PurchaseHistory} />
        <Route path="/purchase/suppliers" component={Suppliers} />

        {/* Inventory */}
        <Route path="/inventory/add-product" component={AddProduct} />
        <Route path="/inventory/add-company" component={AddCompany} />
        <Route path="/inventory/stock-list" component={StockList} />
        <Route path="/inventory/categories" component={Categories} />

        {/* HR */}
        <Route path="/hr/employees" component={Employees} />
        <Route path="/hr/payroll" component={Payroll} />
        <Route path="/hr/attendance" component={Attendance} />

        {/* CRM */}
        <Route path="/crm/customers" component={Customers} />
        <Route path="/crm/loyalty" component={Loyalty} />

        {/* Accounting */}
        <Route path="/accounting/daily-ledger" component={DailyLedger} />
        <Route path="/accounting/expense-report" component={ExpenseReport} />
        <Route path="/accounting/bank-accounts" component={BankAccounts} />

        {/* Reports */}
        <Route path="/reports/profit-loss" component={ProfitLoss} />
        <Route path="/reports/sales-report" component={SalesReport} />
        <Route path="/reports/stock-report" component={StockReport} />

        {/* Settings */}
        <Route path="/settings/system" component={SystemConfig} />
        <Route path="/settings/user-roles" component={UserRoles} />

        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
