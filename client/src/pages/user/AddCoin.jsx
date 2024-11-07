import React from "react";
import { GiTwoCoins } from "react-icons/gi";
const AddCoin = () => {
  return (
    <section className="w-full h-full">
      <div className=" w-full h-full  flex items-center justify-center">
        <button className="border px-4 py-2 rounded-md bg-gray-800 font-medium gap-x-2 w-fit h-fit flex flex-row items-center justify-center">
          <p className="text-xl">Add Coins</p>
          <div className="text-yellow-400 w-fit h-fit flex items-center justify-center">
            <GiTwoCoins size={25} />
            <p className="text-2xl">+</p>
          </div>
        </button>
      </div>
    </section>
  );
};

export default AddCoin;
