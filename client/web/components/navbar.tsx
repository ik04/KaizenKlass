import React from "react";

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center  px-[140px] py-[10px]">
      <div className="font-display text-white text-[40px]">
        Kaizen<span className="text-custom-blue">Klass</span>
      </div>
      <div className="nav-links flex text-[25px] items-center text-white w-[400px] space-x-[25px] mt-2">
        <div className="font-base">Home</div>
        <div className="font-base">Classwork</div>
        <div className="font-base">Contribute</div>
      </div>
    </div>
  );
};
