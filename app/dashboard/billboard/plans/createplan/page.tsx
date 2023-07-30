"use client"
import PageTitle from '@/app/components/main/PageTitle'
import BasicPlanInfoSection from '@/app/features/plans/BasicPlanInfoSection'
import PlanStructuresFormSection from '@/app/features/plans/PlanStructuresFormSection'
import { useCreateNewPlanMutation } from '@/app/features/plans/plansApiSlice'
import useAuth from '@/app/hooks/useAuth'
import { newPlanDefaultValues } from '@/app/lib/constants'
import { AddPlanForm } from '@/app/lib/interfaces'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const CreatePlan = () => {

  const { id } = useAuth()  

  const [createNewPlan, {
    isSuccess,
    isError,
    error
}] = useCreateNewPlanMutation()

  const [discountType, setDiscountType] = useState('percentage')

  const { push } = useRouter()

  const createPlanForm = useForm<AddPlanForm>({
    defaultValues: newPlanDefaultValues,
    mode: 'onSubmit'
  })

  const { register, control, handleSubmit, formState: {errors}, getValues, setValue, watch } = createPlanForm
  
  const { fields: structuresField, append: appendStructure, remove: removeStructure } = useFieldArray({
    control,
    name: "structures",
  })

  function convertToNumber(value: string | null): any { 
    const cleanedValue = value!.replace(/,/g, '')
    const parsedValue = parseFloat(cleanedValue)
  
    if (isNaN(parsedValue)) {
      return null
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

  await createNewPlan({
      userId: id,
      name: newData.name,
      customerName: newData.customerName,
      brand: newData.brand,
      structures: newData.structures
    })

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
          <BasicPlanInfoSection
            register={register}
            errors={errors}
          />
          
          <PlanStructuresFormSection
            register={register}
            errors={errors}
            structuresField={structuresField}
            removeStructure={removeStructure}
            appendStructure={appendStructure}
            watch={watch}
            convertToNumber={convertToNumber}
            getValues={getValues}
            setValue={setValue}
            discountType={discountType}
            handleDiscountType={(val: string) => setDiscountType(val)}
          />
          <button className="btn-primary">افزودن پلن</button>
        </form>
        </div>
      </main>

  )
}

export default CreatePlan