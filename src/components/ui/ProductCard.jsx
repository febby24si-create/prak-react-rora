/**
 * ProductCard — Card produk untuk grid/list tampilan
 * Props:
 *  product  : { id, title, code, category, brand, price, stock }
 *  onEdit   : fn(product)
 *  onDelete : fn(id)
 *  onView   : fn(product)
 */

import Badge from "./Badge";

const categoryMeta = {
  Electronics: { variant: "info",    emoji: "💻" },
  Furniture:   { variant: "warning", emoji: "🪑" },
  Apparel:     { variant: "purple",  emoji: "👕" },
  "Home & Living": { variant: "neutral", emoji: "🏠" },
  Appliances:  { variant: "danger",  emoji: "🔌" },
  Sports:      { variant: "success", emoji: "⚽" },
};

export default function ProductCard({ product, onEdit, onDelete, onView }) {
  const formatRupiah = (n) => `Rp ${Number(n).toLocaleString("id-ID")}`;
  const meta = categoryMeta[product.category] ?? { variant: "neutral", emoji: "📦" };
  const isLowStock = product.stock <= 10;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:shadow-gray-100/80 hover:-translate-y-1 transition-all duration-200 overflow-hidden group">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-4 pt-5 pb-4 flex items-center justify-between">
        <span className="text-3xl">{meta.emoji}</span>
        <Badge variant={meta.variant} size="sm">{product.category}</Badge>
      </div>

      {/* Body */}
      <div className="px-4 py-3">
        <p className="text-[11px] font-mono text-gray-400 mb-1">{product.code}</p>
        <h4 className="text-sm font-bold text-gray-800 leading-tight mb-0.5 line-clamp-2">
          {product.title}
        </h4>
        <p className="text-xs text-gray-400 mb-3">{product.brand}</p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-base font-black text-gray-900">
            {formatRupiah(product.price)}
          </span>
          <Badge
            variant={isLowStock ? "danger" : "success"}
            dot
            size="sm"
          >
            {product.stock} stok
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-gray-50">
          {onView && (
            <button
              onClick={() => onView(product)}
              className="flex-1 py-1.5 text-xs font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Detail
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(product)}
              className="flex-1 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(product.id)}
              className="flex-1 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
            >
              Hapus
            </button>
          )}
        </div>
      </div>
    </div>
  );
}