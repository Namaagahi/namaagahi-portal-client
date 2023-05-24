import { EditNoteProps, NoteData, UserObject } from '@/app/lib/interfaces'
import React, { useEffect, useState } from 'react'
import { useUpdateNoteMutation } from './notesApiSlice'
import { useRouter } from 'next/navigation'
import Loading from '../loading/Loading'
import { AiOutlineClose } from 'react-icons/ai'
import NoteFormContent from './NoteFormContent'
import { toast } from 'react-toastify'

const EditNoteForm = (props: EditNoteProps) => {

    const {note, users, handleModal} = props

    const [updateNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation()

    const { push } = useRouter()

    const [noteData, setNoteData] = useState<NoteData>({
        title: note?.title,
        text: note?.text,
        completed: note?.completed,
        userId: note?.user
    })

    const { title, text, completed, userId } = noteData

    useEffect(() => {
        if(isSuccess) {
            setNoteData({...noteData, title:'', text:'', userId:''})
            push('/dashboard/tasks')
        }
    }, [isSuccess, push]) 

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setNoteData({...noteData, title: e.target.value})

    const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => setNoteData({...noteData, text: e.target.value})

    const onCompletedChange = () => setNoteData({...noteData, completed: !completed})

    const onUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => setNoteData({...noteData, userId: e.target.value})

    const canSave = [title, text, userId].every(Boolean) && !isLoading
    const onSaveNoteClick = async () => {
        if (canSave) await updateNote({ id: note?.id, user: userId, title, text, completed })
        handleModal()
        toast.success(`وظیفه ${note!.title} با موفقیت ویرایش شد`)
    }

    const options = users?.map((user: UserObject) => {
        return (
            <option
                key={user.id}
                value={user.username}
            > {user.username}</option >
        )
    })
    
    if(isLoading) return <Loading /> 
    return (
        <div className="py-5 px-8 w-full text-black dark:text-white">
            <form
                className="flex flex-col"
                onSubmit={onSaveNoteClick}
            >
                <div className="flex justify-between items-center">
                    <p className="md:text-2xl text-xl font-bold">ویرایش وظیفه</p>
                    <AiOutlineClose 
                        className="cursor-pointer text-xl hover:text-2xl transition-all" 
                        onClick={handleModal}/>
                </div>
                
                <NoteFormContent
                    error={error}
                    title={title}
                    text={text}
                    completed={completed}
                    onTitleChange={onTitleChange}
                    onTextChange={onTextChange}
                    onCompletedChange={onCompletedChange}
                    options={options}
                    isError={isError}
                    userId={userId}
                    onUserIdChange={onUserIdChange}
                />

                <div className="flex items-center gap-6">
                    <button
                        disabled={!canSave}
                        className={`${!canSave && 'bg-[#afafd2] text-gray-500 border-[#afafd2]'} bg-[#5858FA] py-3 w-2/3 rounded-lg text-xl border-[1px] border-[#5858FA] hover:border-[#3636a3] hover:bg-[#3636a3] transition-all text-white`}
                    >ذخیره</button>
                    <button 
                        onClick={handleModal}
                        className=" py-3 w-1/3 rounded-lg text-xl border-[1px] border-[#808080] dark:border-white hover:bg-black hover:text-white transition-all"
                    >لغو</button>
                </div>
            </form>
        </div>
    )
    }

export default EditNoteForm