import {
  selectAllInitialCustomers,
  useGetAllInitialCustomersQuery,
} from "@/app/apiSlices/initialCustomersApiSlice";
import {
  useCreateNewProposalMutation,
  useUpdateProposalMutation,
} from "@/app/apiSlices/proposalApiSlice";
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
  ProposalObject,
  UserObject,
} from "@/app/lib/interfaces";
import { useRouter } from "next/navigation";
import React, { ChangeEventHandler, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../loading/Loading";
import SelectInput from "@/app/components/inputs/SelectInput";
import CustomInput from "@/app/components/inputs/CustomInput";
import { v4 as uuidv4 } from "uuid";
import {
  selectAllUsers,
  useGetUsersQuery,
  useSendEmailToUserMutation,
} from "@/app/apiSlices/usersApiSlice";
import AssignedUsers from "./AssignedUsers";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

type Props = {
  handleModal: () => void;
  duty?: string;
  prop?: ProposalObject;
};

const NewProposal = (props: Props) => {
  const { handleModal, duty, prop } = props;
  const { id } = useAuth();
  const { push } = useRouter();

  const [err, setErr] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [createNewProposal, { isLoading, isSuccess }] =
    useCreateNewProposalMutation();
  const [updateProposal] = useUpdateProposalMutation();

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
    roles: user.roles,
  }));

  const createProposalForm = useForm<AddProposalForm>({
    defaultValues: newProposalDefaultValues,
    mode: "onSubmit",
  });

  const editPropposalForm = useForm<any>({
    defaultValues: {
      description: prop?.description,
      initialCustomerId: prop?.initialCustomerId,
      priority: prop?.priority,
      status: prop?.status,
      subject: prop?.subject,
      type: prop?.type,
    },
    mode: "onSubmit",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = duty === "create" ? createProposalForm : editPropposalForm;

  const {
    fields: usersField,
    append: appendUser,
    remove: removeUser,
  } = useFieldArray({
    control,
    name: "assignedUsers",
  });

  const handleStartDateChange = (date: any) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
  };

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
      const uuid = uuidv4();
      const shortID = uuid.substring(0, 7);
      const passKey =
        data.type === "billboard"
          ? "BLB"
          : data.type === "metro"
          ? "MTR"
          : data.type === "bus"
          ? "BUS"
          : "NMV";
      try {
        const proposalResponse =
          duty === "create"
            ? await createNewProposal({
                userId: id,
                subject: `${passKey}${shortID}-${data.subject}`,
                initialCustomerId: data.initialCustomerId,
                startDate: startDate,
                endDate: endDate,
                priority: data.priority,
                status: data.status,
                type: data.type,
                description: data.description,
                assignedUsers: assignedUserIds,
              })
            : await updateProposal({
                proposalId: prop?._id,
                subject: prop?.subject,
                startDate: startDate,
                endDate: endDate,
                priority: data.priority,
                status: data.status,
                type: data.type,
                description: data.description,
                assignedUsers: prop?.assignedUsers,
              });

        const emailResponse =
          duty === "create" &&
          (await sendEmailToUser({
            userIds: assignedUserIds,
            uuid: passKey + shortID,
          }));
        const toastMessage =
          duty === "create"
            ? `پروپوزال جدید با موفقیت ساخته شد.`
            : "پروپوزال با موفقیت آپدیت شد";
        toast.success(toastMessage);
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
      disable: duty !== "create" ? true : false,
      defaultValue: prop?.subject,
      errors: errors.subject?.message,
    },
    {
      id: 2,
      label: "توضیحات",
      name: "description",
      type: "textarea",
      message: "توضیحات الزامیست",
      required: true,
      defaultValue: prop?.description,
      errors: errors.description?.message,
    },
  ];

  const customSelects = [
    {
      id: 1,
      label: "پروژه",
      name: "initialCustomerId",
      required: true,
      disable: duty !== "create" ? true : false,
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
      options:
        duty === "edit"
          ? proposalStatusTypes
          : proposalStatusTypes.filter((x) => x.name === "درجریان"),
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
          <p className="md:text-2xl text-xl font-bold">
            {duty === "create" ? "پروپوزال جدید" : "ویرایش پروپوزال"}
          </p>

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
              disabled={customSelect.disable}
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
              disabled={customInput.disable}
              errors={customInput.errors && customInput.errors}
              className="formInput text-black bg-slate-200"
            />
          ))}
        </div>
        <div className="flex justify-between m-2">
          <div>
            <label htmlFor="datePicker-start" className="datePickerLabel">
              تاریخ شروع:
            </label>
            <div style={{ direction: "rtl" }}>
              <DatePicker
                id="datePicker-start"
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                onChange={handleStartDateChange}
                value={prop?.startDate}
              />
            </div>
          </div>
          <div>
            <label htmlFor="datePicker-deadline" className="datePickerLabel">
              ددلاین:
            </label>
            <div style={{ direction: "rtl" }}>
              <DatePicker
                id="atePicker-deadline"
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                onChange={handleEndDateChange}
                value={prop?.endDate}
              />
            </div>
          </div>
        </div>

        {duty === "create" && (
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
        )}

        <div
          className={`flex items-center gap-6 ${duty !== "create" && "mt-10"}`}
        >
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
