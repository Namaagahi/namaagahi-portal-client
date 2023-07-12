import { AddBoxForm, EditBoxForm, EditBoxProps, UserObject } from '@/app/lib/interfaces'
import React, { useEffect, useState } from 'react'
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
import { selectAllUsers, useGetUsersQuery } from '../users/usersApiSlice'
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

  const [updateBox, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateBoxMutation()

  const [updateStructure] = useUpdateStructureMutation()

  const {
    data: users, 
} = useGetUsersQuery(undefined, { 
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
}) 

  const allUsers: UserObject[] | any  = useSelector(selectAllUsers)

  const [startDate, setStartDate] = useState<Value | any>('') 
  const [endDate, setEndDate] = useState<Value | any>('') 

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
      username: box?.username,
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

  useEffect(() => {
    getValues("duration.startDate")
    getValues("duration.endDate")
    setValue('duration.startDate',startDate!!.toString())
    setValue('duration.endDate',  endDate!!.toString())
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

  const onSubmit = async(data: EditBoxForm) => {
    const foundUser = allUsers.find((user: any) => user.id === data.userId)
    await updateBox({
      id: box?.id,
      boxId: data.boxId,
      userId: data.userId,
      username: foundUser?.username,
      name: data.name,
      mark: data.mark,
      duration: {
        startDate: convertToEnglishDate(data.duration.startDate),
        endDate: convertToEnglishDate(data.duration.endDate),
      },
      structures: data.structures
    })
    handleModal()
  }

  if(isSuccess) {
    toast.success(`باکس با موفقیت ویرایش شد.`)
  }

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
            allUsers={allUsers}
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