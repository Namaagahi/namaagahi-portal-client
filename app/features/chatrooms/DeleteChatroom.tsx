import { useDeleteChatroomMutation } from "@/app/apiSlices/chatroomsApiSlice"
import { ChatroomObject } from "@/app/lib/interfaces"
import { toast } from "react-toastify"
import Loading from "../loading/Loading"

type Props = {
    chatroom: ChatroomObject
    handleModal: () => void
}

const DeleteChatroom = (props: Props) => {

  const {
      chatroom,
      handleModal
  } = props

  const [deleteChatroom, {
      isLoading,
  }] = useDeleteChatroomMutation()

  const onDeleteChatroomClick = async () => {
      const abc = await deleteChatroom({ id: chatroom?.id })
      handleModal()
      toast.success(`روم  ${chatroom?.name} با موفقیت حذف شد`)
  }

  if(isLoading) return <Loading/>

  return (
    <div className="flex items-center gap-6">
        <button
            onClick={onDeleteChatroomClick}
            className="deleteConfirmButton"
        >
            حذف چت روم
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

export default DeleteChatroom
