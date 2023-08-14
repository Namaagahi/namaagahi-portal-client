"use client"
import { selectAllStructures, useGetStructuresQuery, useUpdateStructureMutation } from '../../apiSlices/structuresApiSlice'
import { useDeleteBoxMutation } from '../../apiSlices/boxesApiSlice'
import { BoxObject } from '@/app/lib/interfaces'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import dynamic from 'next/dynamic'
const Loading = dynamic(
  () => import('@/app/features/loading/Loading'),
  { ssr: false }
)

type Props = {
  box: BoxObject | undefined
  handleModal: () => void
}

const DeleteBox = (props: Props) => {

  const {
    box,
    handleModal
  } = props
  
  useGetStructuresQuery(undefined, { 
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
})

  const structures = useSelector(state => selectAllStructures(state))

  const [deleteBox, {
      isLoading, 
  }] = useDeleteBoxMutation()

  const [updateStructure, { isError:iserror, error: Error }] = useUpdateStructureMutation()

  const onDeleteBoxClick = async () => {
    box?.structures?.forEach((str: any) => {
      structures.forEach(async(structure: any) => {
        if(structure.isChosen && structure.parent.length && structure.id === str.structureId) {
          const abc = await updateStructure({
            userId: structure?.userId,
            id: structure?.id,
            name: structure?.name,
            location: structure?.location,
            isChosen: false,
            isAvailable: true,
            parent: ''
          })
          console.log("abc", abc)
        }
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