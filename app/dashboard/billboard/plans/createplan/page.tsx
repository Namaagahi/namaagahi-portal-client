"use client"
import { useCreateNewPlanMutation } from '@/app/apiSlices/plansApiSlice'
import PlanStructuresInfo from '@/app/features/plans/PlanStructuresInfo'
import PlanBasicInfo from '@/app/features/plans/PlanBasicInfo'
import { newPlanDefaultValues } from '@/app/lib/constants'
import { useFieldArray, useForm } from 'react-hook-form'
import PageTitle from '@/app/components/main/PageTitle'
import { AddPlanForm } from '@/app/lib/interfaces'
import { useRouter } from 'next/navigation'
import useAuth from '@/app/hooks/useAuth'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { selectAllBoxes, useGetAllBoxesQuery } from '@/app/apiSlices/boxesApiSlice'
import { useSelector } from 'react-redux'
import Link from 'next/link'

const CreatePlan = () => {

  const { id } = useAuth()  
  const { push } = useRouter()

  const [discountType, setDiscountType] = useState('percentage')

  const [createNewPlan, {
    isSuccess,
    isError,
    error
}] = useCreateNewPlanMutation()

useGetAllBoxesQuery(undefined, {
  refetchOnFocus: false,
  refetchOnMountOrArgChange: false,
})
const allBoxes: any = useSelector(state => selectAllBoxes(state))

  const createPlanForm = useForm<AddPlanForm>({
    defaultValues: newPlanDefaultValues,
    mode: 'onSubmit'
  })

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    watch
} = createPlanForm
  
  const {
    fields: structuresField,
    append: appendStructure,
    remove: removeStructure
  } = useFieldArray({
    control,
    name: "structures",
  })

  function convertToNumber(value: string | number) {
    if (typeof value === "number") return value
    
    const cleanedValue = value?.replace(/,/g, "")
    const parsedValue = parseFloat(cleanedValue)
  
    if (isNaN(parsedValue)) return null
    
    return parsedValue
  }

  const onSubmit = async(data: any) => {

    const newData = {
      ...data, 
      structures: data.structures.map((structure: any) => ({
        ...structure,
        monthlyFee: convertToNumber(structure.monthlyFee),
        monthlyFeeWithDiscount: convertToNumber(structure.monthlyFeeWithDiscount),
        discountType: discountType
      }))
    }

  const abc = await createNewPlan({
      userId: id,
      name: newData.name,
      customerName: newData.customerName,
      brand: newData.brand,
      structures: newData.structures
    })
    console.log("ABC", abc)
  }

  if(isError) {
    'status' in error! && error.status === 409 && toast.error('این نام پلن قبلا ثبت شده است')
    'status' in error! && error.status === 400 && toast.error('همه فیلدها را تکمیل کنید')
}

  if(isSuccess) {
    toast.success(`پلن جدید با موفقیت ساخته شد.`)
    push('/dashboard/billboard/plans')
  }

  if(!allBoxes[0]) return (
    <div className='flex flex-col justify-center items-center min-h-screen gap-3'>
      <p className='text-xl'>برای ایجاد پلن باید سازه ها در باکس ثبت شده باشند. در حال حاضر هیچ باکسی وجود ندارد.</p>
      <p>برای ایجاد باکس جدید 
        <Link href={'/dashboard/billboard/boxes/createbox'}>
          <span className='text-cyan-300'>کلیک کنید</span>
        </Link>
      </p>
    </div>
  )

  return (
      <main className="min-h-screen">
        <PageTitle name={'ایجاد پلن جدید'} />
        <div className='flex flex-col gap-9 justify-center'>
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className='w-full flex flex-col gap-9 justify-center'
          >
            <PlanBasicInfo
              page={'create'}
              control={control}
              errors={errors}
            />

            <PlanStructuresInfo
              page={'create'}
              control={control}
              errors={errors}
              discountType={discountType}
              convertToNumber={convertToNumber}
              handleDiscountType={(val: string) => setDiscountType(val)}
              setValue={setValue}
              field={structuresField}
              appendStructure={appendStructure}
              removeStructure={removeStructure}
              watch={watch}
              register={register}
            />

            <button className="btn-primary">افزودن پلن</button>
          </form>
        </div>
      </main>

  )
}

export default CreatePlan