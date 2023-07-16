"use client"
import PageTitle from '@/app/components/main/PageTitle'
import { selectAllBoxes, useGetAllBoxesQuery } from '@/app/features/boxes/boxesApiSlice'
import Loading from '@/app/features/loading/Loading'
import { selectAllStructures, useGetStructuresQuery } from '@/app/features/structures/structuresApiSlice'
import useAuth from '@/app/hooks/useAuth'
import { newPlanDefaultValues } from '@/app/lib/constants'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'


const CreatePlan = () => {

  const { id } = useAuth()  

  const {
    data: boxes,
  } = useGetAllBoxesQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  })

  const { 
    data: structures,
    isLoading,
    isSuccess, 
    isError,
  } = useGetStructuresQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })

  const allStructures = useSelector(state => selectAllStructures(state))
  const allBoxes = useSelector(state => selectAllBoxes(state))

  const chosenStructures = allStructures.filter((structure: any) => structure.isChosen)
  const boxStructures = allBoxes.flatMap((box: any) => box.structures)
  const chosenStructuresLookup = chosenStructures.reduce(
    (acc: any, chosenStructure: any) => ({ ...acc, [chosenStructure.id]: chosenStructure }),
    {}
  )
  const combinedStructures = boxStructures.map((boxStructure) => ({
    ...boxStructure,
    ...(chosenStructuresLookup[boxStructure.structureId] || null),
  }))

  const createPlanForm = useForm<any>({
    defaultValues: newPlanDefaultValues,
    mode: 'onSubmit'
  })

  const { register, control, handleSubmit, formState: {errors}, getValues, setValue } = createPlanForm

  const onSubmit = async(data: any) => {
    console.log(data)
  }

  // console.log("boxStructures", boxStructures)
  // console.log("chosenStructures", chosenStructures)
  console.log("combinedStructures", combinedStructures)

  if(isLoading) return <Loading />

  return (
      <main className="min-h-screen">
        <PageTitle name={'ایجاد پلن جدید'} />
        <div className='flex flex-col gap-9 justify-center'>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-9 justify-center'
        >
          <div className='flex flex-col gap-8 items-start w-full p-8 bg-bgform rounded-[30px] text-black'>
            <small className="pr-3 text-slate-500 inline-block font-bold">اطلاعات پایه</small>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
              <div className='flex flex-col gap-3'>
                <label htmlFor="name" className='text-[#767676] font-bold'>نام پلن</label>
                <input
                  {...register("name", {
                      required: {
                          value: true,
                          message:  'نام باکس را وارد کنید'
                      },
                      pattern: {
                        value: /^[P][L][0-9]{4}$/,
                        message: 'فرمت کد پروژه باید به صورت PL و چهار عدد بعد از آن باشد'
                    }
                  })}
                  type="text"
                  id='name'
                  className='px-6 py-5 rounded-[50px] bg-white outline-none'
                />
                {/* <small className="text-xs text-rose-600 ">{errors.name?.message}</small> */}
              </div>
            </div>
          </div>
          <button className="btn-primary">افزودن پلن</button>
        </form>
        </div>
      </main>

  )
}

export default CreatePlan