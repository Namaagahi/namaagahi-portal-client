import { InitialCustomerObject } from '@/app/lib/interfaces'
import React from 'react'
import { useDeleteInitialCustomerMutation } from '../../apiSlices/initialCustomersApiSlice'
import Loading from '../loading/Loading'
import { toast } from 'react-toastify'

type Props = {
  initialCustomer: InitialCustomerObject 
  handleModal: () => void
}

const DeleteInitialCustomer = (props: Props) => {

    const {
      initialCustomer,
      handleModal
    } = props

    const [deleteInitialCustomer, {
        isLoading, 
    }] = useDeleteInitialCustomerMutation()

    const onDeleteInitialCustomerClick = async () => {
        const abc = await deleteInitialCustomer({ id: initialCustomer?.id })
        // console.log('abc', abc)
        handleModal()
        toast.success(`مشتری  ${initialCustomer?.name} با موفقیت حذف شد`)
    }

  if(isLoading) return <Loading/>

  return (
    <div className="flex items-center gap-6">
      <button
          onClick={onDeleteInitialCustomerClick}
          className="deleteConfirmButton"
      >
          حذف مشتری اولیه
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

export default DeleteInitialCustomer