import { GlobalContext } from "@/context/GlobalContext";
import Link from "next/link";
import React, { useContext } from "react";

interface navbarProps {
  bordered?: boolean;
}

export const Navbar = (props: navbarProps) => {
  const { currentPage } = useContext(GlobalContext);
  return (
    <div
      className={`flex justify-between items-center px-[140px] py-[10px] ${
        props.bordered ? "border border-custom-blue" : ""
      }`}
    >
      <div className="font-display text-white text-[40px]">
        Kaizen<span className="text-custom-blue">Klass</span>
      </div>
      <div className="nav-links flex text-[25px] items-center text-white w-[400px] space-x-[25px] mt-2">
        <Link
          href={"/"}
          className={`font-base ${
            currentPage === "home" && "text-custom-blue"
          }`}
        >
          Home
        </Link>
        <Link
          href={"/assignments"}
          className={`font-base ${
            currentPage === "classwork" && "text-custom-blue"
          }`}
        >
          Classwork
        </Link>
        <Link
          href={"/"}
          className={`font-base ${
            currentPage === "contribute" && "text-custom-blue"
          }`}
        >
          Contribute
        </Link>
      </div>
    </div>
  );
};
