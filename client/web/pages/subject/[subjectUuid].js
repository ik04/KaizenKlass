import React, { useEffect, useState } from "react";
import PublicLayout from "@/components/PublicLayout";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

const Subject = () => {
  const [subjectName, setSubjectName] = useState("");
  const [assignments, setAssignments] = useState([]);
  const router = useRouter();
  const { subjectUuid } = router.query;
  const getSubjectAssignments = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/get-subject-assignments/${subjectUuid}`;
      const resp = await axios.get(url);
      console.log(resp.data);
      setSubjectName(resp.data.subject);
      setAssignments(resp.data.assignments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (subjectUuid != undefined) {
      getSubjectAssignments();
    }
  }, [subjectUuid]);

  return (
    <div className="h-screen bg-primary overflow-auto">
      <PublicLayout>
        <div className="w-full h-full mt-10 flex flex-col">
          <div className="">
            <Link href={"/subjects"} className="flex items-center gap-3 p-3">
              <Image src={"/assets/blueBackArrow.png"} width={60} height={60} />
              <h1 className="font-base font-light text-[50px] text-custom-blue">
                {subjectName}
              </h1>
            </Link>
            <div className="flex flex-col justify-between">
              {assignments.map((assignment) => (
                <Link
                  href={`/assignment/${assignment.assignment_uuid}`}
                  className="h-[180px] bg-primary-complement text-custom-blue rounded-[20px] flex items-center my-3 hover:text-white duration-300 transition-all"
                >
                  <div className="flex justify-between items-center w-full px-3">
                    <h2 className="font-base text-[40px] font-light">
                      {assignment.title}
                    </h2>
                    <Image
                      src={"/assets/blueRightArrow.png"}
                      width={65}
                      height={65}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </PublicLayout>
    </div>
  );
};
// todo : list assignments by subject here but in aiggnments page just list out all assignments
export default Subject;
