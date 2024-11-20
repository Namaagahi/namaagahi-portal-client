import { planStructureFormValues } from "@/app/lib/constants";
import {
  AddPlanForm,
  CombinedStructure,
  EditPlanForm,
  PlanObject,
} from "@/app/lib/interfaces";
import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormSetValue,
} from "react-hook-form";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import DatePicker, { DateObject } from "react-multi-date-picker";
import StructureInfo from "./StructureInfo";
import ChooseStructureModal from "@/app/components/modals/ChooseStructureModal";
import SummaryBox from "./SummaryBox";
import moment from "jalali-moment";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import MonthlyFeeInput from "./MonthlyFeeInput";
import { useState } from "react";

type Props = {
  flags: boolean[];
  toggleFlag: any;
  appendStructure:
    | UseFieldArrayAppend<EditPlanForm, "structures">
    | UseFieldArrayAppend<AddPlanForm, "structures">;
  field:
    | FieldArrayWithId<EditPlanForm, "structures", "id">[]
    | FieldArrayWithId<AddPlanForm, "structures", "id">[];
  watch: any;
  combinedStructures: CombinedStructure[] | any;
  setValue: UseFormSetValue<EditPlanForm> | UseFormSetValue<AddPlanForm>;
  showStructureInfo: boolean;
  handleThisStructuresChange: (index: number, val: string) => void;
  handleStructureInfoModal: () => void;
  handleModalToggle: (fieldIndex: number) => void;
  thisStructures: string[];
  isStructureChoose: any[];
  page: string;
  plan: PlanObject;
  errors: FieldErrors<EditPlanForm>;
  control: Control<EditPlanForm, any> | Control<AddPlanForm, any>;
  removeStructure: UseFieldArrayRemove;
  handleTextbox1Change(
    event: React.ChangeEvent<HTMLInputElement>,
    fieldIndex: number,
    prop: any
  ): void;
};

const PackagePlanStructureInfo = (props: Props) => {
  const {
    flags,
    toggleFlag,
    appendStructure,
    field,
    watch,
    combinedStructures,
    setValue,
    showStructureInfo,
    handleThisStructuresChange,
    handleStructureInfoModal,
    handleModalToggle,
    thisStructures,
    isStructureChoose,
    page,
    plan,
    errors,
    control,
    removeStructure,
    handleTextbox1Change,
  } = props;

  //   const [flags, setFlags] = useState<boolean[]>(field.map(() => false));

  //   const toggleFlag = (index: number) => {
  //     setFlags((prevFlags) => {
  //       const newFlags = [...prevFlags];
  //       newFlags[index] = !newFlags[index];
  //       return newFlags;
  //     });
  //   };

  return (
    <div className="formContainer">
      <small className="pr-3 text-slate-500 inline-block font-bold">
        اطلاعات سازه ها
      </small>
      {/* <div className="flex justify-between gap-3 items-center w-full">
        <div className="flex gap-3 items-center">
          <input
            type="checkbox"
            onChange={() => setChangeInput(!changeInput)}
          />
          <p className="dark:text-white">ویرایش تعرفه های ماهیانه</p>
        </div>
      </div> */}

      {field.map((item, fieldIndex) => {
        const selectedStructureId: string = watch(
          `structures.${fieldIndex}.structureId`
        );
        const selectedMonthlyFee = watch(`structures.${fieldIndex}.monthlyFee`);
        const selectedStructure = combinedStructures.find(
          (str: any) => str.structureId === selectedStructureId
        );

        const handleStartDate = (value: DateObject | DateObject[] | null) => {
          if (value instanceof DateObject) {
            setValue(`structures.${fieldIndex}.duration.sellStart`, value.unix);
          } else if (Array.isArray(value) && value.length > 0) {
            const timestamps = value.map((date) => date.unix);
            setValue(
              `structures.${fieldIndex}.duration.sellStart`,
              timestamps[0]
            );
          } else {
            setValue(
              `structures.${fieldIndex}.duration.sellStart`,
              new Date().getTime()
            );
          }
        };

        const handleEndDate = (value: DateObject | DateObject[] | null) => {
          if (value instanceof DateObject) {
            setValue(`structures.${fieldIndex}.duration.sellEnd`, value.unix);
          } else if (Array.isArray(value) && value.length > 0) {
            const timestamps = value.map((date) => date.unix);
            setValue(
              `structures.${fieldIndex}.duration.sellEnd`,
              timestamps[0]
            );
          } else {
            setValue(
              `structures.${fieldIndex}.duration.sellEnd`,
              new Date().getTime()
            );
          }
        };

        return (
          <>
            {selectedStructure && showStructureInfo && (
              <StructureInfo
                handleModal={handleStructureInfoModal}
                selectedStructure={selectedStructure}
              />
            )}
            <div
              className=" border-[1px] rounded-md flex flex-col items-end  border-primary bg-secondary dark:bg-primary w-full"
              key={item.id}
            >
              <div className="relative grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 p-2 xl:grid-cols-6 2xl:grid-cols-9 gap-4 lg:gap-6 w-full">
                <div className="absolute right-0 top-0 min-h-[24px] w-4 rounded-md bg-primary flex justify-center items-center font-bold text-white hover:scale-125 cursor-pointer transition-all">
                  {fieldIndex + 1}
                </div>

                <div className="flex flex-col gap-3">
                  <label
                    htmlFor={"strChoose"}
                    className="text-[#767676] dark:text-white font-bold mr-4"
                  >
                    کد سامانه
                  </label>
                  <button
                    type="button"
                    onClick={() => handleModalToggle(fieldIndex)}
                    id="strChoose"
                    className="bg-black p-[4.5px] text-white rounded-md hover:text-black hover:bg-white transition-colors"
                  >
                    {thisStructures[fieldIndex] || "انتخاب سازه"}
                  </button>
                  {isStructureChoose[fieldIndex] && (
                    <ChooseStructureModal
                      handleModal={() => handleModalToggle(fieldIndex)}
                      data={combinedStructures!}
                      fieldIndex={fieldIndex}
                      setValue={setValue}
                      handleThisStructuresChange={handleThisStructuresChange}
                      chosenStructures={[]}
                      setChosenStructures={() => console.log("HEY")}
                    />
                  )}
                </div>

                <div className="flex flex-col gap-3 col-span-3 bg-white bg-opacity-40 p-2 rounded-md overflow-x-auto">
                  {combinedStructures.map((structure: any) => {
                    if (structure.structureId === selectedStructureId)
                      return (
                        <SummaryBox
                          structure={structure}
                          selectedStructure={selectedStructure!}
                          setValue={setValue}
                          fieldIndex={fieldIndex}
                        />
                      );
                  })}
                </div>

                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="sellStartDate"
                    className="text-[#767676] font-bold"
                  >
                    تاریخ شروع
                  </label>
                  <DatePicker
                    inputClass="formInput w-3/4"
                    format="YYYY-MM-DD"
                    value={
                      page === "edit" &&
                      fieldIndex + 1 <= plan.structures.length
                        ? moment
                            .unix(item.duration.sellStart)
                            .format("jYYYY-jMM-jDD")
                        : undefined
                    }
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    onChange={(e) => handleStartDate(e)}
                  />
                  <small className="text-xs text-rose-600 ">
                    {
                      errors?.["structures"]?.[fieldIndex]?.["duration"]?.[
                        "sellStart"
                      ]?.["message"]
                    }
                  </small>
                </div>

                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="sellEndDate"
                    className="text-[#767676] font-bold"
                  >
                    تاریخ پایان
                  </label>
                  <DatePicker
                    inputClass="formInput w-3/4"
                    format="YYYY-MM-DD"
                    value={
                      page === "edit" &&
                      fieldIndex + 1 <= plan.structures.length
                        ? moment
                            .unix(item.duration.sellEnd)
                            .format("jYYYY-jMM-jDD")
                        : undefined
                    }
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    onChange={(e) => handleEndDate(e)}
                  />
                  <small className="text-xs text-rose-600 ">
                    {
                      errors?.["structures"]?.[fieldIndex]?.["duration"]?.[
                        "sellEnd"
                      ]?.["message"]
                    }
                  </small>
                </div>

                {combinedStructures.map((structure: any) => {
                  return (
                    structure.structureId === selectedStructureId && (
                      <MonthlyFeeInput
                        page={page}
                        item={item}
                        selectedStructure={selectedStructure!}
                        control={control}
                        fieldIndex={fieldIndex}
                        plan={plan}
                        handleTextbox1Change={handleTextbox1Change}
                        errors={errors}
                        setValue={setValue}
                        changeInput={flags[fieldIndex]}
                        setChangeInput={() => toggleFlag(fieldIndex)}
                      />
                    )
                  );
                })}
              </div>
              <AiFillMinusCircle
                className={`${
                  fieldIndex === 0 && field.length < 2 ? "hidden" : "block"
                } cursor-pointer text-2xl hover:text-red-700 transition-all`}
                onClick={() => removeStructure(fieldIndex)}
              />
            </div>
          </>
        );
      })}

      <AiFillPlusCircle
        className="cursor-pointer text-2xl dark:text-white hover:text-green-700 transition-all"
        onClick={() => appendStructure(planStructureFormValues)}
      />
    </div>
  );
};

export default PackagePlanStructureInfo;
