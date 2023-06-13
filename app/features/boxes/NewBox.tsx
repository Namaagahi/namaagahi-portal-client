"use client"
import { DevTool } from "@hookform/devtools"
import { useFieldArray, useForm } from "react-hook-form"
import { useEffect } from "react"
import dynamic from 'next/dynamic'
import { useCreateNewBoxMutation } from "./boxesApiSlice"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import useAuth from "@/app/hooks/useAuth"
const BasicInfoFormSection = dynamic(
  () => import('./BasicInfoFormSection'),
  { ssr: false }
)

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
    name: string,
    type: {
        name:string
        typeOptions: {
            projectNumber: string | null
            brand: string | null
        }
    }
    duration: {
        startDate: Date
        endDate: Date
    }
    structureIds: string[]
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

    const { id } = useAuth()  

    const [createNewBox, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useCreateNewBoxMutation()

    const { push } = useRouter()
    
    const createBoxForm = useForm<AddBoxForm>({
        defaultValues:  {
            name: '',
            type: {
                name: type,
                typeOptions: {
                    projectNumber:null,
                    brand: null
                }
            },
            duration: {
                startDate: new Date(),
                endDate: new Date()
            },
            structureIds: []
        },
        mode: 'onSubmit'
    })
    const { register, control, handleSubmit, formState: {errors}, getValues, setValue } = createBoxForm

      useEffect(() => {
        const clone = getValues("structureIds");
        setValue('structureIds', clone)
      }, []);

    const onSubmit = async(data: AddBoxForm) => {
        if(isError) {
            'status' in error! && error.status === 409 && toast.error('این نام باکس قبلا ثبت شده است')
            'status' in error! && error.status === 400 && toast.error('همه فیلدها را تکمیل کنید')
        }
        await createNewBox({
            userId: id,
            name: data.name,
            duration: {
                startDate: data.duration.startDate,
                endDate: data.duration.endDate,
            },
            type: {
                name: data.type.name,
                typeOptions: {
                    projectNumber: data.type.typeOptions.projectNumber,
                    brand: data.type.typeOptions.brand
                }
            },
        })
        if(isSuccess) {
            toast.success('باکس جدید با موفقیت ساخته شد')
            push('/dashboard/billboard/boxes')
        }
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