import { selectAllStructures } from "../structures/structuresApiSlice"
import { AddBoxForm, StructureObject } from "@/app/lib/interfaces"
import { Control, FieldArrayWithId, FieldErrors, UseFieldArrayAppend, UseFieldArrayRemove, UseFormRegister, useFieldArray } from "react-hook-form"
import { useSelector } from "react-redux"
import { AiFillPlusSquare, AiFillMinusSquare } from 'react-icons/ai'
import VariableCostsFormSection from "./VariableCostsFormSection"

const StructuresFormSection = ({ register, errors, structuresField, appendStructure, removeStructure, control }: 
  { register: UseFormRegister<AddBoxForm>,
     errors: FieldErrors<AddBoxForm>,
      structuresField: FieldArrayWithId<AddBoxForm, "structures", "id">[],
      appendStructure: UseFieldArrayAppend<AddBoxForm, "structures">,
      removeStructure:  UseFieldArrayRemove
      control: Control<AddBoxForm, any>
     }) => {

      const { fields: variableCostFields, append: appendVariableCost, remove: removeVariableCost } = useFieldArray({
        control,
        name: 'structures',
        })

  const structures: StructureObject[] = useSelector(state => selectAllStructures(state))

  const typeNames = ['عرشه پل سواره رو', 'پل عابر پیاده', 'بیلبورد']
  const styles = ['افقی', 'عمودی']
  const faces = ['شمالی', 'جنوبی', 'غربی', 'شرقی']
  
  return (
<>
<div className='flex flex-col gap-8 items-start w-full p-8 bg-bgform rounded-[30px] text-black'>
        <small className="pr-3 text-slate-500 inline-block font-bold">اطلاعات سازه ها</small>
        {structuresField.map((item, fieldIndex) => (
          <>
            <div
              className=" border-[1px] rounded-2xl flex flex-col items-end overflow-hidden border-primary bg-secondary w-full"
              key={item.id}
              >
                <div className="relative grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 p-2 xl:grid-cols-6 2xl:grid-cols-9 gap-4 lg:gap-2">
                  <div className='absolute right-0 top-0 min-h-[24px] w-4 rounded-b-[20px] bg-primary flex justify-center items-center font-bold text-white hover:scale-125 cursor-pointer transition-all'>
                    {fieldIndex + 1}
                  </div>

                  <div className='flex flex-col gap-3'>
                    <label htmlFor="typeName" className='text-[#767676] text-center font-bold'>کد سامانه سازه</label>
                    <select 
                      {...register(`structures.${fieldIndex}.structureId`, {
                        required: {
                          value: true,
                          message:  'کد سازه را انتخاب کنید'
                        }
                      })}
                      className="select select-bordered max-w-xs w-full px-6 py-3 rounded-[50px] bg-white outline-none"
                    >
                      {
                        structures.map((structure) => (
                          <>
                            <option
                              value={structure.id}
                              key={structure.id}
                              id="typeName"
                          >
                            {structure.name}
                          </option>
                        </>
                        ))
                      }
                    </select>
                    <small className="text-xs text-rose-600 "> {errors?.['structures']?.[fieldIndex]?.['structureId']?.['message']}</small>
                  </div>
        
                  <div className='flex flex-col gap-3'>
                    <label htmlFor="typeName" className='text-[#767676] font-bold'>نوع سازه</label>
                    <select 
                      {...register(`structures.${fieldIndex}.types.name`, {
                        required: {
                          value: true,
                          message:  'نوع سازه را انتخاب کنید'
                      }
                      })}
                      className="select select-bordered max-w-xs w-full px-6 py-3 rounded-[50px] bg-white outline-none"
                    >
                      {
                        typeNames.map((type, index) => (
                          <option
                            value={type}
                            key={index}
                            id="typeName"
                          >
                            {type}
                          </option>
                        ))
                      }
                    </select>
                  </div>
        
                  <div className='flex flex-col gap-3'>
                    <label htmlFor="style" className='text-[#767676] font-bold'>استایل</label>
                    <select 
                      {...register(`structures.${fieldIndex}.types.typeOptions.style`, {
                        required: {
                          value: true,
                          message:  'نوع سازه را انتخاب کنید'
                        }
                      })}
                      className="select select-bordered max-w-xs w-full px-6 py-3 rounded-[50px] bg-white outline-none"
                    >
                      {
                        styles.map((style, index) => (
                          <option 
                            value={style}
                            key={index}
                            id="style"
                          >
                            {style}
                          </option>
                        ))
                      }
                    </select>
                  </div>
                  
                  <div className='flex flex-col gap-3'>
                    <label htmlFor="face" className='text-[#767676] font-bold'>تیپ</label>
                    <select 
                      {...register(`structures.${fieldIndex}.types.typeOptions.face`, {
                        required: {
                          value: true,
                          message:  'تیپ سازه را انتخاب کنید'
                        }
                      })}
                      className="select select-bordered max-w-xs w-full px-6 py-3 rounded-[50px] bg-white outline-none">
                      {
                        faces.map((face, index) => (
                          <option 
                            value={face}
                            key={index}
                            id="face"
                          >
                            {face}
                          </option>
                        ))
                      }
                    </select>
                  </div>
                  
                  <div className='flex flex-col gap-3'>
                    <label htmlFor="length" className='text-[#767676] font-bold'>طول</label>
                    <input
                      {...register(`structures.${fieldIndex}.types.typeOptions.length`, {
                        valueAsNumber: true,
                        required: {
                          value: true,
                          message:  'طول سازه را وارد کنید'
                        }
                      })}
                      type="number"
                      id='length'
                      className='p-4 rounded-[50px] bg-white outline-none'
                      data-error
                    />
                    <small className="text-xs text-rose-600 ">
                      {/* {errors?.['structures']?.[fieldIndex]?.['types']?.['typeOptions']?.['length']?.['message']} */}
                    </small>
                  </div>
                      
                  <div className='flex flex-col gap-3'>
                    <label htmlFor="width" className='text-[#767676] font-bold'>عرض</label>
                    <input
                      {...register(`structures.${fieldIndex}.types.typeOptions.width`, {
                        valueAsNumber: true,
                        required: {
                          value: true,
                          message:  'عرض سازه را وارد کنید'
                        }
                      })}
                      type="number"
                      id='width'
                      className='p-4 rounded-[50px] bg-white outline-none'
                    />
                  </div>
                              
                  <div className='flex flex-col gap-3'>
                    <label htmlFor="printSize" className='text-[#767676] font-bold'>متراژ چاپ</label>
                    <input
                      {...register(`structures.${fieldIndex}.types.typeOptions.printSize`, {
                        valueAsNumber: true,
                        required: {
                          value: true,
                          message:  'متراژ چاپ سازه را وارد کنید'
                        }
                      })}
                      type="number"
                      id='printSize'
                      className='p-4 rounded-[50px] bg-white outline-none'
                    />
                  </div>
                  
                  <div className='flex flex-col gap-3'>
                    <label htmlFor="docSize" className='text-[#767676] font-bold'>متراژ واقعی</label>
                    <input
                      {...register(`structures.${fieldIndex}.types.typeOptions.docSize`, {
                        valueAsNumber: true,
                        required: {
                          value: true,
                          message:  'متراژ واقعی سازه را وارد کنید'
                        }
                      })}
                      type="number"
                      id='docSize'
                      className='p-4 rounded-[50px] bg-white outline-none'
                    />
                  </div>
                  
                  <div className='flex flex-col gap-3'>
                    <label htmlFor="squareCost" className='text-[#767676] font-bold'>قیمت متر مربع</label>
                    <input
                      {...register(`structures.${fieldIndex}.costs.fixedCosts.squareCost`, {
                        valueAsNumber: true,
                        required: {
                          value: true,
                          message:  'قیمت متر مربع سازه را وارد کنید'
                        }
                      })}
                      type="number"
                      id='squareCost'
                      className='p-4 rounded-[50px] bg-white outline-none'
                    />
                  </div>

                  <AiFillMinusSquare
                    className={`${fieldIndex === 0 ? 'hidden' : 'block'} cursor-pointer text-2xl hover:text-red-700 transition-all`}
                    onClick={() => removeStructure(fieldIndex)} 
                  />

                </div>
                    <VariableCostsFormSection 
                      register={register}
                      control={control}
                      fieldIndex={fieldIndex}
                    />
            </div>
            
          </>
        ))}
        <AiFillPlusSquare 
        className="cursor-pointer text-2xl hover:text-green-700 transition-all"
          onClick={() => appendStructure({
            structureId: '',
            types: {
              name: '',
              typeOptions: {
                  style: '',
                  face: '',
                  length: '',
                  width: '',
                  printSize: '',
                  docSize: '',
              }
          },
          costs: {
              fixedCosts: {
                squareCost: ''
              },
              variableCosts: [{
                name: '',
                figures: {
                  periodCost: ''
                }
              }]
          }
          })}
        />
    </div>
</>
  )
}

export default StructuresFormSection