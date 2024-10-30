"use client";
import {
  CombinedStructure,
  PlanObject,
  StructureObject,
} from "@/app/lib/interfaces";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import { calculateAvailableDates } from "@/app/utilities/calculateAvailableDates";
import {
  selectAllPlans,
  useGetAllPlansQuery,
} from "@/app/apiSlices/plansApiSlice";
import {
  selectAllStructures,
  useGetStructuresQuery,
} from "@/app/apiSlices/structuresApiSlice";
import { useSelector } from "react-redux";

type Props = {
  handleModal: () => void;
  data: CombinedStructure[] | any[];
  fieldIndex: number;
  setValue: any;
  handleThisStructuresChange: (index: number, val: string) => void;
  chosenStructures: string[];
  setChosenStructures: any;
};

const ChooseStructureModal = (props: Props) => {
  const {
    handleModal,
    data,
    fieldIndex,
    setValue,
    handleThisStructuresChange,
    chosenStructures,
    setChosenStructures,
  } = props;

  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<StructureObject[]>([]);
  const [mainData, setMainData] = useState<CombinedStructure[]>([]);
  const [selectedItem, setSelectedItem] = useState<StructureObject | null>(
    null
  );
  const [isAlreadySelected, setIsAlreadySelected] = useState(false);
  const [empty, setEmpty] = useState<boolean>(false);
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
      empty
        ? data.filter((x) =>
            Array.from(availableStructures.entries())
              .filter(([key, value]) => value.availableRanges.length)
              .map(([key, value]) => key)
              .includes(x.name)
          )
        : data
    );
  };

  useEffect(() => {
    handleEmpty();
  }, [empty]);

  const performSearch = (value: string) => {
    const searchText = value.toLowerCase();
    const filteredResults = mainData.filter((item: StructureObject) => {
      return (
        item.name?.toLowerCase().includes(searchText) ||
        item.location?.address.toLowerCase().includes(searchText) ||
        item.location?.path.toLowerCase().includes(searchText)
      );
    });
    setSearchResults(filteredResults);
  };

  const handleSelectResult = (item: StructureObject) => setSelectedItem(item);

  const handleConfirmSelection = () => {
    if (chosenStructures[0]) {
      if (selectedItem && selectedItem.id) {
        if (chosenStructures.includes(selectedItem.id)) {
          setIsAlreadySelected(true);
          return;
        }
        setValue(`structures.${fieldIndex}.structureId`, selectedItem.id);
        handleThisStructuresChange(fieldIndex, selectedItem.name);
        setChosenStructures([...chosenStructures, selectedItem.id]);
        handleModal();
      }
    } else {
      if (selectedItem && selectedItem.id) {
        setValue(`structures.${fieldIndex}.structureId`, selectedItem.id);
        handleThisStructuresChange(fieldIndex, selectedItem.name);
        handleModal();
      }
    }
  };

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
            {isAlreadySelected && (
              <small className="text-md text-red-500">
                این سازه قبلا انتخاب شده است!
              </small>
            )}
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
              <div className="mt-4 bg-cyan-100 text-gray-700 font-bold rounded-xl p-3 h-[200px] overflow-y-auto">
                <ul>
                  {searchResults.length === 0 ? (
                    mainData.length === 0 ? (
                      <li
                        className="mt-2 cursor-pointer hover:text-red-700 transition-all"
                        key={1}
                      >
                        سازه ای وجود ندارد
                      </li>
                    ) : (
                      mainData.map((item, index) => {
                        return (
                          <li
                            className="mt-2 cursor-pointer hover:text-red-700 transition-all"
                            key={index}
                            onClick={() => handleSelectResult(item)}
                          >
                            {`${item?.name} - ${item.location?.address} - ${item.location?.path}`}
                          </li>
                        );
                      })
                    )
                  ) : searchResults.length === 0 ? (
                    <li
                      className="mt-2 cursor-pointer hover:text-red-700 transition-all"
                      key={1}
                    >
                      سازه ای وجود ندارد
                    </li>
                  ) : (
                    searchResults.map((item, index) => (
                      <li
                        className="mt-2 cursor-pointer hover:text-red-700 transition-all"
                        key={index}
                        onClick={() => handleSelectResult(item)}
                      >
                        {`${item?.name} - ${item.location?.address} - ${item.location?.path}`}
                      </li>
                    ))
                  )}
                </ul>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  className="formInput2 w-1/6"
                  type="text"
                  disabled
                  value={selectedItem?.name || ""}
                />
                <input
                  className="formInput2 w-4/6"
                  type="text"
                  disabled
                  value={selectedItem?.location?.address || ""}
                />
                <input
                  className="formInput2 w-1/6"
                  type="text"
                  disabled
                  value={selectedItem?.location?.path || ""}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={handleConfirmSelection}
              className={` ${
                !selectedItem
                  ? "deleteConfirmButton bg-gray-500 hover:bg-gray-500"
                  : "deleteConfirmButton"
              }`}
              disabled={!selectedItem}
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

export default ChooseStructureModal;
