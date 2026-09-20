import React, { useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GoZap } from "react-icons/go";
import ProductCard from "../components/ProductCard";
import QuickSaleModel from "../components/QuickSaleModel";

const initialProducts = [
  {
    id: 1,
    name: "Luxury Two Part Borka",
    model: "2991",
    price: 4500,
    stock: { 52: 2, 54: 3, 56: 4 },
    sizes: [52],
    tone: "from-rose-100 to-pink-50",
    tag: "Best seller",
  },
  {
    id: 2,
    name: "Luxury Two Part Borka",
    model: "2991",
    price: 4500,
    stock: { 52: 2, 54: 3, 56: 4 },
    sizes: [54],
    tone: "from-rose-100 to-pink-50",
    tag: "Best seller",
  },
  {
    id: 3,
    name: "Luxury Two Part Borka",
    model: "2991",
    price: 4500,
    stock: { 52: 2, 54: 3, 56: 4 },
    sizes: [56],
    tone: "from-rose-100 to-pink-50",
    tag: "Best seller",
  },
  {
    id: 4,
    name: "Classic Embroidered Abaya",
    model: "2978",
    price: 3650,
    stock: { 52: 4, 54: 5, 56: 2 },
    sizes: [52, 54, 56],
    tone: "from-stone-200 to-stone-50",
    tag: "New",
  },
  {
    id: 5,
    name: "Jamdani Work Borka",
    model: "2719",
    price: 3800,
    stock: { 50: 3, 52: 4, 54: 6 },
    sizes: [52],
    tone: "from-slate-200 to-slate-50",
    tag: "",
  },
  {
    id: 6,
    name: "Jamdani Work Borka",
    model: "2719",
    price: 3800,
    stock: { 50: 3, 52: 4, 54: 6 },
    sizes: [54],
    tone: "from-slate-200 to-slate-50",
    tag: "",
  },
  {
    id: 7,
    name: "Jamdani Work Borka",
    model: "2719",
    price: 3800,
    stock: { 50: 3, 52: 4, 54: 6 },
    sizes: [56],
    tone: "from-slate-200 to-slate-50",
    tag: "",
  },
  {
    id: 8,
    name: "Premium Silk Khimar Set",
    model: "1029",
    price: 3200,
    stock: { Free: 8 },
    sizes: ["Free"],
    tone: "from-pink-200 to-rose-50",
    tag: "Popular",
  },
  {
    id: 9,
    name: "Two Part Borka",
    model: "2247",
    price: 4500,
    stock: { 52: 1, 54: 2, 56: 1 },
    sizes: [52, 54, 56],
    tone: "from-zinc-300 to-zinc-100",
    tag: "Low stock",
  },
  {
    id: 10,
    name: "Two Part Borka",
    model: "2247",
    price: 4500,
    stock: { 52: 1, 54: 2, 56: 1 },
    sizes: [52, 54, 56],
    tone: "from-zinc-300 to-zinc-100",
    tag: "Low stock",
  },
  {
    id: 11,
    name: "Two Part Borka",
    model: "2247",
    price: 4500,
    stock: { 52: 1, 54: 2, 56: 1 },
    sizes: [52, 54, 56],
    tone: "from-zinc-300 to-zinc-100",
    tag: "Low stock",
  },
  {
    id: 12,
    name: "One Part Borka",
    model: "2973",
    price: 3200,
    stock: { 50: 5, 52: 7, 54: 4 },
    sizes: [52],
    tone: "from-pink-100 to-slate-50",
    tag: "",
  },
  {
    id: 13,
    name: "One Part Borka",
    model: "2973",
    price: 3200,
    stock: { 50: 5, 52: 7, 54: 4 },
    sizes: [54],
    tone: "from-pink-100 to-slate-50",
    tag: "",
  },
  {
    id: 14,
    name: "One Part Borka",
    model: "2973",
    price: 3200,
    stock: { 50: 5, 52: 7, 54: 4 },
    sizes: [56],
    tone: "from-pink-100 to-slate-50",
    tag: "",
  },
 {
    id: 15,
    name: "One Part Borka",
    model: "299",
    price: 3200,
    stock: { 50: 5, 52: 7, 54: 4 },
    sizes: [52],
    tone: "from-pink-100 to-slate-50",
    tag: "",
  },
 {
    id: 16,
    name: "One Part Borka",
    model: "299",
    price: 3200,
    stock: { 50: 5, 52: 7, 54: 4 },
    sizes: [54],
    tone: "from-pink-100 to-slate-50",
    tag: "",
  },
 {
    id: 17,
    name: "One Part Borka",
    model: "299",
    price: 3200,
    stock: { 50: 5, 52: 7, 54: 4 },
    sizes: [56],
    tone: "from-pink-100 to-slate-50",
    tag: "",
  },
{
    id: 18,
    name: "Luxury Two Part Borka",
    model: "2931",
    price: 6500,
    stock: { 52: 2, 54: 3, 56: 4 },
    sizes: [52],
    tone: "from-rose-100 to-pink-50",
    tag: "Best seller",
  },
  {
    id: 19,
    name: "Luxury Two Part Borka",
    model: "2931",
    price: 6500,
    stock: { 52: 2, 54: 3, 56: 4 },
    sizes: [54],
    tone: "from-rose-100 to-pink-50",
    tag: "Best seller",
  },
  {
    id: 20,
    name: "Luxury Two Part Borka",
    model: "2931",
    price: 6500,
    stock: { 52: 2, 54: 3, 56: 4 },
    sizes: [56],
    tone: "from-rose-100 to-pink-50",
    tag: "Best seller",
  },{
    id: 21,
    name: "Luxury Two Part Borka",
    model: "2978",
    price: 4500,
    stock: { 52: 2, 54: 3, 56: 4 },
    sizes: [52],
    tone: "from-rose-100 to-pink-50",
    tag: "Best seller",
  },
  {
    id: 22,
    name: "Luxury Two Part Borka",
    model: "2978",
    price: 4500,
    stock: { 52: 2, 54: 3, 56: 4 },
    sizes: [54],
    tone: "from-rose-100 to-pink-50",
    tag: "Best seller",
  },
  {
    id: 23,
    name: "Luxury Two Part Borka",
    model: "2978",
    price: 4500,
    stock: { 52: 2, 54: 3, 56: 4 },
    sizes: [56],
    tone: "from-rose-100 to-pink-50",
    tag: "Best seller",
  },
  {
    id: 24,
    name: "Luxury Two Part Borka",
    model: "3051",
    price: 5000,
    stock: { 52: 2, 54: 3, 56: 4 },
    sizes: [52],
    tone: "from-rose-100 to-pink-50",
    tag: "Best seller",
  },
  {
    id: 25,
    name: "Luxury Two Part Borka",
    model: "3051",
    price: 5000,
    stock: { 52: 2, 54: 3, 56: 4 },
    sizes: [54],
    tone: "from-rose-100 to-pink-50",
    tag: "Best seller",
  },
  {
    id: 26,
    name: "Luxury Two Part Borka",
    model: "3051",
    price: 5000,
    stock: { 52: 2, 54: 3, 56: 4 },
    sizes: [56],
    tone: "from-rose-100 to-pink-50",
    tag: "Best seller",
  },
  {
    id: 27,
    name: "Luxury Two Part Borka",
    model: "109",
    price: 3800,
    stock: { 52: 2, 54: 3, 56: 4 },
    sizes: [52],
    tone: "from-rose-100 to-pink-50",
    tag: "Best seller",
  },
  {
    id: 28,
    name: "Luxury Two Part Borka",
    model: "109",
    price: 3800,
    stock: { 52: 2, 54: 3, 56: 4 },
    sizes: [54],
    tone: "from-rose-100 to-pink-50",
    tag: "Best seller",
  },
  {
    id: 29,
    name: "Luxury Two Part Borka",
    model: "109",
    price: 3800,
    stock: { 52: 2, 54: 3, 56: 4 },
    sizes: [56],
    tone: "from-rose-100 to-pink-50",
    tag: "Best seller",
  },
];

const Sales = ({ setCompletedSale }) => {
  const [products, setProducts] = useState(initialProducts);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All products");
  const [modal, setModal] = useState(null);
  const [cart, setCart] = useState([]);
  const categories = ["All products", "Abaya", "Borka", "Sets"];

  const visible = products.filter(
    (product) =>
      `${product.name} ${product.model}`
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (category === "All products" ||
        (category === "Borka" && product.name.includes("Borka")) ||
        (category === "Sets" && product.name.includes("Set")) ||
        (category === "Abaya" && product.name.includes("Abaya"))),
  );

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const discount = 0;
    return { subtotal, discount, total: subtotal - discount };
  }, [cart]);

  const addToCart = (product) =>
    setCart((current) => {
      const size = product.sizes[0];
      const key = `${product.id}-${size}`;
      const found = current.find((item) => item.key === key);
      return found
        ? current.map((item) =>
            item.key === key
              ? { ...item, qty: Math.min(item.qty + 1, product.stock[size]) }
              : item,
          )
        : [...current, { ...product, size, qty: 1, key }];
    });

    console.log(cart)
  const onQty = (key, amount) =>
    setCart((current) =>
      current
        .map((item) =>
          item.key === key
            ? {
                ...item,
                qty: Math.max(
                  0,
                  Math.min(item.qty + amount, item.stock[item.size]),
                ),
              }
            : item,
        )
        .filter((item) => item.qty),
    );

  const onSize = (key, size) =>
    setCart((current) =>
      current.map((item) =>
        item.key === key
          ? {
              ...item,
              size,
              key: `${item.id}-${size}`,
              qty: Math.min(item.qty, item.stock[size]),
            }
          : item,
      ),
    );

  const onRemove = (key) =>
    setCart((current) => current.filter((item) => item.key !== key));

  const completeSale = (sale) => {
    const invoice = `INV-20260908-${String(Date.now()).slice(-3)}`;

    setProducts((current) =>
      current.map((product) => {
        const sold = cart
          .filter((item) => item.id === product.id)
          .reduce(
            (sum, item) => ({
              ...sum,
              [item.size]: (sum[item.size] || 0) + item.qty,
            }),
            {},
          );
        return Object.keys(sold).length
          ? {
              ...product,
              stock: Object.fromEntries(
                Object.entries(product.stock).map(([size, count]) => [
                  size,
                  count - (sold[size] || 0),
                ]),
              ),
            }
          : product;
      }),
    );
    setCompletedSale({ ...sale, invoice, cart, totals });
    setCart([]);
    setModal(null);
  };
  return (
    <>
      <div className="grid w-full min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="min-w-0">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <CiSearch
                size={18}
                className="absolute left-4 top-3.5 text-slate-400"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search product by name, model number or barcode..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-pink-400 focus:ring-4 focus:ring-pink-50"
              />
            </div>
            <button
              onClick={() => cart.length && setModal("quick")}
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-200 hover:bg-slate-800"
            >
              <GoZap size={17} className="text-pink-300" /> Quick Sale ({" "}
              {cart.length} )
            </button>
          </div>
          <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-bold transition ${category === item ? "bg-pink-600 text-white" : "bg-white text-slate-500 hover:bg-slate-100"}`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-950">
                Products for sale
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                {visible.length} products · Click an item to add it
              </p>
            </div>
            <span className="hidden text-xs text-slate-400 sm:block">
              Updated just now
            </span>
          </div>

          <div className="max-h-[calc(100vh-250px)] overflow-y-auto pr-2 grid min-w-0 grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-3">
            {visible.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={addToCart}
              />
            ))}
          </div>
        </div>

        {/* <Cart
          cart={cart}
          onQty={onQty}
          onRemove={onRemove}
          onSize={onSize}
          onQuickSale={() => setModal("quick")}
          totals={totals}
        /> */}
      </div>

      {modal === "quick" && (
        <QuickSaleModel
          cart={cart}
          totals={totals}
          // money={money}
          onClose={() => setModal(null)}
          onComplete={completeSale}
        />
      )}
    </>
  );
};

export default Sales;
