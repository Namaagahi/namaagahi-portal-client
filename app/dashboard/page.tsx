"use client"
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { DatePicker } from "react-advance-jalaali-datepicker"
import 'react-persian-calendar-date-picker/lib/DatePicker.css'
const PageTitle = dynamic(
  () => import('@/app/components/main/PageTitle'),
  { ssr: false }
)
const Dashboard = () => {
  function change(unix:string, formatted: string) {
    console.log(unix); // returns timestamp of the selected value, for example.
    console.log(formatted); // returns the selected value in the format you've entered, forexample, "تاریخ: 1396/02/24 ساعت: 18:30".
  }

  function DatePickerInput(props: {}) {
    return <input className="input-primary" {...props} />
  }

  const variableCosts= [
    {
      name: "برق",
      figures: {
        periodCost: 4000,
        monthlyCost: 334,
        dailyCost: 11
      },
    },
    {
      name: "بیمه",
      figures: {
        periodCost: 3000,
        monthlyCost: 250,
        dailyCost: 9
      }
    }
  ]

  const totalDailyCost = variableCosts.reduce((acc, curr) => {
    return acc + curr.figures.dailyCost;
  }, 0);
  
  console.log("totalDaily ", totalDailyCost);

  return (
    <main className="min-h-screen">
      <PageTitle name={'داشبورد'} />
      <div className="w-full">
      <DatePicker
          inputComponent={DatePickerInput}
          placeholder="انتخاب تاریخ"
          format="jYYYY-jMM-jDD"
          onChange={change}
          id="datePicker"
          preSelected="1396/05/15"
          customClass='my-datepicker'
        />
    </div>
    </main>
  )
}

export default Dashboard 