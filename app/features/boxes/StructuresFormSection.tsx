import { boxStructureFormValues, faces, styles, typeNames } from "@/app/lib/constants"
import { StructureObject, StructuresFormSectionProps } from "@/app/lib/interfaces"
import { selectAllStructures } from "../structures/structuresApiSlice"
import { AiFillPlusSquare, AiFillMinusSquare } from 'react-icons/ai'
import VariableCostsFormSection from "./VariableCostsFormSection"
import { FieldError } from "react-hook-form"
import { useSelector } from "react-redux"

const StructuresFormSection = (props: StructuresFormSectionProps) => {

  const { register, errors, structuresField, appendStructure, removeStructure, control, setValue, convertToNumber } = props

  const structures: StructureObject[] = useSelector(state => selectAllStructures(state))
  const filtered = structures.filter((structure) => structure.isChosen === false)

  function handleTextbox1Change(event: React.ChangeEvent<HTMLInputElement>, fieldIndex: number, prop: any) {
    const newValue = event.target.value.replace(/,/g, '')
    const numberValue = convertToNumber(newValue)
    const formattedValue = numberValue !== null ? new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(numberValue) : ''
    setValue(prop, formattedValue)
  }
 
  return ( 
    <div className='flex flex-col gap-8 items-start w-full p-8 bg-bgform rounded-[30px] text-black'>
      <small className="pr-3 text-slate-500 inline-block font-bold">اطلاعات سازه ها</small>
      {structuresField.map((item, fieldIndex) =>{
        return (
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
                    filtered.map((structure) => (
                      <option
                        value={structure.id}
                        key={structure.id}
                        id="typeName"
                    >
                      {structure.name}
                    </option>
                    ))
                  }
                </select>
                <small className="text-xs text-rose-600 "> 
                  {errors?.['structures']?.[fieldIndex]?.['structureId']?.['message']}
                </small>
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
                  className="select select-bordered max-w-xs w-full px-6 py-3 rounded-[50px] bg-white outline-none"
                >
                  {
                    typeNames.map((type: string, index: number) => (
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
                  className="select select-bordered max-w-xs w-full px-6 py-3 rounded-[50px] bg-white outline-none"
                >
                  {
                    styles.map((style: string, index: number) => (
                      <option 
                        value={style}
                        key={index}
                        id="styleName"
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
                  step={0.1}
                  type="number"
                  id='length'
                  className='p-4 rounded-[50px] bg-white outline-none'
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
                  type="number"
                  id='width'
                  className='p-4 rounded-[50px] bg-white outline-none'
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
                  type="number"
                  id='printSize'
                  className='p-4 rounded-[50px] bg-white outline-none'
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
                  type="number"
                  id='docSize'
                  className='p-4 rounded-[50px] bg-white outline-none'
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
                  type="text"
                  id="squareCost"
                  className="p-4 rounded-[50px] bg-white outline-none"
                  // onWheel={(e: any) => e.target.blur()} 
                  onChange={(event) => handleTextbox1Change(event, 0, `structures.${fieldIndex}.costs.fixedCosts.squareCost`)}
                />
                <small className="text-xs text-rose-600 ">
                  {(errors?.structures?.[fieldIndex]?.costs?.fixedCosts?.squareCost as FieldError)?.message}
                </small>
              </div>

              <AiFillMinusSquare
                className={`${fieldIndex === 0 ? 'hidden' : 'block'} cursor-pointer text-2xl hover:text-red-700 transition-all`}
                onClick={() => removeStructure(fieldIndex)} 
              />

            </div>

            <VariableCostsFormSection 
              errors={errors}
              register={register}
              control={control}
              fieldIndex={fieldIndex}
              handleTextbox1Change={handleTextbox1Change}
            />
          </div>
        )
      } 
      )}

        <AiFillPlusSquare 
          className="cursor-pointer text-2xl hover:text-green-700 transition-all"
          onClick={() => appendStructure(boxStructureFormValues)}
        />
    </div>

  ) 
}

export default StructuresFormSection