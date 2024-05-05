import {
  selectAllInitialCustomers,
  useGetAllInitialCustomersQuery,
} from "@/app/apiSlices/initialCustomersApiSlice";
import {
  selectAllPlans,
  useGetAllPlansQuery,
} from "@/app/apiSlices/plansApiSlice";
import PageTitle from "@/app/components/main/PageTitle";
import SearchContainer from "@/app/components/main/SearchContainer";
import useAuth from "@/app/hooks/useAuth";
import { InitialCustomerObject, PlanObject } from "@/app/lib/interfaces";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useSelector } from "react-redux";
import Loading from "../loading/Loading";
import Link from "next/link";
import AllContractsTable from "./AllContractsTable";

interface IContractsMainProps {}

const ContractsMain: FC<IContractsMainProps> = () => {
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

  const allPlans: PlanObject[] = useSelector(
    (state) => selectAllPlans(state) as PlanObject[]
  );
  const donePlans = allPlans.filter((x) => x.status === "done");
  const allInitialCustomers: InitialCustomerObject[] = useSelector(
    (state) => selectAllInitialCustomers(state) as InitialCustomerObject[]
  );

  if (isLoading || !allInitialCustomers[0]) return <Loading />;

  if (isError)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-3">
        <p className="text-xl">هیچ پلنی وجود ندارد</p>

        <p>
          برای ایجاد پلن جدید
          <Link href={"/dashboard/billboard/plans/createplan"}>
            <span className="text-cyan-300">کلیک کنید</span>
          </Link>
        </p>
      </div>
    );

  return (
    <>
      <PageTitle name={"قراردادها"} />
      <div className="flex items-center justify-between gap-3">
        <SearchContainer />
      </div>
      <AllContractsTable
        data={donePlans}
        allInitialCustomers={allInitialCustomers}
      />
    </>
  );
};

export default ContractsMain;
