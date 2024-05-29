"use client";
import { useEffect, useState } from "react";
import {
  selectAllInitialCustomers,
  useCreateNewInitialCustomerMutation,
  useGetAllInitialCustomersQuery,
} from "../../apiSlices/initialCustomersApiSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import useAuth from "@/app/hooks/useAuth";
import { useSelector } from "react-redux";
import {
  EditInitialCustomerForm,
  InitialCustomerObject,
} from "@/app/lib/interfaces";
import Loading from "../loading/Loading";
import CustomInput from "@/app/components/inputs/CustomInput";
import { useForm } from "react-hook-form";

const NewInitialCustomerForm = ({
  handleModal,
}: {
  handleModal: () => void;
}) => {
  const { id } = useAuth();
  const { push } = useRouter();

  const [createNewInitialCustomer, { isLoading, isSuccess, isError, error }] =
    useCreateNewInitialCustomerMutation();

  const [errMsg, setErrMsg] = useState<string | null>(null);

  const createInitialCustomerForm = useForm<EditInitialCustomerForm>({});

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = createInitialCustomerForm;

  useEffect(() => {
    if (isSuccess) {
      push("/dashboard/billboard/initial-customers");
    }
  }, [isSuccess, push]);

  const onSaveInitialCustomerClick = async (data: any) => {
    const abc = await createNewInitialCustomer({
      userId: id,
      name: data.name,
      agentName: data.agentName,
      role: data.role,
      phoneNumber: data.phoneNumber,
      introductionMethod: data.introductionMethod,
    });
    if (!abc.error) {
      handleModal();
      toast.success("مشتری جدید با موفقیت ساخته شد");
    }

    if (isError) {
      "status" in error! &&
        error.status === 409 &&
        setErrMsg("این نام پروژه قبلا ثبت شده است");
      "status" in error! &&
        error.status === 400 &&
        setErrMsg("فیلدهای مورد نیاز را تکمیل کنید");
    }
  };

  const customInputs = [
    {
      id: 1,
      label: "نام پروژه",
      name: "name",
      type: "text",
      message: "نام پزوژه را وارد کنید",
      required: true,
      errors: errors.name?.message,
    },
    {
      id: 2,
      label: "نام نماینده",
      name: "agentName",
      type: "text",
      required: false,
    },
    {
      id: 3,
      label: "سمت",
      name: "role",
      type: "text",
      required: false,
    },
    {
      id: 4,
      label: "تلفن",
      name: "phoneNumber",
      type: "number",
      required: false,
      errors: undefined,
    },
    {
      id: 5,
      label: "نحوه آشنایی",
      name: "introductionMethod",
      type: "text",
      required: false,
    },
  ];

  if (isLoading) return <Loading />;
  return (
    <>
      <div className="w-full flex justify-between items-center px-8 py-0">
        <p className="md:text-2xl text-xl font-bold">ساخت مشتری</p>

        <AiOutlineClose
          className="cursor-pointer text-xl hover:text-2xl transition-all"
          onClick={handleModal}
        />
      </div>
      <div className="py-5 px-8 w-full text-black dark:text-white">
        <form
          className="flex flex-col"
          onSubmit={handleSubmit(onSaveInitialCustomerClick)}
        >
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
                className="p-4 rounded-[50px] bg-blue-100 outline-none text-black"
              />
            ))}
            <p className="text-red-500">{errMsg ? errMsg : " "}</p>
          </div>
          <div className="flex items-center gap-6">
            <button className={`confirmButton`}>ذخیره</button>

            <button onClick={handleModal} className="cancelButton">
              لغو
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewInitialCustomerForm;
