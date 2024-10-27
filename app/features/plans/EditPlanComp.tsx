import { useGetAllInitialCustomersQuery } from "../../apiSlices/initialCustomersApiSlice";
import { useUpdateStructureMutation } from "../../apiSlices/structuresApiSlice";
import { useUpdatePlanMutation } from "../../apiSlices/plansApiSlice";
import SearchContainer from "@/app/components/main/SearchContainer";
import { convertToNumber } from "@/app/utilities/convertToNumber";
import {
  EditPlanForm,
  PlanObject,
  StructurePlanObject,
} from "@/app/lib/interfaces";
import { useFieldArray, useForm } from "react-hook-form";
import PageTitle from "@/app/components/main/PageTitle";
import PlanStructuresInfo from "./PlanStructuresInfo";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PlanBasicInfo from "./PlanBasicInfo";
import useAuth from "@/app/hooks/useAuth";
import Loading from "../loading/Loading";
import { toast } from "react-toastify";
import OtherStructureModal from "./OtherStructureModal";

type Props = {
  plan: PlanObject;
};

const EditPlanComp = (props: Props) => {
  const [othersToggle, setOthersToggle] = useState(false);
  const { plan } = props;
  const { id: currentUserId } = useAuth();
  const { push } = useRouter();

  useGetAllInitialCustomersQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });

  const [updatePlan, { isSuccess, isError, error }] = useUpdatePlanMutation();

  const planStructures: any = plan?.structures.map((structure: any) => ({
    discountFee: structure?.discountFee,
    discountType: structure?.discountType,
    duration: {
      sellStart: structure?.duration.sellStart,
      sellEnd: structure?.duration.sellEnd,
      diff: structure?.duration.diff,
    },
    monthlyFee: structure?.monthlyFee,
    monthlyFeeWithDiscount: structure?.monthlyFeeWithDiscount,
    structureId: structure?.structureId,
    structureRecord: structure?.structureRecord,
  }));

  const [isChanged, setIsChanged] = useState(false);
  const [chosenStructures, setChosenStructures] = useState([]);

  const editPlanForm = useForm<EditPlanForm>({
    defaultValues: {
      initialCustomerId: plan?.initialCustomerId,
      brand: plan?.brand,
      structures: JSON.parse(JSON.stringify(plan?.structures)),
      totalPackagePrice: plan?.totalPackagePrice,
    },
    mode: "onSubmit",
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
    watch,
  } = editPlanForm;

  const {
    fields,
    append: appendStructure,
    remove: removeStructure,
  } = useFieldArray({
    control,
    name: "structures",
  });

  const [flags, setFlags] = useState<boolean[]>(fields.map(() => false));

  const [discountFlags, setDiscountFlags] = useState<boolean[]>(
    fields.map(() => false)
  );
  const [discountTypes, setDiscountTypes] = useState<string[]>(
    fields.map(() => "percentage")
  );

  const toggleFlag = (index: number) => {
    setFlags((prevFlags) => {
      const newFlags = [...prevFlags];
      newFlags[index] = !newFlags[index];
      return newFlags;
    });
  };

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

  const onSubmit = async (data: any) => {
    const newData = {
      ...data,
      proposalCode: data.proposalCode ? data.proposalCode.toString() : "",
      structures: data.structures.map(
        (structure: StructurePlanObject, index: number) => ({
          ...structure,
          monthlyFee: convertToNumber(structure.monthlyFee),
          monthlyFeeWithDiscount:
            plan.mark.name === "regular"
              ? convertToNumber(structure.monthlyFeeWithDiscount)
              : null,
          discountType:
            plan.mark.name === "regular" ? discountTypes[index] : null,
          structureRecord: structure.structureRecord,
        })
      ),
    };
    const abc = await updatePlan({
      id: plan?.id,
      planId: plan?.planId,
      mark: {
        name: plan.mark.name,
      },
      userId: currentUserId,
      username: plan.username,
      initialCustomerId: newData.initialCustomerId,
      brand: newData.brand,
      proposalCode: newData.proposalCode,
      userDefinedMonthlyFeeWithDiscount: !discountFlags[0],
      status: "suggested",
      structures: newData.structures,
      finalCustomerId: "",
      projectCodeId: null,
      totalPackagePrice:
        plan.mark.name === "package"
          ? convertToNumber(newData.totalPackagePrice)
          : null,
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

  if (isSuccess) {
    toast.success(`پلن ${plan.planId} با موفقیت ویرایش شد.`);
    push("/dashboard/billboard/plans");
  }

  const formVals = watch("structures");

  useEffect(() => {
    setIsChanged(true);
  }, [watch("structures")]);

  if (!plan) return <Loading />;

  return (
    <main className="min-h-screen">
      <PageTitle name={`ویرایش پلن ${plan?.planId}`} />
      <SearchContainer />
      <div className="flex flex-col gap-9 justify-center">
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-9 justify-center"
        >
          <PlanBasicInfo
            page={"edit"}
            control={control}
            plan={plan}
            errors={errors}
            mark={plan.mark.name}
            setValue={setValue}
          />
          <button
            type="button"
            onClick={() => setOthersToggle(!othersToggle)}
            className="bg-primary text-white shadow-md w-[10%] rounded-md p-1 formChooseButton"
          >
            سازه از دیگران
          </button>

          <PlanStructuresInfo
            mark={plan.mark.name}
            page={"edit"}
            control={control}
            plan={plan}
            errors={errors}
            discountTypes={discountTypes}
            convertToNumber={convertToNumber}
            setDiscountType={setDiscountType}
            setValue={setValue}
            field={fields}
            appendStructure={appendStructure}
            removeStructure={removeStructure}
            watch={watch}
            register={register}
            formVals={formVals}
            chosenStructures={chosenStructures}
            setChosenStructures={setChosenStructures}
            isChanged={isChanged}
            flags={flags}
            toggleFlag={toggleFlag}
            discountFlags={discountFlags}
            toggleDiscountFlag={toggleDiscountFlag}
          />

          <button className="primaryButton mx-auto w-1/4">ویرایش پلن</button>
        </form>
      </div>
      {othersToggle && (
        <OtherStructureModal
          handleModal={() => setOthersToggle(!othersToggle)}
          setValue={setValue}
          getValues={getValues}
          page={"edit"}
        />
      )}
    </main>
  );
};

export default EditPlanComp;
