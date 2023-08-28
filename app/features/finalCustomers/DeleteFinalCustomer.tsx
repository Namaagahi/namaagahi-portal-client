import { FinalCustomerObject } from '@/app/lib/interfaces'
import Loading from '../loading/Loading'
import { toast } from 'react-toastify'
import { useDeleteFinalCustomerMutation } from '@/app/apiSlices/finalCustomerApiSlice'

type Props = {
    finalCustomer: FinalCustomerObject
    handleModal: () => void
  }

const DeleteFinalCustomer = (props: Props) => {

    const {
        finalCustomer,
        handleModal
    } = props

    const [deleteFinalCustomer, {
        isLoading, 
    }] = useDeleteFinalCustomerMutation()

    const onDeleteFinallCustomerClick = async () => {
        const abc = await deleteFinalCustomer({ id: finalCustomer?.id })
        // console.log('abc', abc)
        handleModal()
        toast.success(`مشتری  ${finalCustomer?.companyName} با موفقیت حذف شد`)
    }

    if(isLoading) return <Loading/>

    return (
        <div className="flex items-center gap-6">
            <button
                onClick={onDeleteFinallCustomerClick}
                className="btn-confirm"
            >
                حذف مشتری نهایی
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

export default DeleteFinalCustomer