import {
  selectAllInitialCustomers,
  useGetAllInitialCustomersQuery,
} from "@/app/apiSlices/initialCustomersApiSlice";
import { useCreateNewProposalMutation } from "@/app/apiSlices/proposalApiSlice";
import useAuth from "@/app/hooks/useAuth";
import {
  newProposalDefaultValues,
  priorityTypes,
  proposalStatusTypes,
  proposalTypeTypes,
} from "@/app/lib/constants";
import {
  AddProposalForm,
  InitialCustomerObject,
  UserObject,
} from "@/app/lib/interfaces";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../loading/Loading";
import SelectInput from "@/app/components/inputs/SelectInput";
import CustomInput from "@/app/components/inputs/CustomInput";
import {
  selectAllUsers,
  useGetUsersQuery,
  useSendEmailToUserMutation,
} from "@/app/apiSlices/usersApiSlice";
import AssignedUsers from "./AssignedUsers";

type Props = {
  handleModal: () => void;
};

const NewProposal = (props: Props) => {
  const { handleModal } = props;
  const { id } = useAuth();
  const { push } = useRouter();

  const [err, setErr] = useState<string>("");
  const [createNewProposal, { isLoading, isSuccess, isError, error }] =
    useCreateNewProposalMutation();

  const { isLoading: initialCustomersLoading } =
    useGetAllInitialCustomersQuery(undefined);

  const [sendEmailToUser] = useSendEmailToUserMutation();
  useGetUsersQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });

  const allInitialCustomers: InitialCustomerObject[] = useSelector(
    (state) => selectAllInitialCustomers(state) as InitialCustomerObject[]
  );
  const allUsers: UserObject[] = useSelector(
    (state) => selectAllUsers(state) as UserObject[]
  );

  const initialCustomersOptions = allInitialCustomers.map((project) => ({
    id: project._id,
    name: project.name,
  }));

  const usersOptions = allUsers.map((user) => ({
    id: user._id,
    name: user.name,
  }));

  const createProposalForm = useForm<AddProposalForm>({
    defaultValues: newProposalDefaultValues,
    mode: "onSubmit",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = createProposalForm;

  const {
    fields: usersField,
    append: appendUser,
    remove: removeUser,
  } = useFieldArray({
    control,
    name: "assignedUsers",
  });

  const onSubmit = async (data: AddProposalForm) => {
    if (
      !data.priority ||
      !data.initialCustomerId ||
      !data.status ||
      !data.type
    ) {
      setErr("این فیلد الزامی است");
    } else {
      const assignedUserIds = data.assignedUsers
        .map((x: any) => x.id)
        .slice(0, -1);
      try {
        const proposalResponse = await createNewProposal({
          userId: id,
          subject: data.subject,
          initialCustomerId: data.initialCustomerId,
          startDate: data.startDate,
          endDate: data.endDate,
          priority: data.priority,
          status: data.status,
          type: data.type,
          description: data.description,
          assignedUsers: assignedUserIds,
        });

        const emailResponse = await sendEmailToUser(assignedUserIds);

        toast.success(`پروپوزال جدید با موفقیت ساخته شد.`);
        handleModal();
      } catch (error) {
        console.error("Error creating proposal or sending email:", error);
        toast.error("خطا در ساخت پروپوزال یا ارسال ایمیل");
      }
    }
  };

  if (isSuccess) handleModal();

  const customInputs = [
    {
      id: 1,
      label: "موضوع",
      name: "subject",
      type: "text",
      message: "موضوع الزامیست",
      required: true,
      errors: errors.subject?.message,
    },
    {
      id: 2,
      label: "توضیحات",
      name: "description",
      type: "textarea",
      message: "توضیحات الزامیست",
      required: true,
      errors: errors.description?.message,
    },
  ];

  const customSelects = [
    {
      id: 1,
      label: "پروژه",
      name: "initialCustomerId",
      required: true,
      message: "انتخاب پروژه الزامیست",
      errors: errors.initialCustomerId?.message,
      options: initialCustomersOptions,
    },
    {
      id: 2,
      label: "اولویت",
      name: "priority",
      required: true,
      errors: errors.priority?.message,
      options: priorityTypes,
    },
    {
      id: 3,
      label: "وضعیت",
      name: "status",
      required: true,
      errors: errors.status?.message,
      options: proposalStatusTypes.filter((x) => x.name === "درجریان"),
    },
    {
      id: 4,
      label: "واحد",
      name: "type",
      required: true,
      errors: errors.type?.message,
      options: proposalTypeTypes,
    },
  ];
  console.log("err", err);
  if (isLoading || initialCustomersLoading || !initialCustomersOptions[0])
    return <Loading />;
  return (
    <div className="py-5 px-8 w-full text-black dark:text-white">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <p className="md:text-2xl text-xl font-bold">پروپوزال جدید</p>

          <AiOutlineClose
            className="cursor-pointer text-xl hover:text-2xl transition-all"
            onClick={handleModal}
          />
        </div>

        <div className="relative w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 p-2 xl:grid-cols-2 gap-4 lg:gap-2 mt-4">
          {customSelects.map((customSelect) => (
            <SelectInput
              key={customSelect.id}
              control={control}
              name={customSelect.name}
              label={customSelect.label}
              options={customSelect.options}
              errors={err}
            />
          ))}
        </div>
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
              className="formInput text-black bg-slate-200"
            />
          ))}
        </div>

        <div className="relative w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 p-2 xl:grid-cols-2 gap-4 lg:gap-2 mt-4">
          <AssignedUsers
            usersField={usersField}
            control={control}
            appendUser={appendUser}
            removeUser={removeUser}
            usersOptions={usersOptions}
            err={err}
          />
        </div>

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

export default NewProposal;
