import NewInitialCustomerForm from "@/app/features/initialCustomers/NewInitialCustomerForm"
import { StructureObject, UserObject } from "@/app/lib/interfaces"
import EditStructure from "@/app/features/structures/EditStructure"
import NewUserForm from "@/app/features/users/NewUserForm"
import EditUser from "@/app/features/users/EditUser"
import EditFinalCustomer from "@/app/features/finalCustomers/EditFinalCustomer"
import NewFinalCustomerForm from "@/app/features/finalCustomers/NewFinalCustomerForm"
import NewProjectCodeForm from "@/app/features/projectCodes/NewProjectCodeForm"
import EditProjectCode from "@/app/features/projectCodes/EditProjectCode"
import EditProfile from "@/app/features/profile/EditProfile"
import NewChatroom from "@/app/features/chatrooms/NewChatroom"
import EditInitialCustomer from "@/app/features/initialCustomers/EditInitialCustomer"

type Props = {
  handleModal: () => void
  type: string
  prop?: UserObject | StructureObject | undefined | any
}

const CreateUpdateModal = (props: Props) => {

  const {
    handleModal,
    type,
    prop
  } = props

  return (
    <div className="modalContainer">
      <div
        onClick={handleModal}
        className="backdropContainer"
      ></div>

      <div className={`createUpdateModalContentContainer ${type === 'editBox' && 'h-[80%]'}`}>
        {
          type === 'newUser' ?
            <NewUserForm handleModal={handleModal} />
              : type === 'editUser'?
              <EditUser handleModal={handleModal} user={prop} />
              : type === 'editProfile'?
              <EditProfile handleModal={handleModal} user={prop} />
              : type === 'editStructure'?
              <EditStructure handleModal={handleModal} structure={prop} />
              : type === 'newInitialCustomer'?
              <NewInitialCustomerForm handleModal={handleModal} />
              : type === 'editInitialCustomer'?
              <EditInitialCustomer handleModal={handleModal} initialCustomer={prop} />
              : type === 'newFinalCustomer'?
              <NewFinalCustomerForm handleModal={handleModal} />
              : type === 'editFinalCustomer'?
              <EditFinalCustomer handleModal={handleModal} finalCustomer={prop} />
              : type === 'newProjectCode'?
              <NewProjectCodeForm handleModal={handleModal} />
              : type === 'editProjectCode'?
              <EditProjectCode handleModal={handleModal} projectCode={prop} />
              : type === 'newChatroom'?
              <NewChatroom handleModal={handleModal} />
              : null
        }
      </div>
    </div>
  )
}

export default CreateUpdateModal
