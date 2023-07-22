import { FieldError } from 'react-hook-form'
import { useEffect, useRef } from 'react'

const DiscountedMonthlyFee = (props: any) => {

    const { selectedStructure, changeInput, discountType, convertToNumber, selectedMonthlyFee, selectedDiscount, errors, fieldIndex, setValue, numberDiscountInputRef, percentageDiscountInputRef } = props

    const discountedMonthlyFeeRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        if(discountedMonthlyFeeRef.current) {
            const discountedMonthlyFee = discountedMonthlyFeeRef.current.textContent
            setTimeout(() => setValue(`structures.${fieldIndex}.monthlyFeeWithDiscount`, discountedMonthlyFee), 100)
        }
    }, [selectedDiscount, discountedMonthlyFeeRef.current?.textContent])

  return (
    <div className='flex flex-col gap-3'>
        <label htmlFor="discountedMothlyFee" className='text-[#767676] font-bold'>تعرفه ماهیانه نهایی</label>
        <p
            className='p-4' 
            id='discountedMothlyFee'
            ref={discountedMonthlyFeeRef}
        >
            {
                selectedStructure && percentageDiscountInputRef.current && percentageDiscountInputRef.current.value && changeInput && discountType ==='percentage' ? 
                convertToNumber(selectedMonthlyFee) - (convertToNumber(selectedMonthlyFee) * convertToNumber(selectedDiscount) ) / 100
                : selectedStructure && numberDiscountInputRef.current && numberDiscountInputRef.current.value && changeInput && discountType ==='number' ? 
                convertToNumber(selectedMonthlyFee) - convertToNumber(selectedDiscount)
                : selectedStructure && percentageDiscountInputRef.current && percentageDiscountInputRef.current.value && !changeInput && discountType ==='percentage' ? 
                selectedStructure?.monthlyBaseFee! - (selectedStructure?.monthlyBaseFee! * convertToNumber(selectedDiscount) ) / 100
                : selectedStructure && numberDiscountInputRef.current && numberDiscountInputRef.current.value && !changeInput && discountType ==='number' ? 
                selectedStructure?.monthlyBaseFee! - convertToNumber(selectedDiscount)
                : ''
            }
        </p>
        <small className="text-xs text-rose-600 ">
        {(errors?.structures?.[fieldIndex]?.monthlyFee as FieldError)?.message}
        </small>
    </div> 
  )
}

export default DiscountedMonthlyFee