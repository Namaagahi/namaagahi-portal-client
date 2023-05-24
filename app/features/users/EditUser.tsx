import { EditUserProps } from '@/app/lib/interfaces'
import EditUserForm from './EditUserForm'
import Loading from '../loading/Loading'

const EditUser = (props: EditUserProps) => {

  const { user, handleModal } = props

  return (
    user ? <EditUserForm user={user} handleModal={handleModal} /> : <Loading />
  )
}

export default EditUser