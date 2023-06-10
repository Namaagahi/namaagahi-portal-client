import { selectAllUsers } from "../users/usersApiSlice"
import { useSelector } from "react-redux"
import { UserObject } from "@/app/lib/interfaces"
import dynamic from 'next/dynamic'
const Loading = dynamic(
  () => import('@/app/features/loading/Loading'),
  { ssr: false }
)
const NewNoteForm = dynamic(
  () => import('./NewNoteForm'),
  { ssr: false }
)

const NewNote = ({handleModal}: {handleModal: () => void}) => {

    const users: UserObject[] | any = useSelector(selectAllUsers)

    if(!users.length) return <p>در حال حاضر در دسترس نیست.</p>

    return (
      users ? <NewNoteForm users={users!} handleModal={handleModal} /> : <Loading />
    )
}
 
export default NewNote 