import React from "react";
import { Navbar } from "./navbar";

export interface LayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="h-full flex">
        <div className="h-full flex flex-col w-[400px]">
          <div className="">Assignment</div>
          <div className="">Test Papers</div>
          <div className="">Past Docs</div>
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default PublicLayout;
