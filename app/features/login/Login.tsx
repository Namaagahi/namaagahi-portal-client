"use client"
import { setCredentials } from "../../apiSlices/authSlice"
import { useLoginMutation } from "../../apiSlices/authApiSlice"
import LogoSmall from "@/app/components/main/LogoSmall"
import { useDispatch } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from 'react-toastify'
import Image from "next/image"
import Cookies from "universal-cookie";
import dynamic from 'next/dynamic'
const Loading = dynamic(
  () => import('../loading/Loading'),
  { ssr: false }
)

const Login = () => {
    
    const userRef = useRef<HTMLInputElement>(null)
    const errRef = useRef<HTMLInputElement>()
    const { push } = useRouter()
    const dispatch = useDispatch()
    
    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: '', 
        errMsg:''
    })
    const { username, password } = loginInfo
    const cookies = new Cookies()
    const accessToken = cookies.get("jwt")
  
    useEffect(() => {
      if (accessToken) {
        push("/dashboard")
      }
    }, [accessToken, push])

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {userRef.current?.focus()}, [])
    useEffect(() => {userRef.current?.focus()}, [])
    useEffect(() => {setLoginInfo({...loginInfo, errMsg:''})}, [username, password])

    const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => setLoginInfo({...loginInfo, username: e.target.value})
    const handlePasswordInput = ((e: React.ChangeEvent<HTMLInputElement>) => setLoginInfo({...loginInfo, password: e.target.value}))

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            toast.success(`${username} خوش آمدید!`)
            setLoginInfo({...loginInfo, username:'', password:''})
            push('/dashboard')

        } catch (error: any) {

            if(!error.status) setLoginInfo({...loginInfo, errMsg: 'خطای اتصال به سرور'})
            else if(error.status === 400) setLoginInfo({...loginInfo, errMsg: 'نام کاربری و رمز عبور را وارد کنید.'})
            else if(error.status === 401) setLoginInfo({...loginInfo, errMsg: 'نام کاربری و یا رمز عبور اشتباه است.'})
            else setLoginInfo({...loginInfo, errMsg: error.data?.message})

        }
        errRef.current?.focus()
    }

    if(isLoading) return <Loading/>
    if(accessToken) push('/dashboard')
    
    return (
        <div className='pr-6 pt-6 '>
            <LogoSmall />
            <div className="grid xl:grid-cols-2 grid-cols-1 py-12 xl:py-48 px-10 xl:px-40 gap-24 place-items-center">
                <div className="order-last opacity-60 block dark:hidden relative w-[740px] h-[292px]">
                    <Image
                        src={'/images/Logo-Black-text.webp'}
                        alt="hero"
                        fill
                        loading="eager"
                        fetchPriority="high"
                        priority
                    />
                </div>

                <div className="order-last opacity-60 relative w-[740px] h-[292px]">
                    <Image
                        src={'/images/Logo-White-Text.webp'}
                        alt="hero"
                        fill
                        loading="eager"
                        fetchPriority="high"
                    />
                </div>

                <div className="flex flex-col w-full text-center">
                    <p className="md:text-5xl text-3xl font-bold text-primary dark:text-yellow-400 ">{process.env.TITLE}</p> 
                    <div className="flex flex-col items-center mt-10 xl:mt-20 relative mb-16">
                        <p className="text-4xl font-bold mb-2">ورود</p>
                        <hr className="w-48 h-0.5 bg-[#FA9E93] border-0 rounded mb-2  "></hr>
                        <p className="text-xl text-[#C91416] dark:text-pink-300 mb-2">وارد پنل کاربری خود شوید</p>
                        <p className={`${loginInfo.errMsg?.length? 'error-container absolute top-28 left-1/2': 'invisible '}  `}>
                        {loginInfo.errMsg? loginInfo.errMsg : ''}
                        </p>
                    </div>

                    <form 
                        className="flex flex-col items-center gap-4"
                        onSubmit={handleSubmit}
                    >
                        <input
                            className="input-primary"
                            type="text" 
                            placeholder="نام کاربری"
                            ref={userRef}
                            autoComplete="off"
                            value={username}
                            onChange={handleUsernameInput}
                            data-lpignore="true"
                        />

                        <input 
                            className="input-primary" 
                            type="password" 
                            placeholder="رمز عبور" 
                            autoComplete="off"
                            value={password}
                            onChange={handlePasswordInput}
                            data-lpignore="true"
                            />

                        <button className="btn-primary">
                        ورود
                        </button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Login