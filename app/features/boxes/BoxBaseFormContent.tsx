import { boxMarks } from '@/app/lib/constants'
import React, { useState } from 'react'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import DatePicker, { DateObject, Value } from 'react-multi-date-picker'

const BoxBaseFormContent = (props:any) => {
    
    const { name, startDate, endDate, markName, brand, projectNumber, onNameChange, isError } = props

    const [startDatee, setStartDatee] = useState<Value | any>(new DateObject({ calendar: persian, locale: persian_fa })) 
    const [endDatee, setEndDatee] = useState<Value | any>(new DateObject({ calendar: persian, locale: persian_fa }))

    const handleStartDate = (val: any) => setStartDatee(val)
    const handleEndDate = (val: any) => setEndDatee(val)

  return (
    <div className="flex flex-col pt-12 pb-7">
        <div className="flex items-center gap-4 justify-between w-full">
            <label htmlFor="">تاریخ شروع</label>
            <DatePicker
                inputClass='form-input '
                format='YYYY-MM-DD'
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-left"
                value={startDate}
                onChange={(val) => handleStartDate(val)}
            />
        </div>

        <div className="flex items-center gap-4 justify-between w-full">
            <label htmlFor="">تاریخ پایان</label>
            <DatePicker
                inputClass='form-input '
                format='YYYY-MM-DD'
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-left"
                value={endDate}
                onChange={(val) => handleEndDate(val)}
            />
        </div>

        <div className="flex items-center gap-4 justify-between w-full">
            <label htmlFor="">نام باکس</label>
            <input
                 value={name}
                type="text"
                className={`${isError && 'border-rose-700'} form-input w-[80%]`}
                onChange={onNameChange}
            />
        </div>
        <div className="flex items-center gap-4 justify-between w-full">
            <label htmlFor="">نوع باکس</label>
            <select 
                //   {...register(`structures.${fieldIndex}.marks.markOptions.face`, {
                //     required: {
                //       value: true,
                //       message:  'تیپ سازه را انتخاب کنید'
                //     }
                //   })}
                  className="select select-bordered form-input w-[80%] ">
                  {
                    boxMarks.map((mark, index) => (
                      <option 
                        className='text-black'
                        value={mark}
                        key={index}
                        id="boxMark"
                      >
                        {mark}
                      </option>
                    ))
                  }
            </select>
        </div>
        {markName === "buyShort" && 
            <>
                <div className="flex items-center gap-4 justify-between w-full">
                    <label htmlFor="">برند</label>
                    <input
                        value={brand}
                        type="text"
                        className="form-input w-[80%]"
                    />
                </div>
                <div className="flex items-center gap-4 justify-between w-full">
                    <label htmlFor="">کد پروژه</label>
                    <input
                        value={projectNumber}
                        type="text"
                        className="form-input w-[80%]"
                    />
                </div>
            </>
        }
    </div>
  )
}

export default BoxBaseFormContent