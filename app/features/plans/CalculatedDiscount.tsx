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
  } = props;
  return (
    <p className="p-4 text-primary dark:text-secondary" id="discount">
      {
        !changeInput && isDiscountedInput
          ? (
              100 -
              (convertToNumber(selectedDiscountedMonthlyFee) * 100) /
                selectedStructure?.monthlyBaseFee
            ).toFixed(2)
          : changeInput && isDiscountedInput
          ? (
              100 -
              (convertToNumber(selectedDiscountedMonthlyFee) * 100) /
                convertToNumber(selectedMonthlyFee)
            ).toFixed(2)
          : "salam"
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
