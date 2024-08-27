import {
  AddPlanForm,
  CombinedStructure,
  EditPlanForm,
  PlanObject,
} from "@/app/lib/interfaces";
import React, { useEffect, useRef } from "react";
import { FieldArrayWithId, UseFormSetValue } from "react-hook-form";

type Props = {
  selectedDiscountedMonthlyFee: any;
  selectedMonthlyFee: any;
  convertToNumber: (value: string | number) => number | any;
  fieldIndex: number;
  setValue: UseFormSetValue<EditPlanForm> | UseFormSetValue<AddPlanForm>;
  selectedStructure: CombinedStructure;
  changeInput: boolean;
  isDiscountedInput: boolean;
  plan: PlanObject;
  item: FieldArrayWithId<EditPlanForm, "structures", "id">;
  page: string;
};

const CalculatedDiscount = (props: Props) => {
  const {
    selectedDiscountedMonthlyFee,
    selectedMonthlyFee,
    convertToNumber,
    fieldIndex,
    setValue,
    selectedStructure,
    changeInput,
    isDiscountedInput,
    plan,
    item,
    page,
  } = props;

  const disAmount =
    !changeInput && isDiscountedInput
      ? page === "edit"
        ? Number(item.monthlyFee) === selectedMonthlyFee
          ? 100 -
            (convertToNumber(selectedDiscountedMonthlyFee) * 100) /
              Number(item.monthlyFee)
          : 100 -
            (convertToNumber(selectedDiscountedMonthlyFee) * 100) /
              Number(selectedStructure?.monthlyBaseFee)
        : 100 -
          (convertToNumber(selectedDiscountedMonthlyFee) * 100) /
            selectedStructure?.monthlyBaseFee
      : changeInput && isDiscountedInput
      ? 100 -
        (convertToNumber(selectedDiscountedMonthlyFee) * 100) /
          convertToNumber(selectedMonthlyFee)
      : 0;

  useEffect(() => {
    setValue(`structures.${fieldIndex}.discountFee`, disAmount.toString());
  }, [disAmount, setValue, fieldIndex]);

  return (
    <p className="p-4 text-primary dark:text-secondary" id="discount">
      {
        disAmount.toFixed(2)
        // :
        // changeInput && !isDiscountedInput
        // ?
        // 'salam'
        // :
        // 'salam'
      }
      {/* {!changeInput && !isDiscountedInput ?
            (100 - ((convertToNumber(selectedDiscountedMonthlyFee) * 100) / selectedStructure?.monthlyBaseFee)) > 100 
            || 
            (100 - ((convertToNumber(selectedDiscountedMonthlyFee) * 100) / selectedStructure?.monthlyBaseFee)) < 0 ?
                '0'
                :
                (100 - ((convertToNumber(selectedDiscountedMonthlyFee) * 100) / selectedStructure?.monthlyBaseFee)).toFixed(2)
            : 
            changeInput && !isDiscountedInput ?
            // "SALAM"
            (100 - ((convertToNumber(selectedDiscountedMonthlyFee) * 100) / convertToNumber(selectedMonthlyFee))) > 100 
            ? 
            (100 - ((convertToNumber(selectedDiscountedMonthlyFee) * 100) / selectedStructure?.monthlyBaseFee)).toFixed(2)
            :
            (100 - ((convertToNumber(selectedDiscountedMonthlyFee) * 100) / selectedStructure?.monthlyBaseFee)).toFixed(2)
                : 
                changeInput && isDiscountedInput ?
                (100 - ((convertToNumber(selectedDiscountedMonthlyFee) * 100) / plan.totalMonthlyFee!)).toFixed(2)
                : 
                (100 - ((convertToNumber(selectedDiscountedMonthlyFee) * 100) / selectedMonthlyFee)).toFixed(2)
                : (100 - ((convertToNumber(selectedDiscountedMonthlyFee) * 100) / selectedMonthlyFee)).toFixed(2)
        } */}
    </p>
  );
};

export default CalculatedDiscount;
