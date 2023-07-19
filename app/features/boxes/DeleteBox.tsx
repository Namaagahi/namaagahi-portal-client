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
    box?.structures?.forEach((str: any) => {
      console.log("STR", str)
      structures.forEach(async(structure: any) => {
         console.log("structure", structure)
        if(structure.isChosen && structure.id === str.structureId) 
        await updateStructure({
          userId: structure?.userId,
          id: structure?.id,
          name: structure?.name,
          location: structure?.location,
          isChosen: false,
          isAvailable: true,
          parent: ''
        })
      })
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