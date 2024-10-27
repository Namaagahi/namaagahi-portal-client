import {
  AddPlanForm,
  CombinedStructure,
  EditPlanForm,
  PlanObject,
} from "@/app/lib/interfaces";
import { useEffect, useRef, useState } from "react";
import {
  Control,
  FieldArrayWithId,
  FieldError,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { FaDollarSign, FaPercentage } from "react-icons/fa";
import DatePicker, { DateObject } from "react-multi-date-picker";
import StructureInfo from "./StructureInfo";
import ChooseStructureModal from "@/app/components/modals/ChooseStructureModal";
import SummaryBox from "./SummaryBox";
import moment from "jalali-moment";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import MonthlyFeeInput from "./MonthlyFeeInput";
import DiscountFeeInput from "./DiscountFeeInput";
import CalculatedDiscount from "./CalculatedDiscount";
import DiscountedMonthlyFee from "./DiscountedMonthlyFee";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { planStructureFormValues } from "@/app/lib/constants";
import useAuth from "@/app/hooks/useAuth";

type Props = {
  flags: boolean[];
  toggleFlag: any;
  setDiscountType: any;
  page: string;
  mark: string;
  discountTypes: string[];
  field:
    | FieldArrayWithId<EditPlanForm, "structures", "id">[]
    | FieldArrayWithId<AddPlanForm, "structures", "id">[];
  watch: any;
  combinedStructures: CombinedStructure[];
  setValue: UseFormSetValue<EditPlanForm> | UseFormSetValue<AddPlanForm>;
  showStructureInfo: boolean;
  handleStructureInfoModal: () => void;
  handleModalToggle: (fieldIndex: number) => void;
  isStructureChoose: any[];
  thisStructures: string[];
  handleThisStructuresChange: (index: number, val: string) => void;
  plan: PlanObject;
  errors: FieldErrors<EditPlanForm>;
  control: Control<EditPlanForm, any> | Control<AddPlanForm, any>;
  handleTextbox1Change(
    event: React.ChangeEvent<HTMLInputElement>,
    fieldIndex: number,
    prop: any
  ): void;
  register: UseFormRegister<EditPlanForm> | UseFormRegister<AddPlanForm>;
  convertToNumber: (value: string | number) => number | any;
  isChanged: boolean;
  removeStructure: UseFieldArrayRemove;
  appendStructure:
    | UseFieldArrayAppend<EditPlanForm, "structures">
    | UseFieldArrayAppend<AddPlanForm, "structures">;
  discountFlags: boolean[];
  toggleDiscountFlag: any;
};

const RegularPlanStructureInfo = (props: Props) => {
  const {
    flags,
    toggleFlag,
    setDiscountType,
    page,
    mark,
    discountTypes,
    field,
    watch,
    combinedStructures,
    setValue,
    showStructureInfo,
    handleStructureInfoModal,
    handleModalToggle,
    isStructureChoose,
    thisStructures,
    handleThisStructuresChange,
    plan,
    errors,
    control,
    handleTextbox1Change,
    register,
    convertToNumber,
    isChanged,
    removeStructure,
    appendStructure,
    discountFlags,
    toggleDiscountFlag,
  } = props;
  const { username } = useAuth();

  return (
    <div className="formContainer">
      <small className="pr-3 text-slate-500 inline-block font-bold">
        اطلاعات سازه ها
      </small>
      <div className="flex justify-between gap-3 items-center w-full"></div>

      {field.map((item, fieldIndex) => {
        const selectedStructureId: string = watch(
          `structures.${fieldIndex}.structureId`
        );
        const selectedMonthlyFee = watch(`structures.${fieldIndex}.monthlyFee`);
        const selectedDiscountedMonthlyFee = watch(
          `structures.${fieldIndex}.monthlyFeeWithDiscount`
        );
        const selectedDiscount: string = watch(
          `structures.${fieldIndex}.discountFee`
        );
        const selectedStructure = combinedStructures?.find(
          (str) => str.structureId === selectedStructureId
        );
        console.log(selectedStructure);

        const handleStartDate = (value: DateObject | DateObject[] | null) => {
          if (value instanceof DateObject) {
            const normalizedUnix = moment
              .unix(value.unix)
              .startOf("day")
              .unix();
            setValue(
              `structures.${fieldIndex}.duration.sellStart`,
              normalizedUnix
            );
          } else if (Array.isArray(value) && value.length > 0) {
            const normalizedUnix = moment
              .unix(value[0].unix)
              .startOf("day")
              .unix();
            setValue(
              `structures.${fieldIndex}.duration.sellStart`,
              normalizedUnix
            );
          } else {
            const normalizedUnix = moment().startOf("day").unix();
            setValue(
              `structures.${fieldIndex}.duration.sellStart`,
              normalizedUnix
            );
          }
        };

        const handleEndDate = (value: DateObject | DateObject[] | null) => {
          if (value instanceof DateObject) {
            const normalizedUnix = moment
              .unix(value.unix)
              .startOf("day")
              .unix();
            setValue(
              `structures.${fieldIndex}.duration.sellEnd`,
              normalizedUnix
            );
          } else if (Array.isArray(value) && value.length > 0) {
            const normalizedUnix = moment
              .unix(value[0].unix)
              .startOf("day")
              .unix();
            setValue(
              `structures.${fieldIndex}.duration.sellEnd`,
              normalizedUnix
            );
          } else {
            const normalizedUnix = moment().startOf("day").unix();
            setValue(
              `structures.${fieldIndex}.duration.sellEnd`,
              normalizedUnix
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
                    onClick={() => {
                      handleModalToggle(fieldIndex);
                      if (page !== "edit")
                        setDiscountType(fieldIndex, "percentage");
                    }}
                    id="strChoose"
                    className="bg-black p-[4.5px] text-white rounded-md hover:text-black hover:bg-white transition-colors"
                  >
                    {thisStructures && thisStructures[fieldIndex]
                      ? thisStructures[fieldIndex]
                      : "انتخاب سازه"}
                  </button>
                  {isStructureChoose[fieldIndex] && (
                    <ChooseStructureModal
                      handleModal={() => handleModalToggle(fieldIndex)}
                      data={
                        username === "amin.haddadi1995@gmail.com" ||
                        username === "soltani"
                          ? combinedStructures!
                          : combinedStructures.filter((x) => /\d$/.test(x.name))
                      }
                      fieldIndex={fieldIndex}
                      setValue={setValue}
                      handleThisStructuresChange={handleThisStructuresChange}
                      chosenStructures={[]}
                      setChosenStructures={() => console.log("HEY")}
                    />
                  )}
                </div>

                <div className="flex flex-col gap-3 col-span-3 bg-white bg-opacity-40 p-2 rounded-md overflow-x-auto">
                  {combinedStructures?.map((structure) => {
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

                {combinedStructures?.map((structure) => {
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
                        changeInput={flags && flags[fieldIndex]}
                        setChangeInput={() => toggleFlag(fieldIndex)}
                      />
                    )
                  );
                })}

                <div className="flex flex-col gap-3">
                  <div className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      checked={discountFlags && !discountFlags[fieldIndex]}
                      onChange={() => {
                        toggleDiscountFlag(fieldIndex);
                        setDiscountType("percentage");
                      }}
                      id={`structures.${fieldIndex}.discount`}
                    />
                    <label
                      htmlFor={`structures.${fieldIndex}.discount`}
                      className="text-[#767676] font-bold"
                    >
                      تخفیف
                    </label>
                    <div className="flex gap-3 items-center dark:text-white">
                      {!discountFlags[fieldIndex] && (
                        <>
                          <FaPercentage
                            className={`${
                              discountTypes[fieldIndex] === "percentage"
                                ? "text-purple-700 scale-150"
                                : "text-purple-400"
                            } hover:scale-150 transition-all cursor-pointer `}
                            onClick={() =>
                              setDiscountType(fieldIndex, "percentage")
                            }
                          />
                          <FaDollarSign
                            className={`${
                              discountTypes[fieldIndex] === "number"
                                ? "text-purple-700 scale-150"
                                : "text-purple-400"
                            } hover:scale-150 transition-all cursor-pointer`}
                            onClick={() =>
                              setDiscountType(fieldIndex, "number")
                            }
                          />
                        </>
                      )}
                    </div>
                  </div>
                  {!discountFlags[fieldIndex] && mark === "regular" ? (
                    <DiscountFeeInput
                      page={page}
                      discountType={discountTypes[fieldIndex]}
                      register={register}
                      fieldIndex={fieldIndex}
                      item={item}
                      handleTextbox1Change={handleTextbox1Change}
                      errors={errors}
                      convertToNumber={convertToNumber}
                      selectedStructure={selectedStructure}
                      isDiscountedInput={discountFlags[fieldIndex]}
                      setValue={setValue}
                      watch={watch}
                    />
                  ) : (
                    <CalculatedDiscount
                      page={page}
                      selectedDiscountedMonthlyFee={
                        selectedDiscountedMonthlyFee
                      }
                      selectedMonthlyFee={selectedMonthlyFee}
                      convertToNumber={convertToNumber}
                      fieldIndex={fieldIndex}
                      setValue={setValue}
                      selectedStructure={selectedStructure!}
                      changeInput={flags && flags[fieldIndex]}
                      isDiscountedInput={
                        discountFlags && discountFlags[fieldIndex]
                      }
                      plan={plan}
                      item={item}
                    />
                  )}

                  <small className="text-xs text-rose-600 dark:text-rose-200">
                    {
                      (
                        errors?.structures?.[fieldIndex]
                          ?.monthlyFee as FieldError
                      )?.message
                    }
                  </small>
                </div>

                {discountFlags && discountFlags[fieldIndex] ? (
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="discountedMothlyFee"
                      className="text-[#FFFFFF] font-bold"
                    >
                      تعرفه ماهیانه نهایی
                    </label>
                    <input
                      {...register(
                        `structures.${fieldIndex}.monthlyFeeWithDiscount`,
                        {
                          required: {
                            value: true,
                            message: "مبلغ تعرفه نهایی ماهیانه را وارد کنید.",
                          },
                        }
                      )}
                      type="text"
                      id="discountedMothlyFee"
                      placeholder="تعرفه ماهیانه نهایی"
                      className="formInput"
                      onWheel={(e: any) => e.target.blur()}
                      defaultValue={
                        page === "edit"
                          ? item.monthlyFeeWithDiscount
                          : undefined
                      }
                      onChange={(event) =>
                        handleTextbox1Change(
                          event,
                          0,
                          `structures.${fieldIndex}.monthlyFeeWithDiscount`
                        )
                      }
                    />
                  </div>
                ) : (
                  <DiscountedMonthlyFee
                    page={page}
                    item={item}
                    isChanged={isChanged}
                    selectedStructure={selectedStructure}
                    changeInput={flags && flags[fieldIndex]}
                    discountType={discountTypes && discountTypes[fieldIndex]}
                    convertToNumber={convertToNumber}
                    selectedMonthlyFee={selectedMonthlyFee}
                    selectedDiscount={selectedDiscount}
                    errors={errors}
                    fieldIndex={fieldIndex}
                    setValue={setValue}
                  />
                )}
              </div>
              <AiFillMinusCircle
                className={`${
                  fieldIndex === 0 ? "hidden" : "block"
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

export default RegularPlanStructureInfo;
