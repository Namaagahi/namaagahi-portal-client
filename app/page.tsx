"use client"
import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from './features/auth/authSlice'
import { useLayoutEffect } from 'react'
import { useRouter } from 'next/navigation'

const Login = dynamic(
  () => import('./features/login/Login'),
  { ssr: false }
)

export default function Home() {

  const{ push } = useRouter()
  const token = useSelector(selectCurrentToken)

  useLayoutEffect(() =>{
    if(token) push('/dashboard')
  },[])

  return <Login /> 
}
