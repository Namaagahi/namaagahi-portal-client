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
import useAuth from "@/app/hooks/useAuth"

const Account = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false)

  const [isLogout, setIsLogout] = useState(false)

  const { name, status, avatar } = useAuth()

  const handleLogout = () => setIsLogout(!isLogout)

  return (
   <>
    <div 
      className="account-container"
      onClick={() => setShowAccountMenu(!showAccountMenu)}
    >
        <Image 
            className="rounded-full cursor-pointer hover:scale-110 transition-all"
            src={avatar!}
            alt="profile-image"
            width={35}
            height={35}
        />
        <p className="text-white dark:text-black font-bold">{name}</p>
        <p className="text-white dark:text-black">{status}</p>
        
        {showAccountMenu &&
          <div className="account-menu-container">
          <ul className="space-y-3">
            <li className="font-medium">
              <div
                className="account-menu-item">
                <div className="text-2xl">
                  <BiUser/>
                </div>
                پروفایل
              </div>
            </li>
            <li className="font-medium">
              <Link href="#" className="account-menu-item">
                <div className="text-2xl">
                  <AiOutlineSetting />
                </div>
                تنظیمات
              </Link>
            </li>
            <hr className="dark:border-gray-700"/>
            <li
              className="account-menu-logout-item"
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
        type={'logout'}
        handleModal={handleLogout}
       />
    }
   </>
  )
}

export default Account