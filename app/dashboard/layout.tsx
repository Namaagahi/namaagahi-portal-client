"use client"
import { MdDashboardCustomize, MdBusinessCenter } from 'react-icons/md'
import { usersApiSlice } from "../features/users/usersApiSlice"
import { notesApiSlice } from "../features/note/notesApiSlice"
import { store } from "../config/state-config/store"
import { MenuItemsObj } from "../lib/interfaces"
import { FaFileContract } from "react-icons/fa"
import Header from "../features/header/Header"
import Footer from "../features/footer/Footer"
import Menu from "../features/sidemenu/Menu"
import { TbPackages } from 'react-icons/tb'
import { HiUsers } from 'react-icons/hi2'
import { IoGrid } from 'react-icons/io5'
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useRefreshMutation } from '../features/auth/authApiSlice'
import Loading from '../features/loading/Loading'
import { selectCurrentToken } from '../features/auth/authSlice'
import usePersist from '../hooks/usePersist'

const MainLayout = ({children}: {children: React.ReactNode}) => {

  const [persist] = usePersist()

  const token = useSelector(selectCurrentToken)
  console.log('TOKEN', token)

  const effectRan = useRef(false)

  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh, {
      isUninitialized,
      isLoading,
      isSuccess,
      isError,
      error
  }] = useRefreshMutation()

  useEffect(() => {
    const verifyRefreshToken = async () => {
    console.log('verifying refresh token')
    try {
        await refresh(undefined)
        setTrueSuccess(true)
      } catch (error) { console.log(error) }
    }
    if(!token && persist) verifyRefreshToken()
    return () => { effectRan.current = true }
      // eslint-disable-next-line
  }, [])

  useEffect(()=> {
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate(undefined))
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate(undefined))

    return () => {
      notes.unsubscribe()
      users.unsubscribe()
    }
  }, [])


  const menuItems: MenuItemsObj[] = [{
    name: 'داشبورد',
    path: '/dashboard',
    icon: <IoGrid size={20} />
  },
  {
    name: 'کاربران',
    path: '/dashboard/users',
    icon: <HiUsers size={20} />
  },
  {
    name: 'پکیج ها',
    path: '/dashboard/packages',
    icon: <TbPackages size={20} />
  },
  {
    name: 'پلن ها',
    path: '/dashboard/plans',
    icon: <MdBusinessCenter size={20} />
  },
  {
    name: 'قراردادها',
    path: '/dashboard/contracts',
    icon: <FaFileContract size={20} />
  }, {
    name: 'وظایف',
    path: '/dashboard/tasks',
    icon: <MdDashboardCustomize size={20} />
}]

let content
if (!persist) {
  content = children
} else if (isLoading) {
  content = <Loading />
} else if (isError) { 
  content = (
      <p>
          {`${error?.data?.message} - `}
          <Link href={"/"}>Please login again</Link>.
      </p>
  )
} else if (isSuccess && trueSuccess) {
  content = children
} else if (token && isUninitialized) {
  content = children
}

  return (
    <div className="p-4 md:p-8">
      <Header/> 
      <div className=" flex flex-col xl:flex-row gap-8 ">
        <Menu menuItems = {menuItems} />
        <div className="w-full flex flex-col min-h-screen ">
          {content}
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default MainLayout