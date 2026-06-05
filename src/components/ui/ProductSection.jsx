/**
 * ProductSection — Grid section tampilkan produk
 * Props:
 *  title    : string
 *  subtitle : string
 *  products : array
 *  onEdit   : fn
 *  onDelete : fn
 *  onView   : fn
 *  cols     : 2 | 3 | 4
 *  action   : ReactNode (tombol header kanan)
 *  emptyText: string
 */

import ProductCard from "../ProductCard";

const colsClass = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

export default function ProductSection({
  title = "Produk",
  subtitle,
  products = [],
  onEdit,
  onDelete,
  onView,
  cols = 3,
  action,
  emptyText = "Tidak ada produk.",
}) {
  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-800">{title}</h2>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <div className="py-16 text-center text-sm text-gray-400 bg-white rounded-2xl border border-gray-100">
          {emptyText}
        </div>
      ) : (
        <div className={`grid ${colsClass[cols] ?? colsClass[3]} gap-4`}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
              onView={onView}
            />
          ))}
        </div>
      )}
    </div>
  );
}