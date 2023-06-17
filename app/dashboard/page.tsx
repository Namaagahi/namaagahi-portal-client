"use client"
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import type { Value } from "react-multi-date-picker"
import { DateObject } from "react-multi-date-picker"
import { Calendar } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
const PageTitle = dynamic(
  () => import('@/app/components/main/PageTitle'),
  { ssr: false }
)
const Dashboard = () => {

  const [value, setValue] = useState<Value>(new DateObject({ calendar: persian, locale: persian_fa })) 

  // console.log(value.day)
  return (
    <main className="min-h-screen">
      <PageTitle name={'داشبورد'} />
      <div className="w-full">
      <Calendar
          calendar={persian}
          locale={persian_fa}
          value={value}
          onChange={setValue}
        />
    </div>
    </main>
  )
}

export default Dashboard 