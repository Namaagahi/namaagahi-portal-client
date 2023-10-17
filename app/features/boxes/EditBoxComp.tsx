"use client"
import { selectAllStructures, useGetStructuresQuery } from '@/app/apiSlices/structuresApiSlice'
import { BoxObject, EditBoxForm, StructureObject } from '@/app/lib/interfaces'
import { useUpdateBoxMutation } from '@/app/apiSlices/boxesApiSlice'
import BoxStructuresFormSection from './BoxStructuresFormSection'
import { convertToNumber } from '@/app/utilities/convertToNumber'
import BasicBoxInfoFormSection from './BasicBoxInfoFormSection'
import { useFieldArray, useForm } from 'react-hook-form'
import PageTitle from '@/app/components/main/PageTitle'
import { DateObject } from 'react-multi-date-picker'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import useAuth from '@/app/hooks/useAuth'
import Loading from '../loading/Loading'
import { toast } from 'react-toastify'
import SearchContainer from '@/app/components/main/SearchContainer'
// import useFormPersist from "react-hook-form-persist";

type Props = {
  box: BoxObject
} 

const EditBoxComp = (props: Props) => {

  const { box } = props
  const { id: currentUserId } = useAuth()
  const { push } = useRouter()

  useGetStructuresQuery(undefined, { 
      refetchOnFocus: false,
      refetchOnMountOrArgChange: false
  })

  const [updateBox, { 
      isSuccess, 
      isError,
      error,
  }] = useUpdateBoxMutation() 

  const structures: StructureObject[] = useSelector(state => selectAllStructures(state) as StructureObject[])

  const [startDate, setStartDate] = useState<number>(box.duration.startDate)
  const [endDate, setEndDate] = useState<number>(box.duration.endDate)
  const [chosenStructures, setChosenStructures] = useState([])

  const editBoxForm = useForm<EditBoxForm>({
    defaultValues: {
      boxId: box.boxId,
      name: box.name,
      projectNumber: box.mark.markOptions.projectNumber,
      brand: box.mark.markOptions.brand,
      startDate: startDate,
      endDate: endDate,
      structures: JSON.parse(JSON.stringify(box.structures))
    },
    mode: 'onSubmit' 
  })
  
  const {
    register,
    control,
    handleSubmit,
    formState:{errors},
    getValues,
    setValue,
    watch
  } = editBoxForm

  const {
    fields,
    append: appendStructure,
    remove: removeStructure
  } = useFieldArray({
    control,
    name: "structures",
  }) 

  
  useEffect(() => {
    getValues("startDate")
    getValues("endDate")
    setValue('startDate', startDate)
    setValue('endDate', endDate)
  }, [startDate, endDate])

  const handleStartDate = (value: DateObject | DateObject[] | null) => {
    if (value instanceof DateObject) {
      setStartDate(value.unix)
    } else if (Array.isArray(value) && value.length > 0) {
      const timestamps = value.map((date) => date.unix)
      setStartDate(timestamps[0])
    } else {
      setStartDate(new Date().getTime())
    }
  }

  const handleEndDate = (value: DateObject | DateObject[] | null) => {
    if (value instanceof DateObject) {
      setEndDate(value.unix)
    } else if (Array.isArray(value) && value.length > 0) {
      const timestamps = value.map((date) => date.unix)
      setEndDate(timestamps[0])
    } else {
      setEndDate(new Date().getTime())
    }
  }

  const onSubmit = async(data: EditBoxForm) => {
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
  
    const editBoxABC = await updateBox({
        id: box?.id,
        boxId: newData.boxId,
        userId: currentUserId,
        username: box?.username,
        name: newData.name,
        mark: { 
            name: box?.mark.name,
            markOptions: {
            projectNumber: newData.projectNumber,
            brand: newData.brand
            },
        },
        duration: {
            startDate: Number(newData.startDate),
            endDate: Number(newData.endDate),
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
        }),
    })   
    console.log("editBoxABC", editBoxABC)
    toast.success(`باکس ${box?.name} با موفقیت ویرایش شد.`)
    push('/dashboard/billboard/boxes')
  }

  const values = editBoxForm.watch()
  
  useEffect(() => {
    window.localStorage.setItem('editBoxForm', JSON.stringify(values))
  }, [values, box])

  if(isError) {
      'status' in error! && error.status === 409 && toast.error('این نام باکس قبلا ثبت شده است')
      'status' in error! && error.status === 418 && toast.warn('این باکس توسط کاربر دیگری ویرایش شده است')
      'status' in error! && error.status === 400 && toast.error('همه فیلدها را تکمیل کنید')
  }

  const formVals = watch('structures')
  if(!box || !structures[0]) return <Loading />
  return (
    <main className="min-h-screen">
      <PageTitle name={`ویرایش باکس ${box?.name}`} /> 
      <SearchContainer />
      <div className='flex flex-col gap-9 justify-center'>
        <form  
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-9 justify-center' 
        >
          <BasicBoxInfoFormSection
            page={'edit'}
            control={control} 
            box={box!}
            mark={box?.mark.name}
            errors={errors}
            handleStartDate={(val) => handleStartDate(val)}
            handleEndDate={(val) => handleEndDate(val)}
          />

          <BoxStructuresFormSection 
            page={'edit'}
            register={register}
            errors={errors}
            structuresField={fields}
            appendStructure={appendStructure}
            removeStructure={removeStructure}
            control={control}
            setValue={setValue}
            convertToNumber={convertToNumber}
            structures={structures}
            formVals={formVals}
            chosenStructures={chosenStructures} 
            setChosenStructures={setChosenStructures}
          />

          <button
            className="primaryButton w-1/4"
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault()
            }}
          >
            ویرایش باکس
          </button>
        </form>
      </div>
    </main>
  )
}

export default EditBoxComp