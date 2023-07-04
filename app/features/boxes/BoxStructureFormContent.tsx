import useAuth from '@/app/hooks/useAuth'
import { faces, styles, typeNames } from '@/app/lib/constants'
import React, { useState } from 'react'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import DatePicker, { DateObject, Value } from 'react-multi-date-picker'

const BoxStructureFormContent = () => {

    const { isAdmin } = useAuth()

    
    const [startDate, setStartDate] = useState<Value | any>(new DateObject({ calendar: persian, locale: persian_fa })) 
    const [endDate, setEndDate] = useState<Value | any>(new DateObject({ calendar: persian, locale: persian_fa }))

    const handleStartDate = (val: any) => setStartDate(val)
    const handleEndDate = (val: any) => setEndDate(val)

  return (
    <div className="flex flex-col pt-12 pb-7">
        <div className="flex items-center gap-4 justify-between w-full">
            <label htmlFor="">نوع سازه</label>
            <select 
                //   {...register(`structures.${fieldIndex}.marks.name`, {
                //     required: {
                //       value: true,
                //       message:  'نوع سازه را انتخاب کنید'
                //   }
                //   })}
                  className="select select-bordered form-input w-[80%]"
                >
                  {
                    typeNames.map((type: string, index: number) => (
                      <option
                        value={type}
                        key={index}
                        id="typeName"
                      >
                        {type}
                      </option>
                    ))
                  }
            </select>
        </div>
        <div className="flex items-center gap-4 justify-between w-full">
            <label htmlFor="">تاریخ شروع</label>
            <DatePicker
                inputClass='form-input '
                format='YYYY-MM-DD'
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-left"
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
                onChange={(val) => handleEndDate(val)}
            />
        </div>
        <div className="flex items-center gap-4 justify-between w-full">
            <label htmlFor="">تیپ</label>
            <select 
                //   {...register(`structures.${fieldIndex}.marks.markOptions.style`, {
                //     required: {
                //       value: true,
                //       message:  'استایل سازه را انتخاب کنید'
                //     }
                //   })}
                className="select select-bordered form-input w-[80%]"
                >
                  {
                    styles.map((style: string, index: number) => (
                      <option 
                        value={style}
                        key={index}
                        id="styleName"
                      >
                        {style}
                      </option>
                    ))
                  }
            </select>
        </div>
        <div className="flex items-center gap-4 justify-between w-full">
            <label htmlFor="">وجه</label>
            <select 
                //   {...register(`structures.${fieldIndex}.marks.markOptions.face`, {
                //     required: {
                //       value: true,
                //       message:  'تیپ سازه را انتخاب کنید'
                //     }
                //   })}
                  className="select select-bordered form-input w-[80%]">
                  {
                    faces.map((face, index) => (
                      <option 
                        value={face}
                        key={index}
                        id="face"
                      >
                        {face}
                      </option>
                    ))
                  }
            </select>
        </div>
        <div className="flex items-center gap-4 justify-between w-full">
            <label htmlFor="">طول</label>
            <input
                //  value={thisStructure.marks.markOptions.length}
                type="number"
                className="form-input w-[80%]"
            />
        </div>
        <div className="flex items-center gap-4 justify-between w-full">
            <label htmlFor="">عرض</label>
            <input
                // value={thisStructure.marks.markOptions.width}
                type="number"
                className="form-input w-[80%]"
                readOnly
            />
        </div>
        <div className="flex items-center gap-4 justify-between w-full">
            <label htmlFor="">متراژ چاپ</label>
            <input
                type="number"
                className="form-input w-[80%]"
            />
        </div>
        <div className="flex items-center gap-4 justify-between w-full">
            <label htmlFor="">متراژ واقعی</label>
            <input
                type="number"
                className="form-input w-[80%]"
            />
        </div>
        <div className="flex items-center gap-4 justify-between w-full">
            <label htmlFor=""> متر مربع</label>
            <input
                type="number"
                className="form-input w-[80%]"
            />
        </div>
    </div>
  )
}

export default BoxStructureFormContent