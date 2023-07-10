"use client"
import { selectAllStructures, useGetStructuresQuery, useUpdateStructureMutation } from "../structures/structuresApiSlice"
import { selectAllBoxes, useCreateNewBoxMutation, useGetAllBoxesQuery } from "./boxesApiSlice"
import { AddBoxForm, StructureObject } from "@/app/lib/interfaces"
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
const BasicInfoFormSection = dynamic(
  () => import('./BasicInfoFormSection'),
  { ssr: false }
)
const StructuresFormSection = dynamic(
  () => import('./StructuresFormSection'),
  { ssr: false }
)

const NewBox = ({ mark }: { mark: string }) => {

  const {
    data: allBoxes
  } = useGetAllBoxesQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })

  const {
    data: allStructures
  } = useGetStructuresQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })

  const structures = useSelector(state => selectAllStructures(state))
  const boxes = useSelector(state => selectAllBoxes(state))

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
            squareCost: parseInt(structure.costs.fixedCosts.squareCost),
          },
        },
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
      structures: newData.structures
    })

    newData.structures.forEach(async(structure) => {
      structures.forEach(async(nonBoxStructure: any) => {
        if(structure.structureId === nonBoxStructure.id){
          console.log(newData.boxId)
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
          <BasicInfoFormSection 
            mark={mark}
            register={register}
            errors={errors}
            handleStartDate={(val) => setStartDate(val)}
            handleEndDate={(val) => setEndDate(val)}
          />

          <StructuresFormSection 
            register={register}
            errors={errors}
            structuresField={structuresField}
            appendStructure={appendStructure}
            removeStructure={removeStructure}
            control={control}
          />

          <button className="btn-primary">افزودن باکس</button>
        </form>
      </>
    )
}

export default NewBox