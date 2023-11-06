import { useDeleteProposalMutation } from "@/app/apiSlices/proposalApiSlice"
import { ProposalObject } from "@/app/lib/interfaces"
import Loading from "../loading/Loading"
import { toast } from "react-toastify"

type Props = {
  proposal: ProposalObject
  handleModal: () => void
}

const DeleteProposal = (props: Props) => {

  const {
    proposal,
    handleModal
  } = props

  const [deleteProposal, {
    isLoading,
  }] = useDeleteProposalMutation()

  const onDeleteProposalClick = async () => {
    const abc = await deleteProposal({ id: proposal?.id })
    handleModal()
    toast.success(`پروپوزال  ${proposal?.subject} با موفقیت حذف شد`)
  }

  if(isLoading) return <Loading/>

  return (
    <div className="flex items-center gap-6">
      <button
        onClick={onDeleteProposalClick}
        className="deleteConfirmButton"
      >
        حذف پروپوزال
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

export default DeleteProposal
