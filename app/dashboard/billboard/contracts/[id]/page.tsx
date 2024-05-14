"use client";
import {
  selectInitialCustomerById,
  useGetAllInitialCustomersQuery,
} from "@/app/apiSlices/initialCustomersApiSlice";
import {
  selectPlanById,
  useGetAllPlansQuery,
} from "@/app/apiSlices/plansApiSlice";
import {
  FinalCustomerObject,
  InitialCustomerObject,
  PlanObject,
  ProjectCodeObject,
} from "@/app/lib/interfaces";
import Loading from "@/app/features/loading/Loading";
import { PDFViewer } from "@react-pdf/renderer";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import usePageTitle from "@/app/hooks/usePageTitle";
import ContractPdfDoc from "@/app/features/contracts/ContractPdfDoc";
import {
  selectAllFinalCustomers,
  selectFinalCustomerById,
  useGetAllFinalCustomersQuery,
} from "@/app/apiSlices/finalCustomerApiSlice";
import {
  selectProjectCodeById,
  useGetAllProjectCodesQuery,
} from "@/app/apiSlices/projectCodeApiSlice";

const ContractInvoice = () => {
  usePageTitle("شناسه اجاره بیلبورد");

  const { id } = useParams();

  const { isLoading } = useGetAllPlansQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });

  useGetAllInitialCustomersQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });
  useGetAllFinalCustomersQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });

  const plan: PlanObject = useSelector(
    (state) => selectPlanById(state as PlanObject, id as string) as PlanObject
  );
  const initialCustomer: InitialCustomerObject = useSelector(
    (state) =>
      selectInitialCustomerById(
        state,
        plan?.initialCustomerId
      ) as InitialCustomerObject
  );

  const allFinalCustomers: FinalCustomerObject[] = useSelector(
    (state) => selectAllFinalCustomers(state) as FinalCustomerObject[]
  );
  const finalCustomer = allFinalCustomers.find(
    (finalCustomer: FinalCustomerObject) =>
      finalCustomer?.finalCustomerId === plan?.finalCustomerId
  );
  console.log(finalCustomer);

  const { isLoading: projectCodesLoading } = useGetAllProjectCodesQuery(
    undefined,
    {
      refetchOnFocus: false,
      refetchOnReconnect: false,
    }
  );

  const projectCode: ProjectCodeObject = useSelector(
    (state) =>
      selectProjectCodeById(state, plan?.projectCodeId) as ProjectCodeObject
  );

  const indentifyNumber = projectCode?.code.startsWith("BB")
    ? projectCode?.code.substring(2)
    : projectCode?.code.startsWith("MTR" || "BUS" || "NMV" || "BIL")
    ? projectCode?.code.substring(3)
    : projectCode?.code;

  if (isLoading || !plan) return <Loading />;
  return (
    <>
      <PDFViewer height={900}>
        <ContractPdfDoc
          plan={plan}
          customer={initialCustomer}
          code={indentifyNumber}
          finalCustomer={finalCustomer}
        />
      </PDFViewer>
    </>
  );
};

export default ContractInvoice;
