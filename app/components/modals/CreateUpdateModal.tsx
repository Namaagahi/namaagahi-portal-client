import NewInitialCustomerForm from "@/app/features/initialCustomers/NewInitialCustomerForm"
import { NoteObject, StructureObject, UserObject } from "@/app/lib/interfaces"
import EditStructure from "@/app/features/structures/EditStructure"
import NewUserForm from "@/app/features/users/NewUserForm"
import EditUser from "@/app/features/users/EditUser"
import EditNote from "@/app/features/note/EditNote"
import NewNote from "@/app/features/note/NewNote"

type Props = {
  handleModal: () => void
  type: string
  prop?: UserObject | NoteObject | StructureObject | undefined | any
}

const CreateUpdateModal = (props: Props) => {

  const {
    handleModal,
    type,
    prop
  } = props
  
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