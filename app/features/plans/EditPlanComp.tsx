import useAuth from '@/app/hooks/useAuth'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useUpdatePlanMutation } from '../../apiSlices/plansApiSlice'
import { selectInitialCustomerById, useGetAllInitialCustomersQuery } from '../../apiSlices/initialCustomersApiSlice'
import { selectAllStructures, useUpdateStructureMutation } from '../../apiSlices/structuresApiSlice'
import { EditPlanForm, InitialCustomerObject, UserObject } from '@/app/lib/interfaces'
import { useSelector } from 'react-redux'
import { selectUserById } from '../../apiSlices/usersApiSlice'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Loading from '../loading/Loading'
import PageTitle from '@/app/components/main/PageTitle'
import PlanBasicInfo from './PlanBasicInfo'
import PlanStructuresInfo from './PlanStructuresInfo'

const EditPlanComp = (props: any) => {
    
    const { plan } = props
    const { id: currentUserId } = useAuth()
    const { push } = useRouter()
    
    
    useGetAllInitialCustomersQuery(undefined, { 
        refetchOnFocus: false,
        refetchOnMountOrArgChange: false
    })

    const [updateStructure] = useUpdateStructureMutation()
    
    const [updatePlan, { 
        isSuccess, 
        isError,
        error
    }] = useUpdatePlanMutation()
    
    const user: UserObject | any = useSelector(state => selectUserById(state as UserObject , currentUserId))
    const structures = useSelector(state => selectAllStructures(state))
    
    const planStructures: any = plan?.structures.map((structure: any) => ({
        discountFee: structure?.discountFee,
        discountType: structure?.discountType,
        duration: {
            sellStart: structure?.duration.sellStart,
            sellEnd: structure?.duration.sellEnd,
            diff: structure?.duration.diff
        },
        monthlyFee: structure?.monthlyFee,
        monthlyFeeWithDiscount: structure?.monthlyFeeWithDiscount,
        structureId: structure?.structureId,
        structureRecord: structure?.structureRecord
    }))

    const [discountType, setDiscountType] = useState(planStructures[0]?.discountType)
    const [data, setData] = useState<any>(null)
    
    const editPlanForm = useForm<EditPlanForm>({
        defaultValues: data,
        mode: 'onSubmit'
      })

    const { register, control, handleSubmit, formState: {errors}, getValues, setValue, reset, watch } = editPlanForm

    const { fields, append: appendStructure, remove: removeStructure } = useFieldArray({
        control,
        name: "structures",
      })

      useEffect(() => {
        setTimeout(() => setData({
            name: plan?.name,
            customerName: plan?.customerName,
            brand: plan?.brand,
            status: plan?.status,
            structures: JSON.parse(JSON.stringify(plan?.structures))
          }), 1000);
    }, [])

      useEffect(() => {
        reset(data)
      }, [data, reset])

    function convertToNumber(value: string | null): any { 
        const cleanedValue = value!.replace(/,/g, '')
        const parsedValue = parseFloat(cleanedValue)
    
        if (isNaN(parsedValue)) {
        return null
        }
        return parsedValue;
    }
      
    const onSubmit = async(data: any) => {
        if(data.status === 'done') {
            plan?.structures.forEach((str: any) => {
                structures.forEach(async(structure: any) => {
                if(structure.id === str.structureId) 
                await updateStructure({
                    userId: structure?.userId,
                    id: structure?.id,
                    name: structure?.name,
                    location: structure?.location,
                    isChosen: structure?.isChosen,
                    isAvailable: false,
                    parent: structure?.parent
                  })
                })
            })
        }

        const newData = {
            ...data, 
            structures: data.structures.map((structure: any) => ({
              ...structure,
              monthlyFee: convertToNumber(structure.monthlyFee),
              monthlyFeeWithDiscount: convertToNumber(structure.monthlyFeeWithDiscount),
              discountType: discountType,
              structureRecord: structure.structureRecord
            }))
          }
        
        const abc =await updatePlan({
            id:plan?.id,
            planId: plan?.planId,
            userId: currentUserId,
            username: plan?.username,
            name: newData.name,
            customerName: newData.customerName,
            brand: newData.brand,
            status: newData.status,
            structures: newData.structures
        })
    }


    if(isError) {
        'status' in error! && error.status === 409 && toast.error('این نام پلن قبلا ثبت شده است')
        'status' in error! && error.status === 400 && toast.error('همه فیلدها را تکمیل کنید')
    }
    
    if(isSuccess) {
        toast.success(`پلن ${plan.name} با موفقیت ویرایش شد.`)
        push('/dashboard/billboard/plans')
    }
// console.log("plan", plan)
console.log("editPlanForm", editPlanForm.getValues())
// console.log("planStructures", planStructures)
    if(!plan) return <Loading />

    return (
        <main className="min-h-screen">
            <PageTitle name={`ویرایش پلن ${plan?.name}`} />
            <div className='flex flex-col gap-9 justify-center'>
                <form 
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    className='w-full flex flex-col gap-9 justify-center'
                >
                    <PlanBasicInfo 
                        page={'edit'}
                        control={control} 
                        plan={plan}
                        errors={errors}
                    />

                    <PlanStructuresInfo
                        page={'edit'}
                        control={control}
                        plan={plan}
                        errors={errors}
                        discountType={discountType}
                        convertToNumber={convertToNumber}
                        handleDiscountType={(val: string) => setDiscountType(val)}
                        setValue={setValue}
                        field={fields}
                        appendStructure={appendStructure}
                        removeStructure={removeStructure}
                        watch={watch}
                        register={register}
                    />

                    <button className="btn-primary">ویرایش پلن</button>
                </form>
            </div>
        </main>
    )
}

export default EditPlanComp