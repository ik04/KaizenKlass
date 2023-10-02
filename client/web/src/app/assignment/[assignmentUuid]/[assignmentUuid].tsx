import React from "react";
import { useRouter } from "next/router";

const assignment = () => {
  const router = useRouter();
  const { assignmentUuid } = router.query;
  const getAssignmentDetails = async () => {
    const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/get-subject-assignments/${assignmentUuid}`;
  };
  return <div></div>;
};

export default assignment;
