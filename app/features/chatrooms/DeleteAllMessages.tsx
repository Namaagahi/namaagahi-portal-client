import { useDeleteChatroomMessagesMutation } from '@/app/apiSlices/messagesApiSlice'
import React from 'react'
import { toast } from 'react-toastify'

type Props = {
    chatroomId: string
    handleModal: () => void
}

const DeleteAllMessages = (props: Props) => {

    const {
        chatroomId,
        handleModal
    } = props

    const [deleteChatroomMessages, {
        isLoading, 
    }] = useDeleteChatroomMessagesMutation()

    const onDeleteAllMessagesClick = async () => {
        const abc = await deleteChatroomMessages({ chatroomId})
        handleModal()
        window.location.assign(`/dashboard/chatrooms/${chatroomId}`)
        toast.success(`پیام های چت روم با موفقیت حذف شد`)
    }

    return (
        <div className="flex items-center gap-6">
                <button
                    onClick={onDeleteAllMessagesClick}
                    className="deleteConfirmButton"
                >
                    حذف تمامی پیام ها
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

export default DeleteAllMessages