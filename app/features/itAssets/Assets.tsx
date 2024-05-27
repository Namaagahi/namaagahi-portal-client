import {
  selectAllAssets,
  useGetITassetsQuery,
} from "@/app/apiSlices/itAssetsApiSlice";
import { AssetObject } from "@/app/lib/interfaces";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../loading/Loading";
import PageTitle from "@/app/components/main/PageTitle";
import SearchContainer from "@/app/components/main/SearchContainer";
import Button from "@/app/components/main/Button";
import ScrollContainer from "@/app/components/main/ScrollContainer";
import AllAssetsTable from "./AllAssetsTable";
import useAuth from "@/app/hooks/useAuth";
import NewAsset from "./NewAsset";

const Assets = () => {
  const [data, setData] = useState<AssetObject[]>([]);
  const [isNewAsset, setIsNewAsset] = useState<boolean>(false);

  const handleNewAsset = () => setIsNewAsset(!isNewAsset);

  const { isLoading, isError } = useGetITassetsQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    // pollingInterval: 10000,
  });

  const allAssets: AssetObject[] = useSelector(
    (state) => selectAllAssets(state) as AssetObject[]
  );

  useEffect(() => {
    setData(allAssets);
  }, [allAssets]);

  if (isLoading || !allAssets[0]) return <Loading />;

  if (isError)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-3">
        <p className="text-xl">هیچ دارایی وجود ندارد</p>
      </div>
    );

  return (
    <>
      <PageTitle name={"دارایی های IT"} />
      <div className="flex items-center justify-between gap-3">
        <SearchContainer />
        <Button onClickHandler={handleNewAsset} title="ثبت دارایی  جدید" />
      </div>
      <AllAssetsTable data={data} />
      <ScrollContainer />
      {isNewAsset && <NewAsset handleModal={handleNewAsset} />}
    </>
  );
};

export default Assets;
