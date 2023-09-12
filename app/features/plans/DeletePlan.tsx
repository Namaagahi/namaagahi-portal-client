import { useDeletePlanMutation } from '../../apiSlices/plansApiSlice'
import { PlanObject } from '@/app/lib/interfaces'
import Loading from '../loading/Loading'
import { toast } from 'react-toastify'

type Props = {
    plan: PlanObject
    handleModal: () => void
  }

const DeletePlan = (props: Props) => {

    const {
        plan,
        handleModal
    } = props
    
    const [deletePlan, {
        isLoading, 
    }] = useDeletePlanMutation()

    const onDeletePlanClick = async () => {
        if(plan.status === 'suggested' || plan.status === 'pending') {
            await deletePlan({ id: plan?.id })
            handleModal()
            toast.success(`پلن  ${plan?.planId} با موفقیت حذف شد`)
        } else {
            toast.error('فقط برای پلن های پیشنهادی یا معلق امکان حذف وجود دارد.')
            handleModal()
        }
    }

  if(isLoading) return <Loading/>
    
  return (
        <div className="flex items-center gap-6">
            <button
                onClick={onDeletePlanClick}
                className="deleteConfirmButton"
            >
                حذف پلن
            </button>

            <button 
                onClick={handleModal}
                className="cancelButton"
            >
            لغو
            </button>
        </div>
  )
}

export default DeletePlan