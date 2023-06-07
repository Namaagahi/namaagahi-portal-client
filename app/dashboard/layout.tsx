"use client"
import { MdDashboardCustomize, MdWorkspacesFilled, MdPermMedia } from 'react-icons/md'
import { usersApiSlice } from "../features/users/usersApiSlice"
import { notesApiSlice } from "../features/note/notesApiSlice"
import { store } from "../config/state-config/store"
import { MenuItemsObj } from "../lib/interfaces"
import { FaBus, FaSubway, FaBroadcastTower } from "react-icons/fa"
import Header from "../features/header/Header"
import Footer from "../features/footer/Footer"
import Menu from "../features/sidemenu/Menu"
import { SiBillboard } from 'react-icons/si'
import { HiUsers } from 'react-icons/hi2'
import { IoGrid } from 'react-icons/io5'
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useRefreshMutation } from '../features/auth/authApiSlice'
import Loading from '../features/loading/Loading'
import { selectCurrentToken } from '../features/auth/authSlice'
import usePersist from '../hooks/usePersist'
import { useRouter } from 'next/navigation'
import useAuth from '../hooks/useAuth'
import { ROLES } from '../config/roles'
import { structuresApiSlice } from '../features/structures/structuresApiSlice'


const MainLayout = ({children}: {children: React.ReactNode}) => {

  const { roles } = useAuth()

  const [persist] = usePersist()

  const token = useSelector(selectCurrentToken)

  const effectRan = useRef(false)

  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh, {
      isUninitialized,
      isLoading,
      isSuccess,
      isError,
      error
  }] = useRefreshMutation()

  const { push } = useRouter()

  useEffect(() => {
    const verifyRefreshToken = async () => {
    try {
        await refresh(undefined)
        setTrueSuccess(true)
      } catch (error) { console.log(error) }
    }
    if(!token && persist) verifyRefreshToken()
    return () => { effectRan.current = true }
      // eslint-disable-next-line
  }, [trueSuccess])

  useEffect(()=> {
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate(undefined))
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate(undefined))
    const structures = store.dispatch(structuresApiSlice.endpoints.getStructures.initiate(undefined))

    return () => {
      notes.unsubscribe()
      users.unsubscribe()
      structures.unsubscribe()
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
    name: 'وظایف',
    path: '/dashboard/tasks',
    icon: <MdDashboardCustomize size={20} />
  }
  ]

  const subMenusList = [
    {
      name: "رسانه",
      icon: <MdPermMedia size={20} />,
      menus: [
        {
          name: 'بیلبورد',
          icon: <SiBillboard size={20} />,
          path: '/dashboard/billboard'
        },
        {
          name: 'اتوبوس',
          icon: <FaBus size={20} />,
          path: '/dashboard/bus'
        },
        {
          name: 'مترو',
          icon: <FaSubway size={20} />,
          path: '/dashboard/subway'
        },
        {
          name: 'صدا و سیما',
          icon: <FaBroadcastTower size={20} />,
          path: '/dashboard/irib'
        },
        {
          name: 'نماوا',
          icon: <MdWorkspacesFilled size={20} />,
          path: '/dashboard/namava'
        },
      ]
    },
  ];

let content
if(roles.some((role: string) => Object.values(ROLES).includes(role))) {
  if (!persist) {
    content = children
  } else if (isLoading) {
    content = <Loading />
  } else if (isError) { 
    content = (
        <p>
            {/* {`${error?.data?.message} - `} */}
            <Link href={"/"}>Please login again</Link>.
        </p>
    )
  } else if (isSuccess && trueSuccess) {
    content = children
  } else if (token && isUninitialized) {
    content = children
  }
} else {
  push('/')
}

  return (
    <div className="p-4 md:p-8">
      <Header/> 
      <div className=" flex flex-col xl:flex-row gap-8 ">
        <Menu menuItems = {menuItems} subMenusList={subMenusList} />
        <div className="w-full flex flex-col min-h-screen ">
          {content}
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default MainLayout