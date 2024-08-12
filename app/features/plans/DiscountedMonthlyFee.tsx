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

  const discountedMonthlyFee =
    page === "edit"
      ? selectedStructure && changeInput && discountType === "percentage"
        ? convertToNumber(selectedMonthlyFee) -
          (convertToNumber(selectedMonthlyFee) *
            convertToNumber(selectedDiscount)) /
            100
        : selectedStructure && !changeInput && discountType === "number"
        ? Number(item.monthlyFee) - convertToNumber(selectedDiscount)
        : !changeInput && discountType === "percentage"
        ? Number(item.monthlyFee) -
          (Number(item.monthlyFee) * convertToNumber(selectedDiscount)) / 100
        : changeInput && discountType === "number"
        ? convertToNumber(selectedMonthlyFee) -
          convertToNumber(selectedDiscount)
        : Number(item.monthlyFee) - convertToNumber(selectedDiscount)
      : selectedStructure && changeInput && discountType === "percentage"
      ? convertToNumber(selectedMonthlyFee) -
        (convertToNumber(selectedMonthlyFee) *
          convertToNumber(selectedDiscount)) /
          100
      : selectedStructure && changeInput && discountType === "number"
      ? convertToNumber(selectedMonthlyFee) - convertToNumber(selectedDiscount)
      : selectedStructure && !changeInput && discountType === "percentage"
      ? selectedStructure?.monthlyBaseFee! -
        (selectedStructure?.monthlyBaseFee! *
          convertToNumber(selectedDiscount)) /
          100
      : selectedStructure && !changeInput && discountType === "number"
      ? selectedStructure?.monthlyBaseFee! - convertToNumber(selectedDiscount)
      : 0;

  // Set the discounted monthly fee in the form state
  useEffect(() => {
    setValue(
      `structures.${fieldIndex}.monthlyFeeWithDiscount`,
      discountedMonthlyFee.toString()
    );
  }, [discountedMonthlyFee, setValue, fieldIndex]);

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="discountedMothlyFee" className="text-[#767676] font-bold">
        تعرفه ماهیانه نهایی
      </label>

      <p
        className="p-4 text-primary dark:text-secondary"
        id="discountedMothlyFee"
      >
        {formatNumber(discountedMonthlyFee, ",")}
      </p>

      <small className="text-xs text-rose-600">
        {(errors?.structures?.[fieldIndex]?.monthlyFee as FieldError)?.message}
      </small>
    </div>
  );
};

export default DiscountedMonthlyFee;
