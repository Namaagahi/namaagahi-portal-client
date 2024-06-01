"use client";
import {
  selectAllFinalCustomers,
  selectFinalCustomerById,
  useGetAllFinalCustomersQuery,
} from "@/app/apiSlices/finalCustomerApiSlice";
import Button from "@/app/components/main/Button";
import PageTitle from "@/app/components/main/PageTitle";
import SearchContainer from "@/app/components/main/SearchContainer";
import Tooltip from "@/app/components/main/Tooltip";
import ConfirmModal from "@/app/components/modals/ConfirmModal";
import CreateUpdateModal from "@/app/components/modals/CreateUpdateModal";
import TableComponent from "@/app/components/table/TableComponent";
import Loading from "@/app/features/loading/Loading";
import useAuth from "@/app/hooks/useAuth";
import usePageTitle from "@/app/hooks/usePageTitle";
import { FinalCustomerObject } from "@/app/lib/interfaces";
import { EntityId } from "@reduxjs/toolkit";
import { ColumnDef } from "@tanstack/react-table";
import moment from "jalali-moment";
import { useEffect, useMemo, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";

const FinalCustomers = () => {
  usePageTitle("مشتریان ");

  const { isAdmin, isMaster } = useAuth();

  const { isLoading, isError } = useGetAllFinalCustomersQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });

  const allFinallCustomers: FinalCustomerObject[] = useSelector(
    (state) => selectAllFinalCustomers(state) as FinalCustomerObject[]
  );
  const [data, setData] = useState<FinalCustomerObject[] | unknown>([]);
  const [isDeleteFinalCustomer, setIsDeleteFinalCustomer] =
    useState<boolean>(false);
  const [isNewFinalCustomer, setIsNewFinalCustomer] = useState<boolean>(false);
  const [isEditFinalCustomer, setIsEditFinalCustomer] =
    useState<boolean>(false);
  const [finalCustomerId, setFinalCustomerId] = useState<
    string | any | EntityId
  >("");
  const handleNewFinalCustomerModal = () =>
    setIsNewFinalCustomer(!isNewFinalCustomer);
  const handleDeleteFinalCustomer = () =>
    setIsDeleteFinalCustomer(!isDeleteFinalCustomer);
  const handleEditFinalCustomer = () =>
    setIsEditFinalCustomer(!isEditFinalCustomer);
  const finalCustomer: FinalCustomerObject = useSelector(
    (state) =>
      selectFinalCustomerById(state, finalCustomerId) as FinalCustomerObject
  );

  useEffect(() => {
    setData(allFinallCustomers);
  }, [allFinallCustomers]);

  const columns = useMemo<ColumnDef<FinalCustomerObject, any>[]>(() => {
    return [
      {
        header: "جدول مشتریان ",
        columns: [
          {
            accessorKey: "_id",
            accessorFn: (row) => row.id,
            id: "_id",
            cell: (info) => null,
            header: () => null,
          },
          {
            accessorKey: "username",
            accessorFn: (row) => row.username,
            id: "کاربر ایجاد کننده",
            cell: (info) => info.getValue(),
            header: () => <span>کاربر ایجاد کننده</span>,
          },
          {
            accessorFn: (row) => row.name,
            id: "نام شرکت",
            cell: (info) => {
              return (
                <p className={`${!info.getValue() && "text-red-500"}`}>
                  {!info.getValue() ? "تعیین نشده" : info.getValue()}
                </p>
              );
            },
            header: () => <span>نام شرکت</span>,
          },
          {
            accessorFn: (row) => row.nationalId,
            id: "شناسه ملی",
            cell: (info) => {
              return (
                <p className={`${!info.getValue() && "text-red-500"}`}>
                  {!info.getValue() ? "تعیین نشده" : info.getValue()}
                </p>
              );
            },
            header: () => <span>شناسه ملی</span>,
          },
          {
            accessorFn: (row) => row.contractType,
            id: "نوع قرارداد",
            cell: (info) => {
              return (
                <p>{info.getValue() === "official" ? "رسمی" : "غیر رسمی"}</p>
              );
            },
            header: () => <span>نوع قرارداد</span>,
          },
          {
            accessorFn: (row) => row.customerType,
            id: "نوع مشتری",
            cell: (info) => {
              return <p>{info.getValue() === "legal" ? "حقوقی" : "حقیقی"}</p>;
            },
            header: () => <span>نوع مشتری</span>,
          },
          {
            accessorFn: (row) => row.agent?.[0]?.agentName,
            id: "نام نماینده اول",
            cell: (info) => {
              return (
                <p className={`${!info.getValue() && "text-red-500"}`}>
                  {!info.getValue() ? "تعیین نشده" : info.getValue()}
                </p>
              );
            },
            header: () => <span>نام نماینده اول</span>,
          },
          {
            accessorFn: (row) => row.agent?.[0]?.post,
            id: "پست سازمانی نماینده اول",
            cell: (info) => {
              return (
                <p className={`${!info.getValue() && "text-red-500"}`}>
                  {!info.getValue() ? "تعیین نشده" : info.getValue()}
                </p>
              );
            },
            header: () => <span>پست سازمانی نماینده اول</span>,
          },

          {
            accessorFn: (row) => row.ecoCode,
            id: "کد اقتصادی",
            cell: (info) => {
              return (
                <p className={`${!info.getValue() && "text-red-500"}`}>
                  {!info.getValue() ? "تعیین نشده" : info.getValue()}
                </p>
              );
            },
            header: () => <span>کد اقتصادی</span>,
          },
          {
            accessorFn: (row) => row.regNum,
            id: "شماره ثبت",
            cell: (info) => {
              return (
                <p className={`${!info.getValue() && "text-red-500"}`}>
                  {!info.getValue() ? "تعیین نشده" : info.getValue()}
                </p>
              );
            },
            header: () => <span>شماره ثبت</span>,
          },
          {
            accessorFn: (row) => row.address,
            id: "آدرس",
            cell: (info) => {
              return (
                <Tooltip
                  tooltipText={info.getValue() && info.getValue()}
                  orientation="left"
                >
                  <p>
                    {!info.getValue()
                      ? "تعیین نشده"
                      : `${info.getValue().slice(0, 8)}...`}
                  </p>
                </Tooltip>
              );
            },
            header: () => <span>آدرس</span>,
          },
          {
            accessorFn: (row) => row.postalCode,
            id: "کد پستی",
            cell: (info) => {
              return (
                <p className={`${!info.getValue() && "text-red-500"}`}>
                  {!info.getValue() ? "تعیین نشده" : info.getValue()}
                </p>
              );
            },
            header: () => <span>کد پستی</span>,
          },
          {
            accessorFn: (row) => row.phone,
            id: "تلفن",
            cell: (info) => {
              return (
                <p className={`${!info.getValue() && "text-red-500"}`}>
                  {!info.getValue() ? "تعیین نشده" : info.getValue()}
                </p>
              );
            },
            header: () => <span>تلفن</span>,
          },
          {
            id: "عملیات",
            header: () => <span>عملیات</span>,
            cell: (info) => {
              const row = info.row.original;
              return (
                <>
                  {isMaster || isAdmin ? (
                    <p
                      className="px-6 flex items-center justify-center gap-5"
                      onClick={() => setFinalCustomerId(row.id)}
                    >
                      <div className="flex items-center p-1 border-[1px] border-[#737373] rounded-md cursor-pointer gap-3">
                        <AiFillEdit
                          className="text-black dark:text-white hover:scale-125 transition-all"
                          size={20}
                          onClick={handleEditFinalCustomer}
                        />
                        <AiFillDelete
                          className="text-black dark:text-white hover:scale-125 transition-all"
                          size={20}
                          onClick={handleDeleteFinalCustomer}
                        />
                      </div>
                    </p>
                  ) : (
                    <>
                      <p>دسترسی محدود شده</p>
                    </>
                  )}
                </>
              );
            },
          },
          {
            accessorFn: (row) => row.createdAt,
            id: "تاریخ ایجاد",
            header: () => <span>تاریخ ایجاد</span>,
            enableColumnFilter: false,
            cell: (info) => {
              const createdAt = info.getValue();
              return <p>{moment(createdAt).format("jYYYY/jM/jD")}</p>;
            },
          },
          {
            accessorFn: (row) => row.updatedAt,
            id: "تاریخ ویرایش",
            header: () => <span>تاریخ ویرایش</span>,
            enableColumnFilter: false,
            cell: (info) => {
              const updatedAt = info.getValue();
              return <p>{moment(updatedAt).format("jYYYY/jM/jD")}</p>;
            },
          },
        ],
      },
    ];
  }, []);

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-3">
        <p className="text-xl">هیچ مشتری ای وجود ندارد</p>
      </div>
    );

  return (
    <>
      <PageTitle name={"مشتریان "} />
      <div className="flex items-center justify-between gap-3">
        <SearchContainer />
        <Button
          onClickHandler={handleNewFinalCustomerModal}
          title="مشتری  جدید"
        />
      </div>

      <TableComponent columns={columns} data={data} />
      {isNewFinalCustomer && (
        <CreateUpdateModal
          type={"newFinalCustomer"}
          handleModal={handleNewFinalCustomerModal}
        />
      )}
      {isEditFinalCustomer && (
        <CreateUpdateModal
          prop={finalCustomer}
          handleModal={handleEditFinalCustomer}
          type={"editFinalCustomer"}
        />
      )}
      {isDeleteFinalCustomer && (
        <ConfirmModal
          prop={finalCustomer}
          handleModal={handleDeleteFinalCustomer}
          type={"delete"}
          deleteType="finalCustomer"
        />
      )}
    </>
  );
};

export default FinalCustomers;
