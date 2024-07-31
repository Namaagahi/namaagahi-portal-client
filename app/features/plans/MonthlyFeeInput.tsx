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
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAllBoxes } from "@/app/apiSlices/boxesApiSlice";

type Props = {
  page: string;
  item: FieldArrayWithId<EditPlanForm, "structures", "id">;
  changeInput: boolean;
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
  structureId?: string;
};

const MonthlyFeeInput = (props: Props) => {
  const {
    page,
    item,
    changeInput,
    selectedStructure,
    control,
    fieldIndex,
    handleTextbox1Change,
    errors,
    setValue,
    plan,
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

  useEffect(() => {
    if (page === "edit") {
      if (!changeInput) {
        setTimeout(
          () =>
            setValue(
              `structures.${fieldIndex}.monthlyFee`,
              String(structureFee?.monthlyFee)
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
              String(structureFee?.monthlyFee)
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
              String(structureFee?.monthlyBaseFee)
            ),
          1000
        );
      }
    }
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {!changeInput ? (
        <>
          <label
            htmlFor={`structures.${fieldIndex}.monthlyFee`}
            className="text-[#767676] font-bold"
          >
            تعرفه ماهیانه سازه
          </label>
          {page === "edit" && fieldIndex + 1 <= plan.structures.length ? (
            <p className="p-4 text-primary dark:text-secondary">
              {structureFee?.monthlyFee
                ? formatNumber(Number(structureFee?.monthlyFee), ",")
                : "تعرفه های ماهیانه این پلن ویرایش شده اند!"}
            </p>
          ) : (
            page !== "edit" && (
              <p className="p-4 text-primary dark:text-secondary">
                {formatNumber(structureFee?.monthlyBaseFee, ",")}
              </p>
            )
          )}
        </>
      ) : (
        <CustomInput
          control={control}
          type="text"
          name={`structures.${fieldIndex}.monthlyFee`}
          defaultValue={
            page === "edit" ? String(structureFee.monthlyFee) : undefined
          }
          onChange={(event: any) =>
            handleTextbox1Change(
              event,
              0,
              `structures.${fieldIndex}.monthlyFee`
            )
          }
          label="تعرفه ماهیانه سازه"
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
