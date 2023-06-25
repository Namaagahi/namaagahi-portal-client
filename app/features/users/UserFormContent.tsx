import { UserFormProps } from '@/app/lib/interfaces';
import { ROLES } from '@/app/config/roles';
import useAuth from '@/app/hooks/useAuth';

const UserFormContent = (props: UserFormProps) => {

    const { isAdmin } = useAuth()

    const {
            isError,
            name,
            username,
            password,
            validUserName,
            validPassWord,
            roles,
            active,
            onNameChange,
            onUserameChange,
            onPasswordChange,
            onActiveChange,
            onRolesChange
        }
        = props

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

  return (
    <div className="flex flex-col pt-12 pb-7">
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

        {
            isAdmin &&
            <>
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
                        // checked={active}
                        onChange={onActiveChange}
                        className='mt-1 p-3 w-4 h-4 text-blue-600 bg-gray-100 outline-none border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <p>فعال</p>
                </div>
            </>
        }
    </div>
  )
}

export default UserFormContent