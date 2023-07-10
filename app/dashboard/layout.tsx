"use client"
import { useRefreshMutation } from '../features/auth/authApiSlice'
import { selectCurrentToken } from '../features/auth/authSlice'
import { menuItems, subMenusList } from "../lib/constants"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Header from '../features/header/Header'
import Footer from '../features/footer/Footer'
import Menu from '../features/sidemenu/Menu'
import { useSelector } from "react-redux"
import { ROLES } from '../config/roles'
import Link from "next/link"
import useAuth from '../hooks/useAuth'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
const Loading = dynamic(
  () => import('../features/loading/Loading'),
  { ssr: false }
)

const MainLayout = ({children}: {children: React.ReactNode}) => {

  const { roles } = useAuth()
  const token = useSelector(selectCurrentToken)
  const effectRan = useRef(false)
  const [trueSuccess, setTrueSuccess] = useState(false)
  const{ push } = useRouter()

  const [refresh, {
      isUninitialized,
      isLoading,
      isSuccess,
      isError,
  }] = useRefreshMutation()

  useLayoutEffect(() =>{
    if(!token) push('/')
  },[])

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