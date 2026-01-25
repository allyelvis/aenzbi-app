import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Search, Eye, FileText } from "lucide-react";
import { apiRequest } from "../lib/queryClient";
import { formatCurrency, formatDate } from "../lib/utils";

interface SalesOrder {
  id: number;
  orderNumber: string;
  customerId: number | null;
  status: string;
  subtotal: string;
  taxAmount: string;
  discountAmount: string;
  totalAmount: string;
  notes: string | null;
  createdAt: string;
}

interface Customer {
  id: number;
  name: string;
}

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-yellow-100 text-yellow-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function Sales() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    customerId: "",
    status: "draft",
    totalAmount: "",
    notes: "",
  });

  const { data: orders = [], isLoading } = useQuery<SalesOrder[]>({
    queryKey: ["/api/sales-orders"],
    queryFn: async () => {
      const res = await fetch("/api/sales-orders");
      return res.json();
    },
  });

  const { data: customers = [] } = useQuery<Customer[]>({
    queryKey: ["/api/customers"],
    queryFn: async () => {
      const res = await fetch("/api/customers");
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/sales-orders", {
        ...data,
        customerId: data.customerId ? parseInt(data.customerId) : null,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sales-orders"] });
      setShowForm(false);
      setFormData({ customerId: "", status: "draft", totalAmount: "", notes: "" });
    },
  });

  const filteredOrders = orders.filter((o) =>
    o.orderNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sales Orders</h1>
          <p className="text-muted-foreground">Manage sales and orders</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
        >
          <Plus className="h-5 w-5" />
          New Order
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background"
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">New Sales Order</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createMutation.mutate(formData);
              }}
              className="space-y-4"
            >
              <select
                value={formData.customerId}
                onChange={(e) =>
                  setFormData({ ...formData, customerId: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="">Select Customer (Optional)</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="draft">Draft</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
              <input
                type="number"
                placeholder="Total Amount"
                value={formData.totalAmount}
                onChange={(e) =>
                  setFormData({ ...formData, totalAmount: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
                step="0.01"
              />
              <textarea
                placeholder="Notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
                rows={2}
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
                >
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="bg-card border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Order #
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Subtotal
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">Tax</th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Total
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-muted/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="font-mono">{order.orderNumber}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        statusColors[order.status] || statusColors.draft
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {formatCurrency(order.subtotal)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {formatCurrency(order.taxAmount)}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">
                    {formatCurrency(order.totalAmount)}
                  </td>
                  <td className="px-4 py-3">
                    <button className="p-2 hover:bg-muted rounded">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
