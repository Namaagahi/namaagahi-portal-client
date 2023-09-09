import { Control, FieldError, FieldErrors, UseFormRegister, useFieldArray } from 'react-hook-form'
import { structureVariableCostsFormValues, variableCostNames } from '@/app/lib/constants'
import { AiFillMinusSquare, AiFillPlusSquare } from 'react-icons/ai'
import { AddBoxForm } from '@/app/lib/interfaces'

type Props = { 
    register: UseFormRegister<AddBoxForm>
    fieldIndex: number
    control: Control<AddBoxForm, any>
    errors: FieldErrors<AddBoxForm>
    handleTextbox1Change: (event: React.ChangeEvent<HTMLInputElement>, fieldIndex: number, prop: any) => void
  }

const VariableCostsFormSection = (props: Props) => {

    const {
        register,
        fieldIndex,
        control,
        errors,
        handleTextbox1Change } = props 

    const { fields: variableCostFields, append: appendVariableCost, remove: removeVariableCost } = useFieldArray({
        control,
        name: `structures.${fieldIndex}.costs.variableCosts`,
        })

    return ( 
        <>
            {variableCostFields.map((variableCost, variableCostIndex: number) => {
                return (
                    <>
                        <div 
                            className={`${variableCostIndex === variableCostFields.length -1 && ' rounded-br-lg'} ${variableCostIndex === 0 && 'rounded-tr-lg'}
                            p-2 flex justify-start gap-3 bg-primary bg-opacity-60 w-full md:w-3/4 xl:w-2/3 border-[1px] border-gray-400 border-l-0 mt-4`}
                            key={`${variableCost.id}${variableCostIndex}`}
                        >
                            <div className='flex flex-col gap-3' >
                                <label 
                                    htmlFor="varCostName" 
                                    className='font-bold text-gray-200'
                                >
                                    نام هزینه
                                </label>
    
                                <select 
                                    {...register(`structures.${fieldIndex}.costs.variableCosts.${variableCostIndex}.name`, {
                                        required: {
                                            value: true,
                                            message:  'نام هزینه را انتخاب کنید'
                                        }
                                    })}
                                    className="select select-bordered max-w-xs w-full formInput p-[4.5px]"
                                >
                                {
                                variableCostNames.map((variableCostName, i) => (
                                    <option 
                                        value={variableCostName}
                                        key={i}
                                        id="varCostName"
                                        className='text-black'
                                    >
                                        {variableCostName}
                                    </option>
                                ))
                                }
                                </select>
    
                                <small className="text-xs text-rose-200 ">
                                    {(errors?.structures?.[fieldIndex]?.costs?.variableCosts?.[variableCostIndex]?.name as FieldError)?.message}
                                </small>
                            </div>
    
                            <div  className='flex flex-col gap-3'>
                                <label 
                                    htmlFor="varCost" 
                                    className='font-bold text-gray-200'
                                >
                                    هزینه ماهیانه
                                </label>
    
                                <input
                                    {...register(`structures.${fieldIndex}.costs.variableCosts.${variableCostIndex}.figures.monthlyCost`, {
                                        required: {
                                            value: true,
                                            message:  ' هزینه دوره را وارد کنید'
                                        }
                                    })
                                    } 
                                    type="text"
                                    id='varCost'
                                    className='formInput'
                                    onWheel={(e: any) => e.target.blur()}
                                    onChange={(event) => handleTextbox1Change(event, 0, `structures.${fieldIndex}.costs.variableCosts.${variableCostIndex}.figures.monthlyCost`)}
    
                                />
    
                                <small className="text-xs text-rose-200 ">
                                    {(errors?.structures?.[fieldIndex]?.costs?.variableCosts?.[variableCostIndex]?.figures?.monthlyCost as FieldError)?.message}
                                </small>
                            </div>
                            
                        </div> 
    
                        <AiFillMinusSquare
                            className={`${variableCostIndex === 0 ? 'hidden' : 'block'} cursor-pointer text-2xl hover:text-red-200 transition-all dark:text-white`}
                            onClick={() => removeVariableCost(variableCostIndex)} 
                        />
                    </>
                )
            } 
           )}  
                    
            <AiFillPlusSquare 
                className="cursor-pointer text-2xl hover:text-green-700 transition-all dark:text-white"
                onClick={() => appendVariableCost(structureVariableCostsFormValues)}
            />
        </>
    )
}

export default VariableCostsFormSection