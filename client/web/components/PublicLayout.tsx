import React, { useContext } from "react";
import { Navbar } from "./Navbar";
import Book from "../public/assets/auto_stories.svg";
import Test from "../public/assets/contract.svg";
import Past from "../public/assets/article.svg";
import Image from "next/image";
import { GlobalContext } from "@/context/GlobalContext";
import Link from "next/link";

export interface LayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<LayoutProps> = ({ children }) => {
  const { currentPage } = useContext(GlobalContext);

  return (
    <div className="">
      <div className="fixed w-full z-20">
        <div
          className={`flex justify-between items-center px-[100px] py-[10px] bg-primary-complement`}
        >
          <div className="font-display text-white text-[40px] mr-3">
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
        </div>{" "}
      </div>
      <div className="flex">
        <div className="flex text-white w-[400px]">
          <div className="bg-primary-complement fixed h-full w-[18%] flex items-center justify-center space-y-[14rem] flex-col">
            <div className="flex items-center gap-5 hover:-translate-y-2 duration-300 ease-in-out transition cursor-pointer">
              <Image src={Book} alt="book" width={45} height={45} />
              <p className="text-2xl font-base">Assignment</p>
            </div>
            <div className="flex items-center gap-5 hover:-translate-y-2 duration-300 ease-in-out transition cursor-pointer">
              <Image src={Test} alt="paper" />

              <p className="text-2xl font-base">Test Papers</p>
            </div>
            <div className="flex items-center gap-5 hover:-translate-y-2 duration-300 ease-in-out transition cursor-pointer">
              <Image src={Past} alt="book" />
              <p className="text-2xl font-base">Past Docs</p>
            </div>
          </div>
        </div>
        <div className="p-14 w-full z-10 h-full">{children}</div>
      </div>
    </div>
  );
};

export default PublicLayout;
