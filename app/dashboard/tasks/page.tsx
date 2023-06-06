"use client"
import CreateUpdateModal from "@/app/components/modals/CreateUpdateModal"
import { useGetNotesQuery } from "@/app/features/note/notesApiSlice"
import PageTitle from "@/app/components/main/PageTitle"
import Loading from "@/app/features/loading/Loading"
import Button from "@/app/components/main/Button"
import Table from "@/app/components/main/Table"
import Note from "@/app/features/note/Note"
import { useState } from "react"
import useAuth from "@/app/hooks/useAuth"

const Tasks = () => {

  const { username, isAdmin, isMediaManager } = useAuth()

  const {
    data: notes,
    isLoading,
    isSuccess, 
    isError,
  } = useGetNotesQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  const [isNewTask, setIsNewTask] = useState(false)

  const handleNewTaskModal = () => setIsNewTask(!isNewTask)

  const notesTableHeadings = ['کاربر', 'عنوان', 'شرح', 'وضعیت','عملیات', 'تاریخ ایجاد', 'تاریخ به روزرسانی']
  
  if(isLoading) return <Loading/>
  if(isError) return (
    <div className='flex flex-col justify-center items-center min-h-screen gap-3'>
      <p className='text-xl'>هیچ وظیفه ای وجود ندارد</p>
    </div>
  )
  if(isSuccess){

    const { ids, entities } = notes

    let filteredIds
    isAdmin || isMediaManager ? 
      filteredIds= [...ids] 
      : 
      filteredIds= ids.filter((noteId : string) => entities[noteId].username === username)

    const noteTableContent = ids?.length && filteredIds.map((noteId: string) => <Note key={noteId} noteId={noteId} />)

    return (
      <>
        <PageTitle name={'مدیریت وظایف'}/>
        <Table
          tableContent = {noteTableContent}
          tableHeadings = {notesTableHeadings}
        />

        <Button 
          title="وظیفه جدید"
          onClickHandler={handleNewTaskModal}
        />
        
        {
          isNewTask && 
            <CreateUpdateModal
              type={'newTask'}
              handleModal={handleNewTaskModal}
            />
        }
      </>
    )
  }
}

export default Tasks