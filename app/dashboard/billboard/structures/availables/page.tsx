"use client";
import {
  StructureObject,
  PlanObject,
  BoxObject,
  CombinedStructure,
} from "@/app/lib/interfaces";
import {
  selectAllStructures,
  useGetStructuresQuery,
} from "@/app/apiSlices/structuresApiSlice";
import {
  selectAllPlans,
  useGetAllPlansQuery,
} from "@/app/apiSlices/plansApiSlice";
import usePageTitle from "@/app/hooks/usePageTitle";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import PageTitle from "@/app/components/main/PageTitle";
import SearchContainer from "@/app/components/main/SearchContainer";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import moment from "jalali-moment";
import Badge from "@/app/components/main/Badge";
import domtoimage from "dom-to-image";
import { jsPDF } from "jspdf";
import { FaFilePdf } from "react-icons/fa";
import {
  selectAllBoxes,
  useGetAllBoxesQuery,
} from "@/app/apiSlices/boxesApiSlice";
import Link from "next/link";
import AvailablesReport from "@/app/features/availableStructures/report/AvailablesReport";

type Range = {
  startDate: number;
  endDate: number;
};

const Availables = () => {
  usePageTitle("سازه های خالی");

  const [startDate, setStartDate] = useState<number>(
    new Date().getTime() / 1000
  );
  const [endDate, setEndDate] = useState<number>(new Date().getTime() / 1000);
  const [availableStructures, setAvailableStructures] = useState<Map<any, any>>(
    new Map()
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isPDF, setIsPDF] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { isLoading, isError } = useGetAllPlansQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });

  useGetStructuresQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });
  useGetAllBoxesQuery(undefined);

  const allPlans: PlanObject[] = useSelector(
    (state) => selectAllPlans(state) as PlanObject[]
  );
  const allStructures: StructureObject[] = useSelector(
    (state) => selectAllStructures(state) as StructureObject[]
  );

  const allBoxes: BoxObject[] = useSelector(
    (state) => selectAllBoxes(state) as BoxObject[]
  ).filter((x) => !x.isArchived);
  const inBoxStructures = allStructures.filter(
    (structure: any) => structure.isChosen
  );
  const boxStructures = allBoxes.flatMap((box: any) => box.structures);

  const inBoxStructuresLookup = inBoxStructures.reduce(
    (acc: any, chosenStructure: any) => ({
      ...acc,
      [chosenStructure.id]: chosenStructure,
    }),
    {}
  );

  const combinedStructures: CombinedStructure[] = boxStructures
    .map((boxStructure: CombinedStructure) => ({
      ...boxStructure,
      ...inBoxStructuresLookup[boxStructure.structureId],
    }))
    .filter((x) => x.isChosen)
    .filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    );

  const uniquePaths = [
    ...new Set(allStructures.map((structure) => structure.location.path)),
  ];
  const [selectedPaths, setSelectedPaths] = useState<string[]>([]);

  const calculateAvailableDates = (
    structures: StructureObject[],
    plans: PlanObject[],
    combinedStructures: CombinedStructure[],
    startDate: number,
    endDate: number
  ) => {
    const availableDatesWithInfo = new Map();

    for (const plan of plans) {
      for (const planStructure of plan.structures) {
        if (
          planStructure.duration.sellStart <= endDate &&
          planStructure.duration.sellEnd >= startDate &&
          plan.status === "done"
        ) {
          const structureId = planStructure.structureId;

          const structure = structures.find(
            (structure) => structure._id === structureId
          );

          if (structure) {
            const structureName = structure.name;

            if (!availableDatesWithInfo.has(structureName)) {
              availableDatesWithInfo.set(structureName, {
                location: {
                  path: structure.location.path,
                  address: structure.location.address,
                  color: "red",
                },
                availableRanges: [
                  {
                    startDate,
                    endDate,
                  },
                ],
              });
            }

            const structureInfo = availableDatesWithInfo.get(structureName);

            for (const availableRange of structureInfo.availableRanges) {
              if (
                planStructure.duration.sellStart <= availableRange.endDate &&
                planStructure.duration.sellEnd >= availableRange.startDate
              ) {
                if (planStructure.duration.sellStart > availableRange.startDate)
                  structureInfo.availableRanges.push({
                    startDate: availableRange.startDate,
                    endDate: planStructure.duration.sellStart,
                  });

                if (planStructure.duration.sellEnd < availableRange.endDate)
                  structureInfo.availableRanges.push({
                    startDate: planStructure.duration.sellEnd,
                    endDate: availableRange.endDate,
                  });

                structureInfo.availableRanges.splice(
                  structureInfo.availableRanges.indexOf(availableRange),
                  1
                );
              }
            }
          }
        }
      }
    }

    const mainCombinedStructures = combinedStructures.filter(
      (x) => x.duration.startDate <= startDate && x.duration.endDate >= endDate
    );
    for (const structure1 of mainCombinedStructures) {
      const structureName = structure1?.name;

      if (!availableDatesWithInfo.has(structureName)) {
        availableDatesWithInfo.set(structureName, {
          location: {
            path: structure1?.location.path,
            address: structure1?.location.address,
            color: "white",
          },
          availableRanges: [
            {
              startDate: startDate - 1,
              endDate: endDate,
            },
          ],
        });
      }
    }

    return availableDatesWithInfo;
  };
  const handleFilterClick = () =>
    setAvailableStructures(
      calculateAvailableDates(
        allStructures,
        allPlans,
        combinedStructures,
        startDate,
        endDate
      )
    );

  const togglePath = (path: string) => {
    if (selectedPaths.length && selectedPaths.includes(path)) {
      setSelectedPaths(
        selectedPaths.filter((selectedPath) => selectedPath !== path)
      );
    } else {
      setSelectedPaths([...selectedPaths, path]);
    }
  };

  const availableReportStructure =
    selectedPaths.length !== 0
      ? Array.from(availableStructures.entries())
          .filter(([key, value]) => value.availableRanges.length)
          .sort((a, b) => {
            if (
              a[1].location.color === "red" &&
              b[1].location.color !== "red"
            ) {
              return -1;
            } else if (
              a[1].location.color !== "red" &&
              b[1].location.color === "red"
            ) {
              return 1;
            }
            return a[1].location.path.localeCompare(b[1].location.path);
          })
          .filter(([key, value]) =>
            selectedPaths.includes(value.location.path.trim())
          )
      : Array.from(availableStructures.entries())
          .filter(([key, value]) => value.availableRanges.length)
          .sort((a, b) => {
            if (
              a[1].location.color === "red" &&
              b[1].location.color !== "red"
            ) {
              return -1;
            } else if (
              a[1].location.color !== "red" &&
              b[1].location.color === "red"
            ) {
              return 1;
            }
            return a[1].location.path.localeCompare(b[1].location.path);
          });

  return (
    <div id="content-to-capture">
      <PageTitle name="گزارش سازه های خالی" />
      {/* <SearchContainer /> */}

      <div className="flex items-start flex-col justify-center gap-3 my-10 md:flex-row">
        <div className="flex items-center gap-3 w-1/3">
          <label htmlFor="startDate" className="text-[#767676] font-bold">
            تاریخ شروع
          </label>

          <DatePicker
            inputClass="formInput text-black bg-gray-200"
            format="YYYY-MM-DD"
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            onChange={(e: DateObject) => setStartDate(e.unix)}
          />
        </div>

        <div className="flex items-center gap-3 w-1/3">
          <label htmlFor="endDate" className="text-[#767676] font-bold">
            تاریخ پایان
          </label>

          <DatePicker
            inputClass="formInput text-black bg-gray-200"
            format="YYYY-MM-DD"
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            onChange={(e: DateObject) => setEndDate(e.unix)}
          />
        </div>

        <button
          className="primaryButton w-full md:w-1/5"
          onClick={handleFilterClick}
        >
          اعمال فیلتر
        </button>
        <FaFilePdf
          onClick={() => setIsPDF(!isPDF)}
          className={`text-5xl mx-2 pb-1  ${
            !isPDF ? "text-red-600" : "text-gray-300"
          } dark:${
            !isPDF ? "text-red-300" : "text-gray-300"
          } transition-all dark:hover:text-gray-300 hover:scale-110 hover:text-gray-500 cursor-pointer`}
        />
      </div>

      <div className="relative w-full mx-2 mb-10">
        <div
          className="flex items-center gap-2 w-full cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <label htmlFor="paths" className="text-lg font-semibold">
            فیلتر بر اساس مسیر :
          </label>

          <div
            id="paths"
            className={`${
              isOpen ? "ring-2 ring-blue-500" : ""
            } p-2 border border-gray-300 w-[20%] rounded-md shadow-sm focus:outline-none`}
          >
            {selectedPaths.length > 0
              ? selectedPaths.join(", ")
              : "انتخاب کنید"}
          </div>
        </div>

        {isOpen && (
          <div className="absolute top-full right-[8%] w-[20%] bg-white dark:bg-black border border-gray-300 rounded-md mt-2 shadow-lg z-10">
            <div className="p-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="جستجو..."
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <ul className="max-h-[500px] overflow-y-auto p-2">
              {[
                ...new Set(
                  Array.from(availableStructures.entries()).map(
                    ([key, value]) => value.location.path.trim()
                  )
                ),
              ]
                .sort((a, b) => a.localeCompare(b))
                .filter((path) =>
                  path.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((path, index) => (
                  <li key={index} className="flex items-center gap-2 p-2">
                    <input
                      type="checkbox"
                      checked={selectedPaths.includes(path)}
                      onChange={() => togglePath(path)}
                      id={`path-${index}`}
                      className="cursor-pointer"
                    />
                    <label htmlFor={`path-${index}`} className="cursor-pointer">
                      {path}
                    </label>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>

      {!isPDF ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 my-6 mx-3">
          {Array.from(availableStructures.entries())
            .filter(([key, value]) => value.availableRanges.length)
            .sort((a, b) => {
              if (
                a[1].location.color === "red" &&
                b[1].location.color !== "red"
              ) {
                return -1;
              } else if (
                a[1].location.color !== "red" &&
                b[1].location.color === "red"
              ) {
                return 1;
              }
              return a[1].location.path.localeCompare(b[1].location.path);
            })
            .map(([key, value]) => {
              if (
                selectedPaths.length === 0 ||
                selectedPaths.includes(value.location.path.trim())
              ) {
                return (
                  <div
                    key={key}
                    className="flex flex-col max-w-full w-full text-lg bg-gray-400 dark:bg-white dark:bg-opacity-25 bg-opacity-25 rounded-md p-2 gap-2 hover:scale-105 transition-all cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center gap-3 px-1">
                        <p className="text-xl font-bold">{key}</p>
                        <p className="text-sm md:text-lg">
                          {value.location.path}
                        </p>
                        <div className="relative flex justify-center items-center">
                          <div className="group">
                            <p className="text-xl font-bold bg-orange-300 text-black py-1 px-3 rounded-md cursor-pointer transition-transform transform group-hover:scale-90 hover:bg-orange-200 hover:text-gray-500">
                              آدرس
                            </p>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center">
                              <div className="relative w-64 z-10 p-2 text-sm leading-none text-white dark:text-black bg-gray-600 dark:bg-gray-200 shadow-lg rounded-md">
                                {value.location.address}
                              </div>
                              <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-800"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`flex flex-col justify-center max-w-full w-full text-lg ${
                        value.location.color === "red"
                          ? "bg-purple-300"
                          : "bg-gray-400"
                      } ${
                        value.location.color === "red"
                          ? "dark:bg-purple-300"
                          : "dark:bg-white"
                      } dark:bg-opacity-25 bg-opacity-25`}
                    >
                      {value.availableRanges.map(
                        (dateRange: Range, index: number, ref: any) => (
                          <div
                            key={index}
                            className="flex justify-between gap-4 p-2"
                          >
                            <Badge index={index} />
                            {index === 0 ? (
                              <>
                                <p>از</p>
                                <p className="text-2xl text-purple-900 dark:text-purple-200 text-gray-700">
                                  {moment.unix(dateRange.startDate).jDate() !==
                                  1
                                    ? moment
                                        .unix(dateRange.startDate)
                                        .add(1, "d")
                                        .format("jYYYY-jMM-jDD")
                                    : moment
                                        .unix(dateRange.startDate)
                                        .format("jYYYY-jMM-jDD")}
                                </p>
                                <p>تا</p>
                                <p className="text-2xl text-purple-900 dark:text-purple-200 text-gray-700">
                                  {moment.unix(dateRange.endDate).jDate() ===
                                  moment.unix(dateRange.endDate).jDaysInMonth()
                                    ? moment
                                        .unix(dateRange.endDate)
                                        .format("jYYYY-jMM-jDD")
                                    : moment
                                        .unix(dateRange.endDate)
                                        .subtract(1, "d")
                                        .format("jYYYY-jMM-jDD")}
                                </p>
                              </>
                            ) : (
                              <>
                                <p>از</p>
                                <p className="text-2xl text-purple-900 dark:text-purple-200 text-gray-700">
                                  {moment
                                    .unix(dateRange.startDate)
                                    .add(1, "d")
                                    .format("jYYYY-jMM-jDD")}
                                </p>
                                <p>تا</p>
                                {index !== ref.length - 1 ? (
                                  <p className="text-2xl text-purple-900 dark:text-purple-200 text-gray-700">
                                    {moment
                                      .unix(dateRange.endDate)
                                      .subtract(1, "d")
                                      .format("jYYYY-jMM-jDD")}
                                  </p>
                                ) : (
                                  <p className="text-2xl text-purple-900 dark:text-purple-200 text-gray-700">
                                    {moment
                                      .unix(dateRange.endDate)
                                      .format("jYYYY-jMM-jDD")}
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                );
              }
            })}
        </div>
      ) : (
        <AvailablesReport availableStructures={availableReportStructure} />
      )}
    </div>
  );
};

export default Availables;
