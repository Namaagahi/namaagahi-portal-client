"use client"
import { useDeleteUserMutation } from "@/app/features/users/usersApiSlice"
import {  DeleteUserProps } from "@/app/lib/interfaces"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import dynamic from 'next/dynamic'
const Loading = dynamic(
  () => import('@/app/features/loading/Loading'),
  { ssr: false }
)

const DeleteUser = (props: DeleteUserProps) => {

    const { user, handleModal } = props
    
    const [deleteUser, {
        isLoading,
        isError,
        isSuccess,
        error
    }] = useDeleteUserMutation()

    const onDeleteUserClick = async () => {

        const deleted = await deleteUser({ id: user?.id })
        // if(deleted.error) {
        //     deleted.error.data.message === "BAD REQUEST : User has assigned notes"  && toast.error('این کاربر وظایف انجام نشده دارد!')
        //     handleModal()
        // }
        
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
                className="btn-confirm"
            >
                حذف
            </button>

            <button 
                onClick={handleModal}
                className="btn-cancel"
            >لغو</button>
        </div>
    )
}

export default DeleteUser