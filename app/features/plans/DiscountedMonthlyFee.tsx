import {
  FieldArrayWithId,
  FieldError,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { formatNumber } from "@/app/utilities/formatNumber";
import {
  AddPlanForm,
  BoxObject,
  CombinedStructure,
  EditPlanForm,
} from "@/app/lib/interfaces";
import { useSelector } from "react-redux";
import { selectAllBoxes } from "@/app/apiSlices/boxesApiSlice";

type Props = {
  page: string;
  item: FieldArrayWithId<EditPlanForm, "structures", "id">;
  selectedStructure?: CombinedStructure;
  changeInput: boolean;
  discountType: string;
  convertToNumber: (value: string | number) => any;
  selectedMonthlyFee: any;
  selectedDiscount: string;
  errors: FieldErrors<EditPlanForm>;
  fieldIndex: number;
  setValue: UseFormSetValue<EditPlanForm> | UseFormSetValue<AddPlanForm>;
  structureId?: string;
  isChanged: boolean;
};

const DiscountedMonthlyFee = (props: Props) => {
  const {
    page,
    item,
    selectedStructure,
    changeInput,
    discountType,
    convertToNumber,
    selectedMonthlyFee,
    selectedDiscount,
    errors,
    fieldIndex,
    setValue,
    isChanged,
    structureId,
  } = props;

  const allBoxes: BoxObject[] = useSelector(
    (state) => selectAllBoxes(state) as BoxObject[]
  );

  const selectedStructureFromBox: any = allBoxes
    .map((box) => box.structures)
    .flat()
    .filter((str) => str.structureId === structureId);

  const structureFee =
    selectedStructureFromBox[selectedStructureFromBox.length - 1];

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="discountedMothlyFee" className="text-[#767676] font-bold">
        تعرفه ماهیانه نهایی
      </label>

      <p
        className="p-4 text-primary dark:text-secondary"
        id="discountedMothlyFee"
      >
        {
          // !isChanged ? formatNumber(Number(item.monthlyFeeWithDiscount), ',')
          // :
          page === "edit"
            ? structureFee && discountType === "percentage"
              ? formatNumber(
                  convertToNumber(selectedMonthlyFee) -
                    (convertToNumber(selectedMonthlyFee) *
                      convertToNumber(selectedDiscount)) /
                      100,
                  ","
                )
              : structureFee && !changeInput && discountType === "number"
              ? formatNumber(
                  structureFee?.monthlyBaseFee! -
                    convertToNumber(selectedDiscount),
                  ","
                )
              : changeInput && discountType === "percentage"
              ? // formatNumber(
                //     convertToNumber(selectedMonthlyFee) - (convertToNumber(selectedMonthlyFee) * convertToNumber(selectedDiscount) ) / 100,
                // ',')
                "salam"
              : !changeInput && discountType === "percentage"
              ? // formatNumber((Number(item.monthlyFee) - (Number(item.monthlyFee) * convertToNumber(selectedDiscount)) / 100) , ',' )
                "salam"
              : changeInput && discountType === "number"
              ? formatNumber(
                  convertToNumber(selectedMonthlyFee) -
                    convertToNumber(selectedDiscount),
                  ","
                )
              : formatNumber(
                  Number(item.monthlyFee) - convertToNumber(selectedDiscount),
                  ","
                )
            : structureFee && changeInput && discountType === "percentage"
            ? formatNumber(
                convertToNumber(selectedMonthlyFee) -
                  (convertToNumber(selectedMonthlyFee) *
                    convertToNumber(selectedDiscount)) /
                    100,
                ","
              )
            : structureFee && changeInput && discountType === "number"
            ? formatNumber(
                convertToNumber(selectedMonthlyFee) -
                  convertToNumber(selectedDiscount),
                ","
              )
            : structureFee && !changeInput && discountType === "percentage"
            ? formatNumber(
                structureFee?.monthlyBaseFee! -
                  (structureFee?.monthlyBaseFee! *
                    convertToNumber(selectedDiscount)) /
                    100,
                ","
              )
            : structureFee && !changeInput && discountType === "number"
            ? formatNumber(
                structureFee?.monthlyBaseFee! -
                  convertToNumber(selectedDiscount),
                ","
              )
            : ""
        }
      </p>

      <small className="text-xs text-rose-600 ">
        {(errors?.structures?.[fieldIndex]?.monthlyFee as FieldError)?.message}
      </small>
    </div>
  );
};

export default DiscountedMonthlyFee;
