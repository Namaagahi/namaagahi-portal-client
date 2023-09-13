import { AddPlanForm, CombinedStructure, EditPlanForm } from "@/app/lib/interfaces"
import { useEffect } from "react"
import { FieldArrayWithId, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form"

type Props = {
    page: string
    discountType: string
    register:  UseFormRegister<EditPlanForm> | UseFormRegister<AddPlanForm>
    fieldIndex: number
    item: FieldArrayWithId<EditPlanForm, "structures", "id">
    handleTextbox1Change: (event: React.ChangeEvent<HTMLInputElement>, fieldIndex: number, prop: any) => void
    percentageDiscountInputRef: React.RefObject<HTMLInputElement>
    errors: FieldErrors<EditPlanForm>
    convertToNumber: (value: string | number) => number | any
    selectedStructure: CombinedStructure | undefined
    numberDiscountInputRef: React.RefObject<HTMLInputElement>
    setValue: UseFormSetValue<EditPlanForm> | UseFormSetValue<AddPlanForm>,
    watch: any
}

const DiscountFeeInput = (props: Props) => {

    const {
        page,
        discountType,
        register,
        fieldIndex,
        item,
        handleTextbox1Change,
        percentageDiscountInputRef,
        errors,
        convertToNumber,
        selectedStructure,
        numberDiscountInputRef,
        setValue,
        watch
    } = props

    // useEffect(() => {
    //     console.log("USE EFFECT CALLED")
    //     setValue(`structures.${fieldIndex}.discountFee`, ' ')
    // }, [watch('structures')])

console.log("discountType", discountType)
  return (
    discountType === 'percentage' ?
        <>
            <input
                {...register(`structures.${fieldIndex}.discountFee`, {
                    required: {
                        value: true,
                        message:  'در صورت نداشتن تخفیف مقدار 0 را وارد کنید'
                    }
                })}
                type="text"
                id="discountFee"
                placeholder='تخفیف به درصد'
                className="formInput"
                onWheel={(e: any) => e.target.blur()} 
                defaultValue={page === 'edit' ? item.discountFee : undefined}
                onChange={(event) => {
                    const newValue = event.target.value
                    if (discountType === 'percentage' && parseFloat(newValue) > 100) 
                        event.target.value = '100'
                    handleTextbox1Change(event, 0, `structures.${fieldIndex}.discountFee`)
                }}
                key={discountType} 
                ref={percentageDiscountInputRef} 
            />
            <small className="text-xs text-rose-600 dark:text-rose-200 "> 
            {errors?.['structures']?.[fieldIndex]?.['discountFee']?.['message']}
            </small>
        </>
        : 
        <>
            <input
                {...register(`structures.${fieldIndex}.discountFee`, {
                    required: {
                        value: true,
                        message:  'در صورت نداشتن تخفیف مقدار 0 را وارد کنید'
                    }
                })}
                type="text"
                id="discountFee"
                placeholder='تخفیف به ریال'
                className="formInput"
                onWheel={(e: any) => e.target.blur()} 
                defaultValue={page === 'edit' ? item.discountFee : undefined}
                onChange={(event) => {
                    const newValue = event.target.value
                    if (discountType !== 'percentage' && convertToNumber(newValue) > selectedStructure?.monthlyBaseFee!)
                        event.target.value = String(selectedStructure?.monthlyBaseFee)
                    handleTextbox1Change(event, 0, `structures.${fieldIndex}.discountFee`)
                }}
                key={discountType} 
                ref={numberDiscountInputRef} 
            />
            <small className="text-xs text-rose-600 dark:text-rose-200"> 
            {errors?.['structures']?.[fieldIndex]?.['discountFee']?.['message']}
            </small>
        </>
  )
}

export default DiscountFeeInput