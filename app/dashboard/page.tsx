"use client"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "../features/auth/authSlice"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Dashboard = () => {
  const token = useSelector(selectCurrentToken)
  const { push } = useRouter()
  console.log(token)

  useEffect(() => {!token && push('/')}, [])

  return (
    <main className="ml-[330px] md:ml-0">Dashboard</main>
  )
}

export default Dashboard