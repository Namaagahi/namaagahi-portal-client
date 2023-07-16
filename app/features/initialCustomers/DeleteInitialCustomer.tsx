import { DeleteInitialCustomerProps } from '@/app/lib/interfaces'
import React from 'react'
import { useDeleteInitialCustomerMutation } from './initialCustomersApiSlice'
import Loading from '../loading/Loading'
import { toast } from 'react-toastify'

const DeleteInitialCustomer = (props: DeleteInitialCustomerProps) => {

    const { initialCustomer, handleModal } = props

    const [deleteInitialCustomer, {
        isLoading, 
    }] = useDeleteInitialCustomerMutation()

    const onDeleteInitialCustomerClick = async () => {
        const abc = await deleteInitialCustomer({ id: initialCustomer?.id })
        console.log("ABC", abc)
        handleModal()
        toast.success(`مشتری  ${initialCustomer?.name} با موفقیت حذف شد`)
    }

  if(isLoading) return <Loading/>

  return (
    <div className="flex items-center gap-6">
    <button
        onClick={onDeleteInitialCustomerClick}
        className="btn-confirm"
    >
        حذف مشتری اولیه
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

export default DeleteInitialCustomer