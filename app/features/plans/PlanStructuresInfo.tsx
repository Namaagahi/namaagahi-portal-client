import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import {
  AddPlanForm,
  BoxObject,
  BoxStructure,
  CombinedStructure,
  EditPlanForm,
  PlanObject,
  StructureObject,
} from "@/app/lib/interfaces";
import {
  selectAllStructures,
  useGetStructuresQuery,
} from "../../apiSlices/structuresApiSlice";
import { useGetAllInitialCustomersQuery } from "../../apiSlices/initialCustomersApiSlice";
import {
  selectAllBoxes,
  useGetAllBoxesQuery,
} from "../../apiSlices/boxesApiSlice";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import Loading from "../loading/Loading";
import RegularPlanStructureInfo from "./RegularPlanStructureInfo";
import PackagePlanStructureInfo from "./PackagePlanStructureInfo";
import {
  selectAllPlans,
  useGetAllPlansQuery,
} from "@/app/apiSlices/plansApiSlice";

type Props = {
  page: string;
  mark: string;
  control: Control<EditPlanForm, any> | Control<AddPlanForm, any>;
  plan?: PlanObject | any;
  errors: FieldErrors<EditPlanForm>;
  field:
    | FieldArrayWithId<EditPlanForm, "structures", "id">[]
    | FieldArrayWithId<AddPlanForm, "structures", "id">[];
  discountTypes: string[];
  convertToNumber: (value: string | number) => number | any;
  setDiscountType: any;
  setValue: UseFormSetValue<EditPlanForm> | UseFormSetValue<AddPlanForm>;
  appendStructure:
    | UseFieldArrayAppend<EditPlanForm, "structures">
    | UseFieldArrayAppend<AddPlanForm, "structures">;
  removeStructure: UseFieldArrayRemove;
  watch: any;
  register: UseFormRegister<EditPlanForm> | UseFormRegister<AddPlanForm>;
  formVals?: any;
  chosenStructures?: string[];
  setChosenStructures?:
    | Dispatch<SetStateAction<never[]>>
    | Dispatch<SetStateAction<string[]>>;
  isChanged: boolean;
  flags: boolean[] | any;
  toggleFlag: any;
  discountFlags: boolean[] | any;
  toggleDiscountFlag: any;
  thisStructures?: string[];
  setThisStructures?: any;
  handleThisStructuresChange: any;
};

const PlanStructuresInfo = (props: Props) => {
  const {
    page,
    mark,
    control,
    plan,
    errors,
    field,
    discountTypes,
    convertToNumber,
    setDiscountType,
    setValue,
    appendStructure,
    removeStructure,
    watch,
    register,
    formVals,
    chosenStructures,
    setChosenStructures,
    isChanged,
    flags,
    toggleFlag,
    discountFlags,
    toggleDiscountFlag,
    thisStructures,
    setThisStructures,
    handleThisStructuresChange,
  } = props;

  const [showStructureInfo, setShowStructureInfo] = useState<boolean>(false);
  const [isStructureChoose, setIsStructureChoose] = useState(
    Array(field.length).fill(false)
  );

  const handleModalToggle = (fieldIndex: number) => {
    const updatedState = [...isStructureChoose];
    updatedState[fieldIndex] = !updatedState[fieldIndex];
    setIsStructureChoose(updatedState);
  };

  const handleStructureInfoModal = () =>
    setShowStructureInfo(!showStructureInfo);

  const { isLoading, isError } = useGetAllPlansQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });

  const allPlans: PlanObject[] = useSelector(
    (state) => selectAllPlans(state) as PlanObject[]
  );

  useGetAllInitialCustomersQuery(undefined);

  const { data: boxes } = useGetAllBoxesQuery(undefined, {
    pollingInterval: 2000,
  });

  const { data: structures } = useGetStructuresQuery(undefined, {
    pollingInterval: 2000,
  });

  const allBoxes: BoxObject[] = useSelector(
    (state) => selectAllBoxes(state) as BoxObject[]
  );

  const allStructures: StructureObject[] = useSelector(
    (state) => selectAllStructures(state) as StructureObject[]
  );
  const allMyBoxes: BoxObject[] = allBoxes?.filter((x) => !x.isArchived) || [];

  const inBoxStructures = allStructures?.filter(
    (structure: any) => structure.isChosen
  );

  const boxStructures = allMyBoxes.flatMap((box: any) => box.structures);

  const inBoxStructuresLookup = inBoxStructures?.reduce(
    (acc: any, chosenStructure: any) => ({
      ...acc,
      [chosenStructure.id]: chosenStructure,
    }),
    {}
  );

  const combinedStructures: CombinedStructure[] = boxStructures
    .map((boxStructure: CombinedStructure) => ({
      ...boxStructure,
      ...inBoxStructuresLookup?.[boxStructure.structureId],
    }))
    .filter((x) => x.isChosen)
    .filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    );

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

  // useEffect(() => {
  //   if (formVals && allStructures.length > 0) {
  //     const updatedStructures = formVals.map((item: BoxStructure) => {
  //       const structure = allStructures.find(
  //         (str) => str.id === item.structureId
  //       );
  //       return structure ? structure.name : "انتخاب سازه";
  //     });
  //     setThisStructures(updatedStructures);
  //   }
  // }, [formVals, allStructures]);

  if ((page === "edit" && !plan) || !boxStructures[0] || !inBoxStructures[0])
    return <Loading />;
  return mark === "regular" ? (
    <RegularPlanStructureInfo
      allPlans={allPlans}
      flags={flags}
      toggleFlag={toggleFlag}
      setDiscountType={setDiscountType}
      page={page}
      mark={mark}
      discountTypes={discountTypes}
      field={field}
      watch={watch}
      combinedStructures={combinedStructures}
      setValue={setValue}
      showStructureInfo={showStructureInfo}
      handleStructureInfoModal={handleStructureInfoModal}
      handleModalToggle={handleModalToggle}
      isStructureChoose={isStructureChoose}
      thisStructures={thisStructures!}
      handleThisStructuresChange={handleThisStructuresChange}
      plan={plan}
      errors={errors}
      control={control}
      handleTextbox1Change={handleTextbox1Change}
      register={register}
      convertToNumber={convertToNumber}
      isChanged={isChanged}
      removeStructure={removeStructure}
      appendStructure={appendStructure}
      discountFlags={discountFlags}
      toggleDiscountFlag={toggleDiscountFlag}
    />
  ) : (
    <PackagePlanStructureInfo
      flags={flags}
      toggleFlag={toggleFlag}
      appendStructure={appendStructure}
      field={field}
      watch={watch}
      combinedStructures={combinedStructures}
      setValue={setValue}
      showStructureInfo={showStructureInfo}
      handleThisStructuresChange={handleThisStructuresChange}
      handleStructureInfoModal={handleStructureInfoModal}
      handleModalToggle={handleModalToggle}
      thisStructures={thisStructures!}
      isStructureChoose={isStructureChoose}
      page={page}
      plan={plan}
      errors={errors}
      control={control}
      removeStructure={removeStructure}
      handleTextbox1Change={handleTextbox1Change}
    />
  );
};

export default PlanStructuresInfo;
