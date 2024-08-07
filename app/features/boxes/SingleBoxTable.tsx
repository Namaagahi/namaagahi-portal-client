import TableComponent from "@/app/components/table/TableComponent";
import { formatNumber } from "@/app/utilities/formatNumber";
import { variableCostNames2 } from "@/app/lib/constants";
import { BoxStructure, StructureObject } from "@/app/lib/interfaces";
import Tooltip from "@/app/components/main/Tooltip";
import { ColumnDef } from "@tanstack/react-table";
import useAuth from "@/app/hooks/useAuth";
import React, { useMemo } from "react";
import moment from "jalali-moment";

type Props = {
  data: BoxStructure;
  allStructures: StructureObject[];
};

const SingleBoxTable = (props: Props) => {
  const { data, allStructures } = props;

  const { isAdmin, isMediaManager } = useAuth();

  const columns = useMemo<ColumnDef<BoxStructure, any>[]>(() => {
    return [
      {
        header: " ",
        columns: [
          {
            accessorKey: "_id",
            accessorFn: (row) => row.id,
            id: "_id",
            cell: (info) => null,
            header: () => null,
          },
          {
            accessorFn: (row) => row.structureId,
            id: "کد سامانه",
            cell: (info) => {
              return (
                <div>
                  {
                    allStructures.find(
                      (rawStructure: any) => rawStructure.id === info.getValue()
                    )?.name
                  }
                </div>
              );
            },
            header: () => <span>کد سامانه</span>,
            enableColumnFilter: false,
          },
          {
            accessorFn: (row) => row.marks.name,
            id: "نوع سازه",
            cell: (info) => info.getValue(),
            header: () => <span>نوع سازه</span>,
          },
          {
            accessorFn: (row) => row.structureId,
            id: "مسیر",
            cell: (info) => (
              <div>
                {
                  allStructures.find(
                    (rawStructure: any) => rawStructure.id === info.getValue()
                  )?.location.path
                }
              </div>
            ),
            header: () => <span>مسیر</span>,
            enableColumnFilter: false,
            enableSorting: false,
          },
          {
            accessorFn: (row) => row.structureId,
            id: "آدرس",
            cell: (info) => {
              return (
                <p>
                  {
                    allStructures.find(
                      (rawStructure: any) => rawStructure.id === info.getValue()
                    )?.location.address
                  }
                </p>
              );
            },
            header: () => <span>آدرس</span>,
            enableColumnFilter: false,
            enableSorting: false,
          },
          {
            accessorFn: (row) => row.duration.startDate,
            id: "تاریخ شروع",
            cell: (info) => (
              <div>{moment.unix(info.getValue()).format("jYYYY-jM-jD")}</div>
            ),
            header: () => <span>تاریخ شروع</span>,
          },
          {
            accessorFn: (row) => row.duration.endDate,
            id: "تاریخ پایان",
            cell: (info) => (
              <div>{moment.unix(info.getValue()).format("jYYYY-jM-jD")}</div>
            ),
            header: () => <span>تاریخ پایان</span>,
          },
          {
            accessorFn: (row) => row.duration.diff,
            id: "طول دوره",
            cell: (info) => info.getValue(),
            header: () => <span>طول دوره</span>,
          },
          {
            accessorFn: (row) => row.marks.markOptions.style,
            id: "تیپ",
            cell: (info) => info.getValue(),
            header: () => <span>تیپ</span>,
          },
          {
            accessorFn: (row) => row.marks.markOptions.face,
            id: "وجه",
            cell: (info) => info.getValue(),
            header: () => <span>وجه</span>,
          },
          {
            accessorFn: (row) => row.marks.markOptions.length,
            id: "طول",
            cell: (info) => info.getValue(),
            header: () => <span>طول</span>,
          },
          {
            accessorFn: (row) => row.marks.markOptions.width,
            id: "عرض",
            cell: (info) => info.getValue(),
            header: () => <span>عرض</span>,
          },
          {
            accessorFn: (row) => row.marks.markOptions.printSize,
            id: "متراژ چاپ",
            cell: (info) => info.getValue(),
            header: () => <span>متراژ چاپ</span>,
          },
          {
            accessorFn: (row) => row.marks.markOptions.docSize,
            id: "متراژ واقعی",
            cell: (info) => info.getValue(),
            header: () => <span>متراژ واقعی</span>,
          },
          {
            accessorFn: (row) => row.costs.fixedCosts.squareCost,
            id: "تمام شده متر مربع",
            cell: (info) => {
              const squareCost = info.getValue();
              return formatNumber(squareCost, ",");
            },
            header: () => <span>تمام شده متر مربع</span>,
          },
          {
            accessorFn: (row) => row.costs.fixedCosts.dailyCost,
            id: "تمام شده روزانه",
            cell: (info) => {
              const dailyCost = info.getValue();
              return isAdmin || isMediaManager ? (
                formatNumber(dailyCost, ",")
              ) : (
                <p className="text-xs">محدودیت دسترسی</p>
              );
            },
            header: () => <span>تمام شده روزانه</span>,
          },
          {
            accessorFn: (row) => row.costs.fixedCosts.monthlyCost,
            id: "تمام شده ماهیانه",
            cell: (info) => {
              const monthlyCost = info.getValue();
              return isAdmin || isMediaManager ? (
                formatNumber(monthlyCost, ",")
              ) : (
                <p className="text-xs">محدودیت دسترسی</p>
              );
            },
            header: () => <span>تمام شده ماهیانه</span>,
          },
          {
            accessorFn: (row) => row.costs.fixedCosts.periodCost,
            id: "تمام شده دوره",
            cell: (info) => {
              const periodCost = info.getValue();
              return isAdmin || isMediaManager ? (
                formatNumber(periodCost, ",")
              ) : (
                <p className="text-xs">محدودیت دسترسی</p>
              );
            },
            header: () => <span>تمام شده دوره</span>,
          },
          {
            accessorFn: (row) => row.myCustomCost,
            id: `${variableCostNames2[0]}`,
            cell: (info) => {
              const myCustomCost = info.getValue();
              return formatNumber(myCustomCost[variableCostNames2[0]], ",");
            },
            header: () => <span>{variableCostNames2[0]}</span>,
          },
          {
            accessorFn: (row) => row.myCustomCost,
            id: `${variableCostNames2[1]}`,
            cell: (info) => {
              const myCustomCost = info.getValue();
              return formatNumber(myCustomCost[variableCostNames2[1]], ",");
            },
            header: () => <span>{variableCostNames2[1]}</span>,
          },
          {
            accessorFn: (row) => row.myCustomCost,
            id: `${variableCostNames2[2]}`,
            cell: (info) => {
              const myCustomCost = info.getValue();
              return formatNumber(myCustomCost[variableCostNames2[2]], ",");
            },
            header: () => <span>{variableCostNames2[2]}</span>,
          },
          {
            accessorFn: (row) => row.myCustomCost,
            id: `${variableCostNames2[3]}`,
            cell: (info) => {
              const myCustomCost = info.getValue();
              return formatNumber(myCustomCost[variableCostNames2[3]], ",");
            },
            header: () => <span>{variableCostNames2[3]}</span>,
          },
          {
            accessorFn: (row) => row.myCustomCost,
            id: `${variableCostNames2[4]}`,
            cell: (info) => {
              const myCustomCost = info.getValue();
              return formatNumber(myCustomCost[variableCostNames2[4]], ",");
            },
            header: () => <span>{variableCostNames2[4]}</span>,
          },
          {
            accessorFn: (row) => row.myCustomCost,
            id: `${variableCostNames2[5]}`,
            cell: (info) => {
              // row.costs.fixedCosts.monthlyCost
              const myCustomCost = info.getValue();
              return formatNumber(myCustomCost[variableCostNames2[5]], ",");
            },
            header: () => <span>{variableCostNames2[5]}</span>,
          },
          {
            accessorFn: (row) => row.costs,
            id: "جمع هزینه سربار روزانه",
            cell: (info) => {
              const monthlyVariableCost = info.getValue().monthlyVariableCost;
              return isAdmin || isMediaManager ? (
                formatNumber(monthlyVariableCost / 30, ",")
              ) : (
                <p className="text-xs">محدودیت دسترسی</p>
              );
            },
            header: () => <span>جمع هزینه سربار روزانه</span>,
            enableColumnFilter: false,
          },
          {
            accessorFn: (row) => row.costs.totalDailyCost,
            id: "هزینه روزانه کل",
            enableColumnFilter: false,
            cell: (info) => {
              const totalDailyCost = info.getValue();
              return isAdmin || isMediaManager ? (
                formatNumber(totalDailyCost, ",")
              ) : (
                <p className="text-xs">محدودیت دسترسی</p>
              );
            },
            header: () => <span>هزینه روزانه کل</span>,
          },
          {
            accessorFn: (row) => row,
            id: "هزینه ماهیانه کل",
            cell: (info) => {
              const info1 = info.getValue();
              const myCustomCost = info1.myCustomCost;
              const monthlyCost = info1.costs.fixedCosts.monthlyCost;
              const totalMonthlyCost =
                [
                  myCustomCost[variableCostNames2[0]],
                  myCustomCost[variableCostNames2[1]],
                  myCustomCost[variableCostNames2[2]],
                  myCustomCost[variableCostNames2[3]],
                  myCustomCost[variableCostNames2[4]],
                  myCustomCost[variableCostNames2[5]],
                ].reduce((a, b) => a + b) + monthlyCost;
              return isAdmin || isMediaManager ? (
                formatNumber(totalMonthlyCost, ",")
              ) : (
                <p className="text-xs">محدودیت دسترسی</p>
              );
            },
            header: () => <span>هزینه ماهیانه کل</span>,
          },
          {
            accessorFn: (row) => row.costs.totalPeriodCost,
            id: "هزینه دوره کل",
            cell: (info) => {
              const totalPeriodCost = info.getValue();
              return isAdmin || isMediaManager ? (
                formatNumber(totalPeriodCost, ",")
              ) : (
                <p className="text-xs">محدودیت دسترسی</p>
              );
            },
            header: () => <span>هزینه دوره کل</span>,
          },
        ],
      },
    ];
  }, []);
  return <TableComponent columns={columns} data={data} />;
};

export default SingleBoxTable;
