import { useLoginMutation } from "../auth/authApiSlice"
import LogoSmall from "@/app/components/main/LogoSmall"
import { useEffect, useRef, useState } from "react"
import { selectCurrentToken, setCredentials } from "../auth/authSlice"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import Loading from "../loading/Loading"
import { toast } from 'react-toastify'
import Image from "next/image"
import usePersist from "@/app/hooks/usePersist"

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

    const [persist, setPersist] = usePersist()

    const [login, { isLoading }] = useLoginMutation()

    const token = useSelector(selectCurrentToken)
  
    useEffect(() => {if(token) push('/dashboard')}, [])

    useEffect(() => {userRef.current?.focus()}, [])

    useEffect(() => {setLoginInfo({...loginInfo, errMsg:''})}, [username, password])

    const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => setLoginInfo({...loginInfo, username: e.target.value})

    const handlePasswordInput = ((e: React.ChangeEvent<HTMLInputElement>) => setLoginInfo({...loginInfo, password: e.target.value}))

    const handleToggle = () => setPersist((prev: any) => !prev)

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
            else if(error.status === 401) setLoginInfo({...loginInfo, errMsg: 'ورود غیر مجاز! با پشتیبانی تماس بگیرید.'})
            else setLoginInfo({...loginInfo, errMsg: error.data?.message})
            
        }
        errRef.current?.focus()
    }

    if(isLoading) return <Loading/>
    return (
        <div className='pr-6 pt-6 '>
            <LogoSmall />
            <div className="grid xl:grid-cols-2 grid-cols-1 py-12 xl:py-48 px-10 xl:px-40 gap-24 place-items-center">
                <div className="order-last opacity-60 block dark:hidden ">
                    <Image
                    src={'/images/Logo-Black-text.png'}
                    alt="hero"
                    width={740}
                    height={290} 
                    priority
                    />
                </div>

                <div className="order-last opacity-60 ">
                    <Image
                    src={'/images/Logo-White-text.png'}
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
                            required
                            onChange={handleUsernameInput}
                        />

                        <input 
                            className="input-primary" 
                            type="password" 
                            placeholder="رمز عبور" 
                            autoComplete="off"
                            value={password}
                            required
                            onChange={handlePasswordInput}
                            />

                        <label htmlFor="persist">
                            <input 
                                type="checkbox"
                                id="persist"
                                checked={persist}
                                onChange={handleToggle}
                                className="ml-1 p-3 w-4 h-4 text-blue-600 bg-gray-100 outline-none border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            مرا به خاطر بسپار
                        </label>

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