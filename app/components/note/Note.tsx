import { selectNoteById } from "@/app/state & api/notesApiSlice"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import Modal from "../modals/Modal"
import { NoteObject } from "@/app/lib/interfaces"
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import Status from "../main/Status"
import moment from "moment"
import { useState } from "react"


const Note = ({ noteId }: { noteId: string }) => {
    const note: NoteObject | any = useSelector(state => selectNoteById(state, noteId))
    const { push } = useRouter()
    const [isEditTask, setIsEditTask] = useState(false)

    if(note) {
         const handleEditTask = () => setIsEditTask(!isEditTask)
        const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
        const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        return (
           <>
            <tr 
            key={note._id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
                <td className="px-6 py-4">{note.username}</td>
                <td className="px-6 py-4">{note.title}</td>
                <td className="px-6 py-4">{note.text}</td>
                <td className="px-6 py-4">
                    {note.completed? 
                    <Status 
                        status = {'تمام شده'} 
                        bgColor = {'#a8edbb'}
                        textColor = {'#0a541e'}
                    />
                    : 
                    <Status
                        status = {'ناتمام'}
                        bgColor = {'#d96f85'}
                        textColor = {'#2e030c'}
                    />    
                }
                </td>
                <td className="px-6 py-4 flex items-center gap-5">
                    <div className="flex items-center p-1 border-[1px] border-[#737373] rounded-md cursor-pointer">
                        <AiFillEdit 
                            className="text-black dark:text-white hover:scale-125 transition-all" size={20}
                            onClick={handleEditTask}
                        />
                    </div>
                    <div className="flex justify-center items-center p-1 border-[1px] border-[#737373] rounded-md cursor-pointer">
                        <AiFillDelete className="text-orange-600 dark:text-white hover:scale-125 transition-all" size={20}/>
                    </div>
                </td>
                <td className="px-6 py-4">{moment(note.createdAt).format("MMM Do YYYY")}</td>
                <td className="px-6 py-4">{moment(note.updatedAt).format("MMM Do YYYY")}</td>
            </tr>
            {
                isEditTask && 
                    <Modal 
                        type={'editTask'}
                        handleModal={handleEditTask} 
                    />
            }
           </>
        )
    } else return null
}

export default Note