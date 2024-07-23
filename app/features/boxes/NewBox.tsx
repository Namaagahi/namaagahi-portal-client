"use client";
import {
  selectAllStructures,
  useGetStructuresQuery,
} from "../../apiSlices/structuresApiSlice";
import {
  useCreateNewBoxMutation,
  useGetAllBoxesQuery,
} from "../../apiSlices/boxesApiSlice";
import { AddBoxForm, StructureObject } from "@/app/lib/interfaces";
import { newBoxDefaultValues } from "@/app/lib/constants";
import { useForm, useFieldArray } from "react-hook-form";
import { DateObject } from "react-multi-date-picker";
import { useRouter } from "next/navigation";
import { convertToNumber } from "@/app/utilities/convertToNumber";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAuth from "@/app/hooks/useAuth";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import ExcelUpload from "./ExcelUpload";
const BasicBoxInfoFormSection = dynamic(
  () => import("./BasicBoxInfoFormSection"),
  { ssr: false }
);
const BoxStructuresFormSection = dynamic(
  () => import("./BoxStructuresFormSection"),
  { ssr: false }
);

type Props = {
  mark: string;
};

const NewBox = (props: Props) => {
  const { mark } = props;

  useGetAllBoxesQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });

  useGetStructuresQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    pollingInterval: 5000,
  });

  const structures: StructureObject[] = useSelector(
    (state) => selectAllStructures(state) as StructureObject[]
  );
  const filtered = structures?.filter(
    (structure) => structure.isChosen === false
  );
  const { id } = useAuth();

  const [createNewBox, { isSuccess, isError, error }] =
    useCreateNewBoxMutation();

  const [startDate, setStartDate] = useState<number>(new Date().getTime());
  const [endDate, setEndDate] = useState<number>(new Date().getTime());
  const [fileData, setFileData] = useState<any>("");
  const [useExcel, setUseExcel] = useState(false);

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

  const { push } = useRouter();

  const createBoxForm = useForm<AddBoxForm>({
    defaultValues: newBoxDefaultValues,
    mode: "onSubmit",
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = createBoxForm;

  const {
    fields: structuresField,
    append: appendStructure,
    remove: removeStructure,
  } = useFieldArray({
    control,
    name: "structures",
  });

  useEffect(() => {
    getValues("startDate");
    getValues("endDate");
    setValue("startDate", startDate);
    setValue("endDate", endDate);
  }, [startDate, endDate]);

  const costs = (data: any) => {
    const x = Object.entries(data).slice(10);
    const res = x.map((x: any) => {
      return { name: x[0], figures: { monthlyCost: x[1] } };
    });
    return res;
  };

  const calculateMonthDifference = (
    startTimestamp: number,
    endTimestamp: number
  ) => {
    const millisecondsInASecond = 1000;
    const secondsInAMinute = 60;
    const minutesInAnHour = 60;
    const hoursInADay = 24;
    const daysInAYear = 365; // Average including leap years
    const monthsInAYear = 12;

    const averageMillisecondsInAMonth =
      (daysInAYear *
        hoursInADay *
        minutesInAnHour *
        secondsInAMinute *
        millisecondsInASecond) /
      monthsInAYear;

    const startDateInMilliseconds = startTimestamp * millisecondsInASecond;
    const endDateInMilliseconds = endTimestamp * millisecondsInASecond;

    const differenceInMilliseconds =
      endDateInMilliseconds - startDateInMilliseconds;
    const differenceInMonths =
      differenceInMilliseconds / averageMillisecondsInAMonth;

    return differenceInMonths + 0.02;
  };

  const onSubmit = async (data: AddBoxForm) => {
    const array1 = filtered?.map((x) => x.name);
    const array2 = fileData.map((x: any) => x.code);
    console.log(data.startDate);
    console.log(mark);
    console.log(calculateMonthDifference(data.startDate, data.endDate));
    if (mark === "buyLong") {
      if (calculateMonthDifference(data.startDate, data.endDate) < 6) {
        toast.error("تاریخ قرارداد بلند مدت نمیتواند کمتر از 6 ماه باشد");
        return;
      }
    }
    const allElementsInArray = array2.every((element: any) =>
      array1.includes(element)
    );

    if (!allElementsInArray) {
      toast.error("یکی از کد سازه های وارد شده صحیح نیست");
      return;
    }
    const newfileData = fileData
      ? fileData.map((file: any) => {
          const abc = filtered.filter((x) => x.name.includes(file.code))[0].id;
          return {
            structureId: abc,
            marks: {
              name: file.name,
              markOptions: {
                style: file.style,
                face: file.face,
                length: file.length.toString(),
                width: file.width.toString(),
                printSize: file.printSize,
                docSize: file.docSize,
              },
            },
            costs: {
              fixedCosts: {
                squareCost: file.squareCost,
              },
              variableCosts: costs(file),
            },
            monthlyBaseFee: file.monthlyBaseFee,
          };
        })
      : null;
    const newData = {
      ...data,
      structures: useExcel
        ? newfileData
        : data.structures.map((structure) => ({
            ...structure,
            marks: {
              ...structure.marks,
              markOptions: {
                ...structure.marks.markOptions,
                length: parseFloat(structure.marks.markOptions.length),
                width: parseFloat(structure.marks.markOptions.width),
                printSize: parseFloat(structure.marks.markOptions.printSize),
                docSize: parseFloat(structure.marks.markOptions.docSize),
              },
            },
            costs: {
              ...structure.costs,
              fixedCosts: {
                ...structure.costs.fixedCosts,
                squareCost: convertToNumber(
                  structure.costs.fixedCosts.squareCost
                ),
              },
              variableCosts: structure.costs.variableCosts.map(
                (varCost: any) => {
                  return {
                    ...varCost,
                    figures: {
                      monthlyCost: convertToNumber(varCost.figures.monthlyCost),
                    },
                  };
                }
              ),
            },
            monthlyBaseFee: convertToNumber(structure.monthlyBaseFee),
          })),
    };

    if (isError) {
      "status" in error! &&
        error.status === 409 &&
        toast.error("این نام باکس قبلا ثبت شده است");
      "status" in error! &&
        error.status === 400 &&
        toast.error("همه فیلدها را تکمیل کنید");
      if (!allElementsInArray) {
        toast.error("یکی از کد سازه های وارد شده صحیح نیست");
      }
    }

    if (endDate - startDate < 0) {
      toast.error("تاریخ پایان نمی تواند عقب تر از تاریخ شروع باشد.");
    } else {
      await createNewBox({
        boxId: newData.boxId,
        userId: id,
        name: newData.name || "بدون نام",
        mark: {
          name: mark,
          markOptions: {
            projectNumber: newData.projectNumber,
            brand: newData.brand,
          },
        },
        duration: {
          startDate: Number(newData.startDate),
          endDate: Number(newData.endDate),
        },
        structures: newData.structures,
      });
    }
  };

  if (isSuccess) {
    toast.success(`باکس جدید با موفقیت ساخته شد.`);
    push("/dashboard/billboard/boxes");
  }

  const handleDataExtracted = (data: any) => {
    setFileData(data);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-9 justify-center"
    >
      <BasicBoxInfoFormSection
        page={"create"}
        control={control}
        mark={mark}
        errors={errors}
        handleStartDate={handleStartDate}
        handleEndDate={handleEndDate}
        setValue={setValue}
      />

      {useExcel ? (
        <ExcelUpload
          onDataExtracted={handleDataExtracted}
          useExcel={useExcel}
          setUseExcel={setUseExcel}
        />
      ) : (
        <BoxStructuresFormSection
          mark={mark}
          page={"create"}
          register={register}
          errors={errors}
          structuresField={structuresField}
          appendStructure={appendStructure}
          removeStructure={removeStructure}
          control={control}
          setValue={setValue}
          convertToNumber={convertToNumber}
          structures={structures}
          useExcel={useExcel}
          setUseExcel={setUseExcel}
        />
      )}

      <button className="primaryButton w-1/4 mx-auto">افزودن باکس</button>
    </form>
  );
};

export default NewBox;
