import { EditBoxProps } from '@/app/lib/interfaces'
import EditBoxForm from './EditBoxForm'
import dynamic from 'next/dynamic'
const Loading = dynamic(
  () => import('@/app/features/loading/Loading'),
  { ssr: false }
)

const EditBox = (props: EditBoxProps) => {

  const { handleModal, box } = props

  return (
    box ? <EditBoxForm box={box} handleModal={handleModal} /> : <Loading />
  )
}

export default EditBox