import { DeleteStructureProps, StructureData } from '@/app/lib/interfaces'
import { useDeleteStructureMutation } from './structuresApiSlice'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Loading from '../loading/Loading'

const DeleteStructure = (props: DeleteStructureProps) => {

    const { structure, handleModal } = props

    const [deleteStructure, {
        isLoading, 
        isSuccess,
    }] = useDeleteStructureMutation()

    const { push } = useRouter()

    const [structureData, setStructureData] = useState<StructureData>({
        sysCode : structure?.sysCode,
        kind : structure?.kind,
        district : structure?.district,
        path : structure?.path,
        address : structure?.address,
        style : structure?.style,
        face : structure?.face,
        dimensions : structure?.dimensions,
        printSize : structure?.printSize,
        docSize : structure?.docSize,
        isAvailable : structure?.isAvailable,
        userId : structure?.user
    })

    useEffect(() => {
        if(isSuccess) {
            setStructureData({...structureData, sysCode:0,
                kind:'',
                district:'',
                path:'',
                address:'',
                style:'',
                face:'',
                dimensions:'',
                printSize:0,
                docSize:0,
                userId:''})
            push('/dashboard/billboard/structures')
        }
    }, [isSuccess, push]) 

    const onDeleteStructureClick = async () => {
        await deleteStructure({ id: structure?.id })
        handleModal()
        toast.success(`سازه ${structure?.sysCode} با موفقیت حذف شد`)
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
    >لغو</button>
</div>
  )
}

export default DeleteStructure