import { useDeleteProjectCodeMutation } from "@/app/apiSlices/projectCodeApiSlice"
import { ProjectCodeObject } from "@/app/lib/interfaces"
import Loading from "../loading/Loading"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

type Props = {
    projectCode: ProjectCodeObject
    handleModal: () => void
}

const DeleteProjectCode = (props: Props) => {

    const {
        projectCode,
        handleModal
    } = props

    const { push } = useRouter()

    const [deleteProjectCode, {
        isLoading, 
    }] = useDeleteProjectCodeMutation()
    
    const onDeleteProjectCodeClick = async () => {
        const abc = await deleteProjectCode({ id: projectCode.id })
        window.location.assign('/dashboard/project-codes')
        handleModal()
        toast.success(`مشتری  ${projectCode?.code} با موفقیت حذف شد`)
    }

    if(isLoading) return <Loading/>

    return (
        <div className="flex items-center gap-6">
            <button
                onClick={onDeleteProjectCodeClick}
                className="deleteConfirmButton"
            >
                حذف کد پروژه
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

export default DeleteProjectCode