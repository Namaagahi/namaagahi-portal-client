import { selectAllStructures } from "../structures/structuresApiSlice"
import { AddBoxForm, StructureObject } from "@/app/lib/interfaces"
import { FieldArrayWithId, FieldErrors, UseFieldArrayAppend, UseFieldArrayRemove, UseFormRegister } from "react-hook-form"
import { useSelector } from "react-redux"
import { AiFillPlusSquare, AiFillMinusSquare } from 'react-icons/ai'

const StructuresFormSection = ({ register, errors, structuresField, appendStructure, removeStructure }: 
  { register: UseFormRegister<AddBoxForm>,
     errors: FieldErrors<AddBoxForm>,
      structuresField: FieldArrayWithId<AddBoxForm, "structures", "id">[],
      appendStructure: UseFieldArrayAppend<AddBoxForm, "structures">,
      removeStructure:  UseFieldArrayRemove
     }) => {

  const structures: StructureObject[] = useSelector(state => selectAllStructures(state))

  const typeNames = ['عرشه پل سواره رو', 'پل عابر پیاده', 'بیلبورد']
  const styles = ['افقی', 'عمودی']
  const faces = ['شمالی', 'جنوبی', 'غربی', 'شرقی']

  console.log("ERRORS", errors)
  
  return (
    <div className='flex flex-col gap-8 items-start w-full p-8 bg-bgform rounded-[30px] text-black'>
        <small className="pr-3 text-slate-500 inline-block font-bold">اطلاعات سازه ها</small>
        {structuresField.map((item, fieldIndex) => (
                  <div 
                    className="relative border-[1px] rounded-2xl overflow-hidden border-primary bg-secondary p-2 w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-9 gap-4 lg:gap-2"
                    key={item.id}
                  >

                  <div className='absolute right-0 top-0 min-h-[24px] w-4 rounded-b-[20px] bg-primary flex justify-center items-center font-bold text-white hover:scale-125 cursor-pointer transition-all'>
                      {fieldIndex + 1}
                  </div>

                  <div className='flex flex-col gap-3'>
                    <label htmlFor="typeName" className='text-[#767676] text-center font-bold'>کد سامانه سازه</label>
                    <select className="select select-bordered max-w-xs w-full px-6 py-3 rounded-[50px] bg-white outline-none">
                      {
                        structures.map((structure) => (
                          <>
                            <option
                              {...register(`structures.${fieldIndex}.structureId`, {
                                required: {
                                  value: true,
                                  message:  'کد سازه را انتخاب کنید'
                                }
                              })}
                            key={structure.id}
                            id="typeName"
                          >
                            {structure.name}
                          </option>
                          <small className="text-xs text-rose-600 "> {errors?.['structures']?.[fieldIndex]?.['structureId']?.['message']}</small>
                        </>
                        ))
                      }
                    </select>
                  </div>
        
                  <div className='flex flex-col gap-3'>
                    <label htmlFor="typeName" className='text-[#767676] font-bold'>نوع سازه</label>
                    <select className="select select-bordered max-w-xs w-full px-6 py-3 rounded-[50px] bg-white outline-none">
                      {
                        typeNames.map((type, index) => (
                          <option
                          {...register(`structures.${fieldIndex}.types.name`, {
                            required: {
                              value: true,
                              message:  'نوع سازه را انتخاب کنید'
                            }
                          })}
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
                    <select className="select select-bordered max-w-xs w-full px-6 py-3 rounded-[50px] bg-white outline-none">
                      {
                        styles.map((style, index) => (
                          <option 
                            {...register(`structures.${fieldIndex}.types.typeOptions.style`, {
                              required: {
                                value: true,
                                message:  'نوع سازه را انتخاب کنید'
                              }
                            })}
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
                    <select className="select select-bordered max-w-xs w-full px-6 py-3 rounded-[50px] bg-white outline-none">
                      {
                        faces.map((face, index) => (
                          <option 
                            {...register(`structures.${fieldIndex}.types.typeOptions.face`, {
                              required: {
                                value: true,
                                message:  'تیپ سازه را انتخاب کنید'
                              }
                            })}
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
                      {errors?.['structures']?.[fieldIndex]?.['types']?.['typeOptions']?.['length']?.['message']}
                    </small>
                  </div>
                      
                  <div className='flex flex-col gap-3'>
                    <label htmlFor="width" className='text-[#767676] font-bold'>عرض</label>
                    <input
                      {...register(`structures.${fieldIndex}.types.typeOptions.width`, {
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
                    <label htmlFor="name" className='text-[#767676] font-bold'>قیمت متر مربع</label>
                    <input
                      {...register(`structures.${fieldIndex}.costs.fixedCosts.squareFee`, {
                        required: {
                          value: true,
                          message:  'قیمت متر مربع سازه را وارد کنید'
                        }
                      })}
                      type="number"
                      id='docSize'
                      className='p-4 rounded-[50px] bg-white outline-none'
                    />
                  </div>
                  <AiFillMinusSquare
                  className="cursor-pointer text-2xl hover:text-red-700 transition-all"
                  onClick={() => removeStructure(fieldIndex)} 
                  />
                </div>
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
                  length: NaN,
                  width: NaN,
                  printSize: NaN,
                  docSize: NaN,
              }
          },
          costs: {
              fixedCosts: {
                  squareFee: NaN
              }
          }
          })}
        />
    </div>
  )
}

export default StructuresFormSection