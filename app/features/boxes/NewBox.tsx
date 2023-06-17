"use client"
import { DevTool } from "@hookform/devtools"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import dynamic from 'next/dynamic'
import { useCreateNewBoxMutation } from "./boxesApiSlice"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import useAuth from "@/app/hooks/useAuth"
import { AddBoxForm } from "@/app/lib/interfaces"
import moment from 'moment-jalaali'
import type { Value } from "react-multi-date-picker"
import { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
const BasicInfoFormSection = dynamic(
  () => import('./BasicInfoFormSection'),
  { ssr: false }
)

const NewBox = ({type}: {type: string}) => {

    const { id } = useAuth()  

    const [createNewBox, {
        isSuccess,
        isError,
        error
    }] = useCreateNewBoxMutation()

    const [startDate, setStartDate] = useState<Value | any>(new DateObject({ calendar: persian, locale: persian_fa })) 
    const [endDate, setEndDate] = useState<Value | any>(new DateObject({ calendar: persian, locale: persian_fa })) 

    const { push } = useRouter()
    
    const createBoxForm = useForm<AddBoxForm>({
        defaultValues:  {
            name: '',
            type: '',
            projectNumber: '',
            brand: '',
            startDate:'',
            endDate:'',
            structures: []
        },
        mode: 'onSubmit'
    })

    const { register, control, handleSubmit, formState: {errors}, getValues, setValue } = createBoxForm

      useEffect(() => {
        getValues("startDate")
        getValues("endDate")
        setValue('startDate', startDate!!.toLocaleString())
        setValue('endDate', endDate!!.toLocaleString())
      }, [startDate, endDate]);

    const onSubmit = async(data: AddBoxForm) => {
        if(isError) {
            'status' in error! && error.status === 409 && toast.error('این نام باکس قبلا ثبت شده است')
            'status' in error! && error.status === 400 && toast.error('همه فیلدها را تکمیل کنید')
            console.log(error)
        }

        await createNewBox({
            userId: id,
            name: data.name,
            type: { 
                name: data.type,
                typeOptions: {
                    projectNumber: data.projectNumber,
                    brand: data.brand
                },
            },
            duration: {
                startDate: data.startDate,
                endDate: data.endDate,
            },
            structures: data.structures
        })

        if(isSuccess) {
            toast.success('باکس جدید با موفقیت ساخته شد')
            // push('/dashboard/billboard/boxes')
        }
        console.log(data)
    }

console.log(startDate!!.toLocaleString())
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
                handleStartDate={(val) => setStartDate(val)}
                handleEndDate={(val) => setEndDate(val)}
            />

            <button className="btn-primary">افزودن باکس</button>
        </form>
        <DevTool control={control}/>
   </>
  )
}

export default NewBox