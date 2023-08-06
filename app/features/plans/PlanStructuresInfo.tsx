import { CombinedStructure, PlanStructuresInfoProps, StructureObject } from '@/app/lib/interfaces'
import { selectAllStructures, useGetStructuresQuery } from '../../apiSlices/structuresApiSlice'
import { useGetAllInitialCustomersQuery } from '../../apiSlices/initialCustomersApiSlice'
import { selectAllBoxes, useGetAllBoxesQuery } from '../../apiSlices/boxesApiSlice'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import SelectInput from '@/app/components/inputs/SelectInput'
import { planStructureFormValues } from '@/app/lib/constants'
import CustomInput from '@/app/components/inputs/CustomInput'
import persian_fa from "react-date-object/locales/persian_fa"
import { FaDollarSign, FaPercentage } from 'react-icons/fa'
import React, { useEffect, useRef, useState } from 'react'
import persian from "react-date-object/calendars/persian"
import DiscountedMonthlyFee from './DiscountedMonthlyFee'
import DatePicker from 'react-multi-date-picker'
import MonthlyFeeInput from './MonthlyFeeInput'
import { FieldError } from 'react-hook-form'
import StructureInfo from './StructureInfo'
import { useSelector } from 'react-redux'
import Loading from '../loading/Loading'
import SummaryBox from './SummaryBox'

const PlanStructuresInfo = (props: PlanStructuresInfoProps) => {

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
        register
    } = props

    const [changeInput, setChangeInput] = useState(false)
    const [showStructureInfo, setShowStructureInfo] = useState(false)
    const percentageDiscountInputRef = useRef<HTMLInputElement>(null)
    const numberDiscountInputRef = useRef<HTMLInputElement>(null)
    
    const handleStructureInfoModal = () => setShowStructureInfo(!showStructureInfo)

    useGetAllBoxesQuery(undefined)
    useGetStructuresQuery(undefined)
    useGetAllInitialCustomersQuery(undefined)

    const allStructures: StructureObject[] = useSelector(state => selectAllStructures(state))
    const allBoxes = useSelector(state => selectAllBoxes(state))
    const chosenStructures = allStructures.filter((structure: any) => structure.isChosen)
    const boxStructures = allBoxes.flatMap((box: any) => box.structures)
    const chosenStructuresLookup = chosenStructures.reduce(
    (acc: any, chosenStructure: any) => ({ ...acc, [chosenStructure.id]: chosenStructure }),{})

    const combinedStructures: CombinedStructure[] = boxStructures.map((boxStructure: CombinedStructure) => ({
    ...boxStructure,
    ...(chosenStructuresLookup[boxStructure.structureId]),
    }))

    function formatNumber(number: number, separator: string): string {
        const options = {
          useGrouping: true,
          minimumFractionDigits: 0,
        }
        return number?.toLocaleString(undefined, options).replace(/,/g, separator);
    }

    function handleTextbox1Change(event: React.ChangeEvent<HTMLInputElement>, fieldIndex: number, prop: any) {
        const newValue = event.target.value.replace(/,/g, '')
        const numberValue = convertToNumber(newValue)
        const formattedValue = numberValue !== null ? new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(numberValue) : ''
        setValue(prop, formattedValue)
    }

    function convertToEnglishDate(dateStr: any) {
        const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
        const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        let englishDate = "";
        [...dateStr].forEach(char => {
            let index = persianDigits.indexOf(char);
            englishDate += (index !== -1) ? englishDigits[index] : char
        })
        return englishDate
    }

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
                    <p>ویرایش تعرفه های ماهیانه</p>
                </div>
                <div className="flex gap-3 items-center">
                    <p>مقیاس تخفیف</p>
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

                                <div className='flex flex-col'>
                                    <SelectInput
                                        control={control}
                                        name={`structures.${fieldIndex}.structureId`}
                                        label='کد سامانه سازه'
                                        required={true}
                                        options={combinedStructures}
                                        errors={errors?.['structures']?.[fieldIndex]?.['structureId']?.['message']}
                                    />
                                    <button 
                                        type='button' 
                                        className='bg-black text-white rounded-md hover:text-black hover:bg-white transition-colors'
                                        onClick={handleStructureInfoModal}
                                    >
                                        اطلاعات سازه
                                    </button>
                                </div>
                                
                                <div className='flex flex-col gap-3 col-span-3 bg-white bg-opacity-40 p-2 rounded-lg overflow-x-auto'>
                                {combinedStructures.map((structure) => {
                                    if(structure.structureId === selectedStructureId)
                                    return (
                                        <SummaryBox
                                            structure={structure}
                                            selectedStructure={selectedStructure}
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
                                        onChange={(val) => setValue(`structures.${fieldIndex}.duration.sellStart`, convertToEnglishDate(val!!.toString()))}

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
                                        onChange={(val) => setValue(`structures.${fieldIndex}.duration.sellEnd`, convertToEnglishDate(val!!.toString()))}
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
                                            selectedStructure={selectedStructure}
                                            control={control}
                                            fieldIndex={fieldIndex}
                                            handleTextbox1Change={handleTextbox1Change}
                                            errors={errors}
                                            setValue={setValue}
                                            formatNumber={formatNumber}
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
                                
                                {/* {
                                    discountType === 'percentage' ?
                                    <CustomInput
                                        control={control}
                                        name={`structures.${fieldIndex}.discountFee`}
                                        type='text'
                                        placeholder='تخفیف به درصد'
                                        label='تخفیف'
                                        defaultValue={page === 'edit' ? item.discountFee : undefined}
                                        required={true}
                                        message='در صورت نداشتن تخفیف مقدار 0 را وارد کنید'
                                        errors={errors?.['structures']?.[fieldIndex]?.['discountFee']?.['message']}
                                        onChange={(event: any) => {
                                            const newValue = event.target.value;
                                            if (discountType === 'percentage' && parseFloat(newValue) > 100) 
                                                event.target.value = '100'
                                            handleTextbox1Change(event, 0, `structures.${fieldIndex}.discountFee`)
                                        }}
                                        ref={percentageDiscountInputRef.current}
                                        key={discountType}
                                        onWheel={(e: any) => e.target.blur()} 
                                    />
                                    :
                                    <CustomInput
                                        control={control}
                                        name={`structures.${fieldIndex}.discountFee`}
                                        type='text'
                                        placeholder='تخفیف به ریال'
                                        label='تخفیف'
                                        defaultValue={page === 'edit' ? item.discountFee : undefined}
                                        required={true}
                                        message='در صورت نداشتن تخفیف مقدار 0 را وارد کنید'
                                        errors={errors?.['structures']?.[fieldIndex]?.['discountFee']?.['message']}
                                        onChange={(event: any) => {
                                            const newValue = event.target.value;
                                            if (discountType !== 'percentage' && convertToNumber(newValue) > selectedStructure?.monthlyBaseFee!)
                                                event.target.value = String(selectedStructure?.monthlyBaseFee)
                                            handleTextbox1Change(event, 0, `structures.${fieldIndex}.discountFee`)
                                        }}
                                        ref={numberDiscountInputRef}
                                        key={discountType}
                                        onWheel={(e: any) => e.target.blur()} 
                                    />
                                } */}

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
                                    formatNumber={formatNumber}
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