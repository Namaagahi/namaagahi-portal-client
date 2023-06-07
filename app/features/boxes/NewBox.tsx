"use client"
import { DevTool } from "@hookform/devtools"
import { useFieldArray, useForm } from "react-hook-form"
import BasicInfoFormSection from "./BasicInfoFormSection"

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
    boxType: string
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
            boxType: type,
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
    // console.log(createBoxForm)
    const { register, control, handleSubmit, formState: {errors}, getValues, setValue } = createBoxForm
    const { fields: structures, append, update, remove } = useFieldArray({
        control,
        name: "structures",
      });

      useEffect(() => {
        const clone = getValues("structures");
        setValue('structures', clone)
      }, []);
    // console.log(structures)

    const onSubmit = (data: AddBoxForm) => {
        // console.log('Form Submitted', data)
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

            <button className="btn-primary">افزودن باکس</button>
        </form>
        <DevTool control={control}/>
   </>
  )
}

export default NewBox