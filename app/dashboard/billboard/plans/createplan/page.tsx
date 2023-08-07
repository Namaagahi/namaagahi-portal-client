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

const CreatePlan = () => {

  const { id } = useAuth()  
  const { push } = useRouter()

  const [discountType, setDiscountType] = useState('percentage')

  const [createNewPlan, {
    isSuccess,
    isError,
    error
}] = useCreateNewPlanMutation()

  const createPlanForm = useForm<AddPlanForm>({
    defaultValues: newPlanDefaultValues,
    mode: 'onSubmit'
  })

  const { register, control, handleSubmit, formState: {errors}, getValues, setValue, watch } = createPlanForm
  
  const { fields: structuresField, append: appendStructure, remove: removeStructure } = useFieldArray({
    control,
    name: "structures",
  })

  function convertToNumber(value: string | number) {
    if (typeof value === "number") {
      return value;
    }
  
    const cleanedValue = value?.replace(/,/g, "");
    const parsedValue = parseFloat(cleanedValue);
  
    if (isNaN(parsedValue)) {
      return null;
    }
  
    return parsedValue;
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

    console.log("newData", newData)

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