import { selectAllStructures, useGetStructuresQuery, useUpdateStructureMutation } from '@/app/apiSlices/structuresApiSlice'
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

  const [updateStructure] = useUpdateStructureMutation()

  const [updateBox, { 
      isSuccess, 
      isError,
      error
  }] = useUpdateBoxMutation() 

  const structures: StructureObject[] = useSelector(state => selectAllStructures(state) as StructureObject[])

  const [startDate, setStartDate] = useState<number>(box.duration.startDate)
  const [endDate, setEndDate] = useState<number>(box.duration.endDate)

  const [data, setData] = useState<any>(null)

  const editBoxForm = useForm<EditBoxForm>({
      defaultValues: data,
      mode: 'onSubmit' 
    })
  
  const {
    register,
    control,
    handleSubmit,
    formState:{errors},
    getValues,
    setValue,
    reset,
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

  // useEffect(() => {
  //   if(data[0]) {
  //     data.structures.forEach(async(structure: any) => {
  //       structures.forEach(async(nonBoxStructure: any) => {
  //         if(structure.structureId === nonBoxStructure.id){
  //         const abc = await updateStructure({
  //             userId: nonBoxStructure?.userId,
  //             id: nonBoxStructure?.id,
  //             name: nonBoxStructure?.name,
  //             location: nonBoxStructure?.location,
  //             isChosen: false,
  //             isAvailable: nonBoxStructure?.isAvailable,
  //             parent: ""
  //           })
  //         }
  //       })
  //     })
  //   }
  // },[])
  
  
  useEffect(() => { 
    setTimeout(() => setData({
        boxId: box?.boxId,
        name: box?.name,
        projectNumber: box?.mark.markOptions.projectNumber,
        brand: box?.mark.markOptions.brand,
        startDate: startDate,
        endDate: endDate,
        structures: JSON.parse(JSON.stringify(box?.structures))
      }), 1000);
  }, [])

  useEffect(() => {
    reset(data) 
  }, [data, reset])

  
  useEffect(() => {
    getValues("startDate")
    getValues("endDate")
    setValue('startDate', startDate)
    setValue('endDate', endDate)
  }, [startDate, endDate])

  const handleStartDate = (value: DateObject | DateObject[] | null) => {
    if (value instanceof DateObject) {
      setStartDate(value.unix * 1000)
    } else if (Array.isArray(value) && value.length > 0) {
      const timestamps = value.map((date) => date.unix * 1000)
      setStartDate(timestamps[0])
    } else {
      setStartDate(new Date().getTime())
    }
  }

  const handleEndDate = (value: DateObject | DateObject[] | null) => {
    if (value instanceof DateObject) {
      setEndDate(value.unix * 1000)
    } else if (Array.isArray(value) && value.length > 0) {
      const timestamps = value.map((date) => date.unix * 1000)
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

    // newData.structures.forEach(async(structure) => {
    //   structures.forEach(async(nonBoxStructure: any) => {
    //     if(structure.structureId === nonBoxStructure.id){
    //     const abc = await updateStructure({
    //         userId: nonBoxStructure?.userId,
    //         id: nonBoxStructure?.id,
    //         name: nonBoxStructure?.name,
    //         location: nonBoxStructure?.location,
    //         isChosen: true,
    //         isAvailable: nonBoxStructure?.isAvailable,
    //         parent: newData.boxId
    //       })
    //     }
    //   })
    // })
  
    const HEY = await updateBox({
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
        })
    })   
  }

  if(isError) {
      'status' in error! && error.status === 409 && toast.error('این نام باکس قبلا ثبت شده است')
      'status' in error! && error.status === 400 && toast.error('همه فیلدها را تکمیل کنید')
  }

  if(isSuccess) {
      toast.success(`باکس ${box?.name} با موفقیت ویرایش شد.`)
      push('/dashboard/billboard/boxes')
  }

  const formVals = watch('structures')
  if(!box || !structures[0]) return <Loading />
  return (
    <main className="min-h-screen">
      <PageTitle name={`ویرایش باکس ${box?.name}`} /> 
      <div className='flex flex-col gap-9 justify-center'>
        <form  
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-9 justify-center'
        >
          <BasicBoxInfoFormSection
            page={'edit'}
            control={control} 
            box={box}
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
          />

          <button className="btn-primary">
            ویرایش باکس
          </button>
        </form>
      </div>
    </main>
  )
}

export default EditBoxComp