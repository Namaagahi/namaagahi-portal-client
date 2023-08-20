import {  UserObject } from '@/app/lib/interfaces'
import dynamic from 'next/dynamic'
const Loading = dynamic(
  () => import('@/app/features/loading/Loading'),
  { ssr: false }
)
const EditUserForm = dynamic(
  () => import('./EditUserForm'),
  { ssr: false }
)

type Props = {
  user: UserObject 
  handleModal: () => void
} 

const EditUser = (props: Props) => {

  const {
    user,
    handleModal
  } = props

  return (
    user ? <EditUserForm user={user} handleModal={handleModal} /> : <Loading />
  )
}

export default EditUser 