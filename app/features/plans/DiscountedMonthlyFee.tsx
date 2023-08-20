import { FieldError, FieldErrors, UseFormSetValue } from 'react-hook-form'
import { useEffect, useRef } from 'react'
import { formatNumber } from '@/app/utilities/formatNumber'
import { AddPlanForm, CombinedStructure, EditPlanForm } from '@/app/lib/interfaces'

type Props = {
    selectedStructure?: CombinedStructure 
    changeInput: boolean
    discountType: string
    convertToNumber: (value: string | number) => any
    selectedMonthlyFee: any
    selectedDiscount: string
    errors: FieldErrors<EditPlanForm>
    fieldIndex: number
    setValue: UseFormSetValue<EditPlanForm> | UseFormSetValue<AddPlanForm>
    numberDiscountInputRef: React.RefObject<HTMLInputElement>
    percentageDiscountInputRef: React.RefObject<HTMLInputElement>
}

const DiscountedMonthlyFee = (props: Props) => {

    const { 
        selectedStructure, 
        changeInput,
        discountType,
        convertToNumber,
        selectedMonthlyFee,
        selectedDiscount,
        errors,
        fieldIndex,
        setValue,
        numberDiscountInputRef,
        percentageDiscountInputRef,
    } = props

    const discountedMonthlyFeeRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        if(discountedMonthlyFeeRef.current) {
            const discountedMonthlyFee = discountedMonthlyFeeRef.current.textContent
            setTimeout(() => setValue(`structures.${fieldIndex}.monthlyFeeWithDiscount`, discountedMonthlyFee!), 100)
        }
    }, [selectedDiscount, discountedMonthlyFeeRef.current?.textContent])

    return (
        <div className='flex flex-col gap-3'>
            <label
                htmlFor="discountedMothlyFee"
                className='text-[#767676] font-bold'
            >
                تعرفه ماهیانه نهایی
            </label>

            <p
                className='p-4' 
                id='discountedMothlyFee'
                ref={discountedMonthlyFeeRef}
            >
                {
                    selectedStructure && percentageDiscountInputRef.current && percentageDiscountInputRef.current.value && changeInput && discountType ==='percentage' ? 
                    formatNumber(convertToNumber(selectedMonthlyFee) - (convertToNumber(selectedMonthlyFee) * convertToNumber(selectedDiscount) ) / 100, ',')
                    : selectedStructure && numberDiscountInputRef.current && numberDiscountInputRef.current.value && changeInput && discountType ==='number' ? 
                    formatNumber(convertToNumber(selectedMonthlyFee) - convertToNumber(selectedDiscount), ',')
                    : selectedStructure && percentageDiscountInputRef.current && percentageDiscountInputRef.current.value && !changeInput && discountType ==='percentage' ? 
                    formatNumber(selectedStructure?.monthlyBaseFee! - (selectedStructure?.monthlyBaseFee! * convertToNumber(selectedDiscount) ) / 100, ',')
                    : selectedStructure && numberDiscountInputRef.current && numberDiscountInputRef.current.value && !changeInput && discountType ==='number' ? 
                    formatNumber(selectedStructure?.monthlyBaseFee! - convertToNumber(selectedDiscount), ',')
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