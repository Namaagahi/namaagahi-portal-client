import { EditNoteProps, UserObject } from "@/app/lib/interfaces"
import { selectAllUsers, useGetUsersQuery } from "../users/usersApiSlice"
import EditNoteForm from "./EditNoteForm"
import { useSelector } from "react-redux"
import dynamic from 'next/dynamic'
const Loading = dynamic(
  () => import('@/app/features/loading/Loading'),
  { ssr: false }
)

const EditNote = (props: EditNoteProps) => {

  const {
    data: allUsers, 
  } = useGetUsersQuery(undefined, { 
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  }) 

  const { note, handleModal } = props

  const users: UserObject[] | any  = useSelector(selectAllUsers)

  return (
    note && users ? <EditNoteForm note={note} users={users} handleModal={handleModal} /> : <Loading />
  )
}

export default EditNote 