import { EditNoteProps, UserObject } from "@/app/lib/interfaces"
import { selectAllUsers } from "../users/usersApiSlice"
import EditNoteForm from "./EditNoteForm"
import { useSelector } from "react-redux"
import Loading from "../loading/Loading"

const EditNote = (props: EditNoteProps) => {

  const { note, handleModal } = props

  const users: UserObject[] | any  = useSelector(selectAllUsers)

  return (
    note && users ? <EditNoteForm note={note} users={users} handleModal={handleModal} /> : <Loading />
  )
}

export default EditNote 