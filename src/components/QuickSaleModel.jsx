import { useState } from "react";
import html2canvas from "html2canvas";
// import ReceiptPrinterEncoder from "receipt-printer-encoder";
import { useRef} from "react";
import { FaCheck } from "react-icons/fa6";
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
          .toDataURL('image/png')
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
  return (
    <>
      {/* --- Hidden Receipt Component --- */}
      <div className="absolute top-[-9999px] left-[-9999px]">
        <div
          ref={receiptRef}
          className="w-[384px] p-4 bg-white text-black font-sans text-xs leading-tight"
        >
          {/* Header */}
          <div className="text-center mb-3">
            <div className="text-2xl font-serif font-bold border-2 border-black inline-block rounded-full w-10 h-10 leading-[36px] mb-1">
              H
            </div>
            <h1 className="text-lg font-bold font-serif tracking-wider">
              IRANI BORKA HAYA
            </h1>
            <p className="text-[9px] tracking-widest uppercase font-semibold">
              Luxury Abaya & Borka
            </p>
            <div className="text-[10px] my-1">◆ ◆ ◆</div>
            <p className="text-[10px]">Malibag Fortune Shopping Mall</p>
            <p className="text-[10px]">Level-2, Shop No-23, Dhaka</p>
            <p className="text-[10px]">📞 01410 857 761</p>
          </div>

          <div className="border-b border-dashed border-black my-2"></div>
          <div className="text-center font-bold tracking-widest my-1 text-xs">
            RECEIPT
          </div>
          <div className="border-b border-dashed border-black my-2"></div>

          {/* Customer Info */}
          <div className="flex justify-between my-1 text-[10px]">
            <span>Customer : {name || "Walk-in customer"}</span>
            <span>Phone : {phone || "N/A"}</span>
          </div>

          <div className="border-b border-dashed border-black my-2"></div>

          {/* Items */}
          <div className="bg-black text-white flex justify-between px-2 py-1 font-bold text-[10px]">
            <span className="w-1/2">ITEM</span>
            <span className="w-1/4 text-center">QTY</span>
            <span className="w-1/4 text-right">PRICE</span>
          </div>

          <div className="my-2 space-y-1">
            {cart?.map((item, index) => (
              <div
                key={index}
                className="flex justify-between px-1 border-b border-dotted border-gray-400 text-[10px]"
              >
                <span className="w-1/2">{item.name}</span>
                <span className="w-1/4 text-center">{item.qty || 1}</span>
                <span className="w-1/4 text-right">{item.price}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex flex-col items-end text-[10px] space-y-1 mt-2">
            <div className="flex justify-between w-1/2 font-bold text-xs">
              <span>TOTAL</span>
              <span>Tk {grandTotal}</span>
            </div>
          </div>

          <div className="border-b border-dashed border-black my-3"></div>

          <div className="text-center my-2">
            <p className="font-serif italic text-sm">Thank You! ♥</p>
            <p className="font-semibold text-[10px] mt-1">
              আল্লাহ আপনাকে হেফাজত করুন
            </p>
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
              onClick={handlePrintAndSale}
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
