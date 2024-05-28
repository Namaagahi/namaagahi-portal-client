"use client";
import {
  selectAllInitialCustomers,
  useGetAllInitialCustomersQuery,
} from "../../apiSlices/initialCustomersApiSlice";
import {
  selectAllPlans,
  selectPlanById,
  useGetAllPlansQuery,
} from "@/app/apiSlices/plansApiSlice";
import { InitialCustomerObject, PlanObject } from "@/app/lib/interfaces";
import { useGetAllBoxesQuery } from "@/app/apiSlices/boxesApiSlice";
import PageTitle from "@/app/components/main/PageTitle";
import Loading from "@/app/features/loading/Loading";
import { useEffect, useState } from "react";
import { EntityId } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import useAuth from "@/app/hooks/useAuth";
import Link from "next/link";
import AllPlansTable from "./AllPlansTable";
import SearchContainer from "@/app/components/main/SearchContainer";
import Button from "@/app/components/main/Button";
import { useRouter } from "next/navigation";

type Props = {
  page: string;
};

const PlansComp = (props: Props) => {
  const { page } = props;
  const { id } = useAuth();
  const { push } = useRouter();

  const { isLoading, isError } = useGetAllPlansQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });

  useGetAllInitialCustomersQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });

  useGetAllBoxesQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });

  const [planId, setPlanId] = useState<string | any | EntityId>("");
  const allPlans: PlanObject[] = useSelector(
    (state) => selectAllPlans(state) as PlanObject[]
  );
  const plan: PlanObject = useSelector(
    (state) => selectPlanById(state, planId!) as PlanObject
  );
  const allInitialCustomers: InitialCustomerObject[] = useSelector(
    (state) => selectAllInitialCustomers(state) as InitialCustomerObject[]
  );
  const [data, setData] = useState<PlanObject[] | []>([]);

  useEffect(() => {
    if (page === "my") {
      setData(
        allPlans
          .filter((plan) => plan.userId === id)
          .filter((x) => x.status === "done")
      );
    } else {
      setData(allPlans);
    }
  }, [allPlans]);

  if (isLoading || !allInitialCustomers[0]) return <Loading />;

  if (isError || !data[0])
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-3">
        <p className="text-xl">هیچ پلن تایید شده ای وجود ندارد</p>

        <p>
          برای انتقال به صفحه پلن ها{" "}
          <Link href={"/dashboard/billboard/plans"}>
            <span className="text-cyan-300">کلیک کنید</span>
          </Link>
        </p>
      </div>
    );

  return (
    <>
      <PageTitle name={"پلن ها"} />

      <div className="flex items-center justify-between gap-3">
        <SearchContainer />
        <Button
          onClickHandler={() => push("/dashboard/billboard/plans/createplan")}
          title="پلن جدید"
        />
      </div>

      <AllPlansTable
        page={page}
        data={data}
        setPlanId={setPlanId}
        plan={plan}
        allInitialCustomers={allInitialCustomers}
      />
    </>
  );
};

export default PlansComp;
