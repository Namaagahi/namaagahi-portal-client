import { selectStructureById } from "@/app/apiSlices/structuresApiSlice";
import CreateUpdateModal from "@/app/components/modals/CreateUpdateModal";
import TableComponent from "@/app/components/table/TableComponent";
import { AssetObject, UserObject } from "@/app/lib/interfaces";
import ConfirmModal from "@/app/components/modals/ConfirmModal";
import React, { useEffect, useMemo, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Status from "@/app/components/main/Status";
import { ColumnDef } from "@tanstack/react-table";
import { EntityId } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import useAuth from "@/app/hooks/useAuth";
import moment from "jalali-moment";
import Link from "next/link";
import { selectAssetById } from "@/app/apiSlices/itAssetsApiSlice";
import { selectAllUsers } from "@/app/apiSlices/usersApiSlice";

type Props = {
  data: AssetObject[];
};

const AllAssetsTable = (props: Props) => {
  const { data } = props;
  const [isEditAsset, setIsEditAsset] = useState<boolean>(false);
  const [isDeleteAsset, setIsDeleteAsset] = useState<boolean>(false);
  const handleEditAsset = () => setIsEditAsset(!isEditAsset);
  const handleDeleteAsset = () => setIsDeleteAsset(!isDeleteAsset);

  const { isAdmin, isMediaManager, id } = useAuth();
  const [assetId, SetAssetID] = useState<string | any | EntityId>("");
  const asset: AssetObject = useSelector(
    (state) => selectAssetById(state, assetId!) as AssetObject
  );

  const columns = useMemo<ColumnDef<AssetObject, any>[]>(() => {
    return [
      {
        header: "جدول دارایی ها",
        columns: [
          {
            accessorKey: "_id",
            accessorFn: (row) => row.id,
            id: "_id",
            cell: (info) => null,
            header: () => null,
          },

          {
            accessorKey: "personelName",
            accessorFn: (row) => row.personel.name,
            id: "مسئول دارایی",
            cell: (info) => {
              const name = info.getValue();
              return <p>{name}</p>;
            },
            header: () => <span>مسئول دارایی</span>,
          },
          {
            accessorKey: "personelCode",
            accessorFn: (row) => row.personel.code,
            id: "کد پرسنلی",
            cell: (info) => {
              const code = info.getValue();
              return <p>{code}</p>;
            },
            header: () => <span>کد پرسنلی</span>,
          },
          {
            accessorKey: "department",
            accessorFn: (row) => row.department,
            id: "ساختمان",
            cell: (info) => {
              const department = info.getValue();
              return <p>{department}</p>;
            },
            header: () => <span>ساختمان</span>,
          },
          {
            accessorKey: "unit",
            accessorFn: (row) => row.unit,
            id: "واحد",
            cell: (info) => {
              const unit = info.getValue();
              return <p>{unit}</p>;
            },
            header: () => <span>واحد</span>,
          },
          {
            accessorKey: "assetName",
            accessorFn: (row) => row.asset.name,
            id: "شرح دارایی",
            cell: (info) => {
              const assetName = info.getValue();
              return <p>{assetName}</p>;
            },
            header: () => <span>شرح دارایی</span>,
          },
          {
            accessorKey: "assetSerial",
            accessorFn: (row) => row.asset.serial,
            id: "سریال دارایی",
            cell: (info) => {
              const assetSerial = info.getValue();
              return <p>{assetSerial}</p>;
            },
            header: () => <span>سریال دارایی</span>,
          },
          {
            accessorKey: "assetCode",
            accessorFn: (row) => row.asset.code,
            id: "کد اموال",
            cell: (info) => {
              const assetCode = info.getValue();
              return <p>{assetCode}</p>;
            },
            header: () => <span>کد اموال</span>,
          },

          {
            accessorFn: (row) => row.createdAt,
            id: "تاریخ ایجاد",
            header: () => <span>تاریخ ایجاد</span>,
            cell: (info) => {
              const createdAt = info.getValue();
              return <p>{moment(createdAt).format("jYYYY/jM/jD")}</p>;
            },
          },
          {
            accessorFn: (row) => row.updatedAt,
            id: "تاریخ ویرایش",
            header: () => <span>تاریخ ویرایش</span>,
            cell: (info) => {
              const updatedAt = info.getValue();
              return <p>{moment(updatedAt).format("jYYYY/jM/jD")}</p>;
            },
          },
          {
            accessorKey: "describtion",
            accessorFn: (row) => row.describtion,
            id: "توضیحات",
            cell: (info) => {
              const describtion = info.getValue();
              return <p>{describtion}</p>;
            },
            header: () => <span>توضیحات</span>,
          },
          {
            id: "عملیات",
            header: () => <span>عملیات</span>,
            cell: (info) => {
              const row = info.row.original;
              return (
                <div
                  className="px-6 flex items-center justify-center gap-2"
                  onClick={() => SetAssetID(row.id)}
                >
                  {isMediaManager || isAdmin ? (
                    <>
                      <AiFillEdit
                        className="text-black dark:text-white hover:scale-125 transition-all p-1 border-[1px] border-[#737373] rounded-md cursor-pointer"
                        size={20}
                        onClick={handleEditAsset}
                      />

                      <AiFillDelete
                        className="text-orange-600 dark:text-white hover:scale-125 transition-all p-1 border-[1px] border-[#737373] rounded-md cursor-pointer"
                        size={20}
                        onClick={handleDeleteAsset}
                      />
                    </>
                  ) : (
                    <p>دسترسی محدود</p>
                  )}
                </div>
              );
            },
          },
        ],
      },
    ];
  }, []);

  return (
    <>
      <TableComponent columns={columns} data={data} />

      {isDeleteAsset && (
        <ConfirmModal
          prop={asset}
          handleModal={handleDeleteAsset}
          type={"delete"}
          deleteType="asset"
        />
      )}

      {isEditAsset && (
        <CreateUpdateModal
          prop={asset}
          handleModal={handleEditAsset}
          type={"editStructure"}
        />
      )}
    </>
  );
};

export default AllAssetsTable;
