import { boxStructureFormValues, faces, styles, typeNames } from "@/app/lib/constants"
import { StructureObject, BoxStructuresFormSectionProps } from "@/app/lib/interfaces"
import { selectAllStructures, useGetStructuresQuery } from "../../apiSlices/structuresApiSlice"
import { AiFillPlusSquare, AiFillMinusSquare } from 'react-icons/ai'
import VariableCostsFormSection from "./VariableCostsFormSection"
import SelectInput from "@/app/components/inputs/SelectInput"
import CustomInput from "@/app/components/inputs/CustomInput"
import { FieldError } from "react-hook-form"
import { useSelector } from "react-redux" 

const BoxStructuresFormSection = (props: BoxStructuresFormSectionProps) => {

  const {
    register,
    errors,
    structuresField,
    appendStructure,
    removeStructure,
    control,
    setValue,
    convertToNumber
  } = props

  useGetStructuresQuery(undefined, { 
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
})

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
          const selectInputs = [
            {
              id: 1,
              label: "کد سامانه سازه",
              name: `structures.${fieldIndex}.structureId`,
              options: filtered,
              errors: errors?.['structures']?.[fieldIndex]?.['structureId']?.['message'],
              defaultValue:{}
            },
            {
              id: 2,
              label: "نوع سازه",
              name: `structures.${fieldIndex}.marks.name`,
              options: typeNames,
              errors: (errors?.structures?.[fieldIndex]?.marks?.name as FieldError)?.message
            },
            {
              id: 3,
              label: "استایل سازه",
              name: `structures.${fieldIndex}.marks.markOptions.style`,
              options: styles,
              errors: (errors?.structures?.[fieldIndex]?.marks?.markOptions?.style as FieldError)?.message
            },
            {
              id: 4,
              label: "تیپ سازه",
              name: `structures.${fieldIndex}.marks.markOptions.face`,
              options: faces,
              errors: (errors?.structures?.[fieldIndex]?.marks?.markOptions?.face as FieldError)?.message
            }
          ]
          
          const customInputs = [
            {
              id: 1,
              label: "طول",
              name: `structures.${fieldIndex}.marks.markOptions.length`,
              type:'number',
              message: 'طول سازه را وارد کنید',
              errors: (errors?.structures?.[fieldIndex]?.marks?.markOptions?.length as FieldError)?.message,
              // onWheel: (e: any) => e.target.blur()
            },
            {
              id: 2,
              label: "عرض",
              name: `structures.${fieldIndex}.marks.markOptions.width`,
              type:'number',
              message: 'عرض سازه را وارد کنید',
              errors: (errors?.structures?.[fieldIndex]?.marks?.markOptions?.width as FieldError)?.message,
            },
            {
              id: 3,
              label: "متراژ چاپ",
              name: `structures.${fieldIndex}.marks.markOptions.printSize`,
              type:'number',
              message: 'متراژ چاپ سازه را وارد کنید',
              errors: (errors?.structures?.[fieldIndex]?.marks?.markOptions?.printSize as FieldError)?.message,
            },
            {
              id: 4,
              label: "متراژ واقعی",
              name: `structures.${fieldIndex}.marks.markOptions.docSize`,
              type:'number',
              message: 'متراژ واقعی سازه را وارد کنید',
              errors: (errors?.structures?.[fieldIndex]?.marks?.markOptions?.docSize as FieldError)?.message,
            },
            {
              id: 5,
              label: "قیمت متر مربع",
              name: `structures.${fieldIndex}.costs.fixedCosts.squareCost`,
              type:'text',
              message: 'قیمت متر مربع سازه را وارد کنید',
              errors: (errors?.structures?.[fieldIndex]?.costs?.fixedCosts?.squareCost as FieldError)?.message,
              onChange: (event: any) => handleTextbox1Change(event, 0, `structures.${fieldIndex}.costs.fixedCosts.squareCost`)
            },
            {
              id: 6,
              label: "تعرفه ماهیانه پایه",
              name: `structures.${fieldIndex}.monthlyBaseFee`,
              type:'text',
              message: 'تعرفه ماهیانه پایه سازه را وارد کنید',
              errors: (errors?.structures?.[fieldIndex]?.monthlyBaseFee as FieldError)?.message,
              onChange: (event: any) => handleTextbox1Change(event, 0, `structures.${fieldIndex}.monthlyBaseFee`)
            },
          ]
         
        return (
          <div
            className=" border-[1px] rounded-2xl flex flex-col items-end overflow-hidden border-primary bg-secondary w-full"
            key={item.id}
          >
            <div className="relative grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 p-2 xl:grid-cols-6 2xl:grid-cols-10 gap-4 lg:gap-2">
              <div className='absolute right-0 top-0 min-h-[24px] w-4 rounded-b-[20px] bg-primary flex justify-center items-center font-bold text-white hover:scale-125 cursor-pointer transition-all'>
                {fieldIndex + 1}
              </div>
              
              {selectInputs.map((selectInput: any, index: number)=> {
                return(
                  <SelectInput
                    key={selectInput.id}
                    control={control}
                    label={selectInput.label}
                    name={selectInput.name}
                    options={selectInput.options}
                    required={true}
                    errors={selectInput.errors}
                  />
                )
              })}

              {customInputs.map((customInput: any) => {
                return(
                  <CustomInput
                    control={control}
                    name={customInput.name}
                    label={customInput.label}
                    required
                    message={customInput.message}
                    type={customInput.type}
                    errors={customInput.errors}
                    onWheel={customInput.onWheel? customInput.onWheel : undefined}
                    onChange={customInput.onChange!!}
                  />
                )
              })}

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

export default BoxStructuresFormSection