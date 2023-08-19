import { useUpdatePlanMutation } from '@/app/apiSlices/plansApiSlice'
import { selectAllInitialCustomers, useGetAllInitialCustomersQuery } from '../../apiSlices/initialCustomersApiSlice'
import CustomInput from '@/app/components/inputs/CustomInput'
import SelectInput from '@/app/components/inputs/SelectInput'
import useAuth from '@/app/hooks/useAuth'
import { AddPlanForm, EditPlanForm, PlanObject } from '@/app/lib/interfaces'
import { Control, FieldErrors } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

type Props = {
    page: string
    control: Control<EditPlanForm, any> | Control<AddPlanForm, any>
    errors: FieldErrors<EditPlanForm>
    plan?: PlanObject
}

const PlanBasicInfo = (props: Props) => {

    const {
        page,
        control,
        errors,
        plan
    } = props

    const { isAdmin, isMediaManager } = useAuth()
    const { push } = useRouter()

    const [updatePlan] = useUpdatePlanMutation()
    
    useGetAllInitialCustomersQuery(undefined, {
        refetchOnFocus: false,
        refetchOnMountOrArgChange: false 
    })

    const allInitialCustomers = useSelector(state => selectAllInitialCustomers(state))

    const handleSuspendPlan = async() => {
        await updatePlan({
            id: plan?.id,
            planId: plan?.planId,
            userId: plan?.userId,
            username: plan?.username,
            initialCustomerId: plan?.initialCustomerId,
            brand: plan?.brand,
            status: 'pending',
            structures: plan?.structures,
            finalCustomerId: plan?.finalCustomerId,
        })
        toast.success(`پلن ${plan?.planId} معلق شد.`)
        push('/dashboard/billboard/plans')
    }
console.log("PLAN", plan) 
    return (
        <div className='flex flex-col gap-8 items-start w-full p-8 bg-bgform rounded-[30px] text-black'>
            <small className="pr-3 text-slate-500 inline-block font-bold">اطلاعات پایه</small>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 items-center">
                <SelectInput
                    control={control}
                    name={'initialCustomerId'}
                    label={'نام مشتری'}
                    required={true}
                    errors={errors.initialCustomerId?.message}
                    options={allInitialCustomers}
                />
                <CustomInput 
                    control={control}
                    name={'brand'}
                    label={'برند'}
                    errors={errors.brand?.message}
                    required={true}
                    type={'text'}
                />
                {
                    page === 'edit' && (isAdmin || isMediaManager) && plan?.status === 'done' && 
                    <button
                        className='btn-primary'
                        onClick={handleSuspendPlan}
                     >
                        تعلیق پلن
                    </button>
                }
            </div>
        </div>
    )
}

export default PlanBasicInfo