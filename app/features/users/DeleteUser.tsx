"use client"
import { useDeleteUserMutation } from "@/app/apiSlices/usersApiSlice"
import {  UserObject } from "@/app/lib/interfaces"
import { toast } from "react-toastify"
import dynamic from 'next/dynamic'
const Loading = dynamic(
  () => import('@/app/features/loading/Loading'),
  { ssr: false }
)

type Props = {
    user: UserObject 
    handleModal: () => void
  } 

const DeleteUser = (props: Props) => {

    const {
        user,
        handleModal
    } = props
    
    const [deleteUser, {
        isLoading,
        isSuccess,
    }] = useDeleteUserMutation()

    const onDeleteUserClick = async () => {

        const deleted = await deleteUser({ id: user?.id })

        handleModal()
        if(isSuccess) {
            toast.success(`کاربر ${user?.name} با موفقیت حذف شد`)
        }
    }

    if(isLoading) return <Loading/>

    return (
        <div className="flex items-center gap-6">
            <button
                onClick={onDeleteUserClick}
                className="deleteConfirmButton"
            >
                حذف
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

export default DeleteUser