"use client";
import React, { useEffect, useState } from "react";
import PublicLayout from "../PublicLayout";
import { PacmanLoader } from "react-spinners";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

interface Assignment {
  title: string;
  assignment_uuid: string;
  subject: string;
}

const Assignments = () => {
  const [loading, setLoading] = useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const getAssignmentsWithSubjects = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/get-assignment-subjects`;
      const resp = await axios.get(url);
      setAssignments(resp.data.assignments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAssignmentsWithSubjects();
  }, []);

  return (
    <div className="h-screen bg-primary overflow-auto">
      <PublicLayout>
        {" "}
        <div className="w-full h-full mt-10 flex flex-col">
          {!loading ? (
            <>
              <div className="">
                <div className="flex items-center gap-3 p-3">
                  <h1 className="font-base font-light text-[50px] text-custom-blue">
                    Assignments
                  </h1>
                </div>
                <div className="flex flex-col justify-between">
                  {assignments.map((assignment) => (
                    <Link
                      href={`/assignment/${assignment.assignment_uuid}`}
                      className="h-[180px] bg-primary-complement text-custom-blue px-5 rounded-[20px] flex flex-col justify-center my-3 hover:text-white duration-300 transition-all"
                    >
                      <div className="flex justify-between items-center w-full ">
                        <h2 className="font-base text-[40px] font-light">
                          {assignment.title}
                        </h2>
                        <Image
                          src={"/assets/blueRightArrow.png"}
                          alt="arrow"
                          width={65}
                          height={65}
                        />
                      </div>
                      <div className="font-base text-gray-400 text-2xl">
                        {assignment.subject}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-[80vh]">
              <PacmanLoader color="#4592AF" size={60} loading={loading} />
            </div>
          )}
        </div>
      </PublicLayout>
    </div>
  );
};

export default Assignments;
