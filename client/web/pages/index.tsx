import React, { useContext } from "react";
import { Navbar } from "@/components/Navbar";
import { GlobalContext } from "@/context/GlobalContext";
import Image from "next/image";
import HeroSvg from "../public/assets/heroimg.svg";

const index = () => {
  const { updateCurrentPage } = useContext(GlobalContext);
  if (updateCurrentPage) {
    updateCurrentPage("home");
  }
  return (
    <div className="h-screen bg-primary">
      <Navbar />
      <div className="hero-section mt-[120px] flex items-center justify-between px-[140px]">
        <div className="hero-content">
          <h1 className="font-display font-bold flex flex-col text-white text-[80px] w-[250px] h-[350px]">
            Elevate Your Efficiency
          </h1>
          <p className="font-base text-[35px] font-light text-custom-blue w-[420px] my-5">
            combine you efforts and make work happend, beat class deadlines
            consistently
          </p>
          <div className="buttons justify-between items-center flex w-[380px]">
            <div className="flex justify-center items-center font-base border cursor-pointer border-custom-blue rounded-full w-[177px] h-[53px] text-[30px] text-custom-blue">
              <p className="font-base font-light">Contribute</p>
            </div>
            <div className="flex justify-center py-2 items-center cursor-pointer font-base bg-custom-blue rounded-full w-[177px] h-[53px] text-[30px] text-white">
              <p className="font-base font-light">Classwork</p>
            </div>
          </div>
        </div>
        <Image src={HeroSvg} alt="hero-svg" />
      </div>
    </div>
  );
};

export default index;
