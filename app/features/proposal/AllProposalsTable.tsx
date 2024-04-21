import Status from "@/app/components/main/Status";
import ConfirmModal from "@/app/components/modals/ConfirmModal";
import TableComponent from "@/app/components/table/TableComponent";
import useAuth from "@/app/hooks/useAuth";
import {
  InitialCustomerObject,
  ProposalObject,
  UserObject,
} from "@/app/lib/interfaces";
import { ColumnDef } from "@tanstack/react-table";
import moment from "jalali-moment";
import React, { useMemo, useState } from "react";
import { AiFillDelete } from "react-icons/ai";

type Props = {
  data: ProposalObject[];
  allInitialCustomers: InitialCustomerObject[];
  allUsers: UserObject[];
  proposal: ProposalObject;
  setProposalId: React.Dispatch<any>;
};

const AllProposalsTable = (props: Props) => {
  const { data, allInitialCustomers, allUsers, proposal, setProposalId } =
    props;
  const { isAdmin, isMaster, isProjectManager } = useAuth();
  const [isDeleteProposal, setIsDeleteProposal] = useState<boolean>(false);
  const handleDeleteProposal = () => setIsDeleteProposal(!isDeleteProposal);

  const columns = useMemo<ColumnDef<ProposalObject, any>[]>(() => {
    return [
      {
        header: "جدول پروپوزال ها",
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
              allUsers.filter((x) => x.username === row.username)[0].name,
            id: "کاربر ایجاد کننده",
            cell: (info) => info.getValue(),
            header: () => <span>کاربر ایجاد کننده</span>,
          },
          {
            accessorFn: (row) => row.subject,
            id: "موضوع",
            cell: (info) => info.getValue(),
            header: () => <span>موضوع</span>,
          },
          {
            accessorFn: (row) => row.initialCustomerId,
            id: "پروژه",
            cell: (info) => {
              const project = allInitialCustomers.find(
                (initialCustomer) => initialCustomer._id === info.getValue()
              );
              return <p>{project?.name}</p>;
            },
            header: () => <span>پروژه</span>,
          },
          {
            accessorFn: (row) => row.startDate,
            id: "تاریخ شروع",
            cell: (info) => {
              const startDate = info.getValue();
              const unixTimestamp = Math.floor(
                new Date(startDate).getTime() / 1000
              );
              return (
                <p className="w-24">
                  {moment.unix(unixTimestamp).format("jYYYY-jM-jD")}
                </p>
              );
            },
            header: () => <span>تاریخ شروع</span>,
          },
          {
            accessorFn: (row) => row.endDate,
            id: "ددلاین",
            cell: (info) => {
              const endDate = info.getValue();
              const unixTimestamp = Math.floor(
                new Date(endDate).getTime() / 1000
              );
              return (
                <p className="w-24">
                  {moment.unix(unixTimestamp).format("jYYYY-jM-jD")}
                </p>
              );
            },
            header: () => <span>ددلاین</span>,
          },
          {
            accessorFn: (row) => row.priority,
            id: "اولویت",
            cell: (info) => {
              const priority = info.getValue();

              return (
                <div>
                  {priority === "low" ? (
                    <Status
                      status={"پایین"}
                      bgColor={"#96ffb9"}
                      textColor={"#0f0405"}
                    />
                  ) : priority === "medium" ? (
                    <Status
                      status={"متوسط"}
                      bgColor={"#dbde85"}
                      textColor={"#0f0405"}
                    />
                  ) : (
                    priority === "high" && (
                      <Status
                        status={"بالا"}
                        bgColor={"#bd4254"}
                        textColor={"#0f0405"}
                      />
                    )
                  )}
                </div>
              );
            },
            header: () => <span>اولویت</span>,
          },
          {
            accessorFn: (row) => row.status,
            id: "وضعیت",
            cell: (info) => {
              const status = info.getValue();

              return (
                <div>
                  {status === "in-progress" ? (
                    <Status
                      status={"درجریان"}
                      bgColor={"#96ffb9"}
                      textColor={"#0f0405"}
                    />
                  ) : (
                    status === "done" && (
                      <Status
                        status={"تمام"}
                        bgColor={"#dbde85"}
                        textColor={"#0f0405"}
                      />
                    )
                  )}
                </div>
              );
            },
            header: () => <span>وضعیت</span>,
          },
          {
            accessorFn: (row) => row.type,
            id: "واحد",
            cell: (info) => {
              const type = info.getValue();

              return (
                <div>
                  {type === "billboard" ? (
                    <Status
                      status={"بیلبورد"}
                      bgColor={"#87e5e8"}
                      textColor={"#0f0405"}
                    />
                  ) : type === "metro" ? (
                    <Status
                      status={"مترو"}
                      bgColor={"#87e5e8"}
                      textColor={"#0f0405"}
                    />
                  ) : type === "bus" ? (
                    <Status
                      status={"اتوبوس"}
                      bgColor={"#87e5e8"}
                      textColor={"#0f0405"}
                    />
                  ) : (
                    type === "namava" && (
                      <Status
                        status={"نماوا"}
                        bgColor={"#87e5e8"}
                        textColor={"#0f0405"}
                      />
                    )
                  )}
                </div>
              );
            },
            header: () => <span>واحد</span>,
          },
          {
            accessorFn: (row) => row.description,
            id: "توضیحات",
            cell: (info) => info.getValue(),
            header: () => <span>توضیحات</span>,
          },
          {
            accessorFn: (row) => row.assignedUsers,
            id: "کاربران اساین شده",
            cell: (info) => {
              const assignedUsers = info.getValue();
              const filteredUsers = allUsers.filter((user) =>
                assignedUsers.includes(user._id)
              );
              return (
                <ul>
                  {filteredUsers!.map((user: UserObject) => (
                    <li>{user.name}</li>
                  ))}
                </ul>
              );
            },
            header: () => <span>کاربران اساین شده</span>,
          },
          {
            id: "عملیات",
            header: () => <span>عملیات</span>,
            cell: (info) => {
              const row = info.row.original;
              return (
                <>
                  {isMaster || isAdmin || isProjectManager ? (
                    <p
                      className="px-6 flex items-center justify-center gap-5"
                      onClick={() => setProposalId(row.id)}
                    >
                      <div className="flex items-center p-1 border-[1px] border-[#737373] rounded-md cursor-pointer">
                        <AiFillDelete
                          className="text-black dark:text-white hover:scale-125 transition-all"
                          size={20}
                          onClick={handleDeleteProposal}
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
            accessorKey: "createdAt",
            accessorFn: (row) => moment(row.createdAt).format("jYYYY/jM/jD"),
            id: "تاریخ ایجاد",
            header: () => <span>تاریخ ایجاد</span>,
            cell: (info) => {
              const createdAt = info.getValue();
              return <p>{createdAt}</p>;
            },
          },
          {
            accessorKey: "updatedAt",
            accessorFn: (row) => moment(row.updatedAt).format("jYYYY/jM/jD"),
            id: "تاریخ ویرایش",
            header: () => <span>تاریخ ویرایش</span>,
            cell: (info) => {
              const updatedAt = info.getValue();
              return <p>{updatedAt}</p>;
            },
          },
        ],
      },
    ];
  }, []);

  return (
    <>
      <TableComponent columns={columns} data={data} />
      {isDeleteProposal && (
        <ConfirmModal
          prop={proposal}
          handleModal={handleDeleteProposal}
          type={"delete"}
          deleteType="proposal"
        />
      )}
    </>
  );
};

export default AllProposalsTable;
