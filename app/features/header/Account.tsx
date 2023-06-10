"use client"
import { selectCurrentToken } from "@/app/features/auth/authSlice"
import { useSelector } from "react-redux"
import Image from "next/image"
import { useState, useEffect } from "react"
import Link from "next/link"
import { IoMdExit } from 'react-icons/io'
import { AiOutlineSetting } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import useAuth from "@/app/hooks/useAuth"
import { UserObject } from "@/app/lib/interfaces"
import { selectUserById } from "../users/usersApiSlice"
import dynamic from 'next/dynamic'
const ConfirmModal = dynamic(
  () => import('@/app/components/modals/ConfirmModal'),
  { ssr: false }
)
const CreateUpdateModal = dynamic(
  () => import('@/app/components/modals/CreateUpdateModal'),
  { ssr: false }
)

const Account = () => {

  const { id } = useAuth()  

  const user: UserObject | any = useSelector(state => selectUserById(state, id))

  const [showAccountMenu, setShowAccountMenu] = useState(false)

  const [isLogout, setIsLogout] = useState(false)

  const [isEditProfile, setIsEditProfile] = useState(false)

  const { name, status, avatar } = useAuth()

  const handleLogout = () => setIsLogout(!isLogout)

  const handleEditProfile = () => setIsEditProfile(!isEditProfile)
  // console.log("USER",user)

  return (
   <>
    <div 
      className="account-container"
      onClick={() => setShowAccountMenu(!showAccountMenu)}
    >
        <Image 
            className="rounded-full cursor-pointer hover:scale-110 transition-all"
            src={avatar}
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
                className="account-menu-item"
                onClick={handleEditProfile}
                >
                <BiUser className="text-2xl"/>
                <p>پروفایل</p>
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

    {
      isEditProfile && 
      <CreateUpdateModal
        type={'editUser'}
        handleModal={handleEditProfile} 
        prop={user}
      />
    }
   </>
  )
}

export default Account