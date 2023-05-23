import { ROLES } from "@/app/config/roles"
import { useAddNewUserMutation } from "@/app/features/users/usersApiSlice"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ImUserPlus } from 'react-icons/im'
import { AiOutlineClose } from 'react-icons/ai'
import { toast } from "react-toastify"

const USER_REGEX = /^[A-z]{3,20}$/
const PASSWORD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = ({handleModal}: {handleModal: () => void}) => {

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
        roles: ['Planner']
    })
    const { name, username, password, validUserName, validPassWord, roles } = newUserData

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
        if(canSave) await addNewUser({ name, username, password, roles })
        handleModal()
        toast.success('کاربر جدید با موفقیت ساخته شد')
    }

    const options = Object.values(ROLES).map((role: string) => {
        return (
            <option
                key={role}
                value={role}
            >
                {role}
            </option>
        )
    })
    console.log(newUserData)
  return (
    <div className="py-5 px-8 w-full text-black dark:text-white">
        <form
            className="flex flex-col"
            onSubmit={onSaveUserClick}
        >
            <div className="flex justify-between items-center">
                <p className="md:text-2xl text-xl font-bold">کاربر جدید</p>
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
                    onChange={(e) => setNewUserData({...newUserData, name: e.target.value})}
                    className={`${isError && 'border-rose-700'} form-input`}
                 />
                <label className="mt-7" htmlFor="username">نام کاربری</label>
                <input
                    type="username"
                    placeholder="نام کاربری انگلیسی"
                    id="name"
                    value={username}
                    autoComplete="off"
                    onChange={(e) => setNewUserData({...newUserData, username: e.target.value})}
                    className={`${!validUserName && 'border-rose-700'} form-input`}
                 />
                <label className="mt-7" htmlFor="password">رمز عبور</label>
                <input
                    type="text"
                    placeholder="رمز عبور ترکیبی از اعداد و حروف انگلیسی"
                    id="password"
                    value={password}
                    autoComplete="off"
                    onChange={(e) => setNewUserData({...newUserData, password: e.target.value})}
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

export default NewUserForm