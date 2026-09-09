import { FaPlus } from "react-icons/fa";

const ProductCard = ({ product, onAdd }) => {
  
  const money = (value) => `৳${Number(value).toLocaleString("en-BD")}`;
  const stock = Object.values(product.stock).reduce(
    (sum, value) => sum + value,
    0,
  );

  return (
    <button
      onClick={() => onAdd(product)}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-pink-300 hover:shadow-lg"
    >
      <div
        className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${product.tone}`}
      >
        <span className="font-serif text-4xl font-bold text-slate-900/10">
          {product.name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)}
        </span>
        {product.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-white/80 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-pink-600">
            {product.tag}
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-white/80 px-2 py-1 text-[10px] font-bold text-slate-600">
          {stock} available
        </span>
        <span className="absolute bottom-3 right-3 flex h-8 w-8 translate-y-2 items-center justify-center rounded-full bg-slate-950 text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
          <FaPlus size={16} />
        </span>
      </div>
      <div className="p-3.5">
        <p className="truncate text-sm font-bold text-slate-900">
          {product.name}
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Model {product.model} · Sizes {product.sizes.join(", ")}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-950">
            {money(product.price)}
          </span>
          <span className="text-[10px] font-semibold text-slate-400">
            Add to sale
          </span>
        </div>
      </div>
    </button>
  );
};

export default ProductCard;
