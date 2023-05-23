"use client"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { toast } from 'react-toastify'
import Logo from "./components/main/LogoSmall"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { setCredentials } from "./features/auth/authSlice"
import { useLoginMutation } from "./features/auth/authApiSlice"
import Loading from "./features/loading/Loading"

export default function Home() {
  const userRef = useRef<HTMLInputElement>(null)
  const errRef = useRef<HTMLInputElement>()
  const router = useRouter()
  const dispatch = useDispatch()
  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: '', 
    errMsg:''
  })
  const { username, password } = loginInfo
  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {userRef.current?.focus()},[])

  useEffect(() => {setLoginInfo({...loginInfo, errMsg:''})},[username, password])

  const handleLogin = async () => {
    try {
      const userData = await login({username, password}).unwrap()
      console.log(userData)
      dispatch(setCredentials(userData))
      setLoginInfo({...loginInfo, username:'', password:''})
      toast.success("با موفقیت وارد شدید")
      router.push('/dashboard')
    } catch (error : Error | AxiosError | any) {
      console.log(error)
      if(!error.data) setLoginInfo({...loginInfo, errMsg:'خطای اتصال به سرور'})
      else if(error.status == 400) setLoginInfo({...loginInfo, errMsg:'نام کاربری و رمز عبور را وارد کنید.'})
      else if(error.status == 401) setLoginInfo({...loginInfo, errMsg:'نام کاربری یا رمز عبور اشتباه است.'})
      else setLoginInfo({...loginInfo, errMsg:'ورود ناموفق. با پشتیبانی تماس بگیرید.'})
      errRef.current?.focus()
    }
  }

  if(isLoading) return <Loading/>
  return (
    <div className='pr-6 pt-6 '>
      <Logo />
      <div className="grid xl:grid-cols-2 grid-cols-1 py-12 xl:py-48 px-10 xl:px-40 gap-24 place-items-center">
        <div className="order-last opacity-60 ">
          <Image
            src={'/images/Logo-Black-text.png'}
            alt="hero"
            width={740}
            height={290}
            priority
          />
        </div>
        <div className="flex flex-col w-full text-center">
          <p className="md:text-5xl text-3xl font-bold text-primary dark:text-yellow-400 ">{process.env.TITLE}</p> 
          <div className="flex flex-col items-center mt-10 xl:mt-20 relative mb-16">
            <p className="text-4xl font-bold mb-2">ورود</p>
            <hr className="w-48 h-0.5 bg-[#FA9E93] border-0 rounded mb-2  "></hr>
            <p className="text-xl text-[#C91416] dark:text-pink-300 mb-2">وارد پنل کاربری خود شوید</p>
            <p className={`${loginInfo.errMsg.length? 'error-container absolute top-28 left-1/2': 'invisible '}  `}>
            {loginInfo.errMsg? loginInfo.errMsg : ''}
          </p>
          </div>
          <form className="flex flex-col items-center gap-4">
            <input
              className="input-primary"
              type="text" 
              placeholder="نام کاربری"
              ref={userRef}
              autoComplete="off"
              value={loginInfo.username}
              required
              onChange={(e) => setLoginInfo({...loginInfo, username: e.target.value}) }
            />
            <input 
              className="input-primary" 
              type="password" 
              placeholder="رمز عبور" 
              autoComplete="off"
              value={loginInfo.password}
              required
              onChange={(e) => setLoginInfo({...loginInfo, password: e.target.value}) }
              />
          </form>
          <button 
            className="btn-primary"
            onClick={handleLogin}
          >
            ورود
          </button>
        </div>
      </div>
    </div>
  )
}
