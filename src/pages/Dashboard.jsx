import React from "react";
import { FaMapPin, FaRegHeart } from "react-icons/fa";
import { IoEarthSharp } from "react-icons/io5";
import { RiShoppingBag3Line } from "react-icons/ri";
import { FiMapPin } from "react-icons/fi";
import logo from "../assets/logo.svg";
import { FaPhoneAlt } from "react-icons/fa";
const Dashboard = ({ cart }) => {
  const [details, setDetails] = React.useState([
    {
      invoiceNo: "INV-001",
      customer: "John Doe",
      date: "2023-09-08",
      time: "10:30 AM",
    },
  ]);

  // const details ={
  //   invoiceNo: "INV-001",
  //   customer: "John Doe",
  //   date: "2023-09-08",
  //   time: "10:30 AM",
  // }
  return (
    <main className="min-h-screen overflow-x-auto bg-white px-3 py-6 text-black sm:py-10">
      <div className="mx-auto flex w-fit flex-col items-center gap-4">
        <article
          // ref={receiptRef}
          className="thermal-receipt w-[576px] shrink-0 bg-white px-10 py-8 text-black"
          aria-label="Thermal receipt"
        >
          <header className="text-center">
            <div className="mx-auto mb-4 flex justify-center">
              <img
                src={logo}
                alt="New Irani Borka House Logo"
                className="h-[12rem] w-auto"
              />
            </div>
            <h1 className="font-serif text-[34px] font-black leading-none tracking-[-0.04em]">
              New Irani Borka House
            </h1>
            <div className="mt-3 flex items-center justify-center gap-3 font-serif text-[19px] font-bold italic">
              <span className="h-0.5 w-12 bg-black mt-[1.5rem]" />
              <span>Modesty is the real beauty</span>
              <span className="h-0.5 w-12 bg-black mt-[1.5rem]" />
            </div>
          </header>
          <section
            className="mt-8 flex items-center justify-center gap-4 text-[18px] font-bold"
            aria-label="Store categories"
          >
            {/* <Heart className="h-6 w-6 stroke-[2]" /> */}
            <span>Abaya</span>
            <b>•</b>
            <span>Borka</span>
            <b>•</b>
            <span>Hijab</span>
            <span className="text-[2rem]">|</span>
            <span>Elegant</span>
            <span>•</span>
            <span>Comfortable</span>
          </section>
          <div className="mt-6 space-y-1 text-center text-[18px] font-bold">
            <p className="flex items-center justify-center gap-2">
              {/* <MapPin className="h-5 w-5" /> */}
              Fortune Shoping Mall, Malibag, Dhaka
            </p>
            <p>www.newiraniborkahouse.com</p>
            <p className="flex items-center justify-center gap-2">
              {/* <Phone className="h-5 w-5" /> */}
              +880 17XX-XXXXXX
            </p>
          </div>
          <div className="mt-5 border-y-4 border-dashed border-black pt-3 pb-[2rem]  text-[18px] font-bold leading-7">
            {details.map((row, index) => (
              <div
                className="flex justify-between gap-3 text-[16px] font-bold"
                key={index}
              >
                <div className="flex flex-col gap-1">
                  <span>Invoice No : {row.invoiceNo}</span>
                  <span>Customer : {row.customer}</span>{" "}
                </div>
                <div className="flex flex-col gap-1">
                  <span>Date : {row.date}</span>
                  <span>Time : {row.time} </span>{" "}
                </div>
              </div>
            ))}
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
              <tr className="align-top">
                <td className="pt-2">1</td>
                <td className="pt-2">
                  sdkljfsdflkjsdlfasklfas;d
                  <div className="text-[10px]">
                    Model: 25356&nbsp; | &nbsp;Size: 52
                  </div>
                </td>
                <td className="pt-2 text-center">1</td>
                <td className="pt-2 text-right">4,000</td>
                <td className="pt-2 text-right">4,000</td>
              </tr>
              <tr className="align-top">
                <td className="pt-2">1</td>
                <td className="pt-2">
                  sdkljfsdflkjsdlfasklfas;d
                  <div className="text-[10px]">
                    Model: 25356&nbsp; | &nbsp;Size: 52
                  </div>
                </td>
                <td className="pt-2 text-center">1</td>
                <td className="pt-2 text-right">4,000</td>
                <td className="pt-2 text-right">4,000</td>
              </tr>
            </tbody>
          </table>
          <section className="ml-auto mt-3 w-[55%] border-b-2 border-dashed border-black pb-3 text-[18px] font-bold leading-7">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>4,000</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>0</span>
            </div>
            <div className="flex justify-between mb-6">
              <span>Delivery Charge</span>
              <span>80</span>
            </div>
            <div className="mt-2 flex mb-6 justify-between border-t-4 border-dashed border-black pt-2 text-[30px] font-black">
              <span>Total (৳)</span>
              <span className="">4,080</span>
            </div>
          </section>
          <section className="border-b-4 border-dashed border-black py-3 text-[18px] font-bold leading-7">
            <div className="grid grid-cols-[130px_20px_1fr]">
              {" "}
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
          <footer className="pt-4 text-center">
            <div className="flex items-center justify-center gap-3 font-serif text-[34px] font-black italic">
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
  );
};

export default Dashboard;
