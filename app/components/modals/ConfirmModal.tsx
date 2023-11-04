import { StructureObject, UserObject } from "@/app/lib/interfaces"
import LogoutModalContent from "../main/LogoutModalContent"
import DeleteModalContent from "../main/DeleteModalContent"

type Props = {
  type: string
  prop?: UserObject | StructureObject | undefined | any
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
    <div className="modalContainer">
      <div
        onClick={handleModal}
        className="backdropContainer"
      ></div>

      <div className="confirmModalContentContainer">
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
