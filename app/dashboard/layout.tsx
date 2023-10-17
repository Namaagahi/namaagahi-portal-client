"use client"
import { useRefreshMutation } from '../apiSlices/authApiSlice'
import { menuItems } from "../lib/constants"
import { useEffect, useRef, useState } from "react"
import Header from '../features/header/Header'
import Footer from '../features/footer/Footer'
import Menu from '../features/sidemenu/Menu'
import { useRouter } from 'next/navigation'
import { ROLES } from '../config/roles'
import useAuth from '../hooks/useAuth'
import Link from "next/link"
import dynamic from 'next/dynamic'
import { SocketProvider } from '../config/state-config/SocketContext'
import Cookies from 'universal-cookie'
const Loading = dynamic(
  () => import('../features/loading/Loading'),
  { ssr: false }
)

const MainLayout = ({ children }: { children: React.ReactNode }) => {

  const { roles } = useAuth()
  const token = typeof window !== 'undefined' && window.localStorage.getItem("CC_Token")
  const effectRan = useRef<boolean>(false)
  const [trueSuccess, setTrueSuccess] = useState<boolean>(false)
  const{ push } = useRouter()
const cookies = new Cookies()
  const [refresh, {
      isUninitialized,
      isLoading,
      isSuccess,
      isError,
  }] = useRefreshMutation()

  useEffect(() => {
    const verifyRefreshToken = async () => {
      console.log("USEEEEEEEEEEEEEEEEEEEEEEEFFECT")
    try {
        await refresh(undefined)
        const jwtToken = cookies.get('jwt')
console.log("jwtToken", jwtToken)
        if (jwtToken) {
          localStorage.setItem('CC_Token', jwtToken)
        }
        setTrueSuccess(true)
      } catch (error) { 
        console.log(error) 
      }
    }

    if(!token) verifyRefreshToken()
    return () => { effectRan.current = true }
      // eslint-disable-next-line
  }, [])

  const accessToken = typeof window !== 'undefined' && window.localStorage && window.localStorage.getItem("CC_Token")
console.log("accessToken", accessToken)
  useEffect(() => {
    if (!accessToken) {
      push("/")
    }
  }, [accessToken, push])

  let content

  if(roles.some((role: string) => Object.values(ROLES).includes(role))) {
    if (isLoading) {
      content = <Loading />
    } else if(isError) { 
      content = (
          <p>
            <Link href={"/"}>
              دوباره وارد شوید
            </Link>
          </p>
      )
    } else if (isSuccess && trueSuccess) {
      content = children
    } else if (token && isUninitialized) {
      content = children
    }
  } 
console.log("trueSuccess", trueSuccess)
  return (
    <SocketProvider>
      <div className="p-4 md:p-8">
        <Header/> 
        <div className=" flex flex-col xl:flex-row gap-8 ">
          <Menu menuItems = {menuItems} />
          <div className="xl:w-[calc(100%-300px)] w-full flex flex-col min-h-[2000px] ">
            {content}
            <Footer />
          </div>
        </div>
      </div>
    </SocketProvider>
    )
}

export default MainLayout