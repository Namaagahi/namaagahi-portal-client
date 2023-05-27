"use client"
import { selectCurrentToken } from "@/app/features/auth/authSlice"
import { useSelector } from "react-redux"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { IoMdExit } from 'react-icons/io'
import { AiOutlineSetting } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import { useSendLogoutMutation } from "../auth/authApiSlice"
import ConfirmModal from "@/app/components/modals/ConfirmModal"

const Account = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false)

  const [isLogout, setIsLogout] = useState(false)

  const handleLogout = () => setIsLogout(!isLogout)

  const accessToken: any = useSelector(selectCurrentToken)

  return (
   <>
    <div 
      className="relative bg-black dark:bg-white p-3 rounded-[44px] flex justify-center items-center gap-3 text-white dark:text-black"
      onClick={() => setShowAccountMenu(!showAccountMenu)}
    >
        {/* <Image 
            className="rounded-full cursor-pointer hover:scale-110 transition-all"
            src={user?.avatar!}
            alt="profile-image"
            width={35}
            height={35}
        />
        <p className="text-white dark:text-black font-bold">{user?.name}</p>
        {
        user?.roles.Admin? 
          <p className="text-white dark:text-black">ادمین</p> :
           user?.roles.MediaManager?
            <p className="text-white dark:text-black">مدیر رسانه</p> : 
            <p className="text-white dark:text-black">پذیرشگر</p>
        } */}
        {/* x-show="open" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95" className="absolute w-60 px-5 py-3 dark:bg-gray-800 bg-white rounded-lg shadow border dark:border-transparent mt-5" */}
        {showAccountMenu &&
          <div className="absolute bg-black dark:bg-white top-2 right-2  w-32 px-5 py-3 rounded-xl">
          <ul className="space-y-3">
            <li className="font-medium">
              <Link href="#" className="flex items-center gap-3 justify-start transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700 cursor-pointer">
                <div className="text-2xl">
                  <BiUser/>
                </div>
                پروفایل
              </Link>
            </li>
            <li className="font-medium">
              <Link href="#" className="flex items-center gap-3 justify-start transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700 cursor-pointer">
                <div className="text-2xl">
                  <AiOutlineSetting />
                </div>
                تنظیمات
              </Link>
            </li>
            <hr className="dark:border-gray-700"/>
            <li
              className="font-medium flex items-center gap-3 justify-start transform transition-colors duration-200 border-r-4  cursor-pointer"
              onClick={handleLogout}
            >
                <div className="text-red-600 text-2xl">
                  <IoMdExit />
                </div>
                خروج
            </li>
          </ul>
        </div>
          }
    </div>
    {
      isLogout &&
       <ConfirmModal 
        type={'delete'}
        
       />
    }
   </>
  )
}

export default Account