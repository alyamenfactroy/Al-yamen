import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { sampleSuppliers, sampleProducts } from "@/data/sampleData";
import { PlusCircle, Trash2, Save, PackagePlus, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PurchaseItem {
  productId: number;
  productName: string;
  qty: number;
  unitPrice: number;
}

export default function NewPurchase() {
  const { t } = useLanguage();
  const [supplierId, setSupplierId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [items, setItems] = useState<PurchaseItem[]>([
    { productId: 1, productName: sampleProducts[0].name, qty: 1, unitPrice: sampleProducts[0].purchasePrice },
  ]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const addItem = () => {
    setItems([...items, { productId: 1, productName: sampleProducts[0].name, qty: 1, unitPrice: sampleProducts[0].purchasePrice }]);
  };
  const removeItem = (idx: number) => setItems(items.filter((_, i) => i !== idx));
  const updateItem = (idx: number, field: keyof PurchaseItem, val: any) => {
    const updated = [...items];
    if (field === "productId") {
      const product = sampleProducts.find(p => p.id === Number(val));
      updated[idx] = { ...updated[idx], productId: Number(val), productName: product?.name || "", unitPrice: product?.purchasePrice || 0 };
    } else {
      (updated[idx] as any)[field] = field === "qty" || field === "unitPrice" ? Number(val) : val;
    }
    setItems(updated);
  };

  const subtotal = items.reduce((a, item) => a + item.qty * item.unitPrice, 0);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div className="space-y-5 page-enter max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-white">{t("nav.new_purchase")}</h1>
          <p className="text-xs text-white/40 mt-0.5">Create a new purchase order from supplier</p>
        </div>
        <button onClick={handleSave} className="btn-primary">
          <Save size={14} />
          {t("common.save")}
        </button>
      </div>

      {saved && (
        <div className="glass-card p-4 border-emerald-500/30 bg-emerald-500/08 animate-fade-in">
          <p className="text-sm text-emerald-400 font-semibold">✓ Purchase order saved successfully!</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left — Main Form */}
        <div className="lg:col-span-2 space-y-4">
          {/* Supplier & Date */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <PackagePlus size={15} className="text-sky-400" /> Purchase Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">{t("nav.suppliers")}</label>
                <select value={supplierId} onChange={e => setSupplierId(e.target.value)} className="form-input form-select">
                  <option value="">Select supplier...</option>
                  {sampleSuppliers.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">{t("common.date")}</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="form-input" />
              </div>
              <div>
                <label className="form-label">Payment Method</label>
                <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="form-input form-select">
                  <option value="cash">Cash</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="check">Check</option>
                  <option value="credit">Credit</option>
                </select>
              </div>
              <div>
                <label className="form-label">Reference No.</label>
                <input type="text" placeholder="e.g. PUR-007" className="form-input" />
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white">Purchase Items</h3>
              <button onClick={addItem} className="btn-secondary text-xs flex items-center gap-1.5 py-1.5 px-3">
                <PlusCircle size={13} /> Add Item
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th className="text-start">Product</th>
                    <th className="text-center w-20">Qty</th>
                    <th className="text-end w-28">Unit Price</th>
                    <th className="text-end w-28">Total</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        <select
                          value={item.productId}
                          onChange={e => updateItem(idx, "productId", e.target.value)}
                          className="form-input form-select py-1.5 text-xs"
                        >
                          {sampleProducts.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                      </td>
                      <td>
                        <input
                          type="number" min={1} value={item.qty}
                          onChange={e => updateItem(idx, "qty", e.target.value)}
                          className="form-input text-center py-1.5 text-xs"
                        />
                      </td>
                      <td>
                        <input
                          type="number" min={0} value={item.unitPrice}
                          onChange={e => updateItem(idx, "unitPrice", e.target.value)}
                          className="form-input text-end py-1.5 text-xs"
                        />
                      </td>
                      <td className="text-end font-semibold text-white/85">
                        ৳{(item.qty * item.unitPrice).toLocaleString()}
                      </td>
                      <td>
                        {items.length > 1 && (
                          <button onClick={() => removeItem(idx)} className="btn-icon text-red-400/60 hover:text-red-400 hover:bg-red-400/10">
                            <Trash2 size={13} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <label className="form-label mt-4">Note</label>
              <textarea value={note} onChange={e => setNote(e.target.value)} rows={2}
                placeholder="Additional notes..." className="form-input resize-none" />
            </div>
          </div>
        </div>

        {/* Right — Summary */}
        <div className="space-y-4">
          <div className="glass-card p-5">
            <h3 className="text-sm font-bold text-white mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/50">Subtotal</span>
                <span className="text-white/80 font-medium">৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/50">Tax (5%)</span>
                <span className="text-white/80 font-medium">৳{tax.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/50">Discount</span>
                <span className="text-white/80 font-medium">৳0</span>
              </div>
              <div className="divider" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">Total</span>
                <span className="text-lg font-bold gradient-text">৳{total.toLocaleString()}</span>
              </div>
            </div>
            <div className="mt-5 space-y-2">
              <button onClick={handleSave} className="btn-primary w-full">
                <Save size={14} /> Save Purchase
              </button>
              <button className="btn-secondary w-full">Print Invoice</button>
            </div>
          </div>

          {/* Supplier Info */}
          {supplierId && (
            <div className="glass-card p-4 animate-fade-in">
              <h3 className="text-xs font-bold text-white/60 mb-3 uppercase tracking-wider">Supplier Info</h3>
              {(() => {
                const s = sampleSuppliers.find(s => s.id === Number(supplierId));
                return s ? (
                  <div className="space-y-2 text-xs">
                    <div><span className="text-white/40">Name:</span> <span className="text-white/80 font-medium ms-2">{s.name}</span></div>
                    <div><span className="text-white/40">Contact:</span> <span className="text-white/80 ms-2">{s.contact}</span></div>
                    <div><span className="text-white/40">Phone:</span> <span className="text-white/80 ms-2">{s.phone}</span></div>
                    <div><span className="text-white/40">Outstanding:</span> <span className={cn("ms-2 font-bold", s.outstanding > 0 ? "text-red-400" : "text-emerald-400")}>৳{s.outstanding.toLocaleString()}</span></div>
                  </div>
                ) : null;
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
