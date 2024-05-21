"use client";
import {
  selectAllAssets,
  useGetITassetsQuery,
} from "@/app/apiSlices/itAssetsApiSlice";
import usePageTitle from "@/app/hooks/usePageTitle";
import { AssetObject } from "@/app/lib/interfaces";
import React from "react";
import { useSelector } from "react-redux";

const itPage = () => {
  usePageTitle("اموال IT");
  const { isLoading, isError } = useGetITassetsQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    // pollingInterval: 10000,
  });

  const allAssets: AssetObject[] = useSelector(
    (state) => selectAllAssets(state) as AssetObject[]
  );

  return <div>itPage</div>;
};

export default itPage;
