import { AddBoxForm, EditBoxForm, EditBoxProps, StructureObject, UserObject } from '@/app/lib/interfaces'
import React, { useEffect, useState } from 'react'
import { useGetAllBoxesQuery, useUpdateBoxMutation } from './boxesApiSlice'
import { AiOutlineClose } from 'react-icons/ai'
import BoxBaseFormContent from './BoxBaseFormContent'
import { toast } from 'react-toastify'
import dynamic from 'next/dynamic'
import { selectAllStructures, useGetStructuresQuery, useUpdateStructureMutation } from '../structures/structuresApiSlice'
import { useSelector } from 'react-redux'
import { Value } from 'react-multi-date-picker'
import { useFieldArray, useForm } from 'react-hook-form'
import { selectAllUsers, useGetUsersQuery } from '../users/usersApiSlice'
import EditBoxStructures from './EditBoxStructures'
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

  const structures: StructureObject[] = useSelector(state => selectAllStructures(state))
  const allUsers: UserObject[] | any  = useSelector(selectAllUsers)
  const filtered = structures.filter((structure) => structure.isChosen === false)

  const [startDate, setStartDate] = useState<Value | any>(box?.duration.startDate) 
  const [endDate, setEndDate] = useState<Value | any>(box?.duration.endDate) 
  const [isEditStructure, setIsEditStructure] = useState(false)

  const boxStructures: any = box?.structures?.map((structure: any) => ({
    structureId: structure.structureId,
    duration: {
      startDate: structure.duration.startDate,
      endDate: structure.duration.endDate,
    },
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
      variableCosts: structure.costs.variableCosts.map((variableCost: any) => ({
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

  function convertToNumber(value: string | null): any {
    const cleanedValue = value!.replace(/,/g, '')
    const parsedValue = parseFloat(cleanedValue)
  
    if (isNaN(parsedValue)) {
      return null
    }
    return parsedValue;
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
      })),
    }

    console.log("RHF DATA", data)
    const foundUser = allUsers.find((user: any) => user.id === data.userId)
    const abc = await updateBox({
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
    console.log("ABC", abc)
    // handleModal()
    toast.success(`باکس با موفقیت ویرایش شد.`)
  }

  console.log("box",box)
  if(isLoading) return <Loading/>  
  
  return (
    <div className="py-5 px-8 w-full text-black dark:text-white overflow-hidden overflow-y-auto">
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
          {!isEditStructure &&
            <BoxBaseFormContent
              register={register}
              errors={errors}
              box={box}
              handleStartDate={(val: any) => setStartDate(val)}
              handleEndDate={(val: any) => setEndDate(val)}
              allUsers={allUsers}
          />
          }
          {
            isEditStructure &&
            <EditBoxStructures 
              field={structuresField}
              appendStructure={appendStructure}
              removeStructure={removeStructure}
              register={register}
              filtered={filtered}
              errors={errors}
              control={control}
              setValue={setValue}
            />
          }

        <div className="flex items-center gap-6">
          <button
            className={` bg-[#5858FA] py-3 w-2/3 rounded-lg text-xl border-[1px] border-[#5858FA] hover:border-[#3636a3] hover:bg-[#3636a3] transition-all text-white`}
            type='submit'
          >
            ذخیره
          </button>
          <div 
            className="py-3 w-1/3 rounded-lg text-xl border-[1px] border-[#808080] dark:border-white hover:bg-black hover:text-white transition-all text-center"
            onClick={() => setIsEditStructure(!isEditStructure)}
          >
              {isEditStructure? 'قبلی' : 'بعدی'}
          </div>
          <button 
              onClick={handleModal}
              className="py-3 w-1/3 rounded-lg text-xl border-[1px] border-[#808080] dark:border-white hover:bg-black hover:text-white transition-all"
          >لغو</button>
      </div>
      </form>
    </div>
  )
}

export default EditBoxForm