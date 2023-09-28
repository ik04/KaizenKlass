import React from "react";

interface subjectCardProps {
  subject: string;
  subjectUuid: string;
  key: any;
}

export const SubjectCard = ({
  subject,
  subjectUuid,
  key,
}: subjectCardProps) => {
  return (
    <div
      key={key}
      className="w-[300px] h-[400px] border-[#4592AF] border-[1px] flex justify-center items-center"
    >
      <h1 className="font-base text-center text-clip text-custom-blue font-light text-[40px]">
        {subject}
      </h1>
    </div>
  );
};
