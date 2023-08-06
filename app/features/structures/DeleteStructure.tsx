"use client"
import { useDeleteStructureMutation } from '../../apiSlices/structuresApiSlice'
import { DeleteStructureProps } from '@/app/lib/interfaces'
import { toast } from 'react-toastify'
import dynamic from 'next/dynamic'
const Loading = dynamic(
  () => import('@/app/features/loading/Loading'),
  { ssr: false }
)

const DeleteStructure = (props: DeleteStructureProps) => {

    const { structure, handleModal } = props

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
                className="btn-confirm"
            >
                حذف
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

export default DeleteStructure