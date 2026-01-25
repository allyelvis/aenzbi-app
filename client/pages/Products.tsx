import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Search, Package, AlertTriangle } from "lucide-react";
import { apiRequest } from "../lib/queryClient";
import { formatCurrency } from "../lib/utils";

interface Product {
  id: number;
  sku: string;
  name: string;
  description: string | null;
  costPrice: string;
  sellingPrice: string;
  stockQuantity: number;
  reorderLevel: number;
  unit: string;
  isActive: boolean;
}

export default function Products() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    description: "",
    costPrice: "",
    sellingPrice: "",
    stockQuantity: 0,
    reorderLevel: 10,
    unit: "pcs",
  });

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await apiRequest("POST", "/api/products", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      setShowForm(false);
      setFormData({
        sku: "",
        name: "",
        description: "",
        costPrice: "",
        sellingPrice: "",
        stockQuantity: 0,
        reorderLevel: 10,
        unit: "pcs",
      });
    },
  });

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
        >
          <Plus className="h-5 w-5" />
          Add Product
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background"
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createMutation.mutate(formData);
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="SKU *"
                value={formData.sku}
                onChange={(e) =>
                  setFormData({ ...formData, sku: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Product Name *"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
                rows={2}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Cost Price"
                  value={formData.costPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, costPrice: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  step="0.01"
                />
                <input
                  type="number"
                  placeholder="Selling Price"
                  value={formData.sellingPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, sellingPrice: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  step="0.01"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="number"
                  placeholder="Stock"
                  value={formData.stockQuantity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stockQuantity: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Reorder Level"
                  value={formData.reorderLevel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      reorderLevel: parseInt(e.target.value) || 10,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Unit"
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
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
                  Save
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
                <th className="px-4 py-3 text-left text-sm font-medium">SKU</th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Cost
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Stock
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm font-mono">{product.sku}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded">
                        <Package className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.description || "No description"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {formatCurrency(product.costPrice)}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">
                    {formatCurrency(product.sellingPrice)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        {product.stockQuantity} {product.unit}
                      </span>
                      {product.stockQuantity <= product.reorderLevel && (
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        product.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    No products found
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
