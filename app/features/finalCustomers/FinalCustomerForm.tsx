import { selectAllFinalCustomers, useCreateNewFinalCustomerMutation, useGetAllFinalCustomersQuery } from '@/app/apiSlices/finalCustomerApiSlice'
import { AddFinalCustomerForm, FinalCustomerObject, PlanObject } from '@/app/lib/interfaces'
import { useUpdatePlanMutation } from '@/app/apiSlices/plansApiSlice'
import { newFinalCustomerDefaultValues } from '@/app/lib/constants'
import CustomInput from '@/app/components/inputs/CustomInput'
import { useFieldArray, useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuth from '@/app/hooks/useAuth'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Agents from './Agents'
import FinalCustomerTypes from './FinalCustomerTypes'

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

    const [isDisabled, setIsDisabled] = useState<boolean>(false)
    const [customerId, setCustomerId] = useState<string>('')
    const [contractType, setContractType] = useState('official')
    const [customerType, setCustomerType] = useState('legal')
    const finalCustomer = allFinalCustomers.find((finalCustomer: FinalCustomerObject) => finalCustomer.finalCustomerId === plan.finalCustomerId) as FinalCustomerObject
    
    useEffect(() => {
        if(isDisabled) {
            setValue('name', finalCustomer?.name)
            setValue('nationalId', finalCustomer?.nationalId.toString())
        }
    },[finalCustomer, isDisabled])

    const createFinalCustomerForm = useForm<AddFinalCustomerForm>({
        defaultValues: newFinalCustomerDefaultValues,
        mode: 'onSubmit'
      })

    const {
        control,
        setValue,
        handleSubmit,
        formState: {errors},
    } = createFinalCustomerForm

    const {
        fields: agentField,
        append: appendAgent,
        remove: removeAgent
      } = useFieldArray({
        control,
        name: "agent",
      })

    const onSubmit = async(data: any) => {
        if(!isDisabled) {
            const abc = await createNewFinalCustomer({
                finalCustomerId: data.finalCustomerId,
                userId: id,
                name: data.name,
                contractType: contractType, 
                customerType: customerType,
                agent: data.agent,
                nationalId: parseFloat(data.nationalId),
                ecoCode: parseFloat(data.ecoCode),
                regNum: parseFloat(data.regNum),
                address: data.address,
                postalCode: parseFloat(data.postalCode),
                phone: parseFloat(data.phone),
            })
            console.log("ABC", abc)
            
            // const abc2 = await updatePlan({
            //     id: plan.id,
            //     planId: plan.planId,
            //     userId: plan.userId,
            //     username: plan.username,
            //     initialCustomerId: plan.initialCustomerId,
            //     brand: plan.brand,
            //     status: 'done',
            //     structures: plan.structures,
            //     finalCustomerId: data.finalCustomerId ,
            // })
            if(isError) {
                'status' in error! && error.status === 409 && toast.error('این شناسه / کد ملی قبلا ثبت شده است')
                'status' in error! && error.status === 400 && toast.error('فیلدهای مورد نیاز را تکمیل کنید')
            }
        } 
    }

    // const handleUpdatePlan = async() => {
    //     if(!customerId) {
    //         toast.error("مشتری را انتخاب کنید")
    //     } else {
    //         const abc3 = await updatePlan({
    //             id: plan.id,
    //             planId: plan.planId,
    //             userId: plan.userId,
    //             username: plan.username,
    //             initialCustomerId: plan.initialCustomerId,
    //             brand: plan.brand,
    //             status: 'done',
    //             structures: plan.structures,
    //             finalCustomerId: customerId,
    //         })
    //     }
    // }

    if(isSuccess) {
        toast.success(`مشتری جدید با موفقیت ساخته شد.`)
        push('/dashboard/billboard/plans')
    }

    const customInputs = [
        {
            id: 1,
            label: "نام شرکت / شخص",
            name: 'name',
            type:'text',
            required: true,
            message: 'نام شرکت / شخص الزامیست',
            errors:  (errors.name?.message),
        },
        {
            id: 2,
            label: "شناسه / کد ملی",
            name: 'nationalId',
            type:'number',
            required: true,
            message: 'شناسه / کد ملی الزامیست',
            errors: (errors.nationalId?.message),
        },
        {
            id: 3,
            label: "کد اقتصادی",
            name: 'ecoCode',
            type:'number',
            required: false,
            errors: undefined,
        },
        {
            id: 4,
            label: "شماره ثبت",
            name: 'regNum',
            type:'number',
            required: false,
            errors: undefined,
        },
        {
            id: 5,
            label: "آدرس",
            name: 'address',
            type:'text',
            required: false,
            errors: undefined,
        },
        {
            id: 6,
            label: "کد پستی",
            name: 'postalCode',
            type:'number',
            required: false,
            errors: undefined,
        },
        {
            id: 7,
            label: "تلفن",
            name: 'phone',
            type:'number',
            required: false,
            errors: undefined,
        },
    ]
    console.log("iS error", isError)
    return (
        <div className='w-full h-full bg-teal-200 dark:bg-neutral-300 p-2 rounded-lg text-gray-700 mt-5 flex flex-col items-start justify-center'>
            <p>
                مشتری نهایی
            </p>

            <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className='w-full flex flex-col gap-9 justify-center mt-2'
            >
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
                        <select 
                            className='p-4 rounded-[50px] bg-white outline-none'
                            onChange={(e) => setCustomerId(e.target.value)}
                        >
                            <option value="" >
                                انتخاب
                            </option>

                            {allFinalCustomers.map((finalCustomer, index) => {
                                return(
                                    <option key={finalCustomer.finalCustomerId} value={finalCustomer.finalCustomerId} className='text-black'>
                                        {finalCustomer.name}
                                    </option>
                                )
                            })}
                        </select>
                    }
                </div>
                {/* <div className='flex items-center gap-5 w-1/3 justify-between'>
                    <div className='flex items-center gap-3'>
                        <div className='flex items-center gap-1'>
                            <input
                                type="radio"
                                id="official"
                                name="contractType"
                                value="official"
                                checked={contractType === 'official'}
                                onChange={() => setContractType('official')}
                            />
                            <label htmlFor="official">
                                رسمی
                            </label>
                        </div>
                        <div className='flex items-center gap-1'>
                            <input
                                type="radio"
                                id="unofficial"
                                name="contractType"
                                value="unofficial"
                                checked={contractType === 'unofficial'}
                                onChange={() => setContractType('unofficial')}
                            />
                            <label htmlFor="unofficial">
                                غیر رسمی
                            </label>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='flex items-center gap-1'>
                            <input
                                type="radio"
                                id="legal"
                                name="customerType"
                                value="legal"
                                checked={customerType === 'legal'}
                                onChange={() => setCustomerType('legal')}
                            />
                            <label htmlFor="legal">
                                حقوقی
                            </label>
                        </div>
                        <div className='flex items-center gap-1'>
                            <input
                                type="radio"
                                id="personal"
                                name="customerType"
                                value="personal"
                                checked={customerType === 'personal'}
                                onChange={() => setCustomerType('personal')}
                            />
                            <label htmlFor="personal">
                                حقیقی
                            </label>
                        </div>
                    </div>
                </div> */}
                <FinalCustomerTypes 
                    contractType={contractType}
                    setContractType={setContractType}
                    customerType={customerType}
                    setCustomerType={setCustomerType}
                />
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
                                    className={`${isDisabled ? "bg-gray-400" :"bg-white"} p-4 rounded-[50px] outline-none`}
                                    autoComplete={'off'}
                                />
                            )
                        })
                    }
                    <Agents
                        agentField={agentField}
                        control={control}
                        isDisabled={isDisabled}
                        appendAgent={appendAgent}
                        removeAgent={removeAgent}
                    />
                </div>

                <button className='btn-primary' >
                    ثبت مشتری نهایی و تایید پلن
                </button>
            </form>
        </div>
  )
}

export default FinalCustomerForm