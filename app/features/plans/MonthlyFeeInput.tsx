import CustomInput from '@/app/components/inputs/CustomInput'
import React, { useEffect } from 'react'
import { FieldError } from 'react-hook-form'

const MonthlyFeeInput = (props: any) => {

    const { 
        changeInput,
        selectedStructure,
        control,
        fieldIndex,
        handleTextbox1Change,
        errors,
        setValue,
        formatNumber 
    } = props

    useEffect(() => {
        if(!changeInput) setTimeout(() => setValue(`structures.${fieldIndex}.monthlyFee`, String(selectedStructure?.monthlyBaseFee)), 100)
    }, [])

    return (
        <div className='flex flex-col gap-3'>
            {!changeInput ?
                <>
                    <label htmlFor={`structures.${fieldIndex}.monthlyFee`} className='text-[#767676] font-bold'>تعرفه ماهیانه سازه</label>
                    <p className='p-4'>{formatNumber(selectedStructure?.monthlyBaseFee, ',')}</p>
                </>
                : 
                <CustomInput
                    control={control}
                    type='text'
                    name={`structures.${fieldIndex}.monthlyFee`}
                    onChange={(event: any) => handleTextbox1Change(event, 0, `structures.${fieldIndex}.monthlyFee`)}
                    label='تعرفه ماهیانه سازه'
                    required={true}
                    errors={(errors?.structures?.[fieldIndex]?.monthlyFee as FieldError)?.message}
                />
            }
        </div> 
    )
}

export default MonthlyFeeInput