"use client"
import { DeleteBoxProps, StructureData, StructureObject } from '@/app/lib/interfaces'
import { useDeleteBoxMutation } from './boxesApiSlice'
import { toast } from 'react-toastify'
import dynamic from 'next/dynamic'
import { selectAllStructures, useUpdateStructureMutation } from '../structures/structuresApiSlice'
import { useSelector } from 'react-redux'
const Loading = dynamic(
  () => import('@/app/features/loading/Loading'),
  { ssr: false }
)
const DeleteBox = (props: DeleteBoxProps) => {

  const structures = useSelector(state => selectAllStructures(state))
  const { box, handleModal } = props

  const [deleteBox, {
      isLoading, 
  }] = useDeleteBoxMutation()

  const [updateStructure, { isError:iserror, error: Error }] = useUpdateStructureMutation()

  const onDeleteBoxClick = async () => {

  let found = {} as StructureObject | undefined
    box?.structures?.forEach((str: any) => {
      found = structures.find((structure:any) => structure.id === str.structureId)
    })
    await updateStructure({
      userId: found?.userId,
      id: found?.id,
      name: found?.name,
      location: found?.location,
      isChosen: false,
      isAvailable: true,
      parent: ''
    })
      await deleteBox({ id: box?.id })
      handleModal()
      toast.success(`باکس ${box?.name} با موفقیت حذف شد`)
  }
  
  if(isLoading) return <Loading/>

  return (
    <div className="flex items-center gap-6">
      <button
          onClick={onDeleteBoxClick}
          className="btn-confirm"
      >
          حذف باکس
      </button>

      <button 
          onClick={handleModal}
          className="btn-cancel"
      >
        لغو
      </button>
    </div>
  )
}

export default DeleteBox