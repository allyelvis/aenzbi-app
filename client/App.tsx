import { useState } from "react";
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

type PageType = "dashboard" | "customers" | "products" | "sales" | "leads" | "expenses" | "tasks" | "inventory" | "reports";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");

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
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 overflow-auto p-6">
        {renderPage()}
      </main>
    </div>
  );
}
