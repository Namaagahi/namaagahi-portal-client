"use client"
import { selectCurrentToken, selectCurrentUser } from "@/app/features/auth/authSlice"
import { useSelector } from "react-redux"
import Image from "next/image"
import { UserObject } from '../../lib/interfaces'

const Account = () => {
  // const user: null | User = useSelector(selectCurrentUser)
  // const token = useSelector(selectCurrentToken)
  // console.log(user)
  // console.log(token)
  return (
    <div className="bg-black dark:bg-white p-3 rounded-[44px] flex justify-center items-center gap-3">
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
    </div>
  )
}

export default Account