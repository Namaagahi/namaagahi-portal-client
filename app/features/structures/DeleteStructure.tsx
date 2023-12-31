"use client"
import { useDeleteStructureMutation } from '../../apiSlices/structuresApiSlice'
import { StructureObject } from '@/app/lib/interfaces'
import { toast } from 'react-toastify'
import dynamic from 'next/dynamic'
const Loading = dynamic(
  () => import('@/app/features/loading/Loading'),
  { ssr: false }
)

type Props = {
    structure: StructureObject 
    handleModal: () => void
  }

const DeleteStructure = (props: Props) => {

    const {
        structure,
        handleModal
    } = props

    const [deleteStructure, {
        isLoading, 
    }] = useDeleteStructureMutation()

    const onDeleteStructureClick = async () => {
        await deleteStructure({ id: structure?.id })
        handleModal()
        toast.success(`سازه ${structure?.name} با موفقیت حذف شد`)
    }
    
    if(isLoading) return <Loading/>
    return (
        <div className="flex items-center gap-6">
            <button
                onClick={onDeleteStructureClick}
                className="deleteConfirmButton"
            >
                حذف
            </button>

            <button 
                onClick={handleModal}
                className="cancelButton"
            >
                لغو
            </button>
        </div>
    )
}

export default DeleteStructure