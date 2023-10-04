"use client";
import React, { useEffect, useState } from "react";
import PublicLayout from "../PublicLayout";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PacmanLoader } from "react-spinners";

const Assignment = ({ assignmentUuid }: { assignmentUuid: string }) => {
  // optimize load times in the future and use the app router better
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const getAssignmentDetails = async () => {
    const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/get-assignment/${assignmentUuid}`;
    const resp = await axios.get(url);
    console.log(resp.data.assignment);
    setTitle(resp.data.assignment.title);
    setDescription(resp.data.assignment.description);
    setLink(resp.data.assignment.link);
    setContent(resp.data.assignment.content);
    setLoading(false);
  };

  const handleDownload = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}${content}`;
      const resp = await axios.get(url, { responseType: "blob" });

      const blob = new Blob([resp.data], {
        type: resp.headers["content-type"],
      });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "assignment_file.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  useEffect(() => {
    getAssignmentDetails();
  }, [assignmentUuid]);
  return (
    <div className="h-screen bg-primary overflow-auto">
      <PublicLayout>
        <div className="w-full h-full mt-10 flex flex-col">
          {!loading ? (
            <>
              <div className="">
                <div className="flex items-center gap-3 p-3">
                  <Image
                    alt="arrow"
                    onClick={() => router.back()}
                    src={"/assets/blueBackArrow.png"}
                    width={60}
                    height={60}
                  />
                  <h1 className="font-base font-light text-[50px] text-custom-blue">
                    {title}
                  </h1>
                </div>
                <div className="description-section flex justify-center">
                  <div className="w-[88%] bg-primary-complement p-3 flex flex-col">
                    <h1 className="text-custom-blue font-base text-2xl mb-1">
                      Decription:
                    </h1>
                    {description != null && description != undefined ? (
                      <div className="font-base text-xl text-[#C3C3C3] mb-5">
                        {description}
                      </div>
                    ) : (
                      <div>
                        <p className="font-base text-2xl text-[#C3C3C3]">
                          No Description Provided
                        </p>
                      </div>
                    )}
                    {link != null && (
                      <div>
                        <p className="text-[#C3C3C3] font-base text-xl">
                          Link:
                          <Link
                            target="_blank"
                            href={link}
                            className="text-custom-blue"
                          >
                            {" "}
                            {link}
                          </Link>
                        </p>
                        <button
                          className="text-custom-blue cursor-pointer"
                          onClick={handleDownload}
                        >
                          Download Assignment File
                        </button>
                        {/* <a
                          className="text-custom-blue"
                          href={`${process.env.NEXT_PUBLIC_DOMAIN_NAME}${content}`}
                          download={"content.pdf"}
                          onClick={(e) => e.preventDefault()}
                        >
                          Download Assignment File
                        </a> */}
                      </div>
                    )}
                  </div>
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

export default Assignment;
