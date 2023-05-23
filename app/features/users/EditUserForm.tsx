import { useEffect, useState } from 'react';
import { ROLES } from '@/app/config/roles';
import { PASSWORD_REGEX, USER_REGEX } from "@/app/lib/constants"
import { useUpdateUserMutation } from './usersApiSlice'
import { AiOutlineClose } from 'react-icons/ai'
import { UserObject } from '@/app/lib/interfaces';
import { useRouter } from 'next/navigation';
import Loading from '../loading/Loading';
import { toast } from 'react-toastify';


const EditUserForm = ({user, handleModal}: {user: UserObject, handleModal: () => void }) => {
    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

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

    const { name, username, password, validUserName, validPassWord, roles, active } = userData

    useEffect(() => {
        setUserData({...userData, validUserName:USER_REGEX.test(username)})
    }, [username])

    useEffect(() => {
        setUserData({...userData, validPassWord:PASSWORD_REGEX.test(password)})
    }, [password])

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

    const onRolesChange = (e: any) => {
        const values = Array.from(
            e.target.selectedOptions,
            (option: any) => option.value
        )
        setUserData({...userData, roles: values})
    }

    const onSaveUserClick = async (e: any) => {
        console.log(name)
        if (password) {
            await updateUser({ id: user.id, name, username, password, roles, active, avatar: user.avatar })
        } else {
            await updateUser({ id: user.id, name, username, roles, active, avatar: user.avatar })
        }
        handleModal()
        toast.success(`کاربر ${user.name} با موفقیت ویرایش شد`)
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    let canSave
    if (password) canSave = [roles.length, validUserName, validPassWord].every(Boolean) && !isLoading
    else canSave = [roles.length, validUserName].every(Boolean) && !isLoading
    
   if(isLoading) return <Loading/> 
   console.log(userData)
  return (
    <div className="py-5 px-8 w-full text-black dark:text-white">
         <form
            className="flex flex-col"
            onSubmit={onSaveUserClick}
        >
            <div className="flex justify-between items-center">
                <p className="md:text-2xl text-xl font-bold">ویرایش کاربر</p>
                <AiOutlineClose className="cursor-pointer text-xl hover:text-2xl transition-all" onClick={handleModal}/>
            </div>
            <div className="flex flex-col pt-12 pb-7">
                <p className={`${error? ' text-red-500 p-1 mb-2 text-xs rounded-sm':'hidden'}}`}>
                    {error?.data?.message === 'BAD REQUEST : All fields are required' && 'همه فیلدها را پر کنید!'}
                </p>
                <label htmlFor="name">نام</label>
                <input
                    type="text"
                    placeholder="نام فارسی"
                    id="name"
                    value={name}
                    autoComplete="off"
                    onChange={onNameChange}
                    className={`${isError && 'border-rose-700'} form-input`}
                 />
                <label className="mt-7" htmlFor="username">نام کاربری</label>
                <input
                    type="username"
                    placeholder="نام کاربری انگلیسی"
                    id="name"
                    value={username}
                    autoComplete="off"
                    onChange={onUserameChange}
                    className={`${!validUserName && 'border-rose-700'} form-input`}
                 />
                <label className="mt-7" htmlFor="password">رمز عبور</label>
                <input
                    type="text"
                    placeholder="رمز عبور ترکیبی از اعداد و حروف انگلیسی"
                    id="password"
                    value={password}
                    autoComplete="off"
                    onChange={onPasswordChange}
                    className={`${!validPassWord && 'border-rose-700'} form-input`}
                 />
                <label className="mt-7" htmlFor="roles">سطح دسترسی</label>
                <select 
                    className="outline-none text-sm text-center rounded-xl p-3 mt-1 text-gray-700 bg-gray-200"
                    name="roles"
                    id="roles"
                    multiple
                    size={3}
                    value={roles}
                    onChange={onRolesChange}
                >{options}</select>
                <label className="mt-7" htmlFor="status">وضعیت</label>
                <div className='flex items-center gap-3'>
                    <input
                        id='status'
                        name='status'
                        type='checkbox'
                        checked={active}
                        onChange={onActiveChange}
                        className='mt-1 p-3 w-4 h-4 text-blue-600 bg-gray-100 outline-none border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <p>فعال</p>
                </div>
                </div>
                <div className="flex items-center gap-6">
                <button
                    disabled={!canSave}
                    className={`${!canSave && 'bg-[#afafd2] text-gray-500 border-[#afafd2]'} bg-[#5858FA] py-3 w-2/3 rounded-lg text-xl border-[1px] border-[#5858FA] hover:border-[#3636a3] hover:bg-[#3636a3] transition-all text-white`}
                 >ذخیره</button>
                <button 
                    onClick={handleModal}
                    className=" py-3 w-1/3 rounded-lg text-xl border-[1px] border-[#808080] dark:border-white hover:bg-black hover:text-white transition-all"
                >لغو</button>
            </div>
        </form>
    </div>
  )
}

export default EditUserForm