"use client"
import { selectAllStructures, useGetStructuresQuery, useUpdateStructureMutation } from "../structures/structuresApiSlice"
import { useCreateNewBoxMutation, useGetAllBoxesQuery } from "./boxesApiSlice"
import { AddBoxForm } from "@/app/lib/interfaces"
import persian_fa from "react-date-object/locales/persian_fa"
import persian from "react-date-object/calendars/persian"
import { newBoxDefaultValues } from "@/app/lib/constants"
import { useForm, useFieldArray } from "react-hook-form"
import { DateObject } from "react-multi-date-picker"
import type { Value } from "react-multi-date-picker"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import useAuth from "@/app/hooks/useAuth"
import { toast } from "react-toastify"
import dynamic from "next/dynamic"
const BasicBoxInfoFormSection = dynamic(
  () => import('./BasicBoxInfoFormSection'),
  { ssr: false }
)
const BoxStructuresFormSection = dynamic(
  () => import('./BoxStructuresFormSection'),
  { ssr: false }
)

const NewBox = ({ mark }: { mark: string }) => {

  useGetAllBoxesQuery(undefined, {
      refetchOnFocus: false,
      refetchOnMountOrArgChange: false
  })

  useGetStructuresQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })

  const structures = useSelector(state => selectAllStructures(state))

  const { id } = useAuth()  

  const [createNewBox, {
      isSuccess,
      isError,
      error
  }] = useCreateNewBoxMutation()

  const [updateStructure] = useUpdateStructureMutation()

  const [startDate, setStartDate] = useState<Value | any>(new DateObject({ calendar: persian, locale: persian_fa })) 
  const [endDate, setEndDate] = useState<Value | any>(new DateObject({ calendar: persian, locale: persian_fa })) 

  const { push } = useRouter()
    
  const createBoxForm = useForm<AddBoxForm>({
    defaultValues: newBoxDefaultValues,
    mode: 'onSubmit'
  })

  const { register, control, handleSubmit, formState: {errors}, getValues, setValue } = createBoxForm

  const { fields: structuresField, append: appendStructure, remove: removeStructure } = useFieldArray({
    control,
    name: "structures",
  })

  useEffect(() => {
    getValues("startDate")
    getValues("endDate")
    setValue('startDate', startDate!!.toString())
    setValue('endDate', endDate!!.toString())
  }, [startDate, endDate])

  function convertToEnglishDate(dateStr: any) {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let englishDate = "";
    [...dateStr].forEach(char => {
      let index = persianDigits.indexOf(char);
      englishDate += (index !== -1) ? englishDigits[index] : char
    })
    return englishDate
  }

  function convertToNumber(value: string | null): any {
    const cleanedValue = value!.replace(/,/g, '')
    const parsedValue = parseFloat(cleanedValue)
  
    if (isNaN(parsedValue)) {
      return null
    }
    return parsedValue;
  }

  const onSubmit = async(data: AddBoxForm) => {

    const newData = {
      ...data,
      structures: data.structures.map((structure) => ({
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
            squareCost: convertToNumber(structure.costs.fixedCosts.squareCost),
          }
        },
        monthlyBaseFee: convertToNumber(structure.monthlyBaseFee),
      })),
    }

    if(isError) {
        'status' in error! && error.status === 409 && toast.error('این نام باکس قبلا ثبت شده است')
        'status' in error! && error.status === 400 && toast.error('همه فیلدها را تکمیل کنید')
    }

   await createNewBox({
      boxId: newData.boxId,
      userId: id,
      name: newData.name,
      mark: { 
        name: mark,
        markOptions: {
          projectNumber: newData.projectNumber,
          brand: newData.brand
        },
      },
      duration: {
        startDate: convertToEnglishDate(newData.startDate),
        endDate: convertToEnglishDate(newData.endDate),
      },
      structures: newData.structures.map((structure: any) => {
        return(
          ({ ...structure, costs: {
              ...structure.costs, variableCosts: structure.costs.variableCosts.map((varCost: any) => {
                return(
                  ({ ...varCost, figures: { monthlyCost: convertToNumber(varCost.figures.monthlyCost) } })
                )})
            } 
          })
        )
      })
    })

    newData.structures.forEach(async(structure) => {
      structures.forEach(async(nonBoxStructure: any) => {
        if(structure.structureId === nonBoxStructure.id){
        await updateStructure({
            userId: nonBoxStructure?.userId,
            id: nonBoxStructure?.id,
            name: nonBoxStructure?.name,
            location: nonBoxStructure?.location,
            isChosen: true,
            isAvailable: true,
            parent: newData.boxId
          })
        }
      })
    })
  }

  if(isSuccess) {
    toast.success(`باکس جدید با موفقیت ساخته شد.`)
    push('/dashboard/billboard/boxes')
  }

    return (
      <>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-9 justify-center'
        >
          <BasicBoxInfoFormSection 
            mark={mark}
            register={register}
            errors={errors}
            handleStartDate={(val) => setStartDate(val)}
            handleEndDate={(val) => setEndDate(val)}
          />

          <BoxStructuresFormSection 
            register={register}
            errors={errors}
            structuresField={structuresField}
            appendStructure={appendStructure}
            removeStructure={removeStructure}
            control={control}
            setValue={setValue}
            convertToNumber={convertToNumber}
          />

          <button className="btn-primary">افزودن باکس</button>
        </form>
      </>
    )
}

export default NewBox