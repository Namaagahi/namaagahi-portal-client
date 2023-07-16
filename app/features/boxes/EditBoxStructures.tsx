import { boxStructureFormValues, faces, styles, typeNames } from '@/app/lib/constants'
import React, { useState } from 'react'
import { FieldError } from 'react-hook-form'
import { AiFillMinusSquare, AiFillPlusSquare } from 'react-icons/ai'
import VariableCostsFormSection from './VariableCostsFormSection'
import { IoIosArrowDown } from 'react-icons/io'
import DatePicker, { Value } from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'

const EditBoxStructures = (props: any) => {

    const { field, appendStructure, removeStructure, register, filtered, errors, control, structures, setValue } = props

    const [showContent, setShowContent] = useState(true)


    function convertToNumber(value: string | null): any {
        const cleanedValue = value!.replace(/,/g, '')
        const parsedValue = parseFloat(cleanedValue)
      
        if (isNaN(parsedValue)) {
          return null
        }
        return parsedValue;
      }

    function handleTextbox1Change(event: React.ChangeEvent<HTMLInputElement>, fieldIndex: number, prop: any) {
        const newValue = event.target.value.replace(/,/g, '')
        const numberValue = convertToNumber(newValue)
        const formattedValue = numberValue !== null ? new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(numberValue) : ''
        setValue(prop, formattedValue)
      }
     
    
  return (
    field.map((item: any, fieldIndex: number) =>{
        // console.log("ITEM", item)
        const foundStr = structures.find((structure: any) => structure.id === item.structureId)
        return (
        <div className='flex flex-col gap-8 items-start w-full rounded-[30px] p-4 border-[1px] text-black my-3'>
            <IoIosArrowDown
                className={` ${showContent && "rotate-180"} duration-200 cursor-pointer hover:scale-150 dark:text-white z-[999]`}
                onClick={() => setShowContent(!showContent)}
            />
            {showContent &&
                <div
                    className=" rounded-2xl flex flex-col overflow-hidden w-full p-3 my-3"
                    key={item.id}
                >
                    <div className="relative flex flex-col justify-start">
                        <div className='absolute right-0 top-0 min-h-[24px] w-4 rounded-b-[20px] bg-primary flex justify-center items-center font-bold text-white hover:scale-125 cursor-pointer transition-all'>
                            {fieldIndex + 1}
                        </div>
    
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="typeName" className='text-[#767676] text-center font-bold'>کد سامانه سازه</label>
                            <select 
                            {...register(`structures.${fieldIndex}.structureId`, {
                                required: {
                                value: false,
                                }
                            })}
                                className="select select-bordered form-input"
                                // defaultValue={foundStr.name}
                            >
                            {
                                filtered.map((structure: any) => {
                                    return(
                                        <option
                                            // defaultValue={foundStr.name}
                                            selected
                                            // defaultValue={item.structureId}
                                            value={structure.id}
                                            key={structure.id}
                                            id="typeName"
                                            className='text-black'
                                        >
                                        {structure.name}
                                        </option>
                                    )
                                }
                                )
                            }
                            </select>
                            <small className="text-xs text-rose-600 "> 
                            {errors?.['structures']?.[fieldIndex]?.['structureId']?.['message']}
                            </small>
                        </div>

                        <div className='flex flex-col gap-3'>
                            <label htmlFor="startDate" className='text-[#767676] font-bold'>تاریخ شروع</label>
                            <DatePicker
                                value={item.duration.startDate}
                                inputClass='form-input'
                                format='YYYY-MM-DD'
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                                onChange={(val: any) => {
                                    setValue(`structures.${fieldIndex}.duration.startDate`, val!!.toString() )
                                    }
                                }
                            />
                            <small className="text-xs text-rose-600 ">{errors.startDate?.message}</small>
                        </div>

                        <div className='flex flex-col gap-3'>
                            <label htmlFor="endDate" className='text-[#767676] font-bold'>تاریخ پایان</label>
                            <DatePicker
                                value={item.duration.endDate}
                                inputClass='form-input'
                                format='YYYY-MM-DD'
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                                onChange={(val: any) => {
                                    setValue(`structures.${fieldIndex}.duration.endDate`, val!!.toString() )
                                    }
                                }
                            />
                            <small className="text-xs text-rose-600 ">{errors.endDate?.message}</small>
                        </div>
            
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="typeName" className='text-[#767676] font-bold'>نوع سازه</label>
                            <select 
                            {...register(`structures.${fieldIndex}.marks.name`, {
                                required: {
                                value: true,
                                message:  'نوع سازه را انتخاب کنید'
                            }
                            })}
                            className="select select-bordered form-input"
                            >
                            {
                                typeNames.map((type: string, index: number) => (
                                <option
                                    defaultValue={item.marks.name}
                                    value={type}
                                    key={index}
                                    id="typeName"
                                    className='text-black'
                                >
                                    {type}
                                </option>
                                ))
                            }
                            </select>
                            <small className="text-xs text-rose-600 ">
                            {(errors?.structures?.[fieldIndex]?.marks?.name as FieldError)?.message}
                            </small>
                        </div>
            
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="styleName" className='text-[#767676] font-bold'>تیپ</label>
                            <select 
                            {...register(`structures.${fieldIndex}.marks.markOptions.style`, {
                                required: {
                                value: true,
                                message:  'استایل سازه را انتخاب کنید'
                                }
                            })}
                            className="select select-bordered form-input"
                            >
                            {
                                styles.map((style: string, index: number) => (
                                <option 
                                    defaultValue={item.marks.markOptions.style}
                                    value={style}
                                    key={index}
                                    id="styleName"
                                    className='text-black'
                                >
                                    {style}
                                </option>
                                ))
                            }
                            </select>
                            <small className="text-xs text-rose-600 ">
                            {(errors?.structures?.[fieldIndex]?.marks?.markOptions?.style as FieldError)?.message}
                            </small>
                        </div>
                    
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="face" className='text-[#767676] font-bold'>وجه</label>
                            <select 
                            {...register(`structures.${fieldIndex}.marks.markOptions.face`, {
                                required: {
                                value: true,
                                message:  'تیپ سازه را انتخاب کنید'
                                }
                            })}
                            className="select select-bordered form-input">
                            {
                                faces.map((face, index) => (
                                <option 
                                    defaultValue={item.marks.markOptions.face}
                                    value={face}
                                    key={index}
                                    id="face"
                                    className='text-black'
                                >
                                    {face}
                                </option>
                                ))
                            }
                            </select>
                            <small className="text-xs text-rose-600 ">
                            {(errors?.structures?.[fieldIndex]?.marks?.markOptions?.face as FieldError)?.message}
                            </small>
                        </div>
                    
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="length" className='text-[#767676] font-bold'>طول</label>
                            <input
                            {...register(`structures.${fieldIndex}.marks.markOptions.length`, {
                                valueAsNumber: true,
                                required: {
                                value: true,
                                message:  'طول سازه را وارد کنید'
                                }
                            })}
                            defaultValue={item.marks.markOptions.length}
                            step={0.1}
                            type="number"
                            id='length'
                            className='form-input'
                            data-error
                            onWheel={(e: any) => e.target.blur()}
                            />
                            <small className="text-xs text-rose-600 ">
                            {(errors?.structures?.[fieldIndex]?.marks?.markOptions?.length as FieldError)?.message}
                            </small>
                        </div>
                        
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="width" className='text-[#767676] font-bold'>عرض</label>
                            <input
                            {...register(`structures.${fieldIndex}.marks.markOptions.width`, {
                                valueAsNumber: true,
                                required: {
                                value: true,
                                message:  'عرض سازه را وارد کنید'
                                }
                            })}
                            defaultValue={item.marks.markOptions.width}
                            step={0.1}
                            type="number"
                            id='width'
                            className='form-input'
                            onWheel={(e: any) => e.target.blur()}
                            />
                            <small className="text-xs text-rose-600 ">
                            {(errors?.structures?.[fieldIndex]?.marks?.markOptions?.width as FieldError)?.message}
                            </small>
                        </div>
                                
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="printSize" className='text-[#767676] font-bold'>متراژ چاپ</label>
                            <input
                            {...register(`structures.${fieldIndex}.marks.markOptions.printSize`, {
                                valueAsNumber: true,
                                required: {
                                value: true,
                                message:  'متراژ چاپ سازه را وارد کنید'
                                }
                            })}
                            defaultValue={item.marks.markOptions.printSize}
                            step={0.1}
                            type="number"
                            id='printSize'
                            className='form-input'
                            onWheel={(e: any) => e.target.blur()}
                            />
                            <small className="text-xs text-rose-600 ">
                            {(errors?.structures?.[fieldIndex]?.marks?.markOptions?.printSize as FieldError)?.message}
                            </small>
                        </div>
                    
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="docSize" className='text-[#767676] font-bold'>متراژ واقعی</label>
                            <input
                            {...register(`structures.${fieldIndex}.marks.markOptions.docSize`, {
                                valueAsNumber: true,
                                required: {
                                value: true,
                                message:  'متراژ واقعی سازه را وارد کنید'
                                }
                            })}
                            defaultValue={item.marks.markOptions.docSize}
                            step={0.1}
                            type="number"
                            id='docSize'
                            className='form-input'
                            onWheel={(e: any) => e.target.blur()}
                            />
                            <small className="text-xs text-rose-600 ">
                            {(errors?.structures?.[fieldIndex]?.marks?.markOptions?.docSize as FieldError)?.message}
                            </small>
                        </div>
                    
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="squareCost" className='text-[#767676] font-bold'>قیمت متر مربع</label>
                            <input
                            {...register(`structures.${fieldIndex}.costs.fixedCosts.squareCost`, {
                                required: {
                                value: true,
                                message: "قیمت متر مربع سازه را وارد کنید",
                                },
                            })}
                            defaultValue={item.marks.markOptions.squareCost}
                            step={0.1}
                            type="text"
                            id="squareCost"
                            className="form-input"
                            onChange={(event) => handleTextbox1Change(event, 0, `structures.${fieldIndex}.costs.fixedCosts.squareCost`)}
                            />
                            <small className="text-xs text-rose-600 ">
                            {(errors?.structures?.[fieldIndex]?.costs?.fixedCosts?.squareCost as FieldError)?.message}
                            </small>
                        </div>
    
                        <div
                        className={`${fieldIndex === 0 ? 'hidden' : 'block'} flex items-center gap-2 cursor-pointer text-2xl hover:text-red-700 transition-all dark:text-white`}
                        onClick={() => removeStructure(fieldIndex)} 
                        >
                            <AiFillMinusSquare />
                            <p className='text-sm'>حذف سازه</p>
                        </div>
    
                    </div>
    
                    <VariableCostsFormSection 
                        errors={errors}
                        register={register}
                        control={control}
                        fieldIndex={fieldIndex}
                        handleTextbox1Change={handleTextbox1Change}
                    />
                </div>  
            }
            <AiFillPlusSquare 
                className="cursor-pointer text-2xl hover:text-green-700 transition-all dark:text-white"
                onClick={() => appendStructure(boxStructureFormValues)}
            />
        </div>
        )
      } 
      )
  )
}

export default EditBoxStructures