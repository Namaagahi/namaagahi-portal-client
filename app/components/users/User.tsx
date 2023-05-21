import { selectUserById } from "@/app/state & api/usersApiSlice"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import EditModal from "../modals/EditModal"
import { UserObject } from "@/app/lib/interfaces"
import Image from "next/image"
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import Status from "../main/Status"

const User = ({ userId }: { userId: string }) => {
    const user: UserObject | any = useSelector(state => selectUserById(state, userId))
    console.log(user)
    const { push } = useRouter()
    if(user) {
        const handleEdit = () => <EditModal />
        const userRolesString = user.roles.toString().replaceAll(',',', ')
        const cellStatus = user.active ? '' : 'bg-red-500'
        return (
            user && 
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
                <td className="px-6 py-4">
                    {user?.roles.includes("Admin") ? 
                        <p>ادمین</p> : 
                        user?.roles.includes("MediaManager") ? 
                        <p>مدیر رسانه</p> : 
                        <p>پذیرشگر</p> 
                    }
                </td>
                <td className="px-6 py-4 flex items-center gap-5">
                    <div className="flex items-center p-1 border-[1px] border-[#737373] rounded-md cursor-pointer">
                        <AiFillEdit className="text-black dark:text-white hover:scale-125 transition-all" size={20}/>
                    </div>
                    <div className="flex justify-center items-center p-1 border-[1px] border-[#737373] rounded-md cursor-pointer">
                        <AiFillDelete className="text-orange-600 dark:text-white hover:scale-125 transition-all" size={20}/>
                    </div>
                </td>
                <td className="px-6 py-4">
                    {user.active? 
                    <Status 
                        status = {'فعال'} 
                        bgColor = {'#a8edbb'}
                        textColor = {'#0a541e'}
                    />
                    : 
                    <Status
                        status = {'غیرفعال'}
                        bgColor = {'#d96f85'}
                        textColor = {'#2e030c'}
                    />    
                }
                </td>
            </tr>
        )
    } else return null
}

export default User