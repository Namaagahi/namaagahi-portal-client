import { useCreateNewFinalCustomerMutation } from '@/app/apiSlices/finalCustomerApiSlice'
import { useUpdatePlanMutation } from '@/app/apiSlices/plansApiSlice'
import CustomInput from '@/app/components/inputs/CustomInput'
import useAuth from '@/app/hooks/useAuth'
import { newFinalCustomerDefaultValues } from '@/app/lib/constants'
import { AddFinalCustomerForm, PlanObject } from '@/app/lib/interfaces'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

type Props = {
    plan: PlanObject
}

const FinalCustomerForm = (props: Props) => {

    const { plan } = props
    const { id } = useAuth()
    const { push } = useRouter()

    const [createNewFinalCustomer, {
        isSuccess,
        isError,
        error
    }] = useCreateNewFinalCustomerMutation()

    const [updatePlan] = useUpdatePlanMutation()

    const createFinalCustomerForm = useForm<AddFinalCustomerForm>({
        defaultValues: newFinalCustomerDefaultValues,
        mode: 'onSubmit'
      })

    const {
        control,
        handleSubmit,
        formState: {errors},
        setValue,
        watch
    } = createFinalCustomerForm

    const onSubmit = async(data: any) => {
        console.log("DATA", data)
        if(isError) {
            'status' in error! && error.status === 409 && toast.error('این کد اقتصادی قبلا ثبت شده است')
            'status' in error! && error.status === 400 && toast.error('فیلدهای مورد نیاز را تکمیل کنید')
        }

        const abc2 = await updatePlan({
            id: plan.id,
            planId: plan.planId,
            userId: plan.userId,
            username: plan.username,
            initialCustomerId: plan.initialCustomerId,
            brand: plan.brand,
            status: 'done',
            structures: plan.structures,
            finalCustomerId: data.finalCustomerId,
        })
        console.log("ABC2", abc2)
        console.log("PLAN", plan)
        
        const abc = await createNewFinalCustomer({
            finalCustomerId: data.finalCustomerId,
            userId: id,
            agentName: data.agentName,
            companyName: data.companyName,
            post: data.post,
            ecoCode: parseFloat(data.ecoCode),
            regNum: parseFloat(data.regNum),
            nationalId: parseFloat(data.nationalId),
            address: data.address,
            phone: parseFloat(data.phone),
            postalCode: parseFloat(data.postalCode)
        })
        console.log("ABC", abc)
    }

    if(isSuccess) {
        toast.success(`مشتری جدید با موفقیت ساخته شد.`)
        push('/dashboard/billboard/plans')
      }

    const customInputs = [
        {
            id: 1,
            label: "نام نماینده",
            name: 'agentName',
            type:'text',
            required: false,
            errors: undefined
        },
        {
            id: 2,
            label: "پست سازمانی",
            name: 'post',
            type:'text',
            required: false,
            errors: undefined
        },
        {
            id: 3,
            label: "نام شرکت",
            name: 'companyName',
            type:'text',
            required: true,
            errors: (errors.companyName?.message)
        },
        {
            id: 4,
            label: "کد اقتصادی",
            name: 'ecoCode',
            type:'number',
            required: false,
            errors: undefined
        },
        {
            id: 5,
            label: "شماره ثبت",
            name: 'regNum',
            type:'number',
            required: false,
            errors: undefined
        },
        {
            id: 6,
            label: "شناسه ملی",
            name: 'nationalId',
            type:'number',
            required: false,
            errors: undefined
        },
        {
            id: 7,
            label: "آدرس",
            name: 'address',
            type:'text',
            required: false,
            errors: undefined
        },
        {
            id: 8,
            label: "کد پستی",
            name: 'postalCode',
            type:'number',
            required: false,
            errors: undefined
        },
        {
            id: 9,
            label: "تلفن",
            name: 'phone',
            type:'number',
            required: false,
            errors: undefined
        },
    ]
// console.log("VALUES", createFinalCustomerForm.getValues())
  return (
    <div className='w-full h-full bg-teal-200 dark:bg-neutral-300 p-2 rounded-lg text-gray-700 mt-5 flex flex-col items-start justify-center'>
        <p>مشتری نهایی</p>
        <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className='w-full flex flex-col gap-9 justify-center mt-2'
        >
            <div className='relative grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 p-2 xl:grid-cols-6 2xl:grid-cols-6 gap-4 lg:gap-2'>
                    {
                        customInputs.map((customInput) => {
                            return (
                                    <CustomInput
                                        control={control}
                                        name={customInput.name}
                                        label={customInput.label}
                                        type={customInput.type}
                                        required={customInput.required}
                                        errors={customInput.errors!!}
                                    />
                                    )
                                })
                            }
                            </div>
            <button className='btn-primary'>ثبت مشتری نهایی و تایید پلن</button>
        </form>
    </div>
  )
}

export default FinalCustomerForm