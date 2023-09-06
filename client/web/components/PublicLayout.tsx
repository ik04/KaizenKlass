import React from "react";
import { Navbar } from "./navbar";

export interface LayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="">
      <Navbar bordered={true} />
      <div className="flex">
        <div className="flex text-white h-[91vh] w-[400px] border border-x-custom-blue border-t-0 border-b-custom-blue">
          <div className="h-full flex items-center justify-around w-full flex-col">
            <div className="">Assignment</div>
            <div className="">Test Papers</div>
            <div className="">Past Docs</div>
          </div>
        </div>
        <div className="p-10">{children}</div>
      </div>
    </div>
  );
};

export default PublicLayout;
