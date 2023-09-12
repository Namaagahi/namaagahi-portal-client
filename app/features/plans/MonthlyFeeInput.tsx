import { Control, FieldArrayWithId, FieldError, FieldErrors, UseFormSetValue } from 'react-hook-form'
import { AddPlanForm, CombinedStructure, EditPlanForm } from '@/app/lib/interfaces'
import CustomInput from '@/app/components/inputs/CustomInput'
import { formatNumber } from '@/app/utilities/formatNumber'
import { useEffect } from 'react'

type Props = {
    page: string
    item: FieldArrayWithId<EditPlanForm, "structures", "id">
    changeInput: boolean
    selectedStructure: CombinedStructure
    control:  Control<EditPlanForm, any> | Control<AddPlanForm, any>
    fieldIndex: number
    handleTextbox1Change: (event: React.ChangeEvent<HTMLInputElement>, fieldIndex: number, prop: any) => void
    errors: FieldErrors<EditPlanForm>
    setValue: UseFormSetValue<EditPlanForm> | UseFormSetValue<AddPlanForm>
}

const MonthlyFeeInput = (props: Props) => {

    const {  
        page,
        item,
        changeInput,
        selectedStructure,
        control,
        fieldIndex,
        handleTextbox1Change,
        errors,
        setValue,
    } = props

    useEffect(() => {
        if(!changeInput) setTimeout(() => setValue(`structures.${fieldIndex}.monthlyFee`, String(item?.monthlyFee)), 1000)
    }, [])
// console.log(typeof item.monthlyFee)
    return (
        <div className='flex flex-col gap-3'>
            {!changeInput ?
                <>
                    <label
                        htmlFor={`structures.${fieldIndex}.monthlyFee`}
                        className='text-[#767676] font-bold'
                    >
                        تعرفه ماهیانه سازه
                    </label>

                    <p className='p-4 text-primary dark:text-secondary'>
                        {formatNumber(Number(item?.monthlyFee), ',')}
                    </p>
                </>
                : 
                <CustomInput
                    control={control}
                    type='text'
                    name={`structures.${fieldIndex}.monthlyFee`}
                    defaultValue={page === 'edit' ? String(item.monthlyFee): undefined}
                    onChange={(event: any) => handleTextbox1Change(event, 0, `structures.${fieldIndex}.monthlyFee`)}
                    label='تعرفه ماهیانه سازه'
                    required={true}
                    errors={(errors?.structures?.[fieldIndex]?.monthlyFee as FieldError)?.message}
                    className='formInput'
                />
            }
        </div> 
    )
}

export default MonthlyFeeInput