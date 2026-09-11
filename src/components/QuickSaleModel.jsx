import { useState } from "react";
import html2canvas from "html2canvas";
// import ReceiptPrinterEncoder from "receipt-printer-encoder";
import { useRef } from "react";
import { FaCheck } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { IoEarthSharp } from "react-icons/io5";
import { RiShoppingBag3Line } from "react-icons/ri";
import { FiMapPin } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";
import { LuWallet } from "react-icons/lu";
import { LuFileText } from "react-icons/lu";
import { FiSmartphone } from "react-icons/fi";
import { CiCreditCard1 } from "react-icons/ci";
import Modal from "./Modal";

const QuickSaleModel = ({ cart, totals, onClose, onComplete }) => {
  const money = (value) => `৳${Number(value).toLocaleString("en-BD")}`;
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");
  const [delivery, setDelivery] = useState("0");
  const [method, setMethod] = useState("Cash");

    const details = [
    ["Invoice No", "#00012345", "Date", "10-09-2026"],
    ["Customer", "Walk-in Customer", "Time", "02:35 PM"],
    ["Phone", "01XXXXXXXXX", "", ""],
  ];

  const grandTotal = Math.max(
    0,
    totals.subtotal -
      (totals.subtotal * Number(discount || 0)) / 100 +
      Number(delivery || 0),
  );
  // ✅ CORRECT
  const methods = [
    ["Cash", LuWallet],
    ["Card", CiCreditCard1],
    ["Mobile Banking", FiSmartphone],
    ["Other", LuFileText],
  ];

  // recipt

  const receiptRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // প্রিন্টিং হ্যান্ডলার (RawBT App Integration)
  const handlePrintAndSale = async () => {
    setLoading(true);

    try {
      // ২. মেমো ইমেজে রূপান্তর করে RawBT অ্যাপে পাঠানো
      if (receiptRef.current) {
        const canvas = await html2canvas(receiptRef.current, { scale: 2 });

        // Base64 ইমেজ ডাটা নেওয়া
        const base64Image = canvas
          .toDataURL("image/png")
          .replace(/^data:image\/(png|jpg);base64,/, "");

        // ৩. সরাসরি RawBT অ্যাপে ডাটা রিডাইরেক্ট করা
        const rawbtIntent = `intent:base64,${base64Image}#Intent;scheme=rawbt;package=ru.a404m.rawbtprinter;end;`;
        window.location.href = rawbtIntent;
      }
    } catch (error) {
      console.error("Print Error:", error);
      alert("প্রিন্ট করতে সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = async () => {
    if (receiptRef.current) {
      const canvas = await html2canvas(receiptRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      // ব্রাউজারের নতুন ট্যাবে রসিদের প্রিভিউ ইমেজ দেখাবে
      const win = window.open("");
      win.document.write(
        `<img src="${imgData}" style="border:1px solid #000;" />`,
      );
    }
  };
  return (
    <>
      {/* --- Hidden Receipt Component --- */}
      <div className="absolute top-[-9999px] left-[-9999px]">
        <div
          ref={receiptRef}
          className="w-[384px] p-4 bg-white text-black font-sans text-xs leading-tight"
        >
          {/* Header */}
          <div className="px-7 pb-7 pt-8 sm:px-4  flex-col justify-center items-center border border-black  sm:pb-10 sm:pt-10">
            <header className="text-center">
              <div className="mx-auto mb-1 flex h-16 w-24 items-end justify-center text-[#111]">
                <svg
                  viewBox="0 0 100 72"
                  className="h-full w-full"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  aria-label="New Irani logo"
                >
                  <path d="M47 65c1-20 2-42 16-54 10-8 26-7 30 2 5 11-3 27-15 36" />
                  <path d="M55 31c7 8 15 14 26 17M59 19c8 10 17 16 27 17M62 11c9 6 17 9 26 8M46 65c11-13 15-26 15-44" />
                  <path d="M48 64c-9-11-18-20-31-20M28 43c-3-9-8-11-13-11M24 43c-2 8 3 13 10 11M20 49c-7 1-11-2-14-7" />
                  <path
                    d="M25 43c-2-6-1-11 3-14 4 4 4 9-3 14Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h1 className="font-serif text-[30px] leading-none tracking-[-0.04em] sm:text-[35px]">
                New Irani Borka House
              </h1>
              <div className="mt-2 flex items-center justify-center gap-3 font-serif text-[16px] italic">
                <span className="h-px w-10 bg-[#555]" />
                <span>Modesty is the real beauty</span>
                <span className="h-px w-10 bg-[#555]" />
              </div>
            </header>

            <section
              className="mt-6 flex items-center justify-center gap-2 text-[11px] sm:gap-[0.7rem] sm:text-[12px]"
              aria-label="Store values"
            >
              {/* <FaRegHeart className="h-5 w-5 stroke-[1.4]" /> */}
              <span>Abaya</span>
              <b>•</b>
              <span>Borka</span>
              <b>•</b>
              <span>Hijab</span>
              <span className="ml-1 flex items-center gap-1.5 border-l border-[#222] pl-4">
                {/* <RiShoppingBag3Line className="h-5 w-5 stroke-[1.3]" /> */}
                <span>•</span>
                <span>Elegant</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span>•</span>
                <span>Comfortable</span>
              </span>
            </section>

            <div className="mt-5 space-y-1 text-center text-[11px]">
              <p className="flex items-center justify-center gap-2">
                <FiMapPin className="h-3.5 w-3.5" />
                Fortun Shopping Mall, Malibag, Dhaka
              </p>
              <p className="flex items-center justify-center gap-2">
                <IoEarthSharp />
                www.newiraniborkahouse.com
              </p>
              <p className="flex items-center justify-center gap-2">
                <FaPhoneAlt className="h-3.5 w-3.5" />
                +880 1410857761
              </p>
            </div>

            <div className="mt-3 border-y border-dashed border-[#777] py-2.5 text-[11px] leading-5">
              {details.map((row, index) => (
                <div className="grid grid-cols-[72px_1fr_35px_1fr]" key={index}>
                  <span>{row[0]}</span>
                  <span>: &nbsp;{row[1]}</span>
                  <span>{row[2]}</span>
                  <span>{row[3] && `:  ${row[3]}`}</span>
                </div>
              ))}
            </div>

            <table className="mt-2 w-full border-b border-dashed border-[#777] pb-2 text-left text-[11px] leading-5">
              <thead>
                <tr className="border-b border-[#777]">
                  <th className="pb-1">No.</th>
                  <th className="pb-1">Product Name</th>
                  <th className="pb-1 text-center">Qty</th>
                  <th className="pb-1 text-right">Price (৳)</th>
                  <th className="pb-1 text-right">Total (৳)</th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((item, index) => (
                  <tr className="align-top" key={index}>
                    <td className="pt-2">{index + 1}</td>
                    <td className="pt-2">
                      {item.name}
                      <div className="text-[10px]">
                        Model: {item.model}&nbsp; | &nbsp;Size: {item.size}
                      </div>
                    </td>
                    <td className="pt-2 text-center">{item.qty || 1}</td>
                    <td className="pt-2 text-right">{item.price}</td>
                    <td className="pt-2 text-right">{item.qty * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <section className="ml-auto mt-2 w-[55%] border-b border-dashed border-[#777] pb-2 text-[12px] leading-5">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>4,000</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>0</span>
              </div>
              <div className="mt-1 flex justify-between border-t border-dashed border-[#777] pt-1 text-[15px] font-bold">
                <span>Total (৳)</span>
                <span>4,080</span>
              </div>
            </section>

            <section className="border-b border-dashed border-[#777] py-2 text-[11px] leading-5">
              <div className="grid grid-cols-[100px_14px_1fr]">
                <span>Payment Method</span>
                <span>:</span>
                <span>Cash on Delivery</span>
                <span>Received</span>
                <span>:</span>
                <span>4,080</span>
                <span>Change</span>
                <span>:</span>
                <span>0</span>
              </div>
            </section>

            <footer className="pt-3 text-center">
              <div className="flex items-center justify-center gap-2 font-serif text-[27px] italic">
                <span>— ♡</span>
                <span>Thank You</span>
                <span>♡ —</span>
              </div>
              <p className="mt-1 text-[11px]">For your trust and support</p>
              <p className="text-[11px]">New Irani Borka House</p>

              <div className="mt-5 flex items-center justify-center gap-3">
                <span className="h-px w-16 bg-[#777]" />
                <span className="text-[9px] tracking-[0.35em]">
                  GRACE IN EVERY STEP
                </span>
                <span className="h-px w-16 bg-[#777]" />
              </div>
            </footer>
          </div>
        </div>
      </div>

      <Modal title="Complete quick sale" onClose={onClose} wide>
        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <div className="space-y-5">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                Customer information
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="number"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Customer mobile number"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-pink-400"
                />
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                Payment method
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {methods.map(([label, Icon]) => (
                  <button
                    key={label}
                    onClick={() => setMethod(label)}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-[11px] font-bold ${method === label ? "border-pink-500 bg-pink-50 text-pink-700" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}
                  >
                    <Icon size={18} />
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-xs font-bold text-slate-500">
                Discount
                <input
                  value={discount}
                  onChange={(event) => setDiscount(event.target.value)}
                  type="number"
                  min="0"
                  placeholder="৳0"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-pink-400"
                />
              </label>
              <label className="text-xs font-bold text-slate-500">
                Delivery charge
                <input
                  value={delivery}
                  onChange={(event) => setDelivery(event.target.value)}
                  type="number"
                  min="0"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-pink-400"
                />
              </label>
            </div>
          </div>
          <div className="rounded-2xl bg-slate-950 p-5 text-white">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Order summary
            </p>
            <div className="mt-4 space-y-3">
              {cart.map((item) => (
                <div
                  key={item.key}
                  className="flex justify-between gap-3 text-xs"
                >
                  <span className="text-slate-300">
                    {item.name} · {item.size} × {item.qty}
                  </span>
                  <b>{money(item.price * item.qty)}</b>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-2 border-t border-slate-800 pt-4 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>{money(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Discount</span>
                <span>-{money(Number(discount || 0))}%</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>special Discount</span>
                <span>{money(Number(delivery || 0))}%</span>
              </div>
              <div className="mt-3 flex justify-between border-t border-slate-800 pt-3 text-lg font-black">
                <span>Grand Total</span>
                <span className="text-pink-300">{money(grandTotal)}</span>
              </div>
            </div>
            <button
              onClick={handlePreview}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-pink-600 py-3.5 text-sm font-bold text-white hover:bg-pink-700"
            >
              <FaCheck size={17} /> Complete Sale
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default QuickSaleModel;
