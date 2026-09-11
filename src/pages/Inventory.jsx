import React from "react";

const Inventory = () => {
  return (
    <>
      <tbody>
        <tr className="align-top">
          <td className="pt-2">1</td>
          <td className="pt-2">
            Stone Work Attached Koti Borka
            <div className="text-[10px]">
              Model: 891&nbsp; | &nbsp;Color: Black&nbsp; | &nbsp;Size: 54
            </div>
          </td>
          <td className="pt-2 text-center">1</td>
          <td className="pt-2 text-right">4,000</td>
          <td className="pt-2 text-right">4,000</td>
        </tr>

      </tbody>

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
    </>
  );
};

export default Inventory;
