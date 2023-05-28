"use client"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "../features/auth/authSlice"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import PageTitle from "../components/main/PageTitle"

const Dashboard = () => {

  return (
    <main className="min-h-screen">
      <PageTitle name={'داشبورد'} />
    </main>
  )
}

export default Dashboard 