"use client";
import PlansComp from "@/app/features/plans/PlansComp";
import usePageTitle from "@/app/hooks/usePageTitle";
import React from "react";

const Archieve = () => {
  usePageTitle("پلن های آرشیو");

  return <PlansComp page={"archieve"} />;
};

export default Archieve;
