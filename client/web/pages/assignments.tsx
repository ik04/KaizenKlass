import PublicLayout from "@/components/PublicLayout";
import { SubjectCard } from "@/components/SubjectCard";
import { GlobalContext } from "@/context/GlobalContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

interface Subject {
  subject: string;
  subject_uuid: string;
}

const assignments = () => {
  const { updateCurrentPage } = useContext(GlobalContext);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  if (updateCurrentPage) {
    updateCurrentPage("classwork");
  }
  const getSubjects = async () => {
    const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/get-subjects`;
    const resp = await axios.get(url);
    console.log(resp.data.subjects);
    setSubjects(resp.data.subjects);
  };
  useEffect(() => {
    getSubjects();
  }, []);
  return (
    <div className="h-screen bg-primary overflow-auto">
      <PublicLayout>
        <div className="grid grid-cols-4 w-full h-full mt-10">
          {subjects.map((subject, index) => (
            <div className="m-2">
              <SubjectCard
                subject={subject.subject}
                subjectUuid={subject.subject_uuid}
                key={index}
              />
            </div>
          ))}
        </div>
      </PublicLayout>
    </div>
  );
};

export default assignments;
