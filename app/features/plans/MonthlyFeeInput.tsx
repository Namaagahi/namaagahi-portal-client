import React, { useEffect } from 'react'
import { FieldError } from 'react-hook-form'

const MonthlyFeeInput = (props: any) => {

    const { changeInput, selectedStructure, register, fieldIndex, handleTextbox1Change, errors, setValue } = props

    useEffect(() => {
        if(!changeInput) setTimeout(() => setValue(`structures.${fieldIndex}.monthlyFee`, String(selectedStructure?.monthlyBaseFee)), 100)
    }, [])

    return (
        <div className='flex flex-col gap-3'>
            <label htmlFor="monthlyFee" className='text-[#767676] font-bold'>تعرفه ماهیانه</label>
            {!changeInput ?
            <p className='p-4'>{selectedStructure?.monthlyBaseFee}</p>
            : 
            <input
                {...register(`structures.${fieldIndex}.monthlyFee`, {
                    required: {
                    value: true,
                    message: "تعرفه ماهیانه سازه را وارد کنید",
                    },
                })}
                defaultValue={selectedStructure?.monthlyBaseFee}
                type="text"
                id="monthlyFee"
                className="p-4 rounded-[50px] bg-white outline-none w-full"
                onWheel={(e: any) => e.target.blur()} 
                onChange={(event) => handleTextbox1Change(event, 0, `structures.${fieldIndex}.monthlyFee`)}
            />
            }
            <small className="text-xs text-rose-600 ">
            {(errors?.structures?.[fieldIndex]?.monthlyFee as FieldError)?.message}
            </small>
        </div> 
    )
}

export default MonthlyFeeInput