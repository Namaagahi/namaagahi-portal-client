import { selectAllFinalCustomers, useCreateNewFinalCustomerMutation, useGetAllFinalCustomersQuery, useUpdateFinalCustomerMutation } from '@/app/apiSlices/finalCustomerApiSlice'
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

    const [updateFinalCustomer, {
        isLoading,
        isSuccess: isEditSuccess,
        isError: isEditError,
        error: editError
    }] = useUpdateFinalCustomerMutation()

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
    const finalCustomer = allFinalCustomers.find((finalCustomer: FinalCustomerObject) => finalCustomer.finalCustomerId === customerId) as FinalCustomerObject
    
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
            const abc1 = await createNewFinalCustomer({
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
                planId: plan._id
            })

             const abc2 = await updatePlan({
                id: plan.id,
                planId: plan.planId,
                userId: plan.userId,
                username: plan.username,
                initialCustomerId: plan.initialCustomerId,
                brand: plan.brand,
                status: 'done',
                structures: plan.structures,
                finalCustomerId: data.finalCustomerId ,
            })

            console.log("ABC1", abc1, "ABC2", abc2)

            if(isError) {
                'status' in error! && error.status === 409 && toast.error('این شناسه / کد ملی قبلا ثبت شده است')
                'status' in error! && error.status === 400 && toast.error('فیلدهای مورد نیاز را تکمیل کنید')
            }
        } else {
            const abc3 = await updateFinalCustomer({
                id: finalCustomer?.id,
                finalCustomerId: finalCustomer?.finalCustomerId,
                userId: id,
                username: finalCustomer?.username,
                name: finalCustomer?.name,
                nationalId: finalCustomer?.nationalId,
                ecoCode: finalCustomer?.ecoCode,
                agent: finalCustomer?.agent,
                contractType: finalCustomer?.contractType,
                customerType: finalCustomer?.customerType,
                regNum: finalCustomer?.regNum,
                address: data.address,
                phone: finalCustomer?.phone,
                postalCode: finalCustomer?.postalCode,
                planId: plan._id,
                planIds: finalCustomer?.planIds
            })

            const abc4 = await updatePlan({
                id: plan.id,
                planId: plan.planId,
                userId: plan.userId,
                username: plan.username,
                initialCustomerId: plan.initialCustomerId,
                brand: plan.brand,
                status: 'done',
                structures: plan.structures,
                finalCustomerId: finalCustomer?.finalCustomerId ,
            })
            console.log("ABC3", abc3, "ABC4", abc4)
        }
    }

    if(isSuccess) {
        toast.success(`مشتری جدید با موفقیت ساخته شد.`)
        // push('/dashboard/billboard/plans')
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
            isHidden: customerType === 'personal' && true
        },
        {
            id: 4,
            label: "شماره ثبت",
            name: 'regNum',
            type:'number',
            required: false,
            errors: undefined,
            isHidden: customerType === 'personal' && true
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
    // console.log("iS error", isError)
    // console.log("finalCustomer", finalCustomer)
    return (
        <div className='w-full h-full bg-secondary dark:bg-darkModeBg p-2 text-gray-700 mt-5 flex flex-col items-start justify-center'>
            <p className='dark:text-gray-200'>
                مشتری نهایی
            </p>

            <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className='w-full flex flex-col gap-9 justify-center mt-2'
            >
                <div className="flex items-center gap-3">
                    <label htmlFor="chooseCustomer" className='dark:text-gray-200'>
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
                            className='formInput'
                            onChange={(e) => setCustomerId(e.target.value)}
                        >
                            <option value="" >
                                انتخاب
                            </option>

                            {allFinalCustomers.map((finalCustomer, index) => {
                                return(
                                    <option 
                                        key={finalCustomer.finalCustomerId} 
                                        value={finalCustomer.finalCustomerId} 
                                        className='text-black'
                                    >
                                        {finalCustomer.name}
                                    </option>
                                )
                            })}
                        </select>
                    }
                </div>
                
                {
                    !isDisabled &&
                        <FinalCustomerTypes 
                            contractType={contractType}
                            setContractType={setContractType}
                            customerType={customerType}
                            setCustomerType={setCustomerType}
                        />
                }

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
                                    isHidden={customInput.isHidden}
                                    className={`${isDisabled ? "bg-gray-400" :"bg-white"} formInput`}
                                    autoComplete={'off'}
                                />
                            )
                        })
                    }

                    {
                        (contractType === 'legal' || customerType === 'legal') && !isDisabled &&
                            <Agents
                                agentField={agentField}
                                control={control}
                                isDisabled={isDisabled}
                                appendAgent={appendAgent}
                                removeAgent={removeAgent}
                            />
                    }
                </div>

                <button className='primaryButton hover:text-black w-1/3 mx-auto' >
                    ثبت مشتری نهایی و تایید پلن
                </button>
            </form>
        </div>
  )
}

export default FinalCustomerForm