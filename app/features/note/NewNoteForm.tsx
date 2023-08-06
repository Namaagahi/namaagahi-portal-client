"use client"
import { NewNoteFormProps, NoteData, UserObject } from '@/app/lib/interfaces'
import { useAddNewNoteMutation } from '../../apiSlices/notesApiSlice'
import NoteFormContent from './NoteFormContent'
import { AiOutlineClose } from 'react-icons/ai'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const NewNoteForm = (props: NewNoteFormProps) => {

  const {
    users,
    handleModal
  } = props

  const [addNewNote, { 
    isLoading,
    isSuccess,
    isError,
    error
}] = useAddNewNoteMutation()

  const { push } = useRouter()

  const [newNoteData, setNewNoteData] = useState<NoteData>({
    title: '',
    text: '',
    completed: false,
    userId: users[0].id
  })
  const { title, text, completed, userId } = newNoteData

  useEffect(() => {
    if(isSuccess) {
      setNewNoteData({...newNoteData, title:'', text:'', userId:''})
        push('/dashboard/tasks')
    }
  }, [isSuccess, push])

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setNewNoteData({...newNoteData, title: e.target.value})
  const onTextChanged = (e: React.ChangeEvent<HTMLInputElement> | any) => setNewNoteData({...newNoteData, text: e.target.value})
  const onUserIdChanged = (e: React.ChangeEvent<HTMLInputElement>) => setNewNoteData({...newNoteData, userId: e.target.value})

  const canSave = [title, text, userId].every(Boolean) && !isLoading
  const onSaveNoteClick = async (e: any) => {
      e.preventDefault()
      if (canSave) await addNewNote({ user: userId, title, text }) 
      handleModal()
      toast.success('وظیفه جدید با موفقیت ساخته شد')
  }

  const options = users.map(user => {
    return (
        <option
            key={user.id}
            value={user.id}
        > {user.username}</option >
    )
})

  return (
    <div className="py-5 px-8 w-full text-black dark:text-white">
      <form
          className="flex flex-col"
          onSubmit={onSaveNoteClick}
      >
        <div className="flex justify-between items-center">
          <p className="md:text-2xl text-xl font-bold">وظیفه جدید</p>
          <AiOutlineClose className="cursor-pointer text-xl hover:text-2xl transition-all" onClick={handleModal}/>
        </div>

        <NoteFormContent
          error={error}
          title={title!} 
          text={text!}
          userId={userId!}
          completed={completed!}
          onTitleChange={onTitleChanged}
          onTextChange={onTextChanged}
          onUserIdChange={onUserIdChanged}
          options={options}
          isError={isError}
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

export default NewNoteForm 