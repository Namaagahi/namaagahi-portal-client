"use client"
import { useAddNewUserMutation } from "@/app/apiSlices/usersApiSlice"
import { PASSWORD_REGEX, USER_REGEX } from "@/app/lib/constants"
import UserFormContent from "./UserFormContent"
import { AiOutlineClose } from 'react-icons/ai'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

type Props = {
    handleModal: () => void
}

const NewUserForm = (props: Props) => {

    const { handleModal } = props

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const { push } = useRouter()
    
    const [newUserData, setNewUserData] = useState({
        name:'',
        username: '',
        validUserName: false,
        password: '',
        validPassWord: false,
        roles: ['پذیرشگر'],
        active: true
    })
    const {
        name,
        username,
        password,
        validUserName,
        validPassWord,
        roles,
        active
    } = newUserData

    useEffect(() => {
        setNewUserData({...newUserData, validUserName:USER_REGEX.test(username)})
    }, [username])

    useEffect(() => {
        setNewUserData({...newUserData, validPassWord:PASSWORD_REGEX.test(password)})
    }, [password])

    useEffect(() => {
        if(isSuccess) {
            setNewUserData({...newUserData, name:'', username:'', password:'', roles:[]})
            push('/dashboard/users')
        }
    }, [isSuccess, push])

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewUserData({...newUserData, name: e.target.value})
    const onUserameChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewUserData({...newUserData, username: e.target.value})
    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewUserData({...newUserData, password: e.target.value})
    const onActiveChange = () => setNewUserData({...newUserData, active:!active})

    const onRolesChange = (e: any) => {
        const values = Array.from(
            e.target.selectedOptions,
            (option: any) => option.value
        )
        setNewUserData({...newUserData, roles: values})
    }

    const canSave = [roles.length, validUserName, validPassWord].every(Boolean) && !isLoading
    const onSaveUserClick = async(e: any) => {
        e.preventDefault()
        
        if(canSave) {
            if(isError) {
                'status' in error! && error.status === 409 && toast.error('این نام کاربری قبلا ثبت شده است')
                'status' in error! && error.status === 400 && toast.error('همه فیلدها را تکمیل کنید')
              }
            const abc = await addNewUser({ name, username, password, roles })
        }
    }

    if(isSuccess) {
        toast.success('کاربر جدید با موفقیت ساخته شد')
        handleModal()
      }

  return (
    <div className="py-5 px-8 w-full text-black dark:text-white">
        <form
            className="flex flex-col"
            onSubmit={onSaveUserClick}
        >
            <div className="flex justify-between items-center">
                <p className="md:text-2xl text-xl font-bold">
                    کاربر جدید
                </p>

                <AiOutlineClose 
                    className="cursor-pointer text-xl hover:text-2xl transition-all" 
                    onClick={handleModal}
                />
            </div>

            <UserFormContent
                error={error}
                isError={isError}
                name={name}
                username={username}
                password={password}
                roles={roles}
                onNameChange={onNameChange}
                onUserameChange={onUserameChange}
                onPasswordChange={onPasswordChange}
                onRolesChange={onRolesChange}
                type={'new'}
            />

            <div className="flex items-center gap-6">
                <button
                    disabled={!canSave}
                    className={`${!canSave && 'bg-[#afafd2] text-gray-500 border-[#afafd2]'} bg-[#5858FA] py-3 w-2/3 rounded-lg text-xl border-[1px] border-[#5858FA] hover:border-[#3636a3] hover:bg-[#3636a3] transition-all text-white`}
                 >
                    ذخیره
                </button>

                <button 
                    onClick={handleModal}
                    className=" py-3 w-1/3 rounded-lg text-xl border-[1px] border-[#808080] dark:border-white hover:bg-black hover:text-white transition-all"
                >
                    لغو
                </button>
            </div>
        </form>
    </div>
  )
}

export default NewUserForm