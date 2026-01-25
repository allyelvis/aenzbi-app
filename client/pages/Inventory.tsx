import { useQuery } from "@tanstack/react-query";
import { Package, AlertTriangle, TrendingDown, TrendingUp, Warehouse } from "lucide-react";
import { formatCurrency } from "../lib/utils";

interface Product {
  id: number;
  sku: string;
  name: string;
  stockQuantity: number;
  reorderLevel: number;
  costPrice: string;
  sellingPrice: string;
  unit: string;
}

export default function Inventory() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      return res.json();
    },
  });

  const lowStockProducts = products.filter(
    (p) => p.stockQuantity <= p.reorderLevel && p.stockQuantity > 0
  );
  const outOfStockProducts = products.filter((p) => p.stockQuantity === 0);
  const totalValue = products.reduce(
    (sum, p) => sum + p.stockQuantity * parseFloat(p.costPrice),
    0
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inventory</h1>
        <p className="text-muted-foreground">
          Monitor stock levels and inventory value
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Products</p>
              <p className="text-2xl font-bold">{products.length}</p>
            </div>
            <Package className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Inventory Value</p>
              <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
            </div>
            <Warehouse className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Low Stock</p>
              <p className="text-2xl font-bold text-orange-600">
                {lowStockProducts.length}
              </p>
            </div>
            <TrendingDown className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">
                {outOfStockProducts.length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      {lowStockProducts.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h3 className="font-semibold text-orange-800 flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5" />
            Low Stock Alert
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {lowStockProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-3 rounded-lg border border-orange-200"
              >
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                <div className="flex justify-between mt-2 text-sm">
                  <span>
                    Stock: {product.stockQuantity} {product.unit}
                  </span>
                  <span className="text-orange-600">
                    Reorder at: {product.reorderLevel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="bg-card border rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Stock Overview</h3>
          </div>
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">SKU</th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Current Stock
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Reorder Level
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Unit Value
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Total Value
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => {
                const totalProductValue =
                  product.stockQuantity * parseFloat(product.costPrice);
                const isLowStock = product.stockQuantity <= product.reorderLevel;
                const isOutOfStock = product.stockQuantity === 0;

                return (
                  <tr key={product.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">{product.name}</td>
                    <td className="px-4 py-3 text-sm font-mono">{product.sku}</td>
                    <td className="px-4 py-3">
                      {product.stockQuantity} {product.unit}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {product.reorderLevel} {product.unit}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {formatCurrency(product.costPrice)}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {formatCurrency(totalProductValue)}
                    </td>
                    <td className="px-4 py-3">
                      {isOutOfStock ? (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-700">
                          Out of Stock
                        </span>
                      ) : isLowStock ? (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-700">
                          Low Stock
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                          In Stock
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {products.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    No products in inventory
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
