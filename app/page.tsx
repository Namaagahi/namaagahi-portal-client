"use client"
import Image from "next/image"
import { userLogin } from "./apis"
import { useEffect, useRef, useState } from "react"
import { selectUser, setCurrentUser } from "./state/slice"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Logo from "./components/main/LogoSmall"

export default function Home() {
  const userRef = useRef<any>()
  const errRef = useRef<any>()
  const thisAdmin = useSelector(selectUser);
  const dispatch = useDispatch();



  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: '',
    errMsg:''
  })

  useEffect(() => {
    userRef.current?.focus()
  },[])

  useEffect(() => {

  },[loginInfo.username, loginInfo.password])

  useEffect(() => {
    setTimeout(() => setLoginInfo({...loginInfo, errMsg:''}), 5000)
  },[loginInfo.errMsg])

  const login = async() => {
    try {
      const res = await userLogin(loginInfo.username, loginInfo.password)
      const accessToken = res?.data.accessToken
      const roles = res?.data?.roles
      toast.success("با موفقیت وارد شدید");
      console.log(accessToken , roles)
    } catch (error : any) {
        if(!error.response) setLoginInfo({...loginInfo, errMsg:'خطای اتصال به سرور'})
        else if(error.response?.status == 400) setLoginInfo({...loginInfo, errMsg:'نام کاربری و رمز عبور را وارد کنید.'})
        else if(error.response?.status == 401) setLoginInfo({...loginInfo, errMsg:'نام کاربری یا رمز عبور اشتباه است.'})
        else setLoginInfo({...loginInfo, errMsg:'ورود ناموفق. با پشتیبانی تماس بگیرید.'})
        errRef.current.focus()
    }
  }

  return (
    <div>
      <Logo />
      <div className="grid xl:grid-cols-2 grid-cols-1 py-12 xl:py-48 px-10 xl:px-40 gap-24 place-items-center">
        <div className="order-last opacity-60 ">
          <Image
            src={'/images/Logo-Black-text.png'}
            alt="hero"
            width={740}
            height={290}
        />
        </div>
        <div className="flex flex-col w-full text-center">
          <p className="md:text-5xl text-3xl font-bold text-primary ">{process.env.TITLE}</p> 
          <div className="flex flex-col items-center mt-10 xl:mt-20 relative mb-16">
            <p className="text-4xl font-bold mb-2">ورود</p>
            <hr className="w-48 h-0.5 bg-[#FA9E93] border-0 rounded mb-2  "></hr>
            <p className="text-xl text-[#C91416] mb-2">وارد پنل کاربری خود شوید</p>
            <p className={`${loginInfo.errMsg.length? 'error-container absolute top-28 left-1/2': 'invisible '}  `}>
            {loginInfo.errMsg? loginInfo.errMsg : ''}
          </p>
          </div>
          <div className="flex flex-col items-center gap-4 ">
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
          </div>
          <button 
            className="btn-primary"
            onClick={login}
          >
            ورود
          </button>
        </div>
      </div>
    </div>
  )
}
