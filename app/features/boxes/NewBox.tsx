"use client"
import persian_fa from "react-date-object/locales/persian_fa"
import persian from "react-date-object/calendars/persian"
import { useCreateNewBoxMutation } from "./boxesApiSlice"
import { DateObject } from "react-multi-date-picker"
import type { Value } from "react-multi-date-picker"
import { AddBoxForm } from "@/app/lib/interfaces"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import useAuth from "@/app/hooks/useAuth"
import { toast } from "react-toastify"
import dynamic from 'next/dynamic'
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
        setValue('startDate', startDate!!.toString())
        setValue('endDate', endDate!!.toString())
      }, [startDate, endDate])

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
                name: type,
                typeOptions: {
                    projectNumber: data.projectNumber,
                    brand: data.brand
                },
            },
            duration: {
                startDate: convertToEnglishDate(data.startDate),
                endDate: convertToEnglishDate(data.endDate),
            },
            structures: data.structures
        })

        if(isSuccess) {
            toast.success(`باکس ${data.name} با موفقیت ساخته شد.`)
            push('/dashboard/billboard/boxes')
        }
        console.log("DATA",data)
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
                handleStartDate={(val) => setStartDate(val)}
                handleEndDate={(val) => setEndDate(val)}
            />

            <button className="btn-primary">افزودن باکس</button>
        </form>
   </>
  )
}

export default NewBox