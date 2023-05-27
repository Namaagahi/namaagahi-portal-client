import DeleteModalContent from "../main/DeleteModalContent"
import { ConfirmModalProps } from "@/app/lib/interfaces"
import LogoutModalContent from "../main/LogoutModalContent"

const ConfirmModal = (props: ConfirmModalProps) => {

  const { handleModal, type, prop, deleteType } = props

  return (
    <div className="modal-container">
      <div onClick={handleModal} className="backdrop-container"></div>
      <div className="confirm-modal-content-container">
        {
          type === 'delete' ? 
          <DeleteModalContent
            handleModal={handleModal}
            prop={prop}
            deleteType={deleteType}
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