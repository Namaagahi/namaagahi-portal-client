import { BasicInfoFormSectionProps } from '@/app/lib/interfaces'
import persian_fa from "react-date-object/locales/persian_fa"
import persian from "react-date-object/calendars/persian"
import DatePicker from "react-multi-date-picker"

const BasicInfoFormSection = (props: BasicInfoFormSectionProps) => {

    const { register, errors, mark, handleStartDate, handleEndDate } = props

    return (
        <div className='flex flex-col gap-8 items-start w-full p-8 bg-bgform rounded-[30px] text-black'>
            <small className="pr-3 text-slate-500 inline-block font-bold">اطلاعات پایه</small>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">

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
                        className='px-6 py-5 rounded-[50px] bg-white outline-none'
                    />
                    <small className="text-xs text-rose-600 ">{errors.name?.message}</small>
                </div>
            {
                mark === 'buyShort' &&
                <>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="projectNumber" className='text-[#767676] font-bold'>کد پروژه</label>
                        <input
                            {...register("projectNumber", {
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
                            className='px-6 py-5 rounded-[50px] bg-white outline-none'
                        />
                    <small className="text-xs text-rose-600 ">{errors.projectNumber?.message}</small>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <label htmlFor="brand" className='text-[#767676] font-bold'>برند</label>
                        <input
                            {...register("brand", {
                                required: {
                                    value: true,
                                    message: 'نام برند را وارد کنید'
                                }, 
                                validate: {
                                    notSelf: (fieldValue) => fieldValue !== 'nama agahi' || 'این برند مجاز نیست',
                                }
                            })}
                            type="text"
                            id='brand'
                            className='px-6 py-5 rounded-[50px] bg-white outline-none'
                        />
                    <small className="text-xs text-rose-600 ">{errors.brand?.message}</small>
                    </div>
                </>
            }
                                
                <div className='flex flex-col gap-3'>
                    <label htmlFor="startDate" className='text-[#767676] font-bold'>تاریخ شروع</label>
                    <DatePicker
                        inputClass='input-primary'
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
                        inputClass='input-primary'
                        format='YYYY-MM-DD'
                        calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                        onChange={(val) => handleEndDate(val)}
                    />
                    <small className="text-xs text-rose-600 ">{errors.endDate?.message}</small>
                </div>

            </div>
        </div>
    )
}

export default BasicInfoFormSection