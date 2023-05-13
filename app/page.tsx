"use client"
import Image from "next/image";
import { userLogin } from "./apis";
import { useState } from "react";

export default function Home() {

  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: ''
  })

  const login = async() => {
   const data = await userLogin(loginInfo.username, loginInfo.password)
    console.log(data)
  }

  return (
    <div>
      <Image
        src={'/images/Logo.png'}
        alt="logo"
        width={50}
        height={50}
      />
      <div className="grid xl:grid-cols-2 grid-cols-1 py-12 xl:py-48 px-10 xl:px-40 gap-24 place-items-center">
        <div className="order-last opacity-60">
          <Image
            src={'/images/Logo-Black-text.png'}
            alt="hero"
            width={740}
            height={290}
        />
        </div>
        <div className="flex flex-col w-full text-center">
          <p className="text-2xl font-bold text-primary ">{process.env.TITLE}</p> 
          <div className="flex flex-col items-center gap-2 mt-10 xl:mt-20">
            <p className="text-4xl font-bold">ورود</p>
            <hr className="w-48 h-0.5 bg-[#FA9E93] border-0 rounded  "></hr>
            <p className="text-xl text-[#C91416]">وارد پنل کاربری خود شوید</p>
          </div>
          <div className="flex flex-col items-center gap-4 mt-8">
            <input
              className="bg-[#E6E6E6] outline-none p-5 rounded-2xl w-[70%] text-[#737373]"
              type="text" 
              placeholder="نام کاربری"
              onChange={(e) => setLoginInfo({...loginInfo, username: e.target.value}) }
            />
            <input 
              className="bg-[#E6E6E6] outline-none p-5 rounded-2xl w-[70%] text-[#737373]" 
              type="password" 
              placeholder="رمز عبور" 
              onChange={(e) => setLoginInfo({...loginInfo, password: e.target.value}) }
              />
          </div>
          <button 
            className="mt-12 w-[30%] h-16 mx-auto bg-[#EC6453] rounded-xl text-white text-2xl font-bold hover:bg-[#741f12] transition-all"
            onClick={login}
          >
            ورود
          </button>
        </div>
      </div>
    </div>
  )
}
