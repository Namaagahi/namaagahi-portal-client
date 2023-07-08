"use client"
import CreateUpdateModal from "@/app/components/modals/CreateUpdateModal"
import { useGetNotesQuery } from "@/app/features/note/notesApiSlice"
import { notesTableHeadings } from "@/app/lib/constants"
import PageTitle from "@/app/components/main/PageTitle"
import Button from "@/app/components/main/Button"
import useAuth from "@/app/hooks/useAuth"
import { useState } from "react"
import dynamic from 'next/dynamic'
const Loading = dynamic(
  () => import('@/app/features/loading/Loading'),
  { ssr: false }
)
const Table = dynamic(
  () => import('@/app/components/main/Table'),
  { ssr: false }
)
const Note = dynamic(
  () => import('@/app/features/note/Note'),
  { ssr: false }
)

const Tasks = () => {

  const { username, isAdmin, isMediaManager } = useAuth()

  const {
    data: notes,
    isLoading,
    isSuccess, 
    isError,
  } = useGetNotesQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })

  const [isNewTask, setIsNewTask] = useState(false)

  const handleNewTaskModal = () => setIsNewTask(!isNewTask)

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