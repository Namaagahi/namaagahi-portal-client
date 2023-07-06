"use client"
import { structuresApiSlice } from '../features/structures/structuresApiSlice'
import { useRefreshMutation } from '../features/auth/authApiSlice'
import { usersApiSlice } from "../features/users/usersApiSlice"
import { selectCurrentToken } from '../features/auth/authSlice'
import { boxesApiSlice } from '../features/boxes/boxesApiSlice'
import { notesApiSlice } from "../features/note/notesApiSlice"
import { menuItems, subMenusList } from "../lib/constants"
import { store } from "../config/state-config/store"
import { useEffect, useRef, useState } from "react"
import Header from '../features/header/Header'
import Footer from '../features/footer/Footer'
import Menu from '../features/sidemenu/Menu'
import { useSelector } from "react-redux"
import { ROLES } from '../config/roles'
import Link from "next/link"
import useAuth from '../hooks/useAuth'
import dynamic from 'next/dynamic'
const Loading = dynamic(
  () => import('../features/loading/Loading'),
  { ssr: false }
)

const MainLayout = ({children}: {children: React.ReactNode}) => {

  const { roles } = useAuth()
  const token = useSelector(selectCurrentToken)
  const effectRan = useRef(false)
  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh, {
      isUninitialized,
      isLoading,
      isSuccess,
      isError,
  }] = useRefreshMutation()

  useEffect(() => {
    const verifyRefreshToken = async () => {
    try {
        await refresh(undefined)
        setTrueSuccess(true)
      } catch (error) { 
        console.log(error) 
      }
    }
    if(!token) verifyRefreshToken()
    return () => { effectRan.current = true }
      // eslint-disable-next-line
  }, [trueSuccess])

  // useEffect(()=> {
  //   const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate(undefined))
  //   const boxes = store.dispatch(boxesApiSlice.endpoints.getAllBoxes.initiate(undefined))
  //   const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate(undefined))
  //   const structures = store.dispatch(structuresApiSlice.endpoints.getStructures.initiate(undefined))

  //   return () => {
  //     users.unsubscribe()
  //     boxes.unsubscribe()
  //     notes.unsubscribe()
  //     structures.unsubscribe()
  //   }
  // }, [])


  let content

  if(roles.some((role: string) => Object.values(ROLES).includes(role))) {
    
    if (isLoading) {
      content = <Loading />
    } else if(isError) { 
      content = (
          <p>
            <Link href={"/"}>دوباره وارد شوید</Link>.
          </p>
      )
    } else if (isSuccess && trueSuccess) {
      content = children
    } else if (token && isUninitialized) {
      content = children
    }
  } 

  return (
    <div className="p-4 md:p-8">
      <Header/> 
      <div className=" flex flex-col xl:flex-row gap-8 ">
        <Menu menuItems = {menuItems} subMenusList={subMenusList} />
        <div className="w-[calc(100%-270px)] flex flex-col min-h-screen ">
          {content}
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default MainLayout