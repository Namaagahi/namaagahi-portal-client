"use client"
import dynamic from 'next/dynamic'

const Login = dynamic(
  () => import('./features/login/Login'),
  { ssr: false }
)

export default function Home() {

  return (
    <Login />
  )
}
