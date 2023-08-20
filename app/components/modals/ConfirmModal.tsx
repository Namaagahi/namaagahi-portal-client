import { NoteObject, StructureObject, UserObject } from "@/app/lib/interfaces"
import LogoutModalContent from "../main/LogoutModalContent"
import DeleteModalContent from "../main/DeleteModalContent"

type Props = {
  type: string
  prop?: UserObject | NoteObject | StructureObject | undefined | any
  handleModal: () => void
  deleteType?: string
}

const ConfirmModal = (props: Props) => {

  const {
    handleModal,
    type,
    prop,
    deleteType
  } = props

  return (
    <div className="modal-container">
      <div 
        onClick={handleModal} 
        className="backdrop-container"
      ></div>

      <div className="confirm-modal-content-container">
        {
          type === 'delete' ? 
          <DeleteModalContent
            handleModal={handleModal}
            prop={prop}
            deleteType={deleteType!}
          />
          : 
          <LogoutModalContent 
            handleModal={handleModal}
          />
        }
      </div>     
    </div>
  )
}

export default ConfirmModal 