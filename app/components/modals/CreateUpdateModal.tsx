import { CreateUpdateModalProps } from "@/app/lib/interfaces"
import NewUserForm from "@/app/features/users/NewUserForm"
import EditUser from "@/app/features/users/EditUser"
import EditNote from "@/app/features/note/EditNote"
import EditBox from "@/app/features/boxes/EditBox"
import NewNote from "@/app/features/note/NewNote"
import EditStructure from "@/app/features/structures/EditStructure"
import NewInitialCustomerForm from "@/app/features/initialCustomers/NewInitialCustomerForm"

const CreateUpdateModal = (props: CreateUpdateModalProps) => {

  const { handleModal, type, prop } = props
  
  return (
    <div className="modal-container">
      <div onClick={handleModal} className="backdrop-container"></div>
      <div className={`create-update-modal-content-container ${type === 'editBox' && 'h-[80%]'}`}>
        { 
          type === 'newUser' ? 
            <NewUserForm handleModal={handleModal} />
              : type === 'editUser'? 
                <EditUser handleModal={handleModal} user={prop} />
                : type === 'newTask'? 
                <NewNote handleModal={handleModal} />
                : type === 'editTask'? 
                <EditNote handleModal={handleModal} note={prop} />
                : type === 'editBox'? 
                <EditBox handleModal={handleModal} box={prop} />
                : type === 'editStructure'? 
                <EditStructure handleModal={handleModal} structure={prop} />
                : type === 'newInitialCustomer'? 
                <NewInitialCustomerForm handleModal={handleModal} />
                : null
        }
      </div>     
    </div>
  )
}

export default CreateUpdateModal