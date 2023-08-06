import { EditStructureProps } from "@/app/lib/interfaces"
import EditStructureForm from "./EditStructureForm"
import dynamic from 'next/dynamic'
const Loading = dynamic(
  () => import('@/app/features/loading/Loading'),
  { ssr: false }
)

const EditStructure = (props: EditStructureProps) => {

  const {
    handleModal,
    structure
  } = props

  return (
    structure ? <EditStructureForm structure={structure} handleModal={handleModal} /> : <Loading />
  )
}

export default EditStructure