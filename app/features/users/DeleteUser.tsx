import { useDeleteUserMutation } from "@/app/features/users/usersApiSlice"
import { DeleteUserProps } from "@/app/lib/interfaces"
import Loading from "@/app/features/loading/Loading"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"


const DeleteUser = (props: DeleteUserProps) => {

    const { user, handleModal } = props
    
    const [deleteUser, {
        isLoading,
        isSuccess,
    }] = useDeleteUserMutation()

    const { push } = useRouter()

    const [userData, setUserData] = useState({
        name: user?.name,
        username: user?.username,
        validUserName: false,
        password: '',
        validPassWord: false,
        roles: user?.roles,
        active: user?.active
    })

    useEffect(() => {
        if(isSuccess) {
            setUserData({...userData, name:'', username:'', password:'', roles:[]})
            push('/dashboard/users')
        }
    }, [isSuccess, push])

    const onDeleteUserClick = async () => {
        await deleteUser({ id: user?.id })
        handleModal()
        toast.success(`کاربر ${user?.name} با موفقیت حذف شد`)
    }

    if(isLoading) return <Loading/>

    return (
        <div className="flex items-center gap-6">
            <button
                onClick={onDeleteUserClick}
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

export default DeleteUser