"use client";
import { FC, useEffect, useState } from "react";
import {
  useCreateNewInitialCustomerMutation,
  useGetAllInitialCustomersQuery,
} from "../../apiSlices/initialCustomersApiSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import useAuth from "@/app/hooks/useAuth";
import { useSelector } from "react-redux";
import {
  BoxObject,
  CombinedStructure,
  EditInitialCustomerForm,
  StructureObject,
} from "@/app/lib/interfaces";
import Loading from "../loading/Loading";
import CustomInput from "@/app/components/inputs/CustomInput";
import { useForm } from "react-hook-form";
import { convertToNumber } from "@/app/utilities/convertToNumber";
import {
  selectAllBoxes,
  useCreateStructureAndUpdateBoxMutation,
  useGetAllBoxesQuery,
  useGetBoxByIdQuery,
  useUpdateBoxMutation,
} from "@/app/apiSlices/boxesApiSlice";
import {
  selectAllStructures,
  useGetStructuresQuery,
} from "@/app/apiSlices/structuresApiSlice";

interface IOtherStructureModalProps {
  handleModal: () => void;
  thisStructures: string[];
  setThisStructures: any;
  handleThisStructuresChange: any;
  setValue: any;
  getValues: any;
  append: any;
}

const OtherStructureModal: FC<IOtherStructureModalProps> = ({
  handleModal,
  thisStructures,
  setThisStructures,
  handleThisStructuresChange,
  setValue,
  getValues,
  append,
}) => {
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [box, setBox] = useState<null | BoxObject>(null);

  const id = "6703ac1345be78223bc2f9c6";
  const { push } = useRouter();
  const { id: currentUserId } = useAuth();

  const { data, isLoading, isFetching, refetch } = useGetBoxByIdQuery(
    id as string,
    {
      refetchOnMountOrArgChange: 5,
      // refetchOnFocus: true
    }
  );

  const [
    createStructureAndUpdateBox,
    { isSuccess: updateSuccess, isError: updateIsError, error: updateError },
  ] = useCreateStructureAndUpdateBoxMutation();

  const createInitialCustomerForm = useForm<EditInitialCustomerForm>({});

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = createInitialCustomerForm;

  useEffect(() => {
    if (data) {
      localStorage.getItem("editBoxForm")
        ? setBox({
            ...JSON.parse(localStorage.getItem("editBoxForm") as string),
            ...JSON.parse(
              JSON.stringify(data?.entities[id as string] as BoxObject)
            ),
          })
        : setBox(
            JSON.parse(
              JSON.stringify(data?.entities[id as string] as BoxObject)
            )
          );
    }
  }, [data, refetch]);

  const onSaveInitialCustomerClick = async (data: any) => {
    const newStructure = {
      location: {
        address: data.address || "Default Address", // Ensure you set the address
        path: data.path || "Default Path", // Ensure you set the path
      },
      userId: currentUserId, // Ensure userId is provided
      name: data.name,
      costs: {
        dailyVariableCost: 0,
        fixedCosts: {
          dailyCost: 0,
          monthlyCost: 0,
          periodCost: 0,
          squareCost: convertToNumber(data.monthlyFee / data.area) || 0,
        },
        monthlyVariableCost: 0,
        totalDailyCost: 0,
        totalMonthlyCost: 0,
        totalPeriodCost: 0,
        variableCosts: [
          {
            figures: { monthlyCost: null, dailyCost: 0 },
            name: "",
          },
        ],
      },
      duration: {
        diff: box?.duration.diff || 0,
        endDate: box?.duration.endDate || null,
        startDate: box?.duration.startDate || null,
      },
      marks: {
        markOptions: {
          docSize: parseFloat("50"),
          face: "شمالی",
          length: parseFloat("0"),
          printSize: parseFloat(data.area) || 0,
          style: "افقی",
          width: parseFloat("0"),
        },
        name: "عرشه پل سواره رو",
      },
      monthlyBaseFee: convertToNumber(data.monthlyFee) || 0,
    };

    const newBoxData = {
      ...box,
      structures: newStructure,
    };
    try {
      const editBoxABC = await createStructureAndUpdateBox({
        id: box?.id,
        boxId: newBoxData.boxId,
        userId: currentUserId,
        username: box?.username,
        name: newBoxData.name,
        mark: {
          name: box?.mark.name,
          markOptions: {
            projectNumber: "",
            brand: box?.mark.markOptions.brand,
          },
        },
        duration: {
          startDate: Number(box?.duration.startDate),
          endDate: Number(box?.duration.endDate),
        },
        structures: newBoxData.structures,
      }).unwrap();

      const allStructures = editBoxABC.updatedAllStructures;
      const allBoxes = editBoxABC.updatedAllBoxes.filter(
        (x: any) => !x.isArchived
      );

      const inBoxStructures = allStructures.filter(
        (structure: any) => structure.isChosen
      );
      const boxStructures = allBoxes.flatMap((box: any) => box.structures);
      const inBoxStructuresLookup = inBoxStructures.reduce(
        (acc: any, chosenStructure: any) => ({
          ...acc,
          [chosenStructure._id]: chosenStructure,
        }),
        {}
      );
      const combinedStructures: CombinedStructure[] = boxStructures
        .map((boxStructure: CombinedStructure) => ({
          ...boxStructure,
          ...inBoxStructuresLookup[boxStructure.structureId],
        }))
        .filter((x: any) => x.isChosen);

      const currentStructures = getValues("structures") || [];

      const updatedStructures = currentStructures[0].structureId
        ? [
            ...currentStructures,
            ...combinedStructures.filter(
              (x) => x.structureId === editBoxABC.newStructure._id
            ),
          ]
        : combinedStructures.filter(
            (x) => x.structureId === editBoxABC.newStructure._id
          );

      setValue("structures", updatedStructures);

      handleThisStructuresChange(
        updatedStructures.length - 1,
        editBoxABC.newStructure.name
      );
      toast.success(`سازه اضافه شد`);
    } catch (error) {
      toast.error(`سازه اضافه نشد`);
    }

    handleModal();
  };

  const customInputs = [
    {
      id: 1,
      label: "شهر",
      name: "name",
      type: "text",
      message: "نام شهر را وارد کنید",
      required: true,
      errors: errors.name?.message,
    },
    {
      id: 2,
      label: "شرکت همکار ",
      name: "co-workerCompany",
      type: "text",
      required: false,
    },
    {
      id: 3,
      label: "نوع سازه",
      name: "type",
      type: "text",
      required: false,
    },
    {
      id: 4,
      label: "مساحت",
      name: "area",
      type: "number",
      required: false,
    },
    {
      id: 5,
      label: "تعرفه نهایی سازه",
      name: "monthlyFee",
      type: "number",
      required: false,
    },
    {
      id: 6,
      label: "تعرفه ماهیانه نهایی",
      name: "monthlyFeeWithDiscount",
      type: "number",
      required: false,
    },
    {
      id: 7,
      label: "منطقه",
      name: "district",
      type: "text",
      required: false,
    },
    {
      id: 8,
      label: "مسیر",
      name: "path",
      type: "text",
      required: false,
      errors: undefined,
    },
  ];

  if (isLoading) return <Loading />;
  return (
    <>
      <div className="modalContainer">
        <div
          onClick={handleModal}
          className="backdropContainer bg-opacity-10"
        ></div>
        <div className="confirmModalContentContainer">
          <div className="confirmModalContent">
            <div className="flex justify-between items-center">
              <p className="md:text-2xl text-xl font-bold">
                {"ساخت سازه دیگران"}
              </p>

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
                <div className="py-7">
                  <div className="border-[1px] border-x-transparent border-y-[#FA9E93]">
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
                    <CustomInput
                      key={9}
                      control={control}
                      name={"address"}
                      label={"نشانی"}
                      type={"text"}
                      required={false}
                      className="p-4 mb-4 rounded-[50px] bg-blue-100 outline-none text-black"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <button className={`confirmButton`}>ذخیره</button>

                  <button onClick={handleModal} className="cancelButton">
                    لغو
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherStructureModal;
