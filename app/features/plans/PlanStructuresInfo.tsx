import { Control, FieldArrayWithId, FieldError, FieldErrors, UseFieldArrayAppend, UseFieldArrayRemove, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { AddPlanForm, BoxObject, BoxStructure, CombinedStructure, EditPlanForm, PlanObject, StructureObject } from '@/app/lib/interfaces'
import { selectAllStructures, useGetStructuresQuery } from '../../apiSlices/structuresApiSlice'
import { useGetAllInitialCustomersQuery } from '../../apiSlices/initialCustomersApiSlice'
import { selectAllBoxes, useGetAllBoxesQuery } from '../../apiSlices/boxesApiSlice'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import { planStructureFormValues } from '@/app/lib/constants'
import persian_fa from "react-date-object/locales/persian_fa"
import { FaDollarSign, FaPercentage } from 'react-icons/fa'
import React, { useEffect, useRef, useState } from 'react'
import persian from "react-date-object/calendars/persian"
import DiscountedMonthlyFee from './DiscountedMonthlyFee'
import MonthlyFeeInput from './MonthlyFeeInput'
import StructureInfo from './StructureInfo'
import { useSelector } from 'react-redux'
import Loading from '../loading/Loading'
import SummaryBox from './SummaryBox'
import ChooseStructureModal from '../boxes/ChooseStructureModal'

type Props = {
    page: string
    control: Control<EditPlanForm, any> | Control<AddPlanForm, any>
    plan?: PlanObject | any
    errors: FieldErrors<EditPlanForm>
    field: FieldArrayWithId<EditPlanForm, "structures", "id">[] | FieldArrayWithId<AddPlanForm, "structures", "id">[]
    discountType: string
    convertToNumber: (value: string | number) => number | any
    handleDiscountType: (val: string) =>void 
    setValue: UseFormSetValue<EditPlanForm> |  UseFormSetValue<AddPlanForm>
    appendStructure: UseFieldArrayAppend<EditPlanForm, "structures">  | UseFieldArrayAppend<AddPlanForm, "structures">
    removeStructure: UseFieldArrayRemove 
    watch: any
    register: UseFormRegister<EditPlanForm> | UseFormRegister<AddPlanForm>
    formVals?: any
  }
  
const PlanStructuresInfo = (props: Props) => {

    const { 
        page,
        control,
        plan,
        errors,
        field,
        discountType,
        convertToNumber,
        handleDiscountType,
        setValue,
        appendStructure,
        removeStructure,
        watch,
        register,
        formVals
    } = props

    const [changeInput, setChangeInput] = useState<boolean>(false)
    const [showStructureInfo, setShowStructureInfo] = useState<boolean>(false)
    const percentageDiscountInputRef = useRef<HTMLInputElement>(null)
    const numberDiscountInputRef = useRef<HTMLInputElement>(null)
    const [isStructureChoose, setIsStructureChoose] = useState(Array(field.length).fill(false))
    const [thisStructures, setThisStructures] = useState<string[]>([])

    const handleModalToggle = (fieldIndex: number) => {
      const updatedState = [...isStructureChoose]
      updatedState[fieldIndex] = !updatedState[fieldIndex]
      setIsStructureChoose(updatedState)
    }
    
    const handleStructureInfoModal = () => setShowStructureInfo(!showStructureInfo)

    useGetAllBoxesQuery(undefined)
    useGetStructuresQuery(undefined)
    useGetAllInitialCustomersQuery(undefined)

    const allStructures: StructureObject[] = useSelector(state => selectAllStructures(state) as StructureObject[])
    const allBoxes: BoxObject[] = useSelector(state => selectAllBoxes(state) as BoxObject[])
    const chosenStructures = allStructures.filter((structure: any) => structure.isChosen)
    const boxStructures = allBoxes.flatMap((box: any) => box.structures)
    const chosenStructuresLookup = chosenStructures.reduce(
    (acc: any, chosenStructure: any) => ({ ...acc, [chosenStructure.id]: chosenStructure }),{})

    const combinedStructures: CombinedStructure[] = boxStructures.map((boxStructure: CombinedStructure) => ({
    ...boxStructure,
    ...(chosenStructuresLookup[boxStructure.structureId]),
    }))

    const handleThisStructuresChange = (index: number, val: string) => setThisStructures((prevState) => {
        const updatedState = [...prevState]
        updatedState[index] = val
        return updatedState
      })

    function handleTextbox1Change(event: React.ChangeEvent<HTMLInputElement>, fieldIndex: number, prop: any) {
        const newValue = event.target.value.replace(/,/g, '')
        const numberValue = convertToNumber(newValue)
        const formattedValue = numberValue !== null ? 
            new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(numberValue) : ''
        setValue(prop, formattedValue)
    }

    useEffect(() => {
        if (formVals) {
          const updatedStructures = formVals.map((item: BoxStructure) => {
            const structure = allStructures.find((str) => str.id === item.structureId)
            return structure ? structure.name : 'انتخاب سازه'
          })
          setThisStructures(updatedStructures)
        } 
      }, [formVals])  

    useEffect(() => {
        if(percentageDiscountInputRef.current && numberDiscountInputRef.current){
            percentageDiscountInputRef.current.value = ''
            numberDiscountInputRef.current.value = ''
        }
    }, [discountType])

    if((page=== 'edit' && !plan) || !boxStructures) return <Loading />
    return (
        <div className='flex flex-col gap-8 items-start w-full p-8 bg-bgform rounded-[30px] text-black'>
            <small className="pr-3 text-slate-500 inline-block font-bold">اطلاعات سازه ها</small>
            <div className='flex justify-between gap-3 items-center w-full'>
                <div className='flex gap-3 items-center'>
                    <input
                        type="checkbox"
                        onChange={() => setChangeInput(!changeInput)}
                    />
                    <p>
                        ویرایش تعرفه های ماهیانه
                    </p>
                </div>
                <div className="flex gap-3 items-center">
                    <p>
                        مقیاس تخفیف
                    </p>
                    <FaPercentage
                        className={`${discountType === 'percentage' ? 'text-purple-950': 'text-purple-500'} hover:scale-150 transition-all cursor-pointer `}
                        onClick={() =>handleDiscountType('percentage')}
                    />
                    <FaDollarSign
                        className={`${discountType === 'number' ? 'text-purple-950': 'text-purple-500'} hover:scale-150 transition-all cursor-pointer`}
                        onClick={() =>handleDiscountType('number')}
                    />
                </div>
            </div>

            {field.map((item, fieldIndex) => {
                const selectedStructureId: string = watch(`structures.${fieldIndex}.structureId`)
                const selectedMonthlyFee = watch(`structures.${fieldIndex}.monthlyFee`)
                const selectedDiscount: string = watch(`structures.${fieldIndex}.discountFee`)
                const selectedStructure = combinedStructures.find((str) => str.structureId === selectedStructureId)

                const handleStartDate = (value: DateObject | DateObject[] | null) => {
                    if (value instanceof DateObject) {
                    setValue(`structures.${fieldIndex}.duration.sellStart`, value.unix * 1000)
                    } else if (Array.isArray(value) && value.length > 0) {
                    const timestamps = value.map((date) => date.unix * 1000)
                    setValue(`structures.${fieldIndex}.duration.sellStart`, timestamps[0])
                } else {
                    setValue(`structures.${fieldIndex}.duration.sellStart`, new Date().getTime())
                    }
                }
                
                const handleEndDate = (value: DateObject | DateObject[] | null) => {
                    if (value instanceof DateObject) {
                    setValue(`structures.${fieldIndex}.duration.sellEnd`, value.unix * 1000)
                } else if (Array.isArray(value) && value.length > 0) {
                    const timestamps = value.map((date) => date.unix * 1000)
                    setValue(`structures.${fieldIndex}.duration.sellEnd`, timestamps[0])
                } else {
                    setValue(`structures.${fieldIndex}.duration.sellEnd`, new Date().getTime())
                    }
                }

                return (
                    <>                
                        {selectedStructure && showStructureInfo &&
                            <StructureInfo 
                                handleModal={handleStructureInfoModal}
                                selectedStructure={selectedStructure}
                            />
                        }
                        <div
                            className=" border-[1px] rounded-2xl flex flex-col items-end  border-primary bg-secondary w-full"
                            key={item.id}
                        >
                            <div className="relative grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 p-2 xl:grid-cols-6 2xl:grid-cols-9 gap-4 lg:gap-6 w-full">
                                <div className='absolute right-0 top-0 min-h-[24px] w-4 rounded-b-[20px] bg-primary flex justify-center items-center font-bold text-white hover:scale-125 cursor-pointer transition-all'>
                                    {fieldIndex + 1}
                                </div>

                                <div className="flex flex-col gap-3">
                                    <label
                                    htmlFor={"strChoose"} 
                                    className='text-[#767676] font-bold'
                                    >
                                    کد سامانه
                                    </label>
                                    <button
                                    type="button"
                                    onClick={() => handleModalToggle(fieldIndex)}
                                    id="strChoose"
                                    className="bg-black p-4 text-white rounded-[50px] hover:text-black hover:bg-white transition-colors"
                                    >
                                    {thisStructures[fieldIndex] || 'انتخاب سازه'}
                                    </button>
                                    {isStructureChoose[fieldIndex] && (
                                    <ChooseStructureModal
                                        handleModal={() => handleModalToggle(fieldIndex)}
                                        data={combinedStructures!}
                                        fieldIndex={fieldIndex}
                                        setValue={setValue}
                                        handleThisStructuresChange={handleThisStructuresChange}
                                    />
                                    )}
                                </div>
                                <div className='flex flex-col gap-3 col-span-3 bg-white bg-opacity-40 p-2 rounded-lg overflow-x-auto'>
                                {combinedStructures.map((structure) => {
                                    if(structure.structureId === selectedStructureId)
                                    return (
                                        <SummaryBox
                                            structure={structure}
                                            selectedStructure={selectedStructure!}
                                            setValue={setValue}
                                            fieldIndex={fieldIndex}
                                        />
                                    )
                                })}
                                </div>

                                <div className='flex flex-col gap-3'>
                                    <label htmlFor="sellStartDate" className='text-[#767676] font-bold'>تاریخ شروع</label>
                                    <DatePicker
                                        inputClass='p-4 rounded-[50px] bg-white outline-none w-full'
                                        format='YYYY-MM-DD'
                                        value={page === 'edit' ? item.duration.sellStart : undefined}
                                        calendar={persian}
                                        locale={persian_fa}
                                        calendarPosition="bottom-right"
                                        onChange={(e) => handleStartDate(e)}
                                    />
                                    <small className="text-xs text-rose-600 "> 
                                        {errors?.['structures']?.[fieldIndex]?.['duration']?.['sellStart']?.['message']}
                                    </small>
                                </div>

                                <div className='flex flex-col gap-3'>
                                    <label htmlFor="sellEndDate" className='text-[#767676] font-bold'>تاریخ پایان</label>
                                    <DatePicker
                                        inputClass='p-4 rounded-[50px] bg-white outline-none w-full'
                                        format='YYYY-MM-DD'
                                        value={page === 'edit' ? item.duration.sellEnd : undefined}
                                        calendar={persian}
                                        locale={persian_fa}
                                        calendarPosition="bottom-right"
                                        onChange={(e) => handleEndDate(e)}
                                    />
                                    <small className="text-xs text-rose-600 "> 
                                        {errors?.['structures']?.[fieldIndex]?.['duration']?.['sellEnd']?.['message']}
                                    </small>
                                </div>

                                {combinedStructures.map((structure) => {
                                    return (
                                        structure.structureId === selectedStructureId &&
                                        <MonthlyFeeInput 
                                            changeInput={changeInput}
                                            selectedStructure={selectedStructure!}
                                            control={control}
                                            fieldIndex={fieldIndex}
                                            handleTextbox1Change={handleTextbox1Change}
                                            errors={errors}
                                            setValue={setValue}
                                        />
                                    )
                                })}

                                <div className='flex flex-col gap-3'>
                                    <label htmlFor="discountFee" className='text-[#767676] font-bold'>تخفیف</label>
                                    {
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
                                                className="p-4 rounded-[50px] bg-white outline-none w-full"
                                                onWheel={(e: any) => e.target.blur()} 
                                                defaultValue={page === 'edit' ? item.discountFee : undefined}
                                                onChange={(event) => {
                                                    const newValue = event.target.value;
                                                    if (discountType === 'percentage' && parseFloat(newValue) > 100) 
                                                        event.target.value = '100'
                                                    handleTextbox1Change(event, 0, `structures.${fieldIndex}.discountFee`)
                                                }}
                                                key={discountType} 
                                                ref={percentageDiscountInputRef} 
                                            />
                                            <small className="text-xs text-rose-600 "> 
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
                                                className="p-4 rounded-[50px] bg-white outline-none w-full"
                                                onWheel={(e: any) => e.target.blur()} 
                                                defaultValue={page === 'edit' ? item.discountFee : undefined}
                                                onChange={(event) => {
                                                    const newValue = event.target.value;
                                                    if (discountType !== 'percentage' && convertToNumber(newValue) > selectedStructure?.monthlyBaseFee!)
                                                        event.target.value = String(selectedStructure?.monthlyBaseFee)
                                                    handleTextbox1Change(event, 0, `structures.${fieldIndex}.discountFee`)
                                                }}
                                                key={discountType} 
                                                ref={numberDiscountInputRef} 
                                            />
                                            <small className="text-xs text-rose-600 "> 
                                            {errors?.['structures']?.[fieldIndex]?.['discountFee']?.['message']}
                                            </small>
                                        </>
                                    }
                                    <small className="text-xs text-rose-600 ">
                                    {(errors?.structures?.[fieldIndex]?.monthlyFee as FieldError)?.message}
                                    </small>
                                </div> 

                                <DiscountedMonthlyFee 
                                    selectedStructure={selectedStructure}
                                    changeInput={changeInput}
                                    discountType={discountType}
                                    convertToNumber={convertToNumber}
                                    selectedMonthlyFee={selectedMonthlyFee}
                                    selectedDiscount={selectedDiscount}
                                    errors={errors}
                                    fieldIndex={fieldIndex}
                                    setValue={setValue}
                                    numberDiscountInputRef={numberDiscountInputRef}
                                    percentageDiscountInputRef={percentageDiscountInputRef}
                                />

                            </div>
                            <AiFillMinusCircle
                                className={`${fieldIndex === 0 ? 'hidden' : 'block'} cursor-pointer text-2xl hover:text-red-700 transition-all`}
                                onClick={() => removeStructure(fieldIndex)} 
                            />
                        </div>
                    </>
                )
            })}

            <AiFillPlusCircle 
            className="cursor-pointer text-2xl hover:text-green-700 transition-all"
            onClick={() => appendStructure(planStructureFormValues)}
            />

        </div>
    )
}

export default PlanStructuresInfo