import { selectAllStructures, useUpdateStructureMutation } from '../../apiSlices/structuresApiSlice'
import { useGetAllInitialCustomersQuery } from '../../apiSlices/initialCustomersApiSlice'
import { EditPlanForm, PlanObject, UserObject } from '@/app/lib/interfaces'
import { useUpdatePlanMutation } from '../../apiSlices/plansApiSlice'
import { convertToNumber } from '@/app/utilities/convertToNumber'
import { selectUserById } from '../../apiSlices/usersApiSlice'
import { useFieldArray, useForm } from 'react-hook-form'
import PageTitle from '@/app/components/main/PageTitle'
import PlanStructuresInfo from './PlanStructuresInfo'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PlanBasicInfo from './PlanBasicInfo'
import useAuth from '@/app/hooks/useAuth'
import { useSelector } from 'react-redux'
import Loading from '../loading/Loading'
import { toast } from 'react-toastify'
import SearchContainer from '@/app/components/main/SearchContainer'

type Props = {
    plan: PlanObject
}

const EditPlanComp = (props: Props) => {
    
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
    const [chosenStructures, setChosenStructures] = useState([])
    
    const editPlanForm = useForm<EditPlanForm>({
        defaultValues: data,
        mode: 'onSubmit'
    })

    const {
        register,
        control,
        handleSubmit,
        formState: {errors},
        setValue,
        reset,
        watch
    } = editPlanForm

    const {
        fields,
        append: appendStructure,
        remove: removeStructure
    } = useFieldArray({
        control,
        name: "structures",
      }) 

      useEffect(() => {
        setTimeout(() => setData({
            name: plan?.name,
            initialCustomerId: plan?.initialCustomerId,
            brand: plan?.brand,
            status: plan?.status,
            structures: JSON.parse(JSON.stringify(plan?.structures))
          }), 3000)
    }, [])

      useEffect(() => {
        reset(data)
      }, [data, reset])
       
    const onSubmit = async(data: any) => {
        // if(data.status === 'done') {
        //     plan?.structures.forEach((str: any) => {
        //         structures.forEach(async(structure: any) => {
        //         if(structure.id === str.structureId) 
        //         await updateStructure({
        //             userId: structure?.userId,
        //             id: structure?.id,
        //             name: structure?.name,
        //             location: structure?.location,
        //             isChosen: structure?.isChosen,
        //             isAvailable: false,
        //             parent: structure?.parent
        //           })
        //         })
        //     })
        // }

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
            initialCustomerId: newData.initialCustomerId,
            brand: newData.brand,
            status: 'suggested',
            structures: newData.structures,
            finalCustomerId: ''
        })
    }


    if(isError) {
        'status' in error! && error.status === 409 && toast.error('این نام پلن قبلا ثبت شده است')
        'status' in error! && error.status === 400 && toast.error('همه فیلدها را تکمیل کنید')
    }
    
    if(isSuccess) {
        toast.success(`پلن ${plan.planId} با موفقیت ویرایش شد.`)
        push('/dashboard/billboard/plans')
    }

    const formVals = watch('structures')
    if(!plan) return <Loading />
    return (
        <main className="min-h-screen">
            <PageTitle name={`ویرایش پلن ${plan?.planId}`} />
            <SearchContainer />
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
                        formVals={formVals}
                        chosenStructures={chosenStructures} 
                        setChosenStructures={setChosenStructures}
                    />

                    <button className="primaryButton mx-auto w-1/3">
                        ویرایش پلن
                    </button>
                </form>
            </div>
        </main>
    )
}

export default EditPlanComp