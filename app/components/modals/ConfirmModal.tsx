import { useDeleteUserMutation } from "@/app/features/users/usersApiSlice"
import { UserObject } from "@/app/lib/interfaces"
import DeleteModalContent from "../main/DeleteModalContent"

const ConfirmModal = ({type, prop, handleModal}: {type: string, prop: UserObject, handleModal: () => void}) => {

  return (
    <div className="fixed top-[50%] left-[50%] flex flex-col justify-center items-center">
      <div onClick={handleModal} className="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-70 z-[1000]"></div>
      <div className="fixed flex flex-col justify-center items-center w-[80%] lg:w-[33%] min-h-[30%] bg-white dark:bg-gray-800 rounded-3xl z-[1000]">
        {
            type === 'delete' ? 
            <DeleteModalContent handleModal={handleModal} user={prop}/>
            : <p>logout</p>
        }
      </div>     
    </div>
  )
}

export default ConfirmModal