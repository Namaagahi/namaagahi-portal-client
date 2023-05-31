import { DevTool } from "@hookform/devtools"
import { useFieldArray, useForm } from "react-hook-form"
import BasicInfoFormSection from "./BasicInfoFormSection"
// import { structures } from '../../lib/dummyData'
import { AiOutlinePlusCircle, AiOutlineCheckCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import StructureFormSection from "./StructureFormSection"
import { useEffect } from "react"

export interface Structure {
    sysCode: number,
    kind: string,
    district: number,
    path: string,
    address: string,
    style: string,
    face: string,
    dimensions: string,
    printSize: number,
    docSize: number,
    squareFee: number
}

export interface AddBoxForm {
    boxName: string,
    projectNumber? : number
    brand?: string,
    startDate: string,
    endDate: string,
    structures: Structure[]
}



/*dynamically assign default values from an api example
async () =>{
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1")
    const data = await res.json()
    return {
        boxName: '',
        email: data.email
    }
*/

const NewBox = ({type}: {type: string}) => {
    const createBoxForm = useForm<AddBoxForm>({
        defaultValues:  {
            boxName: '',
            startDate:'',
            endDate: '',
            projectNumber: 0,
            brand:'',
            structures: [{
                sysCode: 0,
                kind: '',
                district: 0,
                path: '',
                address: '',
                style:'',
                face:'',
                dimensions:'',
                printSize: 0,
                docSize: 0,
                squareFee: 0
            }]
        },
        mode: 'onSubmit'
    })
    console.log(createBoxForm)
    const { register, control, handleSubmit, formState: {errors}, getValues, setValue } = createBoxForm
    const { fields: structures, append, update, remove } = useFieldArray({
        control,
        name: "structures",
      });

      useEffect(() => {
        const clone = getValues("structures");
        setValue('structures', clone)
      }, []);
    console.log(structures)

    const onSubmit = (data: AddBoxForm) => {
        console.log('Form Submitted', data)
    }

  return (
   <>
        <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className='w-full flex flex-col gap-9 justify-center'
        >
            <BasicInfoFormSection 
                type={type}
                register={register}
                errors={errors}
            />
            <div className='flex flex-col gap-8 items-start w-full p-8 bg-[#FFF1F1] rounded-[30px] text-black'>
                <small className="pr-3 text-slate-500 inline-block font-bold">تعریف سازه</small>
                {
                    structures.map((structure, index) => {
                        return(                             
                            <div className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8 bg-violet-100  rounded-3xl p-5">
                                <StructureFormSection
                                    key={structure.sysCode}
                                    index={index} 
                                    structure={structure}
                                    register={register}
                                    errors={errors}
                                    update={update}
                                />
                            </div>
                        )
                    })
                }
                <AiOutlinePlusCircle
                    className="text-5xl text-rose-800 cursor-pointer transition-all hover:text-rose-500"
                    onClick={() => append(structures)}
                />
                <AiOutlineMinusCircle
                    className={`${structures.length === 1 ? 'hidden':'block'} text-5xl text-rose-800 cursor-pointer transition-all hover:text-rose-500`}
                    onClick={() => remove(structures[structures.length - 1])}
                />
            </div>
            <button className="btn-primary">افزودن باکس</button>
        </form>
        <DevTool control={control}/>
   </>
  )
}

export default NewBox