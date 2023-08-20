import { selectAllFinalCustomers, useCreateNewFinalCustomerMutation, useGetAllFinalCustomersQuery } from '@/app/apiSlices/finalCustomerApiSlice'
import { AddFinalCustomerForm, FinalCustomerObject, PlanObject } from '@/app/lib/interfaces'
import { useUpdatePlanMutation } from '@/app/apiSlices/plansApiSlice'
import { newFinalCustomerDefaultValues } from '@/app/lib/constants'
import CustomInput from '@/app/components/inputs/CustomInput'
import { useRouter } from 'next/navigation'
import useAuth from '@/app/hooks/useAuth'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import React, { useState } from 'react'
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

    useGetAllFinalCustomersQuery(undefined, {
        refetchOnFocus: false,
        refetchOnMountOrArgChange: false
    })

    const [updatePlan] = useUpdatePlanMutation()

    const allFinalCustomers: FinalCustomerObject[] = useSelector(state => selectAllFinalCustomers(state) as FinalCustomerObject[]) 

    const createFinalCustomerForm = useForm<AddFinalCustomerForm>({
        defaultValues: newFinalCustomerDefaultValues,
        mode: 'onSubmit'
      })

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = createFinalCustomerForm

    const onSubmit = async(data: any) => {
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
            finalCustomerId: isDisabled ? data.finalCustomerId : data.finalCustomerId,
        })
    }

    if(isSuccess) {
        toast.success(`مشتری جدید با موفقیت ساخته شد.`)
        push('/dashboard/billboard/plans')
      }

    const [isDisabled, setIsDisabled] = useState<boolean>(false)
    const [customerId, setCustomerId] = useState<string>('')

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
            message: 'نام شرکت الزامیست',
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

    return (
    <div className='w-full h-full bg-teal-200 dark:bg-neutral-300 p-2 rounded-lg text-gray-700 mt-5 flex flex-col items-start justify-center'>
        <p>
            مشتری نهایی
        </p>
        <div className="flex items-center gap-3">
            <label htmlFor="chooseCustomer">
                انتخاب از مشتریان قبلی
            </label>

            <input
                type='checkbox'
                id='chooseCustomer'
                onChange={() => setIsDisabled(!isDisabled)}
                className='mt-1 p-3 w-4 h-4 text-blue-600 bg-gray-100 outline-none border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
            />
            {
                isDisabled &&
                <select className='p-4 rounded-[50px] bg-white outline-none'>
                    <option value="" disabled hidden>
                        انتخاب
                    </option>

                    {allFinalCustomers.map((finalCustomer, index) => {
                        return(
                            <option key={finalCustomer.id} value={finalCustomer.id} className='text-black'>
                                {finalCustomer.companyName}
                            </option>
                        )
                    })}

                </select>
            }
        </div>

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
                                        message={customInput.message && customInput.message}
                                        errors={customInput.errors && customInput.errors}
                                        disabled={isDisabled}
                                    />
                                    )
                                })
                            }
                            </div>
            <button className='btn-primary'>
                ثبت مشتری نهایی و تایید پلن
            </button>
        </form>
    </div>
  )
}

export default FinalCustomerForm