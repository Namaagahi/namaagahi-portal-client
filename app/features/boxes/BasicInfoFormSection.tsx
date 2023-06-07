import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { AddBoxForm } from './NewBox'

const BasicInfoFormSection = ({register, errors, type}:
     {register: UseFormRegister<AddBoxForm>, errors: FieldErrors<AddBoxForm>, type: string}) => {
  return (
    <div className='flex flex-col gap-8 items-start w-full p-8 bg-bgform rounded-[30px] text-black'>
        <small className="pr-3 text-slate-500 inline-block font-bold">اطلاعات پایه</small>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            <div className='flex flex-col gap-3'>
                <label htmlFor="boxName" className='text-[#767676] font-bold'>نام باکس</label>
                <input
                    {...register("boxName", {
                        required: {
                            value: true,
                            message:  'نام باکس را وارد کنید'
                        }
                    })}
                    type="text"
                    id='boxName'
                    className='px-6 py-5 rounded-[50px] bg-white outline-none'
                />
                <small className="text-xs text-rose-600 ">{errors.boxName?.message}</small>
            </div>
        {
            type === 'buyShort' &&
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
                                value: /^[p][0-9]{4}$/,
                                message: 'فرمت کد پروژه باید به صورت p و چهار عدد بعد از آن باشد'
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
                <input
                    {...register("startDate", {
                        required: {
                            value: true,
                            message:  'تاریخ شروع را وارد کنید'
                        }
                    })}
                    type="date"
                    id='startDate'
                    className='px-6 py-5 rounded-[50px] bg-white outline-none'
                />
                <small className="text-xs text-rose-600 ">{errors.startDate?.message}</small>
            </div>
            <div className='flex flex-col gap-3'>
                <label htmlFor="endDate" className='text-[#767676] font-bold'>تاریخ پایان</label>
                <input
                    {...register("endDate", {
                        required: {
                            value: true, 
                            message: 'تاریخ پایان را وارد کنید'
                        }
                    })}
                    type="date"
                    id='endDate'
                    className='px-6 py-5 rounded-[50px] bg-white outline-none'
                />
                <small className="text-xs text-rose-600 ">{errors.endDate?.message}</small>
            </div>
        </div>
    </div>
  )
}

export default BasicInfoFormSection