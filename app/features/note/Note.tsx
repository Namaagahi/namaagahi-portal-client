import { selectNoteById } from "@/app/apiSlices/notesApiSlice"
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { NoteObject } from "@/app/lib/interfaces"
import { useSelector } from "react-redux"
import { useState } from "react"
import moment from "moment"
import dynamic from 'next/dynamic'
const CreateUpdateModal = dynamic(
  () => import('../../components/modals/CreateUpdateModal'),
  { ssr: false }
)
const ConfirmModal = dynamic(
  () => import('@/app/components/modals/ConfirmModal'),
  { ssr: false }
)
const Status = dynamic(
  () => import('../../components/main/Status'),
  { ssr: false }
)

const Note = ({ noteId }: { noteId: string }) => {

    const note: NoteObject | any = useSelector(state => selectNoteById(state, noteId))
    
    const [isEditTask, setIsEditTask] = useState(false)

    const [isDeleteNote, setIsDeleteNote] = useState(false)

    if(note) {

        const handleEditTask = () => setIsEditTask(!isEditTask)

        const handleDeleteNote = () => setIsDeleteNote(!isDeleteNote)

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
                        status = {'تمام '} 
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
                        <AiFillDelete 
                            className="text-orange-600 dark:text-white hover:scale-125 transition-all" size={20}
                            onClick={handleDeleteNote}    
                        />
                    </div>
                </td>
                <td className="px-6 py-4">{moment(note.createdAt).format("MMM Do YYYY")}</td>
                <td className="px-6 py-4">{moment(note.updatedAt).format("MMM Do YYYY")}</td>
            </tr>

            {
                isDeleteNote && 
                    <ConfirmModal 
                        prop={note} 
                        handleModal={handleDeleteNote}
                        type={'delete'}
                        deleteType="note"
                    />
            } 

            {
                isEditTask && 
                    <CreateUpdateModal 
                        type={'editTask'}
                        handleModal={handleEditTask} 
                        prop={note} 
                    />
            }
        </>
        )
    } else return null
}

export default Note