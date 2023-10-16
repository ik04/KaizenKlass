"use client";
import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../app/context/GlobalContext";
import PublicLayout from "../PublicLayout";
import { PacmanLoader } from "react-spinners";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Assignment {
  title: string;
  assignment_uuid: string;
  subject: string;
}
interface Subject {
  subject: string;
  subject_uuid: string;
}

const Assignments = () => {
  const [loading, setLoading] = useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const getSubjects = async () => {
    const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/get-subjects`;
    const resp = await axios.get(url);
    console.log(resp.data.subjects);
    setSubjects(resp.data.subjects);
    setLoading(false);
  };

  const getAssignmentsWithSubjects = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/get-assignment-subjects`;
      const resp = await axios.get(url);
      setAssignments(resp.data.assignments);
    } catch (error) {
      console.log(error);
    }
  };

  const { updateCurrentPage, role } = useContext(GlobalContext);
  if (updateCurrentPage) {
    updateCurrentPage("classwork");
  }

  useEffect(() => {
    getAssignmentsWithSubjects();
    getSubjects();
  }, []);

  return (
    <div className="h-screen bg-primary overflow-auto">
      <PublicLayout>
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
                  {role === 2 && (
                    <Dialog>
                      <DialogTrigger>
                        <div className="cursor-pointer h-[180px] bg-primary-complement text-custom-blue px-5 rounded-[20px] flex flex-col justify-center my-3 hover:text-white duration-300 transition-all">
                          <div className="flex space-x-4 items-center w-full ">
                            <h2 className="font-base text-[40px] font-light">
                              Add New Assignment
                            </h2>
                            <Image
                              src={"/assets/addButton.png"}
                              alt="arrow"
                              width={50}
                              height={50}
                            />
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-4xl font-light font-base">
                            Add Assignment
                          </DialogTitle>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="title"
                                className="text-right text-gray-400"
                              >
                                Title
                              </Label>
                              <Input
                                id="title"
                                placeholder="Title"
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="description"
                                className="text-right text-gray-400"
                              >
                                Description
                              </Label>
                              <Textarea
                                id="description"
                                placeholder="Description"
                                className="col-span-3"
                              />
                            </div>
                          </div>{" "}
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="title"
                              className="text-right text-gray-400"
                            >
                              Subject
                            </Label>
                            {/*? cache subjects in storage */}
                            <Select>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Subject" />
                              </SelectTrigger>
                              <SelectContent>
                                {subjects.map((subject) => (
                                  <SelectItem value={subject.subject_uuid}>
                                    {subject.subject}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  )}
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
