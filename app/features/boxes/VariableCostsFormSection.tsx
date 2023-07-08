import { structureVariableCostsFormValues, variableCostNames } from '@/app/lib/constants'
import { AiFillMinusSquare, AiFillPlusSquare } from 'react-icons/ai'
import { VariableCostsFormSectionProps } from '@/app/lib/interfaces'
import { FieldError, useFieldArray } from 'react-hook-form'

const VariableCostsFormSection = (props: VariableCostsFormSectionProps) => {

    const { register, fieldIndex, control, errors } = props 

    const { fields: variableCostFields, append: appendVariableCost, remove: removeVariableCost } = useFieldArray({
        control,
        name: `structures.${fieldIndex}.costs.variableCosts`,
        })

        const formatValue = (value: any) => {
            if (!value) {
              return '';
            }
            const formattedValue = parseFloat(value.replace(/\D/g, ',')).toLocaleString(); // Format the value with a thousands separator
            return formattedValue.replace(/,/g, ''); // Remove the comma separator
          };

  return ( 
    <>
        {variableCostFields.map((variableCost, variableCostIndex: number) => (
            <>
                <div 
                    className={`${variableCostIndex === variableCostFields.length -1 && ' rounded-br-lg'} ${variableCostIndex === 0 && 'rounded-tr-lg'}
                    p-2 flex justify-start gap-3 bg-primary bg-opacity-60 w-full md:w-3/4 xl:w-1/3 border-[1px] border-b-white mt-4`}
                    key={variableCost.id}
                >
                    <div className='flex flex-col gap-3' >
                        <label htmlFor="varCostName" className='font-bold text-white'>نام هزینه</label>
                        <select 
                            {...register(`structures.${fieldIndex}.costs.variableCosts.${variableCostIndex}.name`, {
                                required: {
                                    value: true,
                                    message:  'نام هزینه را انتخاب کنید'
                                }
                            })}
                            className="select select-bordered max-w-xs w-full p-[2px] rounded-[50px] bg-white outline-none"
                        >
                        {
                        variableCostNames.map((variableCostName, i) => (
                            <option 
                                value={variableCostName}
                                key={i}
                                id="varCostName"
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
                        <label htmlFor="varCost" className='font-bold text-white'>هزینه دوره</label>
                        <input
                            {...register(`structures.${fieldIndex}.costs.variableCosts.${variableCostIndex}.figures.periodCost`, {
                                required: {
                                    value: true,
                                    message:  ' هزینه دوره را وارد کنید'
                                }
                            })
                            } 
                            type="number"
                            id='varCost'
                            className='p-1 rounded-[50px] w-full bg-white outline-none tracking-wide'
                            onWheel={(e: any) => e.target.blur()}
                            onChange={(event) => {
                                event.target.value = formatValue(event.target.value);
                                register(`structures.${fieldIndex}.costs.variableCosts.${variableCostIndex}.figures.periodCost`).onChange(event);
                              }}
                        />
                        <small className="text-xs text-rose-200 ">
                            {(errors?.structures?.[fieldIndex]?.costs?.variableCosts?.[variableCostIndex]?.figures?.periodCost as FieldError)?.message}
                        </small>
                    </div>
                    
                </div> 

            <AiFillMinusSquare
                className={`${variableCostIndex === 0 ? 'hidden' : 'block'} cursor-pointer text-2xl hover:text-red-900 transition-all`}
                onClick={() => removeVariableCost(variableCostIndex)} 
                />
            </>
        ))}  
                 
        <AiFillPlusSquare 
            className="cursor-pointer text-4xl hover:text-green-700 transition-all pl-2"
            onClick={() => appendVariableCost(structureVariableCostsFormValues)}
        />
    </>
  )
}

export default VariableCostsFormSection