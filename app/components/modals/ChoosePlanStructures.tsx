"use client";
import { StructureObject } from "@/app/lib/interfaces";
import React, { useEffect, useState } from "react";
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

  const toggleSelection = (item: StructureObject) => {
    const isSelected = selectedIndices.includes(item);

    if (isSelected) {
      setSelectedIndices(selectedIndices.filter((i) => i !== item));
    } else {
      setSelectedIndices((old) => [...old, item]);
    }
  };

  const performSearch = (value: string) => {
    const searchText = value.toLowerCase();
    const filteredResults = data.filter((item: StructureObject) => {
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
    setValue("structures", selectedIndices);
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
              <div className="mt-4 bg-gray-400 dark:bg-white dark:bg-opacity-25 bg-opacity-25  font-bold rounded-xl p-3 h-[200px] overflow-y-auto">
                <ul>
                  {searchResults.length === 0
                    ? (finishFlag ? selectedIndices : data).map(
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
