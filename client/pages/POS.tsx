import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Minus, Trash2, ShoppingCart, Search, CreditCard, Banknote, User } from "lucide-react";
import { formatCurrency } from "../lib/utils";

interface Product {
  id: number;
  sku: string;
  name: string;
  sellingPrice: string;
  stockQuantity: number;
  unit: string;
}

interface Customer {
  id: number;
  name: string;
  email: string | null;
}

interface CartItem {
  product: Product;
  quantity: number;
}

export default function POS() {
  const queryClient = useQueryClient();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showCustomerSelect, setShowCustomerSelect] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  const [showCheckout, setShowCheckout] = useState(false);

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
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

  const createOrderMutation = useMutation({
    mutationFn: async () => {
      const orderData = {
        customerId: selectedCustomer?.id,
        status: "completed",
        subtotal: subtotal.toString(),
        taxAmount: tax.toString(),
        totalAmount: total.toString(),
        notes: `POS Sale - ${paymentMethod.toUpperCase()}`,
      };
      const res = await fetch("/api/sales-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sales-orders"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard"] });
      setCart([]);
      setSelectedCustomer(null);
      setShowCheckout(false);
    },
  });

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + parseFloat(item.product.sellingPrice) * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="h-[calc(100vh-3rem)] flex gap-6">
      <div className="flex-1 flex flex-col">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Point of Sale</h1>
          <p className="text-muted-foreground">Quick sales and transactions</p>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products by name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg bg-background text-lg"
            autoFocus
          />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                disabled={product.stockQuantity <= 0}
                className={`p-4 border rounded-lg text-left transition hover:border-primary hover:shadow-md ${
                  product.stockQuantity <= 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <p className="font-medium truncate">{product.name}</p>
                <p className="text-xs text-muted-foreground font-mono">{product.sku}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-lg font-bold text-primary">
                    {formatCurrency(product.sellingPrice)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {product.stockQuantity} {product.unit}
                  </span>
                </div>
              </button>
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No products found
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-96 bg-card border rounded-lg flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Current Order
            </h2>
            <span className="text-sm text-muted-foreground">
              {cart.length} items
            </span>
          </div>

          <button
            onClick={() => setShowCustomerSelect(!showCustomerSelect)}
            className="w-full flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-muted text-sm"
          >
            <User className="h-4 w-4" />
            {selectedCustomer ? selectedCustomer.name : "Select Customer (Optional)"}
          </button>

          {showCustomerSelect && (
            <div className="mt-2 max-h-40 overflow-auto border rounded-lg">
              <button
                onClick={() => {
                  setSelectedCustomer(null);
                  setShowCustomerSelect(false);
                }}
                className="w-full px-3 py-2 text-left hover:bg-muted text-sm"
              >
                Walk-in Customer
              </button>
              {customers.map((customer) => (
                <button
                  key={customer.id}
                  onClick={() => {
                    setSelectedCustomer(customer);
                    setShowCustomerSelect(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-muted text-sm border-t"
                >
                  {customer.name}
                  {customer.email && (
                    <span className="text-muted-foreground ml-2">
                      ({customer.email})
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Cart is empty
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(item.product.sellingPrice)} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updateQuantity(item.product.id, -1)}
                    className="p-1 hover:bg-muted rounded"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, 1)}
                    className="p-1 hover:bg-muted rounded"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-1 hover:bg-red-100 text-red-500 rounded ml-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="font-semibold w-20 text-right">
                  {formatCurrency(
                    (parseFloat(item.product.sellingPrice) * item.quantity).toString()
                  )}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t space-y-3">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(subtotal.toFixed(2))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax (10%)</span>
              <span>{formatCurrency(tax.toFixed(2))}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total</span>
              <span className="text-primary">{formatCurrency(total.toFixed(2))}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setPaymentMethod("cash")}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg border transition ${
                paymentMethod === "cash"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "hover:bg-muted"
              }`}
            >
              <Banknote className="h-4 w-4" />
              Cash
            </button>
            <button
              onClick={() => setPaymentMethod("card")}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg border transition ${
                paymentMethod === "card"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "hover:bg-muted"
              }`}
            >
              <CreditCard className="h-4 w-4" />
              Card
            </button>
          </div>

          <button
            onClick={() => createOrderMutation.mutate()}
            disabled={cart.length === 0 || createOrderMutation.isPending}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {createOrderMutation.isPending ? "Processing..." : `Complete Sale - ${formatCurrency(total.toFixed(2))}`}
          </button>

          {cart.length > 0 && (
            <button
              onClick={() => setCart([])}
              className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition"
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
