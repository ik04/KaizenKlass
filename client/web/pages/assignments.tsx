import PublicLayout from "@/components/PublicLayout";
import { GlobalContext } from "@/context/GlobalContext";
import React, { useContext } from "react";

const assignments = () => {
  const { updateCurrentPage } = useContext(GlobalContext);
  if (updateCurrentPage) {
    updateCurrentPage("classwork");
  }
  return (
    <div className="h-screen bg-primary">
      <PublicLayout>
        <div className="bg-red-200">test</div>
      </PublicLayout>
    </div>
  );
};

export default assignments;
