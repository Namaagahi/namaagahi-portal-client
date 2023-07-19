import React from 'react'
import { selectAllBoxes, useGetAllBoxesQuery } from '../boxes/boxesApiSlice'
import { useSelector } from 'react-redux'
import { selectAllStructures, useGetStructuresQuery } from '../structures/structuresApiSlice'
import { useGetAllInitialCustomersQuery } from '../initialCustomers/initialCustomersApiSlice'
import Loading from '../loading/Loading'
import { CombinedStructure, PlanStructuresFormSectionProps } from '@/app/lib/interfaces'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import { FaPercentage, FaDollarSign } from 'react-icons/fa'
import { planStructureFormValues } from '@/app/lib/constants'
import persian_fa from "react-date-object/locales/persian_fa"
import persian from "react-date-object/calendars/persian"
import DatePicker from "react-multi-date-picker"
import { FieldError } from 'react-hook-form'

const PlanStructuresFormSection = (props: PlanStructuresFormSectionProps) => {

    const { register, errors, structuresField, removeStructure, appendStructure, watch, convertToNumber, setValue, discountType, handleDiscountType } = props

    useGetAllBoxesQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
    })
    useGetStructuresQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
    })
     
    const { isLoading } = useGetAllInitialCustomersQuery(undefined, {
        refetchOnFocus: false,
        refetchOnMountOrArgChange: false
    })

    const allStructures = useSelector(state => selectAllStructures(state))
    const allBoxes = useSelector(state => selectAllBoxes(state))

    const chosenStructures = allStructures.filter((structure: any) => structure.isChosen)
    const boxStructures = allBoxes.flatMap((box: any) => box.structures)
    const chosenStructuresLookup = chosenStructures.reduce(
    (acc: any, chosenStructure: any) => ({ ...acc, [chosenStructure.id]: chosenStructure }),
    {}
    )
    const combinedStructures: CombinedStructure[] = boxStructures.map((boxStructure: CombinedStructure) => ({
    ...boxStructure,
    ...(chosenStructuresLookup[boxStructure.structureId] || null),
    }))

    function handleTextbox1Change(event: React.ChangeEvent<HTMLInputElement>, fieldIndex: number, prop: any) {
        const newValue = event.target.value.replace(/,/g, '')
        const numberValue = convertToNumber(newValue)
        const formattedValue = numberValue !== null ? new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(numberValue) : ''
        setValue(prop, formattedValue)
      }

    if(isLoading) return <Loading />
console.log("combinedStructures", combinedStructures)
    return (
        <div className='flex flex-col gap-8 items-start w-full p-8 bg-bgform rounded-[30px] text-black'>
            <small className="pr-3 text-slate-500 inline-block font-bold">اطلاعات سازه ها</small>
            
        {structuresField.map((item, fieldIndex) => {
            const selectedStructureId = watch(`structures.${fieldIndex}.structureId`)
            return (
                <div
                    className=" border-[1px] rounded-2xl flex flex-col items-end  border-primary bg-secondary w-full"
                    key={item.id}
                >
                    <div className="relative grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 p-2 xl:grid-cols-6 2xl:grid-cols-9 gap-4 lg:gap-6 w-full">
                        <div className='absolute right-0 top-0 min-h-[24px] w-4 rounded-b-[20px] bg-primary flex justify-center items-center font-bold text-white hover:scale-125 cursor-pointer transition-all'>
                            {fieldIndex + 1}
                        </div>

                        <div className='flex flex-col gap-3 '>
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
                            combinedStructures.map((structure) => {
                                const box: any = allBoxes.find((box: any) => box?.boxId === structure?.parent)
                                return(
                                    <option
                                        value={structure?.id}
                                        key={structure?.id}
                                        id="typeName"
                                    >
                                        {`${structure?.name} - ${box?.name}`}
                                    </option>
                                )
                                })
                            }
                            </select>
                        <small className="text-xs text-rose-600 "> 
                        {errors?.['structures']?.[fieldIndex]?.['structureId']?.['message']}
                        </small>
                        </div>

                        <div className='flex flex-col gap-3 col-span-3 bg-white bg-opacity-40 p-2 rounded-lg overflow-x-auto'>
                        {combinedStructures.map((structure) => {
                            if(structure.structureId === selectedStructureId)
                            return (
                                <>
                                    <div className='flex gap-3'>
                                        <label htmlFor="typeName" className='text-[#767676] font-bold'>مسیر</label>
                                        <p>{structure.location.path}</p>
                                    </div>
                                    <div className='flex gap-3'>
                                        <label htmlFor="typeName" className='text-[#767676] font-bold'>نشانی</label>
                                        <p>{structure.location.address}</p>
                                    </div>
                                    <div className='flex gap-3'>
                                        <label htmlFor="typeName" className='text-[#767676] font-bold'>مساحت</label>
                                        <p>{structure.marks.markOptions.printSize}</p>
                                    </div>
                                </>
                            )
                        })}
                        </div>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="startDate" className='text-[#767676] font-bold'>تاریخ شروع</label>
                            <DatePicker
                                inputClass='p-4 rounded-[50px] bg-white outline-none w-full'
                                format='YYYY-MM-DD'
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                                // onChange={(val) => handleStartDate(val)}
                            />
                            {/* <small className="text-xs text-rose-600 ">{errors.startDate?.message}</small> */}
                        </div>

                        <div className='flex flex-col gap-3'>
                            <label htmlFor="endDate" className='text-[#767676] font-bold'>تاریخ پایان</label>
                            <DatePicker
                                inputClass='p-4 rounded-[50px] bg-white outline-none w-full'
                                format='YYYY-MM-DD'
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                                // onChange={(val) => handleEndDate(val)}
                            />
                            {/* <small className="text-xs text-rose-600 ">{errors.endDate?.message}</small> */}
                        </div>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="monthlyFee" className='text-[#767676] font-bold'>تعرفه ماهیانه</label>
                            <input
                            {...register(`structures.${fieldIndex}.monthlyFee`, {
                                required: {
                                value: true,
                                message: "تعرفه ماهیانه سازه را وارد کنید",
                                },
                            })}
                            type="text"
                            id="monthlyFee"
                            className="p-4 rounded-[50px] bg-white outline-none w-full"
                            // onWheel={(e: any) => e.target.blur()} 
                            onChange={(event) => handleTextbox1Change(event, 0, `structures.${fieldIndex}.monthlyFee`)}
                            />
                            <small className="text-xs text-rose-600 ">
                            {(errors?.structures?.[fieldIndex]?.monthlyFee as FieldError)?.message}
                            </small>
                        </div>
          

                        <div className='flex flex-col gap-3'>
                            <div className='flex items-center gap-2'>
                                <label htmlFor="discountFee" className='text-[#767676] font-bold'>تخفیف</label>
                                <FaPercentage
                                    className='text-purple-700 hover:scale-150 transition-all cursor-pointer '  
                                    onClick={() =>handleDiscountType('percentage')}
                                />
                                <FaDollarSign
                                    className='text-purple-700 hover:scale-150 transition-all cursor-pointer '
                                    onClick={() =>handleDiscountType('number')}
                                />
                            </div>
                            {
                                discountType === 'percentage' ?
                                <input
                                {...register(`structures.${fieldIndex}.discountFee`, {
                                    required: {
                                    value: true,
                                    message: "تعرفه ماهیانه سازه را وارد کنید",
                                    },
                                })}
                                type="text"
                                id="discountFee"
                                placeholder='تخفیف به درصد'
                                className="p-4 rounded-[50px] bg-white outline-none w-full"
                                // onWheel={(e: any) => e.target.blur()} 
                                onChange={(event) => handleTextbox1Change(event, 0, `structures.${fieldIndex}.discountFee`)}
                                />
                                 : 
                                 <input
                                 {...register(`structures.${fieldIndex}.discountFee`, {
                                     required: {
                                     value: true,
                                     message: "تعرفه ماهیانه سازه را وارد کنید",
                                     },
                                 })}
                                 type="text"
                                 id="discountFee"
                                 placeholder='تخفیف به ریال'
                                 className="p-4 rounded-[50px] bg-white outline-none w-full"
                                 // onWheel={(e: any) => e.target.blur()} 
                                 onChange={(event) => handleTextbox1Change(event, 0, `structures.${fieldIndex}.discountFee`)}
                                 />
                            }
                        
                            <small className="text-xs text-rose-600 ">
                            {(errors?.structures?.[fieldIndex]?.monthlyFee as FieldError)?.message}
                            </small>
                        </div> 
                    </div>
                    <AiFillMinusCircle
                        className={`${fieldIndex === 0 ? 'hidden' : 'block'} cursor-pointer text-2xl hover:text-red-700 transition-all`}
                        onClick={() => removeStructure(fieldIndex)} 
                    />
                </div>
            )
        })}
        <AiFillPlusCircle 
          className="cursor-pointer text-2xl hover:text-green-700 transition-all"
          onClick={() => appendStructure(planStructureFormValues)}
        />
        </div>
    )
}

export default PlanStructuresFormSection