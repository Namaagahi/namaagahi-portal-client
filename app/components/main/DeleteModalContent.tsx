import Loading from "@/app/features/loading/Loading"
import { useDeleteUserMutation } from "@/app/features/users/usersApiSlice"
import { UserObject } from "@/app/lib/interfaces"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AiOutlineClose } from 'react-icons/ai'
import { toast } from "react-toastify"


const DeleteModalContent = ({handleModal, user}: {handleModal: () => void, user: UserObject}) => {
    const [deleteUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useDeleteUserMutation()

    const { push } = useRouter()
    const [userData, setUserData] = useState({
        name:user.name,
        username: user.username,
        validUserName: false,
        password: '',
        validPassWord: false,
        roles: user.roles,
        active: user.active
    })

    useEffect(() => {
        if(isSuccess) {
            setUserData({...userData, name:'', username:'', password:'', roles:[]})
            push('/dashboard/users')
        }
    }, [isSuccess, push])

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
        handleModal()
        toast.success(`کاربر ${user.name} با موفقیت حذف شد`)
    }

    if(isLoading) return <Loading/>
  return (
    <div className="py-5 px-8 w-full text-black dark:text-white">
        <div className="flex justify-between items-center">
            <p className="md:text-2xl text-xl font-bold">تایید حذف</p>
            <AiOutlineClose className="cursor-pointer text-xl hover:text-2xl transition-all" onClick={handleModal}/>
        </div>
        <div className="flex flex-col py-12">
            <div className="py-7 border-[1px] border-x-transparent border-y-[#FA9E93]">
                <p className="text-xl">آیا از انجام این کار مطمئن هستید؟ این عمل برگشت پذیر نخواهد بود.</p>
            </div>
        </div>
        <div className="flex items-center gap-6">
                <button
                    onClick={onDeleteUserClicked}
                    className={` bg-[#C91416] py-3 w-2/3 rounded-lg text-xl border-[1px] border-[#C91416] hover:border-[#670809] hover:bg-[#670809] transition-all text-white`}
                 >حذف</button>
                <button 
                    onClick={handleModal}
                    className=" py-3 w-1/3 rounded-lg text-xl border-[1px] border-[#808080] dark:border-white hover:bg-black hover:text-white transition-all"
                >لغو</button>
            </div>
    </div>
  )
}

export default DeleteModalContent