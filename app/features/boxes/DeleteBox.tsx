"use client"
import { DeleteBoxProps, StructureData } from '@/app/lib/interfaces'
import { useDeleteBoxMutation } from './boxesApiSlice'
import { toast } from 'react-toastify'
import dynamic from 'next/dynamic'
const Loading = dynamic(
  () => import('@/app/features/loading/Loading'),
  { ssr: false }
)
const DeleteBox = (props: DeleteBoxProps) => {

    const { box, handleModal } = props

    const [deleteBox, {
        isLoading, 
    }] = useDeleteBoxMutation()

    const onDeleteStructureClick = async () => {
        await deleteBox({ id: box?.id })
        handleModal()
        toast.success(`سازه ${box?.name} با موفقیت حذف شد`)
    }
    
    if(isLoading) return <Loading/>
  return (
    <div className="flex items-center gap-6">
    <button
        onClick={onDeleteStructureClick}
        className="btn-confirm"
    >
         حذف باکس
    </button>

    <button 
        onClick={handleModal}
        className="btn-cancel"
    >لغو</button>
</div>
  )
}

export default DeleteBox