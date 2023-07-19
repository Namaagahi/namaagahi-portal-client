"use client"
import PageTitle from '@/app/components/main/PageTitle'
import BasicPlanInfoSection from '@/app/features/plans/BasicPlanInfoSection'
import PlanStructuresFormSection from '@/app/features/plans/PlanStructuresFormSection'
import useAuth from '@/app/hooks/useAuth'
import { newPlanDefaultValues } from '@/app/lib/constants'
import { AddPlanForm } from '@/app/lib/interfaces'
import React, { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

const CreatePlan = () => {

  const { id } = useAuth()  
  const [discountType, setDiscountType] = useState('percentage')

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

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
      <main className="min-h-screen">
        <PageTitle name={'ایجاد پلن جدید'} />
        <div className='flex flex-col gap-9 justify-center'>
        <form
          noValidate
          // onChange={handleSubmit(onSubmit)}
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