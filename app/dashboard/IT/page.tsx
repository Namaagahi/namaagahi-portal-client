"use client";
import Assets from "@/app/features/itAssets/Assets";
import usePageTitle from "@/app/hooks/usePageTitle";
import React from "react";

const itPage = () => {
  usePageTitle("اموال IT");

  return (
    <div>
      <Assets />
    </div>
  );
};

export default itPage;
