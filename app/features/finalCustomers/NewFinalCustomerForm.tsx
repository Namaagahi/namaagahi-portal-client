import React, { useState } from "react";
import Loading from "../loading/Loading";
import { AiOutlineClose } from "react-icons/ai";
import CustomInput from "@/app/components/inputs/CustomInput";
import Agents from "./Agents";
import { useCreateNewFinalCustomerMutation } from "@/app/apiSlices/finalCustomerApiSlice";
import {
  AddFinalCustomerForm,
  FinalCustomerObject,
} from "@/app/lib/interfaces";
import useAuth from "@/app/hooks/useAuth";
import { useFieldArray, useForm } from "react-hook-form";
import { newFinalCustomerDefaultValues } from "@/app/lib/constants";
import { toast } from "react-toastify";
import FinalCustomerTypes from "./FinalCustomerTypes";
import { useRouter } from "next/navigation";
import { useDeleteInitialCustomerMutation } from "@/app/apiSlices/initialCustomersApiSlice";

type Props = {
  handleModal: () => void;
  prop?: any;
};

const NewFinalCustomerForm = (props: Props) => {
  const { id } = useAuth();
  const { handleModal, prop } = props;
  const { push } = useRouter();

  const [createNewFinalCustomer, { isLoading, isSuccess, isError, error }] =
    useCreateNewFinalCustomerMutation();

  const [deleteInitialCustomer] = useDeleteInitialCustomerMutation();

  const [contractType, setContractType] = useState("official");
  const [customerType, setCustomerType] = useState("legal");
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const createFinalCustomerForm = useForm<AddFinalCustomerForm>({
    defaultValues: {
      ...newFinalCustomerDefaultValues,
      finalCustomerId: `fc_${
        new Date().getTime() +
        String(Math.random()).replace(".", "").slice(0, 6)
      }`,
      name: prop?.name || "",
      nationalId: "",
      ecoCode: "",
      regNum: "",
      address: "",
      postalCode: "",
      phone: prop?.phoneNumber || "",
      agent: [{ agentName: "", post: "" }],
    },
    mode: "onSubmit",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = createFinalCustomerForm;

  const {
    fields: agentField,
    append: appendAgent,
    remove: removeAgent,
  } = useFieldArray({
    control,
    name: "agent",
  });

  const onSubmit = async (data: any) => {
    const abc1 = await createNewFinalCustomer({
      finalCustomerId: data.finalCustomerId,
      userId: id,
      name: data.name,
      contractType: contractType,
      customerType: customerType,
      agent: data.agent,
      nationalId: parseFloat(data.nationalId),
      ecoCode: parseFloat(data.ecoCode),
      regNum: parseFloat(data.regNum),
      address: data.address,
      postalCode: parseFloat(data.postalCode),
      phone: parseFloat(data.phone),
      planIds: [],
    });
    prop && (await deleteInitialCustomer({ id: prop?.id }));

    if (isError) {
      "status" in error! &&
        error.status === 409 &&
        toast.error("این شناسه / کد ملی قبلا ثبت شده است");
      "status" in error! &&
        error.status === 400 &&
        toast.error("فیلدهای مورد نیاز را تکمیل کنید");
    }
  };

  if (isSuccess) {
    toast.success(`مشتری جدید با موفقیت ساخته شد.`);
    push("/dashboard/billboard/final-customers");
    handleModal();
  }

  const customInputs = [
    {
      id: 1,
      label: "نام شرکت / شخص",
      name: "name",
      type: "text",
      message: "نام شرکت / شخص الزامیست",
      required: true,
      errors: errors.name?.message,
    },
    {
      id: 2,
      label: "شناسه / کد ملی",
      name: "nationalId",
      type: "number",
      required: true,
      message: "شناسه / کد ملی الزامیست",
      errors: errors.nationalId?.message,
    },
    {
      id: 3,
      label: "کد اقتصادی",
      name: "ecoCode",
      type: "number",
      required: false,
      errors: undefined,
    },
    {
      id: 4,
      label: "شماره ثبت",
      name: "regNum",
      type: "number",
      required: false,
      errors: undefined,
    },

    {
      id: 5,
      label: "آدرس",
      name: "address",
      type: "text",
      required: false,
      errors: undefined,
      colSpan: "col-span-2",
    },
    {
      id: 6,
      label: "کد پستی",
      name: "postalCode",
      type: "number",
      required: false,
      errors: undefined,
    },
    {
      id: 7,
      label: "تلفن",
      name: "phone",
      type: "number",
      required: false,
      errors: undefined,
    },
  ];

  if (isLoading) return <Loading />;
  return (
    <div className="py-5 px-8 w-full text-black dark:text-white">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center mb-5">
          <p className="md:text-2xl text-xl font-bold">ایجاد مشتری نهایی</p>

          <AiOutlineClose
            className="cursor-pointer text-xl hover:text-2xl transition-all"
            onClick={handleModal}
          />
        </div>

        <FinalCustomerTypes
          contractType={contractType}
          setContractType={setContractType}
          customerType={customerType}
          setCustomerType={setCustomerType}
        />

        <div className="relative w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 p-2 xl:grid-cols-2 gap-4 lg:gap-2 mt-4">
          {customInputs.map((customInput) => (
            <CustomInput
              key={customInput.id}
              control={control}
              name={customInput.name}
              label={customInput.label}
              type={customInput.type}
              required={customInput.required}
              message={customInput.message}
              errors={customInput.errors && customInput.errors}
              colSpan={customInput.colSpan}
              className="formInput text-black"
            />
          ))}
          <p className="text-red-500">{errMsg ? errMsg : " "}</p>
        </div>
        {(contractType === "legal" || customerType === "legal") && (
          <Agents
            agentField={agentField}
            control={control}
            appendAgent={appendAgent}
            removeAgent={removeAgent}
          />
        )}
        <div className="flex items-center gap-6">
          <button className={`confirmButton`}>ذخیره</button>

          <button onClick={handleModal} className="cancelButton">
            لغو
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewFinalCustomerForm;
