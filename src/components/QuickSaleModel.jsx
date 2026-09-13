import { useState } from "react";
import html2canvas from "html2canvas";
// import ReceiptPrinterEncoder from "receipt-printer-encoder";
import { useRef } from "react";
import { FaCheck } from "react-icons/fa6";
import logo from "../assets/logo.svg";
import { LuWallet } from "react-icons/lu";
import { LuFileText } from "react-icons/lu";
import { FiSmartphone } from "react-icons/fi";
import { CiCreditCard1 } from "react-icons/ci";
import Modal from "./Modal";

const QuickSaleModel = ({ cart, totals, onClose, onComplete }) => {
  const money = (value) => `৳${Number(value).toLocaleString("en-BD")}`;

  const [invoiceData, setInvoiceData] = useState({
    phone: "",
    discount: "",
    method: "Cash",
    invoiceNo: "INV-001",
    customerType: "New",
    date: new Date().toISOString().split("T")[0].split("-").reverse().join("-"),
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });

  // 2. Generic function to update any form field dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const grandTotal = Math.max(
    0,
    totals.subtotal -
      (totals.subtotal * Number(invoiceData.discount || 0)) / 100 +
      Number(invoiceData.delivery || 0),
  );
  // ✅ CORRECT
  const methods = [
    ["Cash", LuWallet],
    ["Card", CiCreditCard1],
    ["Mobile Banking", FiSmartphone],
    ["Other", LuFileText],
  ];

  const discountAmount =
    (totals.subtotal * (Number(invoiceData.discount) || 0)) / 100;
  console.log("Discount Amount:", discountAmount);
  // recipt

  const receiptRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // প্রিন্টিং হ্যান্ডলার (RawBT App Integration)
const handlePrintAndSale = async () => {
  setLoading(true);

  try {
    // ১. র্যান্ডম ইনভয়েস নম্বর তৈরি
    const randomNumber = `NIBH-${Math.floor(Math.random() * 1000000)}`;

    // ২. স্টেট আপডেট
    setInvoiceData((prev) => ({
      ...prev,
      invoiceNo: randomNumber,
    }));

    // ৩. DOM-এ নতুন ইনভয়েস নম্বর রেন্ডার হওয়ার জন্য ১০০ms অপেক্ষা
    await new Promise((resolve) => setTimeout(resolve, 100));

    // ৪. ক্যানভাস জেনারেট করা
    if (receiptRef.current) {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 3,
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      // Base64 ডাটা নেওয়া
      const base64Image = canvas
        .toDataURL("image/png")
        .replace(/^data:image\/(png|jpg);base64,/, "");

      // RawBT অ্যাপে রিডাইরেক্ট করার আগেই Loading বন্ধ করুন
      setLoading(false);

      // RawBT অ্যাপের ইনটেনশনে পাঠানো
      const rawbtIntent = `intent:base64,${base64Image}#Intent;scheme=rawbt;package=ru.a404m.rawbtprinter;end;`;
      window.location.href = rawbtIntent;
    }
  } catch (error) {
    console.error("Print Error:", error);
    alert("প্রিন্ট করতে সমস্যা হয়েছে!");
    setLoading(false);
  }
};

  const handlePreview = async () => {
    // 1. Generate new invoice number first
    const randomNumber = `NIBH-${Math.floor(Math.random() * 1000000)}`;

    // 2. Update state
    setInvoiceData((prev) => ({
      ...prev,
      invoiceNo: randomNumber,
    }));

    // 3. Wait a micro-tick for React to render the new state into the DOM
    await new Promise((resolve) => setTimeout(resolve, 50));

    // 4. Capture the updated element
    if (receiptRef.current) {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 3,
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");

      const win = window.open("");
      win.document.write(
        `<img src="${imgData}" style="border:1px solid #000;" />`,
      );
    }
  };

  return (
    <>
      {/* --- Hidden Receipt Component --- */}
      <main className="min-h-screen overflow-x-auto bg-white px-3 py-6 text-black sm:py-10">
        <div className="mx-auto flex w-fit flex-col items-center gap-4">
          <article
            ref={receiptRef}
            className="thermal-receipt w-[576px] shrink-0 bg-white px-10 py-8 text-black"
            aria-label="Thermal receipt"
          >
            <header className="text-center">
              <div className="mx-auto flex justify-center">
                <img
                  src={logo}
                  alt="New Irani Borka House Logo"
                  className="h-[20rem] w-auto"
                />
              </div>
              <h1 className="font-serif text-[45px] font-black leading-none tracking-[-0.04em]">
                New Irani Borka House
              </h1>
              <div className="mt-3 flex items-center justify-center gap-3 font-serif text-[19px] font-bold italic">
                <span className="h-0.5 w-12 bg-black mt-[1.5rem]" />
                <span>Modesty is the real beauty</span>
                <span className="h-0.5 w-12 bg-black mt-[1.5rem]" />
              </div>
            </header>
            <section
              className="h-[5rem]  flex items-center justify-center gap-4 text-[20px] font-bold"
              aria-label="Store categories"
            >
              {/* <Heart className="h-6 w-6 stroke-[2]" /> */}
              <span>Abaya</span>
              <b>•</b>
              <span>Borka</span>
              <b>•</b>
              <span>Hijab</span>
              <span className="text-[2rem] mb-[1rem] ">|</span>
              <span>Elegant</span>
              <span>•</span>
              <span>Comfortable</span>
            </section>
            <div className="mt-2 space-y-1 text-center text-[20px] font-bold">
              <p className="flex items-center justify-center gap-2">
                {/* <MapPin className="h-5 w-5" /> */}
                Fortune Shoping Mall, Malibag, Dhaka
              </p>
              <p>www.newiraniborkahouse.com</p>
              <p className="flex items-center justify-center gap-2">
                {/* <Phone className="h-5 w-5" /> */}
                +880 1410-857761
              </p>
            </div>
            <div className="mt-5 border-y-4 border-dashed border-black pt-3 pb-[2rem]  text-[20px] font-bold leading-7">
              <div className="flex justify-between gap-3 text-[20px] font-bold">
                <div className="flex flex-col gap-1">
                  <span>Invoice No : {invoiceData.invoiceNo}</span>
                  <span>Customer : {invoiceData.customerType}</span>{" "}
                </div>
                <div className="flex flex-col gap-1">
                  <span>Date : {invoiceData.date}</span>
                  <span>Time : {invoiceData.time} </span>{" "}
                </div>
              </div>
            </div>

            <table className="mt-3 w-full border-b-6 border-dashed border-black pb-3 text-left text-[20px] font-bold leading-7">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="pb-6">No.</th>
                  <th className="pb-6">Product Name</th>
                  <th className="pb-6 text-center">Qty</th>
                  <th className="pb-6 text-right">Price </th>
                  <th className="pb-6 text-right">Total </th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((item, index) => (
                  <tr
                    className="align-top  border-b-4 border-dashed border-black"
                    key={index}
                  >
                    <td className="pt-2">{index + 1}</td>
                    <td className="pt-2">
                      {item.name}
                      <div className="text-[19px] mb-6">
                        Model: {item.model}&nbsp; | &nbsp;Size: {item.size}
                      </div>
                    </td>
                    <td className="pt-2 text-center">{item.qty || 1}</td>
                    <td className="pt-2 text-right">{item.price}</td>
                    <td className="pt-2 text-right text-[22px] font-extrabold">{item.qty * item.price}</td>
                  </tr>
                ))}{" "}
              </tbody>
            </table>
            <section className="ml-auto mt-3 w-[55%] border-b-4 border-dashed border-black pb-3 text-[22px] font-bold leading-7">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-extrabold">{money(totals.subtotal)}</span>
              </div>
              <div className="flex mb-4 justify-between">
                <span>Discount</span>
                <span className="font-extrabold">{money(discountAmount)}</span>
              </div>
              <div className="mt-2 flex mb-6 justify-between border-t-4 border-dashed border-black pt-2 text-[30px] font-black">
                <span>Total (৳)</span>
                <span>{money(grandTotal)}</span>
              </div>
            </section>
            <section className="border-b-4 border-dashed border-black pt-3  pb-6 text-[22px] font-bold leading-7">
              <div className="grid grid-cols-[13rem_20px_10rem]">
                {" "}
                <span>Payment Method</span>
                <span>:</span>
                <span>{invoiceData.method}</span>
                <span>Received</span>
                <span>:</span>
                <span>{money(grandTotal)}</span>
                <span>Change</span>
                <span>:</span>
                <span>0</span>
              </div>
            </section>
            <footer className="pt-4 text-center">
              <div className="flex items-center justify-center gap-3 font-serif text-[38px] font-black italic">
                <span>— ♡</span>
                <span>Thank You</span>
                <span>♡ —</span>
              </div>
              <p className="mt-2 text-[18px] font-bold">
                For your trust and support
              </p>
              <p className="text-[18px] font-bold">New Irani Borka House</p>
              <div className="mt-5 flex items-center gap-5 text-left">
                {/* <QrCode className="h-20 w-20 shrink-0" /> */}
                <div className="h-20 w-0.5 bg-black" />
                <div className="flex-1 text-[15px] font-bold leading-6">
                  Visit us online
                  <br />
                  www.newiraniborkahouse.com
                </div>
                <div className="h-20 w-0.5 bg-black" />
                <div className="flex gap-3">
                  {/* <CircleUserRound className="h-6 w-6" /> */}
                  {/* <Send className="h-6 w-6" /> */}
                  {/* <ArrowUpRight className="h-6 w-6" /> */}
                </div>
              </div>
              <div className="mt-7 flex items-center justify-center gap-4">
                <span className="h-0.5 w-24 bg-black" />
                <span className="text-[15px] font-bold tracking-[0.35em]">
                  GRACE IN EVERY STEP
                </span>
                <span className="h-0.5 w-24 bg-black" />
              </div>
            </footer>
          </article>
        </div>
      </main>

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
                  value={invoiceData.phone}
                  onChange={handleChange}
                  name="phone"
                  placeholder="Customer Mobile Number"
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
                    onClick={() =>
                      handleChange({
                        target: { name: "method", value: label },
                      })
                    }
                    className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-[11px] font-bold ${invoiceData.method === label ? "border-pink-500 bg-pink-50 text-pink-700" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}
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
                  value={invoiceData.discount}
                  onChange={handleChange}
                  name="discount"
                  type="number"
                  min="0"
                  placeholder="৳0"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-pink-400"
                />
              </label>
              {/* Customer Type  */}
              <label className="text-xs font-bold text-slate-500">
                Customer Type
                <select
                  value={invoiceData.customerType}
                  defaultValue="New"
                  onChange={handleChange}
                  name="customerType"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-pink-400"
                >
                  <option value="regular">New</option>
                  <option value="regular">Regular</option>
                  <option value="vip">VIP</option>
                </select>
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
                <span>-{money(Number(invoiceData.discount || 0))}%</span>
              </div>
              {/* <div className="flex justify-between text-slate-400">
                <span>special Discount</span>
                <span>{money(Number(invoiceData.specialDiscount || 0))}%</span>
              </div> */}
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
