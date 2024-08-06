import {
  Control,
  FieldArrayWithId,
  FieldError,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import {
  AddPlanForm,
  BoxObject,
  CombinedStructure,
  EditPlanForm,
  PlanObject,
} from "@/app/lib/interfaces";
import CustomInput from "@/app/components/inputs/CustomInput";
import { formatNumber } from "@/app/utilities/formatNumber";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllBoxes } from "@/app/apiSlices/boxesApiSlice";

type Props = {
  page: string;
  item: FieldArrayWithId<EditPlanForm, "structures", "id">;
  selectedStructure: CombinedStructure;
  control: Control<EditPlanForm, any> | Control<AddPlanForm, any>;
  fieldIndex: number;
  handleTextbox1Change: (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldIndex: number,
    prop: any
  ) => void;
  errors: FieldErrors<EditPlanForm>;
  setValue: UseFormSetValue<EditPlanForm> | UseFormSetValue<AddPlanForm>;
  plan: PlanObject;
  changeInput: boolean;
  setChangeInput: any;
};

const MonthlyFeeInput = (props: Props) => {
  const {
    page,
    item,
    selectedStructure,
    control,
    fieldIndex,
    handleTextbox1Change,
    errors,
    setValue,
    plan,
    changeInput,
    setChangeInput,
  } = props;

  useEffect(() => {
    if (page === "edit") {
      if (!changeInput) {
        setTimeout(
          () =>
            setValue(
              `structures.${fieldIndex}.monthlyFee`,
              String(item?.monthlyFee)
            ),
          1000
        );
      }
    }
    if (page === "edit" && fieldIndex + 1 <= plan.structures.length) {
      if (!changeInput) {
        setTimeout(
          () =>
            setValue(
              `structures.${fieldIndex}.monthlyFee`,
              String(item?.monthlyFee)
            ),
          1000
        );
      }
    } else {
      if (!changeInput) {
        setTimeout(
          () =>
            setValue(
              `structures.${fieldIndex}.monthlyFee`,
              String(selectedStructure?.monthlyBaseFee)
            ),
          1000
        );
      }
    }
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between gap-3 items-center w-full">
        <div className="flex gap-3 items-center">
          <input
            type="checkbox"
            onChange={() => setChangeInput(!changeInput)}
            id={`structures.${fieldIndex}.monthlyFee`}
          />
          <label
            htmlFor={`structures.${fieldIndex}.monthlyFee`}
            className="text-[#767676] font-bold"
          >
            تعرفه ماهیانه سازه
          </label>{" "}
        </div>
      </div>
      {!changeInput ? (
        <>
          {page === "edit" && fieldIndex + 1 <= plan.structures.length ? (
            <p className="p-4 text-primary dark:text-secondary">
              {item?.monthlyFee
                ? formatNumber(Number(item?.monthlyFee), ",")
                : "تعرفه های ماهیانه این پلن ویرایش شده اند!"}
            </p>
          ) : (
            page !== "edit" && (
              <p className="p-4 text-primary dark:text-secondary">
                {formatNumber(selectedStructure?.monthlyBaseFee, ",")}
              </p>
            )
          )}
        </>
      ) : (
        <CustomInput
          control={control}
          type="text"
          name={`structures.${fieldIndex}.monthlyFee`}
          defaultValue={page === "edit" ? String(item.monthlyFee) : undefined}
          onChange={(event: any) =>
            handleTextbox1Change(
              event,
              0,
              `structures.${fieldIndex}.monthlyFee`
            )
          }
          required={true}
          errors={
            (errors?.structures?.[fieldIndex]?.monthlyFee as FieldError)
              ?.message
          }
          className="formInput"
        />
      )}
    </div>
  );
};

export default MonthlyFeeInput;
