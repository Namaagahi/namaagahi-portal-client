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
import {
  StructureObject,
  AddBoxForm,
  EditBoxForm,
  BoxStructure,
} from "@/app/lib/interfaces";
import {
  boxStructureFormValues,
  faces,
  styles,
  typeNames,
} from "@/app/lib/constants";
import ChooseStructureModal from "../../components/modals/ChooseStructureModal";
import { useGetStructuresQuery } from "../../apiSlices/structuresApiSlice";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import VariableCostsFormSection from "./VariableCostsFormSection";
import DatePicker, { DateObject } from "react-multi-date-picker";
import SelectInput from "@/app/components/inputs/SelectInput";
import CustomInput from "@/app/components/inputs/CustomInput";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import moment from "jalali-moment";
import { useTheme } from "next-themes";
import { FaToggleOff } from "react-icons/fa";
import { FaToggleOn } from "react-icons/fa6";
import { useParams, usePathname } from "next/navigation";

type Props = {
  page: string;
  register: UseFormRegister<AddBoxForm> | UseFormRegister<EditBoxForm>;
  errors: FieldErrors<AddBoxForm>;
  structuresField:
    | FieldArrayWithId<AddBoxForm, "structures", "id">[]
    | FieldArrayWithId<EditBoxForm, "structures", "id">[];
  appendStructure:
    | UseFieldArrayAppend<AddBoxForm, "structures">
    | UseFieldArrayAppend<EditBoxForm, "structures">;
  removeStructure: UseFieldArrayRemove;
  control: Control<AddBoxForm, any> | Control<EditBoxForm, any>;
  setValue: UseFormSetValue<AddBoxForm> | UseFormSetValue<EditBoxForm> | any;
  structures: StructureObject[];
  convertToNumber: (value: string) => number | null;
  formVals?: any;
  chosenStructures?: string[];
  setChosenStructures?:
    | Dispatch<SetStateAction<never[]>>
    | Dispatch<SetStateAction<string[]>>;
  mark: string;
  useExcel?: Boolean;
  setUseExcel?: any;
};

const BoxStructuresFormSection = (props: Props) => {
  const {
    page,
    register,
    errors,
    structuresField,
    appendStructure,
    removeStructure,
    control,
    setValue,
    structures,
    convertToNumber,
    formVals,
    mark,
    useExcel,
    setUseExcel,
  } = props;

  const { theme } = useTheme();
  const color = theme === "dark" ? "white" : "";

  useGetStructuresQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });

  const filtered = structures?.filter(
    (structure) => structure.isChosen === false
  );
  const [isStructureChoose, setIsStructureChoose] = useState(
    Array(structuresField.length).fill(false)
  );
  const [thisStructures, setThisStructures] = useState<string[]>([]);

  const handleModalToggle = (fieldIndex: number) => {
    const updatedState = [...isStructureChoose];
    updatedState[fieldIndex] = !updatedState[fieldIndex];
    setIsStructureChoose(updatedState);
  };

  const handleThisStructuresChange = (index: number, val: string) =>
    setThisStructures((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = val;
      return updatedState;
    });

  useEffect(() => {
    if (formVals) {
      const updatedStructures = formVals.map((item: BoxStructure) => {
        const structure = structures.find((str) => str.id === item.structureId);
        return structure ? structure.name : "انتخاب سازه";
      });
      setThisStructures(updatedStructures);
    }
  }, [formVals]);

  function handleTextbox1Change(
    event: React.ChangeEvent<HTMLInputElement>,
    fieldIndex: number,
    prop: any
  ) {
    const newValue = event.target.value.replace(/,/g, "");
    const numberValue = convertToNumber(newValue);
    const formattedValue =
      numberValue !== null
        ? new Intl.NumberFormat("en-US", {
            style: "decimal",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }).format(numberValue)
        : "";
    setValue(prop, formattedValue);
  }
  const params = usePathname();
  console.log(params);

  return (
    <div className="formContainer">
      <div className="flex justify-center align-center mb-4">
        <small className="pr-3 mt-1.5 text-slate-500 inline-block font-bold">
          اطلاعات سازه ها
        </small>
        {params.endsWith("createbox") && (
          <div className="flex mx-4">
            <button
              style={{ color: color }}
              type="button"
              onClick={() => setUseExcel(!useExcel)}
            >
              {useExcel ? <FaToggleOff size={25} /> : <FaToggleOn size={25} />}
            </button>
          </div>
        )}
      </div>
      {structuresField.map((item, fieldIndex) => {
        const selectInputs = [
          {
            id: 2,
            label: "نوع سازه",
            name: `structures.${fieldIndex}.marks.name`,
            options: typeNames,
            errors: (
              errors?.structures?.[fieldIndex]?.marks?.name as FieldError
            )?.message,
          },
          {
            id: 3,
            label: "استایل سازه",
            name: `structures.${fieldIndex}.marks.markOptions.style`,
            options: styles,
            errors: (
              errors?.structures?.[fieldIndex]?.marks?.markOptions
                ?.style as FieldError
            )?.message,
          },
          {
            id: 4,
            label: "تیپ سازه",
            name: `structures.${fieldIndex}.marks.markOptions.face`,
            options: faces,
            errors: (
              errors?.structures?.[fieldIndex]?.marks?.markOptions
                ?.face as FieldError
            )?.message,
          },
        ];

        const customInputs = [
          {
            id: 1,
            label: "طول",
            name: `structures.${fieldIndex}.marks.markOptions.length`,
            type: "number",
            message: "طول سازه را وارد کنید",
            errors: (
              errors?.structures?.[fieldIndex]?.marks?.markOptions
                ?.length as FieldError
            )?.message,
            // onWheel: (e: any) => e.target.blur()
          },
          {
            id: 2,
            label: "عرض",
            name: `structures.${fieldIndex}.marks.markOptions.width`,
            type: "number",
            message: "عرض سازه را وارد کنید",
            errors: (
              errors?.structures?.[fieldIndex]?.marks?.markOptions
                ?.width as FieldError
            )?.message,
          },
          {
            id: 3,
            label: "متراژ چاپ",
            name: `structures.${fieldIndex}.marks.markOptions.printSize`,
            type: "number",
            message: "متراژ چاپ سازه را وارد کنید",
            errors: (
              errors?.structures?.[fieldIndex]?.marks?.markOptions
                ?.printSize as FieldError
            )?.message,
          },
          {
            id: 4,
            label: "متراژ واقعی",
            name: `structures.${fieldIndex}.marks.markOptions.docSize`,
            type: "number",
            message: "متراژ واقعی سازه را وارد کنید",
            errors: (
              errors?.structures?.[fieldIndex]?.marks?.markOptions
                ?.docSize as FieldError
            )?.message,
          },
          {
            id: 5,
            label: "قیمت متر مربع",
            name: `structures.${fieldIndex}.costs.fixedCosts.squareCost`,
            type: "text",
            message: "قیمت متر مربع سازه را وارد کنید",
            errors: (
              errors?.structures?.[fieldIndex]?.costs?.fixedCosts
                ?.squareCost as FieldError
            )?.message,
            onChange: (event: any) =>
              handleTextbox1Change(
                event,
                0,
                `structures.${fieldIndex}.costs.fixedCosts.squareCost`
              ),
          },
          {
            id: 6,
            label: "تعرفه ماهیانه پایه",
            name: `structures.${fieldIndex}.monthlyBaseFee`,
            type: "text",
            message: "تعرفه ماهیانه پایه سازه را وارد کنید",
            errors: (
              errors?.structures?.[fieldIndex]?.monthlyBaseFee as FieldError
            )?.message,
            onChange: (event: any) =>
              handleTextbox1Change(
                event,
                0,
                `structures.${fieldIndex}.monthlyBaseFee`
              ),
          },
        ];

        return (
          <div
            className="rounded-md flex flex-col items-end dark:bg-primary bg-secondary w-full"
            key={item.id}
          >
            <div className="relative grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 p-2 xl:grid-cols-6 2xl:grid-cols-10 gap-4 lg:gap-2 ">
              <div className="absolute right-0 top-0 min-h-[24px] w-4 rounded-md bg-primary flex justify-center items-center font-bold text-white hover:scale-125 cursor-pointer transition-all">
                {fieldIndex + 1}
              </div>

              <div className="flex flex-col gap-3">
                <label
                  htmlFor={"strChoose"}
                  className="text-[#767676] dark:text-white font-bold mr-3"
                >
                  کد سامانه
                </label>
                <button
                  type="button"
                  onClick={() => handleModalToggle(fieldIndex)}
                  id="strChoose"
                  className="bg-black p-2 text-white rounded-md hover:text-black hover:bg-white transition-colors"
                >
                  {thisStructures[fieldIndex] || "انتخاب سازه"}
                </button>
                {isStructureChoose[fieldIndex] && (
                  <ChooseStructureModal
                    handleModal={() => handleModalToggle(fieldIndex)}
                    data={filtered!}
                    fieldIndex={fieldIndex}
                    setValue={setValue}
                    handleThisStructuresChange={handleThisStructuresChange}
                    chosenStructures={[]}
                    setChosenStructures={() => console.log("HEY!")}
                  />
                )}
              </div>

              {selectInputs.map((selectInput: any, index: number) => {
                return (
                  <SelectInput
                    key={selectInput.id}
                    control={control}
                    label={selectInput.label}
                    name={selectInput.name}
                    options={selectInput.options}
                    required={true}
                    errors={selectInput.errors}
                  />
                );
              })}

              {customInputs.map((customInput: any) => {
                return (
                  <CustomInput
                    control={control}
                    name={customInput.name}
                    label={customInput.label}
                    required
                    message={customInput.message}
                    type={customInput.type}
                    errors={customInput.errors}
                    onWheel={
                      customInput.onWheel ? customInput.onWheel : undefined
                    }
                    onChange={customInput.onChange!!}
                    className="formInput"
                  />
                );
              })}
              {page === "edit" && (
                <div className="flex items-center gap-2">
                  <div className="flex flex-col gap-3 ">
                    <label
                      htmlFor="startDate"
                      className="text-[#767676] dark:text-white font-bold"
                    >
                      تاریخ شروع
                    </label>

                    <DatePicker
                      inputClass="formInput"
                      format="YYYY-MM-DD"
                      value={
                        page === "edit"
                          ? moment
                              .unix(item.duration.startDate)
                              .format("jYYYY-jM-jD")
                          : undefined
                      }
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      onChange={(e) => {
                        if (e instanceof DateObject)
                          setValue(
                            `structures.${fieldIndex}.duration.startDate`,
                            e.unix
                          );
                      }}
                    />

                    <small className="text-xs text-rose-600 ">
                      {errors.startDate?.message}
                    </small>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="endDate"
                      className="text-[#767676] dark:text-white font-bold"
                    >
                      تاریخ پایان
                    </label>

                    <DatePicker
                      inputClass="formInput"
                      format="YYYY-MM-DD"
                      value={
                        page === "edit"
                          ? moment
                              .unix(item.duration.endDate)
                              .format("jYYYY-jM-jD")
                          : undefined
                      }
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      onChange={(e) => {
                        if (e instanceof DateObject)
                          setValue(
                            `structures.${fieldIndex}.duration.endDate`,
                            e.unix
                          );
                      }}
                    />

                    <small className="text-xs text-rose-600 ">
                      {errors.endDate?.message}
                    </small>
                  </div>
                </div>
              )}

              <AiFillMinusCircle
                className={`absolute left-0 ${
                  fieldIndex === 0 ? "hidden" : "block"
                } cursor-pointer text-2xl dark:text-white hover:text-red-700 transition-all`}
                onClick={() => removeStructure(fieldIndex)}
              />
            </div>

            {mark !== "buyShort" && (
              <VariableCostsFormSection
                errors={errors}
                register={register}
                control={control}
                fieldIndex={fieldIndex}
                handleTextbox1Change={handleTextbox1Change}
              />
            )}
          </div>
        );
      })}

      <AiFillPlusCircle
        className="cursor-pointer text-2xl dark:text-white hover:text-green-700 transition-all"
        onClick={() => appendStructure(boxStructureFormValues)}
      />
    </div>
  );
};

export default BoxStructuresFormSection;
