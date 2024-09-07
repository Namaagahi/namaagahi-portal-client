"use client";
import {
  selectInitialCustomerById,
  useGetAllInitialCustomersQuery,
} from "@/app/apiSlices/initialCustomersApiSlice";
import {
  selectPlanById,
  useGetAllPlansQuery,
} from "@/app/apiSlices/plansApiSlice";
import { InitialCustomerObject, PlanObject } from "@/app/lib/interfaces";
import PlanPdfDoc from "@/app/features/plans/PlanPdfDoc";
import Loading from "@/app/features/loading/Loading";
import { PDFViewer } from "@react-pdf/renderer";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import usePageTitle from "@/app/hooks/usePageTitle";
import { useEffect, useState } from "react";

const Invoice = () => {
  usePageTitle("پیش فاکتور پلن");
  const [totalCheck, setTotalCheck] = useState(false);
  const [afterDiscount, setAfterDiscount] = useState(false);

  const { id } = useParams();

  const { isLoading } = useGetAllPlansQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });

  useGetAllInitialCustomersQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });

  const plan: PlanObject = useSelector(
    (state) => selectPlanById(state as PlanObject, id as string) as PlanObject
  );
  const customer: InitialCustomerObject = useSelector(
    (state) =>
      selectInitialCustomerById(
        state,
        plan?.initialCustomerId
      ) as InitialCustomerObject
  );

  if (isLoading || !plan) return <Loading />;
  return (
    <>
      <div className="flex flex-row justify-evenly align-center my-8 py-6 w-[15%]  border-solid border-2 rounded-xl border-sky-500 bg-slate-100 dark:bg-slate-900">
        <div className="gap-2 flex align-center">
          <label htmlFor="totalCheck">جمع دوره</label>
          <input
            type="checkbox"
            id="totalCheck"
            checked={totalCheck}
            onClick={() => setTotalCheck(!totalCheck)}
          />
        </div>
        <div className="gap-2 flex align-center">
          <label htmlFor="afterDiscount"> پس از تخفیف</label>
          <input
            type="checkbox"
            id="afterDiscount"
            checked={afterDiscount}
            onClick={() => setAfterDiscount(!afterDiscount)}
          />
        </div>
      </div>

      <PDFViewer height={900}>
        <PlanPdfDoc
          plan={plan}
          customer={customer}
          totalCheck={totalCheck}
          afterDiscount={afterDiscount}
        />
      </PDFViewer>
    </>
  );
};

export default Invoice;
