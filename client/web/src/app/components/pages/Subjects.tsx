"use client";
import PublicLayout from "../PublicLayout";
import { SubjectCard } from "../SubjectCard";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";

interface Subject {
  subject: string;
  subject_uuid: string;
}

const Subjects = () => {
  const { updateCurrentPage } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  if (updateCurrentPage) {
    updateCurrentPage("classwork");
  }
  const getSubjects = async () => {
    const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/get-subjects`;
    const resp = await axios.get(url);
    console.log(resp.data.subjects);
    setSubjects(resp.data.subjects);
    setLoading(false);
  };
  useEffect(() => {
    getSubjects();
  }, []);
  return (
    <div className="h-screen bg-primary overflow-auto">
      <PublicLayout>
        {!loading ? (
          <>
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
          </>
        ) : (
          <>
            {" "}
            <div className="flex justify-center items-center h-[100vh]">
              <PacmanLoader color="#4592AF" size={60} loading={loading} />
            </div>
          </>
        )}
      </PublicLayout>
    </div>
  );
};

export default Subjects;
