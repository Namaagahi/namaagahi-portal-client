import { User } from "@/app/lib/interfaces"
import Image from "next/image"
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'

const Table = ({users}:{users: User[]}) => {
  return (
    <div className="relative overflow-x-auto mt-5">
    <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400 ">
        <thead className="font-bold py-2 text-gray-700 dark:text-gray-400 border-y-2 border-y-[#FA9E93]  ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    آواتار
                </th>
                <th scope="col" className="px-6 py-3">
                    نام  
                </th>
                <th scope="col" className="px-6 py-3">
                    نام کاربری
                </th>
                <th scope="col" className="px-6 py-3">
                    سطح دسترسی
                </th>
                <th scope="col" className="px-6 py-3">
                    عملیات
                </th>
            </tr>
        </thead>
        <tbody>
            {users.map((user : User) => {
                return(
                    <tr 
                    key={user._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <Image
                                src={user.avatar}
                                alt="avatar"
                                width={35}
                                height={35}
                            />
                        </th>
                        <td className="px-6 py-4">{user.name}</td>
                        <td className="px-6 py-4">{user.username}</td>
                        <td className="px-6 py-4">{user?.roles.Admin? 
                            <p>ادمین</p> :
                            user?.roles.MediaManager?
                                <p>مدیر رسانه</p> : 
                                <p>پذیرشگر</p>}
                        </td>
                        <td className="px-6 py-4 flex items-center gap-5">
                            <div className="flex items-center p-1 border-[1px] border-[#737373] rounded-md cursor-pointer">
                                <AiFillEdit className="text-black dark:text-white hover:scale-125 transition-all" size={20}/>
                            </div>
                            <div className="flex justify-center items-center p-1 border-[1px] border-[#737373] rounded-md cursor-pointer">
                                <AiFillDelete className="text-orange-600 dark:text-white hover:scale-125 transition-all" size={20}/>
                            </div>
                        </td>
                    </tr>
                )
            })}
        </tbody>
    </table>
</div>
  )
}

export default Table