import { useDeletePlanMutation } from '../../apiSlices/plansApiSlice'
import { DeletePlanProps } from '@/app/lib/interfaces'
import Loading from '../loading/Loading'
import { toast } from 'react-toastify'

const DeletePlan = (props: DeletePlanProps) => {

    const {
        plan,
        handleModal
    } = props
    
    const [deletePlan, {
        isLoading, 
    }] = useDeletePlanMutation()

    const onDeletePlanClick = async () => {
        if(plan.status !== 'suggested') {
            toast.error('فقط برای پلن های پیشنهادی امکان حذف وجود دارد.')
            handleModal()
        } else {
            await deletePlan({ id: plan?.id })
            handleModal()
            toast.success(`پلن  ${plan?.name} با موفقیت حذف شد`)
        }
    }

  if(isLoading) return <Loading/>
    
  return (
        <div className="flex items-center gap-6">
            <button
                onClick={onDeletePlanClick}
                className="btn-confirm"
            >
                حذف پلن
            </button>

            <button 
                onClick={handleModal}
                className="btn-cancel"
            >
            لغو
            </button>
        </div>
  )
}

export default DeletePlan