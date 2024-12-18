"use client";
import useAuth from "@/app/hooks/useAuth";
import PlanBasicInfo from "./PlanBasicInfo";
import PlanStructuresInfo from "./PlanStructuresInfo";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCreateNewPlanMutation } from "@/app/apiSlices/plansApiSlice";
import {
  selectAllBoxes,
  useGetAllBoxesQuery,
} from "@/app/apiSlices/boxesApiSlice";
import {
  AddPlanForm,
  BoxObject,
  CombinedStructure,
  StructureObject,
  StructurePlanObject,
} from "@/app/lib/interfaces";
import { useSelector } from "react-redux";
import { useFieldArray, useForm } from "react-hook-form";
import { newPlanDefaultValues } from "@/app/lib/constants";
import { convertToNumber } from "@/app/utilities/convertToNumber";
import { toast } from "react-toastify";
import Link from "next/link";
import {
  selectAllStructures,
  useGetStructuresQuery,
} from "@/app/apiSlices/structuresApiSlice";
import { useGetAllInitialCustomersQuery } from "@/app/apiSlices/initialCustomersApiSlice";
import ChoosePlanStructures from "@/app/components/modals/ChoosePlanStructures";
import OtherStructureModal from "./OtherStructureModal";

type Props = {
  mark: string;
};

const NewPlan = (props: Props) => {
  const { mark } = props;
  const { id, username } = useAuth();
  const { push } = useRouter();
  const [isChanged, setIsChanged] = useState(false);
  const [toggleModal, setTogglemodal] = useState(false);
  const [othersToggle, setOthersToggle] = useState(false);
  const [thisStructures, setThisStructures] = useState<string[]>([]);

  const [createNewPlan, { isSuccess, isError, error }] =
    useCreateNewPlanMutation();

  // Use polling with refetch every 5 seconds
  const { data: boxes } = useGetAllBoxesQuery(undefined, {
    pollingInterval: 2000,
  });

  const { data: structures } = useGetStructuresQuery(undefined, {
    pollingInterval: 2000,
  });

  const allBoxes: BoxObject[] = useSelector(
    (state) => selectAllBoxes(state) as BoxObject[]
  );

  const createPlanForm = useForm<AddPlanForm>({
    defaultValues: newPlanDefaultValues,
    mode: "onSubmit",
  });

  useEffect(() => {
    setValue("mark", mark);
  }, [mark]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = createPlanForm;

  const {
    fields: structuresField,
    append: appendStructure,
    remove: removeStructure,
  } = useFieldArray({
    control,
    name: "structures",
  });

  const [flags, setFlags] = useState<boolean[]>(
    structuresField.map(() => false)
  );

  const [discountFlags, setDiscountFlags] = useState<boolean[]>(
    structuresField.map(() => false)
  );
  const [discountTypes, setDiscountTypes] = useState<string[]>(
    structuresField.map(() => "percentage")
  );

  const toggleFlag = (index: number) => {
    setFlags((prevFlags) => {
      const newFlags = [...prevFlags];
      newFlags[index] = !newFlags[index];
      return newFlags;
    });
  };

  const handleThisStructuresChange = (index: number, val: string) =>
    setThisStructures((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = val;
      return updatedState;
    });

  const toggleDiscountFlag = (index: number) => {
    setDiscountFlags((prevFlags) => {
      const newDiscountFlags = [...prevFlags];
      newDiscountFlags[index] = !newDiscountFlags[index];
      return newDiscountFlags;
    });
  };

  const setDiscountType = (index: number, type: string) => {
    setDiscountTypes((prevTypes) => {
      const newTypes = [...prevTypes];
      newTypes[index] = type;
      return newTypes;
    });
  };

  useGetAllInitialCustomersQuery(undefined);

  // Combining logic for structures and boxes
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

  const onSubmit = async (data: any) => {
    const condition = data.structures.filter(
      (element: any) =>
        element.duration.sellEnd - element.duration.sellStart < 0
    );
    const newData = {
      ...data,
      proposalCode: data.proposalCode ? data.proposalCode.toString() : "",
      generalProjectCode: data.generalProjectCode
        ? data.generalProjectCode.toString()
        : "",
      structures: data.structures.map(
        (structure: StructurePlanObject, index: number) => ({
          ...structure,
          monthlyFee: convertToNumber(structure.monthlyFee),
          monthlyFeeWithDiscount:
            mark === "regular"
              ? convertToNumber(structure.monthlyFeeWithDiscount)
              : "0",
          discountType:
            mark === "regular" ? discountTypes[index] : "percentage",
        })
      ),
    };
    if (condition.length) {
      toast.error("تاریخ پایان نمی تواند عقب تر از تاریخ شروع باشد.");
      return;
    }
    const abc = await createNewPlan({
      userId: id,
      mark: {
        name: newData.mark,
      },
      initialCustomerId: newData.initialCustomerId,
      finalCustomerId: newData.finalCustomerId,
      userDefinedMonthlyFeeWithDiscount: !discountFlags[0],
      projectCodeId: null,
      brand: newData.brand,
      type: newData.type,
      proposalCode: newData.proposalCode,
      generalProjectCode: newData.generalProjectCode,
      structures: newData.structures,
      totalPackagePrice:
        mark === "package" ? convertToNumber(newData.totalPackagePrice) : null,
    });
  };

  if (isError) {
    "status" in error! &&
      error.status === 409 &&
      toast.error("این نام پلن قبلا ثبت شده است");
    "status" in error! &&
      error.status === 400 &&
      toast.error("همه فیلدها را تکمیل کنید");
  }

  useEffect(() => {
    setIsChanged(true);
  }, [watch("structures")]);

  if (isSuccess) {
    toast.success(`پلن جدید با موفقیت ساخته شد.`);
    push("/dashboard/billboard/plans");
  }

  if (!allBoxes?.[0])
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-3">
        <p className="text-xl">
          برای ایجاد پلن باید سازه ها در باکس ثبت شده باشند. در حال حاضر هیچ
          باکسی وجود ندارد.
        </p>
        <p>
          برای ایجاد باکس جدید
          <Link href={"/dashboard/billboard/boxes/createbox"}>
            <span className="text-cyan-300">کلیک کنید</span>
          </Link>
        </p>
      </div>
    );

  return (
    <div className="flex flex-col gap-9 justify-center">
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-9 justify-center"
      >
        <PlanBasicInfo
          page={"create"}
          mark={mark}
          control={control}
          errors={errors}
          setValue={setValue}
        />
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setTogglemodal(!toggleModal)}
            className="bg-primary text-white shadow-md w-[10%] rounded-md p-1 formChooseButton"
          >
            انتخاب گروهی سازه
          </button>
          <button
            type="button"
            onClick={() => setOthersToggle(!othersToggle)}
            className="bg-primary text-white shadow-md w-[10%] rounded-md p-1 formChooseButton"
          >
            سازه از دیگران
          </button>
        </div>
        <PlanStructuresInfo
          page={"create"}
          mark={mark}
          control={control}
          errors={errors}
          discountTypes={discountTypes}
          convertToNumber={convertToNumber}
          setDiscountType={setDiscountType}
          setValue={setValue}
          field={structuresField}
          appendStructure={appendStructure}
          removeStructure={removeStructure}
          watch={watch}
          register={register}
          isChanged={isChanged}
          flags={flags}
          toggleFlag={toggleFlag}
          discountFlags={discountFlags}
          toggleDiscountFlag={toggleDiscountFlag}
          thisStructures={thisStructures}
          setThisStructures={setThisStructures}
          handleThisStructuresChange={handleThisStructuresChange}
        />
        <button type="submit" className="primaryButton w-1/4 mx-auto">
          افزودن پلن
        </button>
      </form>
      {toggleModal && (
        <ChoosePlanStructures
          handleModal={() => setTogglemodal(!toggleModal)}
          data={
            username === "amin.haddadi1995@gmail.com" || username === "soltani"
              ? combinedStructures!
              : combinedStructures.filter((x) => /\d$/.test(x.name))
          }
          setValue={setValue}
          getValues={getValues}
          handleThisStructuresChange={handleThisStructuresChange}
        />
      )}
      {othersToggle && (
        <OtherStructureModal
          handleModal={() => setOthersToggle(!othersToggle)}
          handleThisStructuresChange={handleThisStructuresChange}
          setValue={setValue}
          getValues={getValues}
        />
      )}
    </div>
  );
};

export default NewPlan;
