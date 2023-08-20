import { selectAllUsers, useGetUsersQuery } from "../../apiSlices/usersApiSlice"
import { NoteObject, UserObject } from "@/app/lib/interfaces"
import EditNoteForm from "./EditNoteForm"
import { useSelector } from "react-redux"
import dynamic from 'next/dynamic'
const Loading = dynamic(
  () => import('@/app/features/loading/Loading'),
  { ssr: false }
)

type Props = {
  note: NoteObject | undefined
  users?: UserObject[] | undefined
  handleModal: () => void
}

const EditNote = (props: Props) => {

  const {
    note,
    handleModal
  } = props

  useGetUsersQuery(undefined, { 
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  }) 

  const users: UserObject[]  = useSelector(selectAllUsers) as UserObject[]

  return note && users ? <EditNoteForm note={note} users={users} handleModal={handleModal} /> : <Loading />
  
}

export default EditNote 