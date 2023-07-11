import { boxMarks } from '@/app/lib/constants'
import React, { useState } from 'react'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import DatePicker, { DateObject, Value } from 'react-multi-date-picker'

const BoxBaseFormContent = (props:any) => {
    
    const { register, errors, box, handleStartDate, handleEndDate } = props

  return (
    <div className="flex flex-col pt-12 pb-7">
        <div className='flex flex-col gap-3'>
            <label htmlFor="name" className='text-[#767676] font-bold'>نام باکس</label>
            <input
                {...register("name", {
                    required: {
                        value: true,
                        message:  'نام باکس را وارد کنید'
                    },
                })}
                type="text"
                id='name'
                className='form-input'
            />
            <small className="text-xs text-rose-600 ">{errors.name?.message}</small>
        </div>

        <div className='flex flex-col gap-3'>
            <label htmlFor="typeName" className='text-[#767676] font-bold'>نوع سازه</label>
            <select 
                {...register("box.mark.name", {
                required: {
                    value: true,
                    message:  'نوع سازه را انتخاب کنید'
                }
                })}
                className="select select-bordered form-input"
            >
                {
                boxMarks.map((type: string, index: number) => (
                    <option
                        className='text-black'
                        value={type}
                        key={index}
                        id="typeName"
                        >
                        {type}
                    </option>
                ))
                }
            </select>
            <small className="text-xs text-rose-600 ">
                {errors?.mark?.name.message}
            </small>
        </div>

        {
            box.mark.name === 'buyShort' &&
                <>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="projectNumber" className='text-[#767676] font-bold'>کد پروژه</label>
                        <input
                            {...register("mark.markOptions.projectNumber", {
                                required: {
                                    value: true,
                                    message: 'شماره پروژه را وارد کنید'
                                },
                                pattern: {
                                    value: /^[P][R][0-9]{4}$/,
                                    message: 'فرمت کد پروژه باید به صورت PR و چهار عدد بعد از آن باشد'
                                }
                            })}
                            type="text"
                            id='projectNumber'
                            className='form-input'
                        />
                    <small className="text-xs text-rose-600 ">{errors.projectNumber?.message}</small>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <label htmlFor="brand" className='text-[#767676] font-bold'>برند</label>
                        <input
                            {...register("mark.markOptions.brand", {
                                required: {
                                    value: true,
                                    message: 'نام برند را وارد کنید'
                                }, 
                                validate: {
                                    notSelf: (fieldValue: any) => fieldValue !== 'nama agahi' || 'این برند مجاز نیست',
                                }
                            })}
                            type="text"
                            id='brand'
                            className='form-input'
                        />
                    <small className="text-xs text-rose-600 ">{errors.brand?.message}</small>
                    </div>
                </>
            }

            <div className='flex flex-col gap-3'>
                <label htmlFor="startDate" className='text-[#767676] font-bold'>تاریخ شروع</label>
                <DatePicker
                    value={box.duration.startDate}
                    inputClass='form-input'
                    format='YYYY-MM-DD'
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    onChange={(val) => handleStartDate(val)}
                />
                <small className="text-xs text-rose-600 ">{errors.startDate?.message}</small>
            </div>

            <div className='flex flex-col gap-3'>
                <label htmlFor="endDate" className='text-[#767676] font-bold'>تاریخ پایان</label>
                <DatePicker
                    value={box.duration.endDate}
                    inputClass='form-input'
                    format='YYYY-MM-DD'
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    onChange={(val) => handleEndDate(val)}
                />
                <small className="text-xs text-rose-600 ">{errors.endDate?.message}</small>
            </div>
    </div>
  )
}

export default BoxBaseFormContent