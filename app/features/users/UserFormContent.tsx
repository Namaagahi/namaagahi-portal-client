import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { CustomError } from "@/app/lib/interfaces";
import { ROLES } from "@/app/config/roles";
import useAuth from "@/app/hooks/useAuth";

type Props = {
  error: FetchBaseQueryError | SerializedError | undefined | CustomError | any;
  isError: boolean;
  name: string;
  username: string;
  password: string;
  roles: string[];
  active?: boolean;
  type: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUserameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onActiveChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRolesChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const UserFormContent = (props: Props) => {
  const { isMaster } = useAuth();

  const {
    isError,
    name,
    username,
    password,
    roles,
    active,
    onNameChange,
    onUserameChange,
    onPasswordChange,
    onActiveChange,
    onRolesChange,
    type,
  } = props;

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

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
        className={`${isError && "border-rose-700"} formInput2`}
      />

      <label className="mt-7" htmlFor="username">
        ایمیل کاربری
      </label>

      <input
        type="email"
        placeholder="ایمیل کاربری"
        id="name"
        defaultValue={username}
        autoComplete="off"
        onChange={onUserameChange}
        className={`${isError && "border-rose-700"} formInput2`}
      />

      <label className="mt-7" htmlFor="password">
        رمز عبور
      </label>

      <input
        type="text"
        placeholder="رمز عبور ترکیبی از اعداد و حروف انگلیسی"
        id="password"
        value={password}
        autoComplete="off"
        onChange={onPasswordChange}
        className={`${isError && "border-rose-700"} formInput2`}
      />

      {isMaster && (
        <>
          <label className="mt-7" htmlFor="roles">
            سطح دسترسی
          </label>

          <select
            className="outline-none text-sm text-center rounded-xl p-3 mt-1 text-gray-700 bg-gray-200"
            name="roles"
            id="roles"
            multiple
            size={3}
            value={roles}
            onChange={onRolesChange}
          >
            {options}
          </select>

          {type === "edit" && (
            <>
              <label className="mt-7" htmlFor="status">
                وضعیت
              </label>

              <div className="flex items-center gap-3">
                <input
                  id="status"
                  name="status"
                  type="checkbox"
                  checked={active}
                  onChange={onActiveChange}
                  className="mt-1 p-3 w-4 h-4 text-blue-600 bg-gray-100 outline-none border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <p>فعال</p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UserFormContent;
