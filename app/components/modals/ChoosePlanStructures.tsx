"use client";
import { StructureObject } from "@/app/lib/interfaces";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
  handleModal: () => void;
  data: StructureObject[];
  setValue: any;
};

const ChoosePlanStructures = (props: Props) => {
  const { handleModal, data, setValue } = props;

  const [selectedIndices, setSelectedIndices] = useState<StructureObject[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [finishFlag, setFinishFlag] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<StructureObject[]>([]);

  const toggleSelection = (item: StructureObject, index: number) => {
    const isSelected = selectedIndices.includes(item);

    if (isSelected) {
      setSelectedIndices(selectedIndices.filter((i) => i !== item));
    } else {
      setSelectedIndices((old) => [...old, item]);
    }
  };

  const performSearch = (value: string) => {
    const searchText = value.toLowerCase();
    const filteredResults = (finishFlag ? selectedIndices : data).filter(
      (item: StructureObject) => {
        return (
          item.name?.toLowerCase().includes(searchText) ||
          item.location?.address.toLowerCase().includes(searchText) ||
          item.location?.path.toLowerCase().includes(searchText)
        );
      }
    );
    setSearchResults(filteredResults);
  };

  const handleFinish = () => {
    setFinishFlag(!finishFlag);
  };

  const handleConfirmSelection = () => {
    setValue("structures", selectedIndices);
    handleModal();
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
            <div className="py-7 border-[1px] border-x-transparent border-y-[#FA9E93]">
              <input
                type="text"
                placeholder="جستجو"
                className="formInput2"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  performSearch(e.target.value);
                }}
              />
              <div className="mt-4 bg-cyan-100 text-gray-700 font-bold rounded-xl p-3 h-[200px] overflow-y-auto">
                <ul>
                  {searchResults.length === 0
                    ? (finishFlag ? selectedIndices : data).map(
                        (item, index) => {
                          const isSelected = selectedIndices.includes(item);
                          return (
                            <li
                              className={`mt-2 cursor-pointer transition-all ${
                                isSelected
                                  ? "text-green-600 bg-cyan-200"
                                  : "hover:text-red-400"
                              }`}
                              key={index}
                              onClick={() => toggleSelection(item, index)}
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
                                ? "text-green-600 bg-cyan-200"
                                : "hover:text-red-400"
                            }`}
                            key={index}
                            onClick={() => toggleSelection(item, index)}
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
                className="hover:bg-green-300 dark:hover:bg-green-300 bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-10 hover:scale-110 mt-3 text-gray-400 font-semibold py-2 px-4 border border-gray-400 rounded shadow "
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