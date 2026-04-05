import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { ShoppingCart, Plus, Trash2 } from "lucide-react";
import { sampleProducts } from "@/data/sampleData";

interface OrderItem { productId: number; name: string; qty: number; price: number; }

export default function NewOrder() {
  const { t } = useLanguage();
  const [items, setItems] = useState<OrderItem[]>([]);
  const [customer, setCustomer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const addItem = (product: typeof sampleProducts[0]) => {
    const existing = items.find(i => i.productId === product.id);
    if (existing) {
      setItems(items.map(i => i.productId === product.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setItems([...items, { productId: product.id, name: product.name, qty: 1, price: product.price }]);
    }
  };

  const removeItem = (id: number) => setItems(items.filter(i => i.productId !== id));

  const total = items.reduce((a, b) => a + b.qty * b.price, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setItems([]); setCustomer(""); }, 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
      {/* Product Selection */}
      <div className="lg:col-span-3 glass-card p-5">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <ShoppingCart size={16} className="text-sky-400" />
          {t("nav.new_order")} — Select Products
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sampleProducts.map(p => (
            <button
              key={p.id}
              onClick={() => addItem(p)}
              disabled={p.status === "out_of_stock"}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/3 hover:bg-white/7 border border-white/5 hover:border-sky-400/20 transition-all text-start disabled:opacity-40"
              data-testid={`button-add-product-${p.id}`}
            >
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                <Plus size={16} className="text-sky-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-white truncate">{p.name}</p>
                <p className="text-xs text-sky-400">৳{p.price.toLocaleString()}</p>
                <p className="text-xs text-white/30">Stock: {p.stock}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-2 glass-card p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Order Summary</h3>
        {submitted && (
          <div className="mb-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
            ✓ Order placed successfully!
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-white/50 mb-1.5 block">{t("common.customer")}</label>
            <input
              type="text"
              placeholder="Customer name..."
              value={customer}
              onChange={e => setCustomer(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-sky-400/50 transition-colors"
              data-testid="input-customer-name"
            />
          </div>

          <div className="space-y-2 min-h-24">
            {items.length === 0 ? (
              <div className="py-8 text-center text-white/30 text-xs">No items added</div>
            ) : (
              items.map(item => (
                <div key={item.productId} className="flex items-center gap-2 p-2 rounded-lg bg-white/3" data-testid={`order-item-${item.productId}`}>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white truncate">{item.name}</p>
                    <p className="text-xs text-white/40">৳{item.price} × {item.qty}</p>
                  </div>
                  <span className="text-xs font-semibold text-sky-400">৳{(item.price * item.qty).toLocaleString()}</span>
                  <button type="button" onClick={() => removeItem(item.productId)} className="text-red-400/60 hover:text-red-400 transition-colors" data-testid={`button-remove-${item.productId}`}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-white/5 pt-3">
            <div className="flex justify-between text-sm font-bold">
              <span className="text-white/60">{t("common.total")}</span>
              <span className="text-sky-400">৳{total.toLocaleString()}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={items.length === 0 || !customer}
            className="w-full py-2.5 bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition-colors"
            data-testid="button-place-order"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
