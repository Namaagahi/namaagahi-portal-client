import { DeleteNoteProps, NoteData } from "@/app/lib/interfaces"
import { useDeleteNoteMutation } from "./notesApiSlice"
import Loading from "@/app/features/loading/Loading"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const DeleteNote = (props: DeleteNoteProps) => {

    const { note, handleModal } = props
    
    const [deleteNote, {
        isLoading,
        isSuccess,
    }] = useDeleteNoteMutation()

    const { push } = useRouter()

    const [noteData, setNoteData] = useState<NoteData>({
        title: note?.title,
        text: note?.text,
        completed: note?.completed,
        userId: note?.user
    })

    useEffect(() => {
        if(isSuccess) {
            setNoteData({...noteData, title:'', text:'', userId:''})
            push('/dashboard/tasks')
        }
    }, [isSuccess, push]) 

    const onDeleteNoteClick = async () => {
        await deleteNote({ id: note?.id })
        handleModal()
        toast.success(`وظیفه ${note?.title} با موفقیت حذف شد`)
    }

    if(isLoading) return <Loading/>
    return (
        <div className="flex items-center gap-6">
            <button
                onClick={onDeleteNoteClick}
                className="btn-confirm"
            >
                حذف
            </button>

            <button 
                onClick={handleModal}
                className="btn-cancel"
            >لغو</button>
        </div>
    )
}

export default DeleteNote