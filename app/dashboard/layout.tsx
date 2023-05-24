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
import { useEffect } from "react"

const MainLayout = ({children}: {children: React.ReactNode}) => {

  useEffect(()=> {
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate())
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

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

  return (
    <div className="p-4 md:p-8">
      <Header/> 
      <div className=" flex flex-col xl:flex-row gap-8 ">
        <Menu menuItems = {menuItems} />
        <div className="w-full flex flex-col min-h-screen ">
          {children}
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default MainLayout