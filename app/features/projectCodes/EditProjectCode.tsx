import { useUpdateProjectCodeMutation } from "@/app/apiSlices/projectCodeApiSlice"
import useAuth from "@/app/hooks/useAuth"
import { EditProjectCodeForm, FinalCustomerObject, ProjectCodeObject } from "@/app/lib/interfaces"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import Loading from "../loading/Loading"
import { AiOutlineClose } from "react-icons/ai"
import { mediaTypes, years } from "@/app/lib/constants"
import { selectAllFinalCustomers, useGetAllFinalCustomersQuery } from "@/app/apiSlices/finalCustomerApiSlice"
import { useSelector } from "react-redux"
import CustomInput from "@/app/components/inputs/CustomInput"
import SelectInput from "@/app/components/inputs/SelectInput"

type Props = {
    handleModal: () => void
    projectCode: ProjectCodeObject
}

const EditProjectCode = (props: Props) => {

    const {
        handleModal,
        projectCode
    } = props

    const { id } = useAuth()

    const [updateProjectCode, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateProjectCodeMutation()

    
    const {
        isLoading: finalCustomersLoading,
      } = useGetAllFinalCustomersQuery(undefined, { 
        refetchOnFocus: false,
        refetchOnMountOrArgChange: false
    }) 

    const [errMsg, setErrMsg] = useState<string | null>(null)

    const editProjectCodeForm = useForm<EditProjectCodeForm>({
        defaultValues: {
            media: projectCode.media,
            year: projectCode.year,
            finalCustomerId: projectCode.finalCustomerId,
            brand: projectCode.brand,
            desc: projectCode.desc
        },
        mode: 'onSubmit'
    })

    
    const allFinalCustomers: FinalCustomerObject[] = useSelector(state => selectAllFinalCustomers(state) as FinalCustomerObject[])

    const finalCustomersOptions = allFinalCustomers.map(customer => ({
        id: customer._id,
        name: customer.name
    }))
    
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = editProjectCodeForm

    const onSubmit = async(data: any) => {
        const abc = await updateProjectCode({
            id: projectCode._id,
            userId: id,
            media: data.media,
            year: data.year,
            finalCustomerId: data.finalCustomerId,
            brand: data.brand,
            desc: data.desc
        })
        console.log("ABC", abc)
        // console.log("isError", isError)
        if(isError) {
            'status' in error! && error.status === 409 && setErrMsg('این کد پروژه قبلا ثبت شده است')
            'status' in error! && error.status === 400 && setErrMsg('فیلدهای مورد نیاز را تکمیل کنید')
        }
    }

    if(isSuccess) {
        toast.success(`کد پروژه با موفقیت ویرایش شد.`)
        handleModal()
    }

    const customInputs = [
        {
            id: 1,
            label: "نام برند",
            name: 'brand',
            type:'text',
            message: 'نام برند الزامیست',
            required: true,
            errors:  (errors.brand?.message),
        },
        {
            id: 2,
            label: "توضیحات",
            name: 'desc',
            type:'textarea',
            required: false,
        },
    ]

    const customSelects = [
        {
            id: 1,
            label: "رسانه",
            name: 'media',
            required: true,
            errors:  (errors.media?.message),
            options: mediaTypes
        },
        {
            id: 2,
            label: "سال",
            name: 'year',
            required: true,
            errors:  (errors.year?.message),
            options: years
        },
        {
            id: 3,
            label: "مشتری نهایی",
            name: 'finalCustomerId',
            required: true,
            errors:  (errors.finalCustomerId?.message),
            options: finalCustomersOptions
        },
    ]
console.log("editProjectCodeForm", editProjectCodeForm.getValues())
    if(isLoading || finalCustomersLoading || !projectCode) return <Loading />
    return (
        <div className="py-5 px-8 w-full text-black dark:text-white">
            <form
                className="flex flex-col"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex justify-between items-center">
                    <p className="md:text-2xl text-xl font-bold">
                        ویرایش کد پروژه
                    </p>

                    <AiOutlineClose 
                        className="cursor-pointer text-xl hover:text-2xl transition-all" 
                        onClick={handleModal}
                    />
                </div>

                <div className="relative w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 p-2 xl:grid-cols-2 gap-4 lg:gap-2 mt-4">
                    {customSelects.map((customSelect) => (
                        <SelectInput
                            key={customSelect.id}
                            control={control}
                            name={customSelect.name} 
                            label={customSelect.label}
                            options={customSelect.options}
                        />
                    ))}
                </div>

                <div className="relative w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 p-2 xl:grid-cols-2 gap-4 lg:gap-2 mt-4">
                    {customInputs.map((customInput) => (
                        <CustomInput
                            key={customInput.id}
                            control={control}
                            name={customInput.name} 
                            label={customInput.label}
                            type={customInput.type}
                            required={customInput.required}
                            message={customInput.message}
                            errors={customInput.errors && customInput.errors}
                            className='formInput text-black bg-slate-200'
                        />
                    ))}
                    <p className="text-red-500">{errMsg? errMsg : ' '}</p>
                </div>

                <div className="flex items-center gap-6">
                    <button className={`confirmButton`}>
                        ذخیره
                    </button>

                    <button 
                        onClick={handleModal}
                        className="cancelButton"
                    >
                        لغو
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditProjectCode