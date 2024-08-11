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
  CombinedStructure,
  EditPlanForm,
} from "@/app/lib/interfaces";

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
  } = props;

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
            ? selectedStructure && !changeInput && discountType === "percentage"
              ? formatNumber(
                  convertToNumber(selectedMonthlyFee) -
                    (convertToNumber(selectedMonthlyFee) *
                      convertToNumber(selectedDiscount)) /
                      100,
                  ","
                )
              : selectedStructure && changeInput && discountType === "number"
              ? formatNumber(
                  Number(item.monthlyFee) - convertToNumber(selectedDiscount),
                  ","
                )
              : changeInput && discountType === "percentage"
              ? formatNumber(
                  Number(item.monthlyFee) -
                    (Number(item.monthlyFee) *
                      convertToNumber(selectedDiscount)) /
                      100,
                  ","
                )
              : !changeInput && discountType === "number"
              ? formatNumber(
                  convertToNumber(selectedMonthlyFee) -
                    convertToNumber(selectedDiscount),
                  ","
                )
              : formatNumber(
                  Number(item.monthlyFee) - convertToNumber(selectedDiscount),
                  ","
                )
            : selectedStructure && !changeInput && discountType === "percentage"
            ? formatNumber(
                convertToNumber(selectedMonthlyFee) -
                  (convertToNumber(selectedMonthlyFee) *
                    convertToNumber(selectedDiscount)) /
                    100,
                ","
              )
            : selectedStructure && !changeInput && discountType === "number"
            ? formatNumber(
                convertToNumber(selectedMonthlyFee) -
                  convertToNumber(selectedDiscount),
                ","
              )
            : selectedStructure && changeInput && discountType === "percentage"
            ? formatNumber(
                selectedStructure?.monthlyBaseFee! -
                  (selectedStructure?.monthlyBaseFee! *
                    convertToNumber(selectedDiscount)) /
                    100,
                ","
              )
            : selectedStructure && changeInput && discountType === "number"
            ? formatNumber(
                selectedStructure?.monthlyBaseFee! -
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
