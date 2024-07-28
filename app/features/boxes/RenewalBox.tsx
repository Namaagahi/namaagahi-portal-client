"use client";
import { BoxObject, StructureObject } from "@/app/lib/interfaces";
import { AiOutlineClose } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import useAuth from "@/app/hooks/useAuth";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";

import {
  useCreateNewBoxMutation,
  useGetBoxByIdQuery,
} from "@/app/apiSlices/boxesApiSlice";
import DatePicker from "react-multi-date-picker";
import moment from "jalali-moment";
import { useForm } from "react-hook-form";
import DateObject from "react-date-object";
import { useSelector } from "react-redux";
import {
  selectAllStructures,
  useGetStructuresQuery,
} from "@/app/apiSlices/structuresApiSlice";
import { useRouter } from "next/navigation";
import { convertToNumber } from "@/app/utilities/convertToNumber";
const Loading = dynamic(() => import("@/app/features/loading/Loading"), {
  ssr: false,
});

type Props = {
  handleModal: () => void;
  boxId: number | string;
};

const RenewalBox = (props: Props) => {
  const { handleModal, boxId } = props;
  const { push } = useRouter();
  const [startDate, setStartDate] = useState<number>(0);
  const [endDate, setEndDate] = useState<number>(0);
  const { isMaster, isAdmin, id } = useAuth();
  const [box, setBox] = useState<null | BoxObject | any>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleStartDate = (value: DateObject | DateObject[] | null) => {
    if (value instanceof DateObject) {
      setStartDate(value.unix);
    } else if (Array.isArray(value) && value.length > 0) {
      const timestamps = value.map((date) => date.unix);
      setStartDate(timestamps[0]);
    } else {
      setStartDate(new Date().getTime());
    }
  };

  const handleEndDate = (value: DateObject | DateObject[] | null) => {
    if (value instanceof DateObject) {
      setEndDate(value.unix);
    } else if (Array.isArray(value) && value.length > 0) {
      const timestamps = value.map((date) => date.unix);
      setEndDate(timestamps[0]);
    } else {
      setEndDate(new Date().getTime());
    }
  };
  const { data, isLoading, isFetching, refetch } = useGetBoxByIdQuery(
    boxId as string,
    {
      refetchOnMountOrArgChange: 5,
      refetchOnFocus: true,
    }
  );
  useEffect(() => {
    setBox(data?.entities[boxId as string]);
  }, [data]);

  const [createNewBox, { isSuccess, isError, error }] =
    useCreateNewBoxMutation();

  useGetStructuresQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const structures: StructureObject[] = useSelector(
    (state) => selectAllStructures(state) as StructureObject[]
  );
  const filtered = structures?.filter(
    (structure) => structure.isChosen === false
  );

  const onSaveStructureClick = async (data: any) => {
    if (!box || !box.structures || !filtered) {
      toast.error("Box or structures data is missing.");
      handleModal();
      return;
    }
    const array1 = filtered?.map((x) => x.id);
    const array2 = box?.structures.map((x: any) => x.structureId);
    const allElementsInArray = array2.every((element: any) =>
      array1.includes(element)
    );
    if (!allElementsInArray) {
      toast.error("یکی از سازه ها در دسترس نیست");
      handleModal();
      return;
    }

    const transformedStructures = box?.structures?.map((structure: any) => ({
      ...structure,
      costs: {
        ...structure.costs,
        fixedCosts: {
          ...structure.costs.fixedCosts,
          squareCost: data.price
            ? convertToNumber(
                (
                  Number(structure.costs.fixedCosts.squareCost) +
                  (Number(structure.costs.fixedCosts.squareCost) *
                    Number(data.price)) /
                    100
                ).toString()
              )
            : convertToNumber(structure.costs.fixedCosts.squareCost),
        },
        variableCosts: structure.costs.variableCosts.map((cost: any) => ({
          ...cost,
          figures: {
            ...cost.figures,
            monthlyCost:
              cost.figures.name === "برق"
                ? convertToNumber(
                    (
                      Number(cost.figures.monthlyCost) +
                      (Number(cost.figures.monthlyCost) *
                        (data.power ? Number(data.power) : 100)) /
                        100
                    ).toString()
                  )
                : cost.figures.name === "پایش"
                ? convertToNumber(
                    (
                      Number(cost.figures.monthlyCost) +
                      (Number(cost.figures.monthlyCost) *
                        (data.monitoring ? Number(data.monitoring) : 100)) /
                        100
                    ).toString()
                  )
                : cost.figures.name === "بیمه"
                ? convertToNumber(
                    (
                      Number(cost.figures.monthlyCost) +
                      (Number(cost.figures.monthlyCost) *
                        (data.insurance ? Number(data.insurance) : 100)) /
                        100
                    ).toString()
                  )
                : cost.figures.name === "نگهداری"
                ? convertToNumber(
                    (
                      Number(cost.figures.monthlyCost) +
                      (Number(cost.figures.monthlyCost) *
                        (data.maintenance ? Number(data.maintenance) : 100)) /
                        100
                    ).toString()
                  )
                : cost.figures.name === "رنگ آمیزی"
                ? convertToNumber(
                    (
                      Number(cost.figures.monthlyCost) +
                      (Number(cost.figures.monthlyCost) *
                        (data.coloring ? Number(data.coloring) : 100)) /
                        100
                    ).toString()
                  )
                : convertToNumber(
                    (
                      Number(cost.figures.monthlyCost) +
                      (Number(cost.figures.monthlyCost) *
                        (data.others ? Number(data.others) : 100)) /
                        100
                    ).toString()
                  ),
          },
        })),
      },
      monthlyBaseFee: convertToNumber(structure.monthlyBaseFee),
    }));

    const newBox = {
      ...box,
      structures: transformedStructures,
    };
    console.log("newBox", newBox.structures);
    console.log("box", box.structures);

    if (isError) {
      "status" in error! &&
        error.status === 409 &&
        toast.error("این نام باکس قبلا ثبت شده است");
      "status" in error! &&
        error.status === 400 &&
        toast.error("همه فیلدها را تکمیل کنید");
    }

    if (endDate - startDate < 0) {
      toast.error("تاریخ پایان نمی تواند عقب تر از تاریخ شروع باشد.");
    } else {
      await createNewBox({
        boxId: box.boxId,
        userId: id,
        name: box.name,
        mark: box.mark,
        duration: {
          startDate: Number(startDate),
          endDate: Number(endDate),
        },
        structures: newBox?.structures,
      });
    }
    handleModal();
  };
  if (isSuccess) {
    toast.success(`باکس جدید با موفقیت ساخته شد.`);
    push("/dashboard/billboard/boxes");
  }

  return (
    <div className="modalContainer">
      <div onClick={handleModal} className="backdropContainer"></div>
      <div className={`createUpdateModalContentContainer `}>
        <div className="py-5 px-8 w-full text-black dark:text-white">
          <form
            className="flex flex-col"
            onSubmit={handleSubmit(onSaveStructureClick)}
          >
            <div className="flex justify-between items-center">
              <p className="md:text-2xl text-xl font-bold">باکس {box?.name}</p>

              <AiOutlineClose
                className="cursor-pointer text-xl hover:text-2xl transition-all"
                onClick={handleModal}
              />
            </div>

            <div>
              <p className="mt-9 mb-4 text-2xl">درصد تغییرات</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-7">
              <div className="flex items-center justify-between">
                <label htmlFor="name">مبلغ کل :</label>
                <div className="flex flex-col w-[80%]">
                  <input
                    id="price"
                    type="number"
                    className={`${
                      errors.price && "border-rose-700"
                    } formInput2`}
                    {...register("price", {
                      max: 100,
                      min: -100,
                    })}
                  />
                  {errors.price && (
                    <small className="text-rose-700">
                      عدد وارد شده صحیح نیست
                    </small>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="insurance"> بیمه :</label>
                <div className="flex flex-col w-[80%]">
                  <input
                    id="insurance"
                    type="number"
                    className={`${
                      errors.insurance && "border-rose-700"
                    } formInput2 `}
                    {...register("insurance", { max: 100, min: -100 })}
                  />
                  {errors.insurance && (
                    <small className="text-rose-700">
                      عدد وارد شده صحیح نیست
                    </small>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="power"> برق :</label>
                <div className="flex flex-col w-[80%]">
                  <input
                    id="power"
                    type="number"
                    className={`${errors.powe && "border-rose-700"} formInput2`}
                    {...register("power", { max: 100, min: -100 })}
                  />
                  {errors.power && (
                    <small className="text-rose-700">
                      عدد وارد شده صحیح نیست
                    </small>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="monitoring"> پایش :</label>
                <div className="flex flex-col w-[80%]">
                  <input
                    id="monitoring"
                    type="number"
                    className={`${
                      errors.monitoring && "border-rose-700"
                    } formInput2`}
                    {...register("monitoring", { max: 100, min: -100 })}
                  />
                  {errors.monitoring && (
                    <small className="text-rose-700">
                      عدد وارد شده صحیح نیست
                    </small>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="maintenance"> نگهداری :</label>
                <div className="flex flex-col w-[80%]">
                  <input
                    id="maintenance"
                    type="number"
                    className={`${
                      errors.maintenance && "border-rose-700"
                    } formInput2`}
                    {...register("maintenance", { max: 100, min: -100 })}
                  />
                  {errors.maintenance && (
                    <small className="text-rose-700">
                      عدد وارد شده صحیح نیست
                    </small>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="coloring">رنگ آمیزی:</label>
                <div className="flex flex-col w-[80%]">
                  <input
                    id="coloring"
                    type="number"
                    className={`${
                      errors.coloring && "border-rose-700"
                    } formInput2 `}
                    {...register("coloring", { max: 100, min: -100 })}
                  />
                  {errors.coloring && (
                    <small className="text-rose-700">
                      عدد وارد شده صحیح نیست
                    </small>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="others">سایر :</label>
                <div className="flex flex-col w-[80%]">
                  <input
                    id="others"
                    type="number"
                    className={`${
                      errors.others && "border-rose-700"
                    } formInput2`}
                    {...register("others", { max: 100, min: -100 })}
                  />
                  {errors.others && (
                    <small className="text-rose-700">
                      عدد وارد شده صحیح نیست
                    </small>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center gap-4 mb-4">
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="startDate" className="formInputLabel">
                  تاریخ شروع :
                </label>
                <DatePicker
                  format="YYYY-MM-DD"
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  onChange={handleStartDate}
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="endDate" className="formInputLabel">
                  تاریخ پایان :
                </label>
                <DatePicker
                  format="YYYY-MM-DD"
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  onChange={handleEndDate}
                />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button
                className={`confirmButton ${
                  (!endDate || !startDate) && "cursor-not-allowed"
                }`}
                type="submit"
                disabled={!endDate || !startDate ? true : false}
              >
                ذخیره
              </button>

              <button onClick={handleModal} className="cancelButton">
                لغو
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RenewalBox;
