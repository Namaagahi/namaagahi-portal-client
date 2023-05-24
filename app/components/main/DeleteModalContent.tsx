import DeleteNote from "@/app/features/note/DeleteNote"
import DeleteUser from "@/app/features/users/DeleteUser"
import { DeleteModalContentProps } from "@/app/lib/interfaces"
import { AiOutlineClose } from 'react-icons/ai'

const DeleteModalContent = (props: DeleteModalContentProps) => {

    const { handleModal, prop, deleteType } = props

    return (
        <div className="confirm-modal-content">
            <div className="flex justify-between items-center">
                <p className="md:text-2xl text-xl font-bold">تایید حذف</p>
                <AiOutlineClose className="cursor-pointer text-xl hover:text-2xl transition-all" onClick={handleModal}/>
            </div>

            <div className="flex flex-col py-12">
                <div className="py-7 border-[1px] border-x-transparent border-y-[#FA9E93]">
                    <p className="text-xl">آیا از انجام این کار مطمئن هستید؟ این عمل برگشت پذیر نخواهد بود.</p>
                </div>
            </div>
            {
                deleteType === 'user'?
                <DeleteUser
                    user={prop}
                    handleModal={handleModal}
                />
                :
                <DeleteNote
                    note={prop}
                    handleModal={handleModal}
                />
            }
        </div>
    )
}

export default DeleteModalContent