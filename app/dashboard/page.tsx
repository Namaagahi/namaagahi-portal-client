"use client"

import React, { useState } from 'react';
import moment from 'jalali-moment'
// import DatePicker from 'react-datepicker2';
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import dynamic from 'next/dynamic'
const PageTitle = dynamic(
  () => import('@/app/components/main/PageTitle'),
  { ssr: false }
)

const Dashboard = () => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [differenceInDays, setDifferenceInDays] = useState(0)

  const handleStartDateChange = (value: any) => {console.log(value) ,setStartDate(value);}
  const handleEndDateChange = (value: any) => setEndDate(value);
  

  const calculateDateDifference = () => {
    const date1 = moment(startDate, 'jYYYY/jMM/jDD')
    const date2 = moment(endDate, 'jYYYY/jMM/jDD')

    if (date1.isValid() && date2.isValid()) {
      const differenceInTime = date2.diff(date1, 'days')
      setDifferenceInDays(differenceInTime + 1)
    }
  };

  // console.log(startDate, endDate)
  return (
    <main className="min-h-screen">
      <PageTitle name={'داشبورد'} />
      <p className="text5xl">اختلاف بین دو تاریخ:</p>
      <div>
      {/* <DatePicker
      value={startDate}
      onChange={handleStartDateChange}
      isGregorian={false} // تاریخ شمسی فعال شود
      placeholder="انتخاب تاریخ"
    />
      <DatePicker
      value={endDate}
      onChange={handleEndDateChange}
      isGregorian={false} // تاریخ شمسی فعال شود
      placeholder="انتخاب تاریخ"
    /> */}
      {/* <DatePicker
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        value={startDate}
        onChange={handleStartDateChange}
      />
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        value={endDate}
        onChange={handleEndDateChange}
      /> */}
      <input
        type="text"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        placeholder="تاریخ شروع (YYYY/MM/DD)"
      />
      <input
        type="text"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        placeholder="تاریخ پایان (YYYY/MM/DD)"
      />
      <button className="btn-primary" onClick={calculateDateDifference}>محاسبه</button>
      <p>فاصله زمانی در روزها: {differenceInDays}</p>
    </div>
    </main>
  )
}

export default Dashboard 