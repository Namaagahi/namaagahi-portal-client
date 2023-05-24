"use client"
import CreateUpdateModal from "@/app/components/modals/CreateUpdateModal"
import { useGetNotesQuery } from "@/app/features/note/notesApiSlice"
import PageTitle from "@/app/components/main/PageTitle"
import Loading from "@/app/features/loading/Loading"
import Button from "@/app/components/main/Button"
import Table from "@/app/components/main/Table"
import Note from "@/app/features/note/Note"
import { useState } from "react"

const Tasks = () => {

  const {
    data: notes,
    isLoading,
    isSuccess, 
    isError,
    error
  } = useGetNotesQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  const [isNewTask, setIsNewTask] = useState(false)

  const handleNewTaskModal = () => setIsNewTask(!isNewTask)

  const notesTableHeadings = ['کاربر', 'عنوان', 'شرح', 'وضعیت','عملیات', 'تاریخ ایجاد', 'تاریخ به روزرسانی']
  
  if(isLoading) return <Loading/>
  if(isError) return <p>{'data' in error && error?.data?.message}</p>
  if(isSuccess){

    const { ids } = notes

    const noteTableContent = ids?.length && ids.map((noteId: string) => <Note key={noteId} noteId={noteId} />)

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