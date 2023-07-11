import { AddBoxForm, EditBoxForm, EditBoxProps } from '@/app/lib/interfaces'
import React, { useState } from 'react'
import { selectAllBoxes, useGetAllBoxesQuery, useUpdateBoxMutation } from './boxesApiSlice'
import { useRouter } from 'next/navigation'
import { AiOutlineClose } from 'react-icons/ai'
import BoxStructureFormContent from './BoxStructureFormContent'
import BoxBaseFormContent from './BoxBaseFormContent'
import { toast } from 'react-toastify'
import dynamic from 'next/dynamic'
import { selectAllStructures, useGetStructuresQuery, useUpdateStructureMutation } from '../structures/structuresApiSlice'
import { useSelector } from 'react-redux'
import useAuth from '@/app/hooks/useAuth'
import { DateObject, Value } from 'react-multi-date-picker'
import persian_fa from "react-date-object/locales/persian_fa"
import persian from "react-date-object/calendars/persian"
import { useFieldArray, useForm } from 'react-hook-form'
const Loading = dynamic(
  () => import('@/app/features/loading/Loading'),
  { ssr: false }
)

const EditBoxForm = (props: EditBoxProps) => {

  const { handleModal, box } = props

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

  // const structures = useSelector(state => selectAllStructures(state))
  const boxes = useSelector(state => selectAllBoxes(state))

  const { id } = useAuth()  

  const [updateBox, {
    isLoading,
    isSuccess,
    isError,
    error
}] = useUpdateBoxMutation()

const [updateStructure] = useUpdateStructureMutation()

const [startDate, setStartDate] = useState<Value | any>(new DateObject({ calendar: persian, locale: persian_fa })) 
const [endDate, setEndDate] = useState<Value | any>(new DateObject({ calendar: persian, locale: persian_fa })) 

const { push } = useRouter()

const boxStructures = box?.structures?.map((structure) => ({
  structureId: structure.structureId,
  marks: {
    name: structure.marks.name,
    markOptions: {
      style: structure.marks.markOptions.style,
      face: structure.marks.markOptions.face,
      length: structure.marks.markOptions.length,
      width: structure.marks.markOptions.width,
      printSize: structure.marks.markOptions.printSize,
      docSize: structure.marks.markOptions.docSize,
    },
  },
  costs: {
    fixedCosts: {
      squareCost: structure.costs.fixedCosts.squareCost,
    },
    variableCosts: structure.costs.variableCosts.map((variableCost) => ({
      name: variableCost.name,
      figures: {
        monthlyCost: variableCost.figures.monthlyCost,
      },
    })),
  },
}))


const editBoxForm = useForm<any>({
  defaultValues: {
    id: box?.id,
    boxId: box?.boxId,
    userId: box?.userId,
    name: box?.name,
    mark: {
      name: box?.mark.name,
      markOptions: {
        projectNumber: box?.mark.markOptions.projectNumber,
        brand: box?.mark.markOptions.brand,
      }
    },
    duration: {
      startDate: box?.duration.startDate,
      endDate: box?.duration.endDate
    },
    structures: boxStructures
  },
  mode: 'onSubmit'
})



const { register, control, handleSubmit, formState: {errors}, getValues, setValue } = editBoxForm

const { fields: structuresField, append: appendStructure, remove: removeStructure } = useFieldArray({
  control,
  name: "structures",
})

const onSubmit = (data: EditBoxForm) => {
  console.log("DATA",data)
}
console.log("BOX", box)
  if(isLoading) return <Loading/>  
  
  return (
    <div className="py-5 px-8 w-full text-black dark:text-white">
      <form
        className="flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
            <p className="md:text-2xl text-xl font-bold">ویرایش باکس</p>
            <AiOutlineClose 
                className="cursor-pointer text-xl hover:text-2xl transition-all" 
                onClick={handleModal}/>
        </div>
          <BoxBaseFormContent
            register={register}
            errors={errors}
            box={box}
            handleStartDate={(val: any) => setStartDate(val)}
            handleEndDate={(val: any) => setEndDate(val)}
          />

        <div className="flex items-center gap-6">
          <button
              className={` bg-[#5858FA] py-3 w-2/3 rounded-lg text-xl border-[1px] border-[#5858FA] hover:border-[#3636a3] hover:bg-[#3636a3] transition-all text-white`}
          >ذخیره</button>
          <button 
              onClick={handleModal}
              className=" py-3 w-1/3 rounded-lg text-xl border-[1px] border-[#808080] dark:border-white hover:bg-black hover:text-white transition-all"
          >لغو</button>
      </div>
      </form>
    </div>
  )
}

export default EditBoxForm