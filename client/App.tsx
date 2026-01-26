import { useState } from "react";
import { useAuth } from "./hooks/use-auth";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Leads from "./pages/Leads";
import Expenses from "./pages/Expenses";
import Tasks from "./pages/Tasks";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";
import Subscription from "./pages/Subscription";
import Landing from "./pages/Landing";
import POS from "./pages/POS";

type PageType = "dashboard" | "customers" | "products" | "sales" | "leads" | "expenses" | "tasks" | "inventory" | "reports" | "subscription" | "pos";

export default function App() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Landing />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "customers":
        return <Customers />;
      case "products":
        return <Products />;
      case "sales":
        return <Sales />;
      case "leads":
        return <Leads />;
      case "expenses":
        return <Expenses />;
      case "tasks":
        return <Tasks />;
      case "inventory":
        return <Inventory />;
      case "reports":
        return <Reports />;
      case "subscription":
        return <Subscription />;
      case "pos":
        return <POS />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} user={user} />
      <main className="flex-1 overflow-auto p-6">
        {renderPage()}
      </main>
    </div>
  );
}
