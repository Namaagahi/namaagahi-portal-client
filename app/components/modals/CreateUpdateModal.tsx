import { CreateUpdateModalProps } from "@/app/lib/interfaces"
import NewUserForm from "@/app/features/users/NewUserForm"
import EditUser from "@/app/features/users/EditUser"
import EditNote from "@/app/features/note/EditNote"
import NewNote from "@/app/features/note/NewNote"

const CreateUpdateModal = (props: CreateUpdateModalProps) => {

  const { handleModal, type, prop } = props
  
  return (
    <div className="modal-container">
      <div onClick={handleModal} className="backdrop-container"></div>
      <div className="create-update-modal-content-container">
        { 
          type === 'newUser' ? 
            <NewUserForm handleModal={handleModal} />
              : type === 'editUser'? 
                <EditUser handleModal={handleModal} user={prop} />
                : type === 'newTask'? 
                <NewNote handleModal={handleModal} />
                : type === 'editTask'? 
                <EditNote handleModal={handleModal} note={prop} />
                : null
        }
      </div>     
    </div>
  )
}

export default CreateUpdateModal