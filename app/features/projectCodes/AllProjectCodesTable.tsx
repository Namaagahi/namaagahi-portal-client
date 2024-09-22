import { selectProjectCodeById } from "@/app/apiSlices/projectCodeApiSlice";
import { selectAllUsers } from "@/app/apiSlices/usersApiSlice";
import ConfirmModal from "@/app/components/modals/ConfirmModal";
import CreateUpdateModal from "@/app/components/modals/CreateUpdateModal";
import TableComponent from "@/app/components/table/TableComponent";
import useAuth from "@/app/hooks/useAuth";
import { codeMap } from "@/app/lib/constants";
import {
  FinalCustomerObject,
  ProjectCodeObject,
  UserObject,
} from "@/app/lib/interfaces";
import { ColumnDef } from "@tanstack/react-table";
import moment from "jalali-moment";
import { useMemo, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";

const AllProjectCodesTable = (props: any) => {
  const {
    allProjectCodes,
    allFinallCustomers,
    projectCodeId,
    setProjectCodeId,
  } = props;

  const { id, isMaster, isAdmin, isMediaManager } = useAuth();

  const [isDeleteProjectCode, setIsDeleteProjectCode] =
    useState<boolean>(false);
  const [isEditProjectCode, setIsEditProjectCode] = useState<boolean>(false);
  const allUsers: UserObject[] = useSelector(
    (state) => selectAllUsers(state) as UserObject[]
  );

  const handleDeleteProjectCode = () =>
    setIsDeleteProjectCode(!isDeleteProjectCode);
  const handleEditProjectCode = () => setIsEditProjectCode(!isEditProjectCode);
  const projectCode: ProjectCodeObject = useSelector(
    (state) => selectProjectCodeById(state, projectCodeId) as ProjectCodeObject
  );

  const columns = useMemo<ColumnDef<ProjectCodeObject>[]>(() => {
    return [
      {
        header: "جدول پلن ها",
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
            accessorFn: (row) =>
              allUsers?.filter((x: any) => x.username === row.username)[0]
                ?.name,
            id: "کاربر ایجاد کننده",
            cell: (info) => info.getValue(),
            header: () => <span>کاربر ایجاد کننده</span>,
          },
          {
            accessorKey: "media",
            accessorFn: (row) => row.media,
            id: "رسانه",
            cell: (info) => {
              return <p>{codeMap[info.getValue()]}</p>;
            },
            header: () => <span>رسانه</span>,
          },
          {
            accessorKey: "year",
            accessorFn: (row) => row.year,
            id: "سال",
            cell: (info) => (info.getValue() == 300 ? 1403 : info.getValue()),
            header: () => <span>سال</span>,
          },
          {
            accessorKey: "finalCustomerId",
            accessorFn: (row) => row.finalCustomerId,
            id: "مشتری",
            cell: (info) => {
              const thisCustomer = allFinallCustomers.find(
                (finalCustomer: FinalCustomerObject) =>
                  finalCustomer._id === info.getValue()
              );
              return <p>{thisCustomer.name}</p>;
            },
            header: () => <span>مشتری</span>,
            enableColumnFilter: false,
          },
          {
            accessorKey: "brand",
            accessorFn: (row) => row.brand,
            id: "برند",
            cell: (info) => info.getValue(),
            header: () => <span>برند</span>,
            // enableColumnFilter: false,
          },
          {
            accessorKey: "desc",
            accessorFn: (row) => row.desc,
            id: "توضیحات",
            cell: (info) => info.getValue(),
            header: () => <span>توضیحات</span>,
            enableColumnFilter: false,
          },
          {
            accessorKey: "code",
            accessorFn: (row) => row.code,
            id: "کد",
            cell: (info) => info.getValue(),
            header: () => <span>کد</span>,
          },
          {
            id: "عملیات",
            header: () => <span>عملیات</span>,
            cell: (info) => {
              const row = info.row.original;
              return (
                <div
                  className="flex items-center justify-center gap-2"
                  onClick={() => setProjectCodeId(row.id)}
                >
                  {isMaster || isMediaManager || isAdmin ? (
                    <>
                      <AiFillEdit
                        className="text-black dark:text-white hover:scale-125 transition-all p-1 border-[1px] border-[#737373] rounded-md cursor-pointer"
                        size={20}
                        onClick={handleEditProjectCode}
                      />
                      {isMaster && (
                        <AiFillDelete
                          className="text-orange-600 dark:text-white hover:scale-125 transition-all p-1 border-[1px] border-[#737373] rounded-md cursor-pointer"
                          size={20}
                          onClick={handleDeleteProjectCode}
                        />
                      )}
                    </>
                  ) : (
                    <p>دسترسی محدود</p>
                  )}
                </div>
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
  }, [allUsers]);

  return (
    <>
      <TableComponent columns={columns} data={allProjectCodes} />

      {isDeleteProjectCode && (
        <ConfirmModal
          prop={projectCode}
          handleModal={handleDeleteProjectCode}
          type={"delete"}
          deleteType="projectCode"
        />
      )}

      {isEditProjectCode && (
        <CreateUpdateModal
          type={"editProjectCode"}
          handleModal={handleEditProjectCode}
          prop={projectCode}
        />
      )}
    </>
  );
};

export default AllProjectCodesTable;
