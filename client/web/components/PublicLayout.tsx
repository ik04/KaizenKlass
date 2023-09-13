import React from "react";
import { Navbar } from "./Navbar";
import Book from "../public/assets/auto_stories.svg";
import Test from "../public/assets/contract.svg";
import Past from "../public/assets/article.svg";
import Image from "next/image";

export interface LayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="">
      <div className="p-[0.5px]">
        <Navbar bordered={true} />
      </div>
      <div className="flex">
        <div className="flex text-white h-[91vh] w-[400px] border-2 border-x-[#275464] border-t-0 border-b-[#275464]">
          <div className="h-full flex items-center justify-center space-y-[14rem] w-full flex-col">
            <div className="flex items-center gap-5 hover:-translate-y-2 duration-300 ease-in-out transition">
              <Image src={Book} alt="book" width={45} height={45} />
              <p className="text-2xl font-base">Assignment</p>
            </div>
            <div className="flex items-center gap-5 hover:-translate-y-2 duration-300 ease-in-out transition">
              <Image src={Test} alt="paper" />

              <p className="text-2xl font-base">Test Papers</p>
            </div>
            <div className="flex items-center gap-5 hover:-translate-y-2 duration-300 ease-in-out transition">
              <Image src={Past} alt="book" />
              <p className="text-2xl font-base">Past Docs</p>
            </div>
          </div>
        </div>
        <div className="p-10">{children}</div>
      </div>
    </div>
  );
};

export default PublicLayout;
