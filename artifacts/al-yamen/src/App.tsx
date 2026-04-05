import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Layout from "@/components/layout/Layout";

// Pages
import Dashboard from "@/pages/Dashboard";
import AddTransaction from "@/pages/transactions/AddTransaction";
import AllTransactions from "@/pages/transactions/AllTransactions";
import RecentTransactions from "@/pages/transactions/RecentTransactions";
import NewOrder from "@/pages/sales/NewOrder";
import OrderHistory from "@/pages/sales/OrderHistory";
import Customers from "@/pages/sales/Customers";
import AddProduct from "@/pages/inventory/AddProduct";
import AddCompany from "@/pages/inventory/AddCompany";
import StockList from "@/pages/inventory/StockList";
import Categories from "@/pages/inventory/Categories";
import Employees from "@/pages/hr/Employees";
import Payroll from "@/pages/hr/Payroll";
import Attendance from "@/pages/hr/Attendance";
import DailyLedger from "@/pages/accounting/DailyLedger";
import ExpenseReport from "@/pages/accounting/ExpenseReport";
import SystemConfig from "@/pages/settings/SystemConfig";
import UserRoles from "@/pages/settings/UserRoles";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/transactions/add" component={AddTransaction} />
        <Route path="/transactions/all" component={AllTransactions} />
        <Route path="/transactions/recent" component={RecentTransactions} />
        <Route path="/sales/new-order" component={NewOrder} />
        <Route path="/sales/order-history" component={OrderHistory} />
        <Route path="/sales/customers" component={Customers} />
        <Route path="/inventory/add-product" component={AddProduct} />
        <Route path="/inventory/add-company" component={AddCompany} />
        <Route path="/inventory/stock-list" component={StockList} />
        <Route path="/inventory/categories" component={Categories} />
        <Route path="/hr/employees" component={Employees} />
        <Route path="/hr/payroll" component={Payroll} />
        <Route path="/hr/attendance" component={Attendance} />
        <Route path="/accounting/daily-ledger" component={DailyLedger} />
        <Route path="/accounting/expense-report" component={ExpenseReport} />
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
