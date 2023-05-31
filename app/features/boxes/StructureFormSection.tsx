import React from 'react'
import { FieldErrors, UseFieldArrayUpdate, UseFormRegister } from 'react-hook-form'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { AddBoxForm, Structure } from './NewBox'

const StructureFormSection = ({register, errors, index, update, structure}:
     {register: UseFormRegister<AddBoxForm>,
         errors: FieldErrors<AddBoxForm>,
          index: number,
           update:UseFieldArrayUpdate<AddBoxForm, "structures">,
           structure: Structure
        }) => {
  return (
    <>
    <div className='flex flex-col gap-3'>
        <label htmlFor="sysCode" className='text-[#767676] font-bold'>کد سامانه</label>
        <input
            {...register(`structures.${index}.sysCode`, {
                required: {
                    value: true,
                    message:  'کد سامانه را وارد کنید'
                }
            })}
            type="number"
            id='sysCode'
            className='px-6 py-5 rounded-[50px] bg-white outline-none'
        />
        <small className="text-xs text-rose-600 ">{errors.structures && errors.structures![index]?.sysCode?.message}</small>
    </div>
    <div className='flex flex-col gap-3'>
        <label htmlFor="kind" className='text-[#767676] font-bold'>نوع سازه</label>
        <input
            {...register(`structures.${index}.kind`, {
                required: {
                    value: true,
                    message:  'نوع سازه را وارد کنید'
                }
            })}
            type="text"
            id='kind'
            className='px-6 py-5 rounded-[50px] bg-white outline-none'
        />
        <small className="text-xs text-rose-600 ">{errors.structures && errors.structures![index]?.kind?.message}</small>
    </div>
    <div className='flex flex-col gap-2'>
        <label htmlFor="district" className='text-[#767676] font-bold'>منطقه</label>
        <input
            {...register(`structures.${index}.district`, {
                required: {
                    value: true,
                    message:  'منطقه را وارد کنید'
                }
            })}
            type="text"
            id='district'
            className='px-6 py-5 rounded-[50px] bg-white outline-none'
        />
        <small className="text-xs text-rose-600 ">{errors.structures && errors.structures![index]?.district?.message}</small>
    </div>
    <div className='flex flex-col gap-2'>
        <label htmlFor="path" className='text-[#767676] font-bold'>مسیر</label>
        <input
            {...register(`structures.${index}.path`, {
                required: {
                    value: true,
                    message:  'مسیر را وارد کنید'
                }
            })}
            type="text"
            id='path'
            className='px-6 py-5 rounded-[50px] bg-white outline-none'
        />
        <small className="text-xs text-rose-600 ">{errors.structures && errors.structures![index]?.path?.message}</small>
    </div>

    <div className='flex flex-col gap-2'>
        <label htmlFor="address" className='text-[#767676] font-bold'>نشانی</label>
        <input
            {...register(`structures.${index}.address`, {
                required: {
                    value: true,
                    message:  'نشانی را وارد کنید'
                }
            })}
            type="text"
            id='address'
            className='px-6 py-5 rounded-[50px] bg-white outline-none'
        />
        <small className="text-xs text-rose-600 ">{errors.structures && errors.structures![index]?.address?.message}</small>
    </div>
    <div className='flex flex-col gap-2'>
        <label htmlFor="style" className='text-[#767676] font-bold'>تیپ</label>
        <input
            {...register(`structures.${index}.style`, {
                required: {
                    value: true,
                    message:  'تیپ را وارد کنید'
                }
            })}
            type="text"
            id='style'
            className='px-6 py-5 rounded-[50px] bg-white outline-none'
        />
        <small className="text-xs text-rose-600 ">{errors.structures && errors.structures![index]?.style?.message}</small>
    </div>
    <div className='flex flex-col gap-2'>
        <label htmlFor="face" className='text-[#767676] font-bold'>وجه</label>
        <input
            {...register(`structures.${index}.face`, {
                required: {
                    value: true,
                    message:  'وجه را وارد کنید'
                }
            })}
            type="text"
            id='face'
            className='px-6 py-5 rounded-[50px] bg-white outline-none'
        />
        <small className="text-xs text-rose-600 ">{errors.structures && errors.structures![index]?.face?.message}</small>
    </div>
    <div className='flex flex-col gap-2'>
        <label htmlFor="dimensions" className='text-[#767676] font-bold'>ابعاد</label>
        <input
            {...register(`structures.${index}.dimensions`, {
                required: {
                    value: true,
                    message:  'ابعاد را وارد کنید'
                }
            })}
            type="text"
            id='dimensions'
            className='px-6 py-5 rounded-[50px] bg-white outline-none'
        />
        <small className="text-xs text-rose-600 ">{errors.structures && errors.structures![index]?.dimensions?.message}</small>
    </div>
    <div className='flex flex-col gap-2'>
        <label htmlFor="printSize" className='text-[#767676] font-bold'>متراژ چاپ</label>
        <input
            {...register(`structures.${index}.printSize`, {
                required: {
                    value: true,
                    message:  'متراژ چاپ را وارد کنید'
                }
            })}
            type="text"
            id='printSize'
            className='px-6 py-5 rounded-[50px] bg-white outline-none'
        />
        <small className="text-xs text-rose-600 ">{errors.structures && errors.structures![index]?.printSize?.message}</small>
    </div>
    <div className='flex flex-col gap-2'>
        <label htmlFor="docSize" className='text-[#767676] font-bold'>متراژ واقعی</label>
        <input
            {...register(`structures.${index}.docSize`, {
                required: {
                    value: true,
                    message:  'متراژ واقعی را وارد کنید'
                }
            })}
            type="text"
            id='docSize'
            className='px-6 py-5 rounded-[50px] bg-white outline-none'
        />
        <small className="text-xs text-rose-600 ">{errors.structures && errors.structures![index]?.docSize?.message}</small>
    </div>
    <div className='flex flex-col gap-2'>
        <label htmlFor="squareFee" className='text-[#767676] font-bold'>تعرفه متر مربع</label>
        <input
            {...register(`structures.${index}.squareFee`, {
                required: {
                    value: true,
                    message:  'تعرفه متر مربع را وارد کنید'
                }
            })}
            type="text"
            id='squareFee'
            className='px-6 py-5 rounded-[50px] bg-white outline-none'
        />
        <small className="text-xs text-rose-600 ">{errors.structures && errors.structures![index]?.squareFee?.message}</small>
    </div>
    <div className="flex justify-center items-center">
        <AiOutlineCheckCircle 
            className="text-5xl text-lime-800 cursor-pointer transition-all hover:text-lime-500"
            onClick={() => update(index, structure)}
        />
    </div>
</>
  )
}

export default StructureFormSection