import {
  selectAllFinalCustomers,
  useGetAllFinalCustomersQuery,
} from "@/app/apiSlices/finalCustomerApiSlice";
import { useGetAllInitialCustomersQuery } from "@/app/apiSlices/initialCustomersApiSlice";
import { selectAllUsers } from "@/app/apiSlices/usersApiSlice";
import TableComponent from "@/app/components/table/TableComponent";
import useAuth from "@/app/hooks/useAuth";
import {
  FinalCustomerObject,
  InitialCustomerObject,
  PlanObject,
  UserObject,
} from "@/app/lib/interfaces";
import { formatNumber } from "@/app/utilities/formatNumber";
import { ColumnDef } from "@tanstack/react-table";
import moment from "jalali-moment";
import Link from "next/link";
import { FC, useMemo } from "react";
import { FaFilePdf } from "react-icons/fa";
import { useSelector } from "react-redux";

interface IAllContractsTableProps {
  data: PlanObject[];
  allInitialCustomers: InitialCustomerObject[];
}

const AllContractsTable: FC<IAllContractsTableProps> = ({
  data,
  allInitialCustomers,
}) => {
  const { isMaster, isAdmin, isMediaManager } = useAuth();

  useGetAllFinalCustomersQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });
  useGetAllInitialCustomersQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });

  const allFinalCustomers: FinalCustomerObject[] = useSelector(
    (state) => selectAllFinalCustomers(state) as FinalCustomerObject[]
  );

  const columns = useMemo<ColumnDef<PlanObject>[]>(() => {
    return [
      {
        header: "جدول قراردادها",
        columns: [
          {
            accessorKey: "_id",
            accessorFn: (row) => row.id,
            id: "_id",
            cell: (info) => null,
            header: () => null,
          },
          {
            accessorFn: (row) => row.initialCustomerId,
            id: "مشتری",
            cell: (info) => {
              const customer: InitialCustomerObject | undefined =
                allInitialCustomers.find(
                  (customer: InitialCustomerObject) =>
                    customer.id === info.getValue()
                );
              return <div>{customer?.name}</div>;
            },
            header: () => <span>نام مشتری</span>,
            enableColumnFilter: false,
          },
          {
            accessorFn: (row) => row.brand,
            id: "برند",
            cell: (info) => info.getValue(),
            header: () => <span>برند</span>,
          },
          {
            accessorFn: (row) => row.structures,
            id: "تاریخ شروع",
            header: () => <span>تاریخ شروع</span>,
            enableColumnFilter: false,
            cell: (info) => {
              const number = info
                .getValue()
                .map((x: any) => x.duration.sellStart);
              const startedAt = Math.min(...number);

              return <p>{moment.unix(startedAt).format("jYYYY-jM-jD")}</p>;
            },
          },
          {
            accessorFn: (row) => row.structures,
            id: "تاریخ پایان",
            header: () => <span>تاریخ پایان</span>,
            enableColumnFilter: false,
            cell: (info) => {
              const number = info
                .getValue()
                .map((x: any) => x.duration.sellEnd);
              const finishedAt = Math.max(...number);
              return <p>{moment.unix(finishedAt).format("jYYYY-jM-jD")}</p>;
            },
          },
          {
            accessorFn: (row) => row.structures,
            id: "تعداد سازه",
            cell: (info) => info.getValue().length,
            header: () => <span>تعداد سازه</span>,
            enableColumnFilter: false,
          },
          {
            accessorFn: (row) => row?.structures,
            id: "جمع دوره",
            cell: (info) => {
              const totalCost = info
                .getValue()
                .map((x: any) => x.totalPeriodCost);
              return (
                <p>
                  {formatNumber(
                    totalCost.reduce((a: number, b: number) => a + b),
                    ","
                  )}
                </p>
              );
            },
            header: () => <span>جمع دوره</span>,
          },
          {
            accessorFn: (row) => row,
            id: "فاکتور رسمی",
            cell: (info) => {
              const finalCustomer = allFinalCustomers.find(
                (finalCustomer: FinalCustomerObject) =>
                  finalCustomer?.finalCustomerId ===
                  info.getValue().finalCustomerId
              );
              return (
                <p>
                  {finalCustomer?.contractType === "official"
                    ? "رسمی"
                    : "غیر رسمی"}
                </p>
              );
            },
            header: () => <span>فاکتور رسمی</span>,
          },
          {
            accessorFn: (row) => row,
            id: "حقیقی یا حقوقی",
            cell: (info) => {
              const finalCustomer = allFinalCustomers.find(
                (finalCustomer: FinalCustomerObject) =>
                  finalCustomer?.finalCustomerId ===
                  info.getValue().finalCustomerId
              );
              return (
                <p>
                  {finalCustomer?.customerType === "legal" ? "حقوقی" : "حقیقی"}
                </p>
              );
            },
            header: () => <span>مشتری(حقیقی یا حقوقی)</span>,
          },
          {
            accessorFn: (row) => row,
            id: "نام مدیر یا نماینده",
            cell: (info) => {
              const finalCustomer = allFinalCustomers.find(
                (finalCustomer: FinalCustomerObject) =>
                  finalCustomer?.finalCustomerId ===
                  info.getValue().finalCustomerId
              );
              return <p>{finalCustomer?.agent[0].agentName}</p>;
            },
            header: () => <span>نام مدیر یا نماینده</span>,
            enableColumnFilter: false,
          },
          {
            id: "پیش فاکتور",
            header: () => <span>پیش فاکتور</span>,
            cell: (info) => {
              const row = info.row.original;
              return (
                <Link href={`/dashboard/billboard/contracts/${row.id}`}>
                  <div className="flex justify-center text-xl text-red-600 dark:text-red-300 transition-all dark:hover:text-gray-300 hover:text-gray-500 cursor-pointer">
                    <FaFilePdf />
                  </div>
                </Link>
              );
            },
          },
        ],
      },
    ];
  }, []);

  return <TableComponent columns={columns} data={data} />;
};

export default AllContractsTable;
