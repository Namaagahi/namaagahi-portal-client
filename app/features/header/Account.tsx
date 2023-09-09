"use client"
import CreateUpdateModal from "@/app/components/modals/CreateUpdateModal"
import ConfirmModal from "@/app/components/modals/ConfirmModal"
import { selectUserById } from "../../apiSlices/usersApiSlice"
import { AiOutlineSetting } from 'react-icons/ai'
import { UserObject } from "@/app/lib/interfaces"
import { useSelector } from "react-redux"
import useAuth from "@/app/hooks/useAuth"
import { IoMdExit } from 'react-icons/io'
import { BiUser } from 'react-icons/bi'
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

const Account = () => {

  const {
    id,
    name,
    status,
    avatar
  } = useAuth()
  
  const user: UserObject = useSelector(state => selectUserById(state, id) as UserObject)

  const [showAccountMenu, setShowAccountMenu] = useState<boolean>(false)
  const [isLogout, setIsLogout] = useState<boolean>(false)
  const [isEditProfile, setIsEditProfile] = useState<boolean>(false)

  const handleLogout = () => setIsLogout(!isLogout)

  const handleEditProfile = () => setIsEditProfile(!isEditProfile)

  return (
   <>
    <div 
      className="accountContainer"
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
        <div className="accountMenuContainer z-[1000]">
          <ul className="space-y-3">
            <li className="font-medium">
              <div
                className="accountMenuItem"
                onClick={handleEditProfile}
              >
                <BiUser className="text-2xl"/>
                <p>
                  پروفایل
                </p>
              </div>
            </li>

            <li className="font-medium">
              <Link href="#" className="accountMenuItem">
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