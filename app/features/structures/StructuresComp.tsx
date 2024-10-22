"use client";
import {
  selectAllStructures,
  useGetStructuresQuery,
} from "@/app/apiSlices/structuresApiSlice";
import { BoxObject, PlanObject, StructureObject } from "@/app/lib/interfaces";
import PageTitle from "@/app/components/main/PageTitle";
import AllStructuresTable from "./AllStructuresTable";
import Loading from "@/app/features/loading/Loading";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchContainer from "@/app/components/main/SearchContainer";
import Button from "@/app/components/main/Button";
import { useRouter } from "next/navigation";
import ScrollContainer from "@/app/components/main/ScrollContainer";
import {
  selectAllPlans,
  useGetAllPlansQuery,
} from "@/app/apiSlices/plansApiSlice";
import useAuth from "@/app/hooks/useAuth";

type Props = {
  page: string;
  allBoxes: BoxObject[];
};

const Structures = (props: Props) => {
  const { page, allBoxes } = props;

  const { push } = useRouter();
  const { username } = useAuth();

  const { isLoading, isError } = useGetStructuresQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    pollingInterval: 5000,
  });

  const { isLoading: plansLoading } = useGetAllPlansQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });

  const allStructures: StructureObject[] = useSelector(
    (state) => selectAllStructures(state) as StructureObject[]
  );
  const allPlans: PlanObject[] = useSelector(
    (state) => selectAllPlans(state) as PlanObject[]
  );

  const [data, setData] = useState<StructureObject[]>([]);

  useEffect(() => {
    setData(
      username === "amin.haddadi1995@gmail.com" || username === "soltani"
        ? allStructures
        : allStructures.filter((x) => /\d$/.test(x.name))
    );
  }, [allStructures]);

  const handleButtonClick = () =>
    push("/dashboard/billboard/structures/createstructure");

  if (isLoading || !allStructures[0] || plansLoading) return <Loading />;

  if (isError)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-3">
        <p className="text-xl">هیچ سازه ای وجود ندارد</p>
      </div>
    );
  return (
    <>
      <PageTitle name={"سازه ها"} />
      <div className="flex items-center justify-between gap-3">
        <SearchContainer />
        <Button onClickHandler={handleButtonClick} title="سازه جدید" />
      </div>
      <AllStructuresTable
        data={data}
        page={page}
        allBoxes={allBoxes}
        allPlans={allPlans}
        handleData={(val: StructureObject[]) => setData(val)}
      />
      <ScrollContainer />
    </>
  );
};

export default Structures;
