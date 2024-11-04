import TableComponent from "@/app/components/table/TableComponent";
import { formatNumber } from "@/app/utilities/formatNumber";
import { PlanStructure } from "@/app/lib/interfaces";
import { ColumnDef } from "@tanstack/react-table";
import moment from "jalali-moment";
import { useMemo } from "react";

const AvailableStructureTable = (props: any) => {
  const { data } = props;

  const columns = useMemo<ColumnDef<PlanStructure, any>[]>(() => {
    return [
      {
        header: " ",
        columns: [
          {
            accessorKey: "_id",
            accessorFn: (row) => row,
            id: "_id",
            cell: (info) => info.getValue()[0],
            header: () => null,
          },
          {
            accessorFn: (row) => row,
            id: "کد سامانه",
            cell: (info) => info.getValue()[0],
            header: () => <span>کد سامانه</span>,
          },
          {
            accessorFn: (row) => row,
            id: "مسیر",
            cell: (info) => info.getValue()[1].location.path,
            header: () => <span>مسیر</span>,
          },
          {
            accessorFn: (row) => row,
            id: "آدرس",
            cell: (info) => info.getValue()[1].location.address,
            header: () => <span>آدرس</span>,
          },
          {
            accessorFn: (row) => row,
            id: "از تاریخ",
            cell: (info) =>
              info
                .getValue()[1]
                .availableRanges?.map(
                  (dateRange: any, index: number, ref: any) => (
                    <div>
                      {index === 0 ? (
                        <>
                          {moment.unix(dateRange.startDate).jDate() !== 1
                            ? moment
                                .unix(dateRange.startDate)
                                .add(1, "d")
                                .format("jYYYY-jMM-jDD")
                            : moment
                                .unix(dateRange.startDate)
                                .format("jYYYY-jMM-jDD")}
                        </>
                      ) : (
                        <>
                          {moment
                            .unix(dateRange.startDate)
                            .add(1, "d")
                            .format("jYYYY-jMM-jDD")}
                        </>
                      )}
                    </div>
                  )
                ),
            header: () => <span> از تاریخ</span>,
          },
          {
            accessorFn: (row) => row,
            id: "تا تاریخ",
            cell: (info) =>
              info
                .getValue()[1]
                .availableRanges?.map(
                  (dateRange: any, index: number, ref: any) => (
                    <div>
                      {index === 0 ? (
                        <>
                          {moment.unix(dateRange.endDate).jDate() ===
                          moment.unix(dateRange.endDate).jDaysInMonth()
                            ? moment
                                .unix(dateRange.endDate)
                                .format("jYYYY-jMM-jDD")
                            : moment
                                .unix(dateRange.endDate)
                                .subtract(1, "d")
                                .format("jYYYY-jMM-jDD")}
                        </>
                      ) : (
                        <>
                          {index !== ref.length - 1 ? (
                            <>
                              {moment
                                .unix(dateRange.endDate)
                                .subtract(1, "d")
                                .format("jYYYY-jMM-jDD")}
                            </>
                          ) : (
                            <>
                              {moment
                                .unix(dateRange.endDate)
                                .format("jYYYY-jMM-jDD")}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  )
                ),
            header: () => <span> تا تاریخ</span>,
          },
        ],
      },
    ];
  }, []);

  return <TableComponent columns={columns} data={data} />;
};

export default AvailableStructureTable;
