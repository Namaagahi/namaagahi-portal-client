"use client"
import { useDeleteBoxMutation } from '../../apiSlices/boxesApiSlice'
import { BoxObject } from '@/app/lib/interfaces'
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
  
  const [deleteBox, {
      isLoading, 
  }] = useDeleteBoxMutation()

  const onDeleteBoxClick = async () => {
    const abc = await deleteBox({ id: box?.id, boxId: box?.boxId })
    // console.log("ABC", abc)
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