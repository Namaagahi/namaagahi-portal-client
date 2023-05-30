import { selectAllUsers } from "../users/usersApiSlice"
import { useSelector } from "react-redux"
import Loading from "../loading/Loading"
import NewNoteForm from "./NewNoteForm"
import { UserObject } from "@/app/lib/interfaces"

const NewNote = ({handleModal}: {handleModal: () => void}) => {

    const users: UserObject[] | any = useSelector(selectAllUsers)

    if(!users.length) return <p>در حال حاضر در دسترس نیست.</p>

    return (
      users ? <NewNoteForm users={users!} handleModal={handleModal} /> : <Loading />
    )
}
 
export default NewNote 