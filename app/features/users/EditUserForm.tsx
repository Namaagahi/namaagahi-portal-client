"use client"
import { useUpdateUserMutation } from '../../apiSlices/usersApiSlice'
import { UserData, UserObject } from '@/app/lib/interfaces'
import { ChangeEvent, useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import dynamic from 'next/dynamic'
const Loading = dynamic(
  () => import('@/app/features/loading/Loading'),
  { ssr: false }
)
const UserFormContent = dynamic(
  () => import('./UserFormContent'),
  { ssr: false }
)

type Props = {
    user: UserObject 
    handleModal: () => void
  } 

const EditUserForm = (props: Props) => {

    const {
        user,
        handleModal
    } = props

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const { push } = useRouter()

    const [userData, setUserData] = useState<UserData>({
        name: user?.name,
        username: user?.username,
        password: '',
        roles: user?.roles,
        active: user?.active
    })

    const {
        name,
        username,
        password,
        roles,
        active
    } = userData

    // useEffect(() => {
    //     setUserData({...userData, validUserName:USER_REGEX.test(username!)})
    // }, [username])

    // useEffect(() => {
    //     setUserData({...userData, validPassWord:PASSWORD_REGEX.test(password)})
    // }, [password])

    useEffect(() => {
        if(isSuccess) {
            setUserData({...userData, name:'', username:'', password:'', roles:[]})
            push('/dashboard/users')
        }
    }, [isSuccess, push])

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, name: e.target.value})
    const onUserameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, username: e.target.value})
    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, password: e.target.value})
    const onActiveChange = () => setUserData({...userData, active:!active})

    const onRolesChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const values = Array.from(
            e.target.selectedOptions,
            (option: any) => option.value
        )
        setUserData({...userData, roles: values})
    }

    const onSaveUserClick = async () => {
        if (password) {
            await updateUser({ id: user!.id, name, username, password, roles, active, avatar: user!.avatar })
        } else {
            await updateUser({ id: user!.id, name, username, roles, active, avatar: user!.avatar })
        }
        handleModal()
        toast.success(`کاربر ${user!.name} با موفقیت ویرایش شد`)

    }

    let canSave
    if (password) canSave = [roles!.length].every(Boolean) && !isLoading
    else canSave = [roles!.length ].every(Boolean) && !isLoading
    
    if(isLoading) return <Loading/>  
    return (
        <div className="py-5 px-8 w-full text-black dark:text-white">
            <form
                className="flex flex-col"
                onSubmit={onSaveUserClick}
            >
                <div className="flex justify-between items-center">
                    <p className="md:text-2xl text-xl font-bold">
                        ویرایش کاربر
                    </p>

                    <AiOutlineClose 
                        className="cursor-pointer text-xl hover:text-2xl transition-all" 
                        onClick={handleModal}
                    />
                </div>

                <UserFormContent 
                    error={error}
                    isError={isError}
                    name={name!}
                    username={username!}
                    password={password}
                    roles={roles!}
                    active={active!}
                    type={'edit'}
                    onNameChange={onNameChange}
                    onUserameChange={onUserameChange}
                    onPasswordChange={onPasswordChange}
                    onActiveChange={onActiveChange}
                    onRolesChange={onRolesChange}
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

export default EditUserForm