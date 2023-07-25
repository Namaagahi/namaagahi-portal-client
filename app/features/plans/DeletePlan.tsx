import { DeletePlanProps } from '@/app/lib/interfaces'
import React from 'react'
import { useDeletePlanMutation } from './plansApiSlice'
import { toast } from 'react-toastify'
import Loading from '../loading/Loading'

const DeletePlan = (props: DeletePlanProps) => {

    const { plan, handleModal } = props
    const [deletePlan, {
        isLoading, 
    }] = useDeletePlanMutation()

    const onDeletePlanClick = async () => {
        await deletePlan({ id: plan?.id })
        handleModal()
        toast.success(`پلن  ${plan?.name} با موفقیت حذف شد`)
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