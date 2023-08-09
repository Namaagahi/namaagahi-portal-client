"use client"
import persian_fa from "react-date-object/locales/persian_fa"
import persian from "react-date-object/calendars/persian"
import DatePicker, { Value } from "react-multi-date-picker"
import { useState } from "react"
import DateObject from "react-date-object"
import moment from "jalali-moment"

const Test2 = () => {
    const [selectedDate, setSelectedDate] = useState<number>(new Date().getTime());

    const handleDateChange = (value: DateObject | DateObject[] | null) => {
      if (value instanceof DateObject) {
        setSelectedDate(value.unix * 1000);
      } else if (Array.isArray(value) && value.length > 0) {
        const timestamps = value.map((date) => date.unix * 1000);
        setSelectedDate(timestamps[0]);
      } else {
        setSelectedDate(new Date().getTime());
      }
    }

console.log(selectedDate)
// console.log(moment(new Date(selectedDate!)).format('jYYYY/jM/jD'))

  return (
    <div className='flex flex-col gap-3'>
        <label htmlFor="endDate" className='text-[#767676] font-bold'>تاریخ پایان</label>
        <DatePicker
            inputClass='input-primary'
            format='YYYY-MM-DD'
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            onChange={handleDateChange}
        />
        <p>{moment(new Date(selectedDate).toISOString()).format('jYYYY/jM/jD')}</p>
    </div>
  )
}

export default Test2