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
    errors: FieldErrors<EditPlanForm>
    convertToNumber: (value: string | number) => number | any
    selectedStructure: CombinedStructure | undefined
    isDiscountedInput: boolean
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
        errors,
        convertToNumber,
        selectedStructure,
        isDiscountedInput,
        setValue,
        watch
    } = props

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
                key={discountType} 
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
                key={discountType} 
            />
            <small className="text-xs text-rose-600 dark:text-rose-200"> 
            {errors?.['structures']?.[fieldIndex]?.['discountFee']?.['message']}
            </small>
        </>
  )
}

export default DiscountFeeInput