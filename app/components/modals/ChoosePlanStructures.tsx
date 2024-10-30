"use client";
import {
  selectAllPlans,
  useGetAllPlansQuery,
} from "@/app/apiSlices/plansApiSlice";
import {
  CombinedStructure,
  PlanObject,
  StructureObject,
} from "@/app/lib/interfaces";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import DatePicker from "react-multi-date-picker";
import { useSelector } from "react-redux";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import { calculateAvailableDates } from "@/app/utilities/calculateAvailableDates";
import {
  selectAllStructures,
  useGetStructuresQuery,
} from "@/app/apiSlices/structuresApiSlice";

type Props = {
  handleModal: () => void;
  data: CombinedStructure[];
  setValue: any;
  getValues: any;
  handleThisStructuresChange: any;
};

const ChoosePlanStructures = (props: Props) => {
  const { handleModal, data, setValue, getValues, handleThisStructuresChange } =
    props;

  const [selectedIndices, setSelectedIndices] = useState<CombinedStructure[]>(
    []
  );
  const [searchText, setSearchText] = useState<string>("");
  const [finishFlag, setFinishFlag] = useState<boolean>(false);
  const [empty, setEmpty] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<CombinedStructure[]>([]);
  const [mainData, setMainData] = useState<CombinedStructure[]>([]);
  const [startDate, setStartDate] = useState<number>(
    new Date().getTime() / 1000
  );
  const [endDate, setEndDate] = useState<number>(new Date().getTime() / 1000);

  const { isLoading, isError } = useGetAllPlansQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });

  const allPlans: PlanObject[] = useSelector(
    (state) => selectAllPlans(state) as PlanObject[]
  );

  useGetStructuresQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });
  const allStructures: StructureObject[] = useSelector(
    (state) => selectAllStructures(state) as StructureObject[]
  );

  const handleEmpty = () => {
    const availableStructures = calculateAvailableDates(
      allStructures,
      allPlans,
      data,
      startDate,
      endDate
    );
    setMainData(
      empty ? data.filter((x) => availableStructures.has(x.name)) : data
    );
  };
  useEffect(() => {
    handleEmpty();
  }, [empty]);

  const toggleSelection = (item: CombinedStructure) => {
    const isSelected = selectedIndices.includes(item);

    if (isSelected) {
      setSelectedIndices(selectedIndices.filter((i) => i !== item));
    } else {
      setSelectedIndices((old) => [...old, item]);
    }
  };

  const performSearch = (value: string) => {
    const searchText = value.toLowerCase();
    const filteredResults = mainData.filter((item: CombinedStructure) => {
      return (
        item.name?.toLowerCase().includes(searchText) ||
        item.location?.address.toLowerCase().includes(searchText) ||
        item.location?.path.toLowerCase().includes(searchText)
      );
    });
    setSearchResults(filteredResults);
  };

  const handleFinish = () => {
    setFinishFlag(!finishFlag);
    setSearchResults([]);
    setSearchText("");
  };

  const handleConfirmSelection = () => {
    const currentStructures = getValues("structures") || [];

    const updatedStructures = currentStructures[0].structureId
      ? [...currentStructures, ...selectedIndices]
      : selectedIndices;

    setValue("structures", updatedStructures);
    updatedStructures.map((v, i) =>
      handleThisStructuresChange(i, v.name ? v.name : v.structureRecord.name)
    );
    handleModal();
  };

  useEffect(() => {
    if (searchText) {
      performSearch(searchText);
    } else {
      setSearchResults([]);
    }
  }, [searchText, finishFlag]);

  return (
    <div className="modalContainer">
      <div
        onClick={handleModal}
        className="backdropContainer bg-opacity-10"
      ></div>
      <div className="confirmModalContentContainer">
        <div className="confirmModalContent">
          <div className="flex justify-between items-center">
            <p className="md:text-2xl text-xl font-bold">{"انتخاب سازه"}</p>

            <AiOutlineClose
              className="cursor-pointer text-xl hover:text-2xl transition-all"
              onClick={handleModal}
            />
          </div>

          <div className="flex flex-col py-12">
            <div className="py-7 border-[1px] border-x-transparent border-y-[#FA9E93]">
              <div className="flex flex-row items-center">
                <input
                  type="text"
                  placeholder="جستجو"
                  className="formInput2 ml-8"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    performSearch(e.target.value);
                  }}
                />
                <div className="flex items-center gap-3 w-1/3">
                  <label
                    htmlFor="startDate"
                    className="text-[#767676] font-bold"
                  >
                    شروع:
                  </label>

                  <DatePicker
                    inputClass="formInput text-black bg-gray-200 w-2/3"
                    format="YYYY-MM-DD"
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    onChange={(e: DateObject) => setStartDate(e.unix)}
                  />
                </div>
                <div className="flex items-center gap-3 w-1/3">
                  <label htmlFor="endDate" className="text-[#767676] font-bold">
                    پایان:
                  </label>

                  <DatePicker
                    inputClass="formInput text-black bg-gray-200 w-2/3"
                    format="YYYY-MM-DD"
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    onChange={(e: DateObject) => setEndDate(e.unix)}
                  />
                </div>
              </div>
              <div className="flex flex-row justify-between items-center mt-7">
                <button
                  type="button"
                  onClick={() => setEmpty(!empty)}
                  className={`hover:bg-fuchsia-800 dark:hover:bg-fuchsia-800 bg-fuchsia dark:bg-fuchsia-900 bg-opacity-50 text-black font-semibold dark:text-white py-2 px-14 border border-gray-400 rounded shadow ${
                    empty
                      ? "dark:bg-gray-500 bg-gray-500 hover:bg-gray-400 dark:hover:bg-gray-400"
                      : ""
                  }`}
                >
                  سازه های خالی
                </button>
                <h3 className="py-2 px-3"> {mainData.length}</h3>
              </div>

              <div className="mt-4 bg-gray-400 dark:bg-white dark:bg-opacity-25 bg-opacity-25  font-bold rounded-xl p-3 h-[200px] overflow-y-auto">
                <ul>
                  {searchResults.length === 0
                    ? (finishFlag ? selectedIndices : mainData).map(
                        (item, index) => {
                          const isSelected = selectedIndices.includes(item);
                          return (
                            <li
                              className={`mt-2 cursor-pointer transition-all ${
                                isSelected
                                  ? "text-white bg-purple-300"
                                  : "hover:text-red-400"
                              }`}
                              key={index}
                              onClick={() => toggleSelection(item)}
                            >
                              {`${item?.name} - ${item.location?.address} - ${item.location?.path}`}
                            </li>
                          );
                        }
                      )
                    : searchResults.map((item, index) => {
                        const isSelected = selectedIndices.includes(item);
                        return (
                          <li
                            className={`mt-2 cursor-pointer transition-all ${
                              isSelected
                                ? "text-white bg-purple-300"
                                : "hover:text-red-400"
                            }`}
                            key={index}
                            onClick={() => toggleSelection(item)}
                          >
                            {`${item?.name} - ${item.location?.address} - ${item.location?.path}`}
                          </li>
                        );
                      })}
                </ul>
              </div>
              <button
                type="button"
                onClick={handleFinish}
                className={`hover:bg-fuchsia-800 dark:hover:bg-fuchsia-800 bg-fuchsia dark:bg-fuchsia-900 bg-opacity-50  mt-7 text-black font-semibold dark:text-white py-2 px-8 border border-gray-400 rounded shadow ${
                  !selectedIndices.length
                    ? "dark:bg-gray-500 bg-gray-500 hover:bg-gray-400 dark:hover:bg-gray-400"
                    : ""
                }`}
                disabled={!selectedIndices.length}
              >
                اتمام انتخاب
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={handleConfirmSelection}
              className={` ${
                !selectedIndices.length
                  ? "deleteConfirmButton bg-gray-500 hover:bg-gray-500"
                  : "deleteConfirmButton"
              }`}
              disabled={!selectedIndices.length}
            >
              انتخاب
            </button>

            <button
              type="button"
              onClick={handleModal}
              className="cancelButton"
            >
              انصراف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChoosePlanStructures;
