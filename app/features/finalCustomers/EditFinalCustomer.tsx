import { useUpdateFinalCustomerMutation } from "@/app/apiSlices/finalCustomerApiSlice"
import useAuth from "@/app/hooks/useAuth"
import { FinalCustomerObject } from "@/app/lib/interfaces"
import { useForm } from "react-hook-form"
import { AiOutlineClose } from "react-icons/ai"
import Loading from "../loading/Loading"
import CustomInput from "@/app/components/inputs/CustomInput"
import { toast } from "react-toastify"
import { useState } from "react"

type Props = {
    handleModal: () => void
    finalCustomer: FinalCustomerObject
}

const EditFinalCustomer = (props: Props) => {

    const { handleModal, finalCustomer } = props

    const { id } = useAuth()
    
    const [updateFinalCustomer, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateFinalCustomerMutation()

    const [errMsg, setErrMsg] = useState<string | null>(null)

    const editFinalCustomerForm = useForm<any>({
        defaultValues: {
            agentName: finalCustomer.agentName,
            post: finalCustomer.post,
            companyName: finalCustomer.companyName,
            ecoCode: finalCustomer.ecoCode,
            regNum: finalCustomer.regNum,
            nationalId: finalCustomer.nationalId,
            address: finalCustomer.address,
            postalCode: finalCustomer.postalCode,
            phone: finalCustomer.phone,
        },
        mode: 'onSubmit'
    })

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = editFinalCustomerForm

    const onSubmit = async(data: any) => {
        const abc = await updateFinalCustomer({
            id: finalCustomer.id,
            finalCustomerId: finalCustomer.finalCustomerId,
            userId: id,
            username: finalCustomer.username,
            agentName: data.agentName,
            companyName: data.companyName,
            post: data.post,
            ecoCode: parseFloat(data.ecoCode),
            regNum: parseFloat(data.regNum),
            nationalId: parseFloat(data.nationalId),
            address: data.address,
            phone: parseFloat(data.phone),
            postalCode: parseFloat(data.postalCode)
        })
        // console.log("ABC", abc)
        // console.log("isError", isError)
        if(isError) {
            'status' in error! && error.status === 409 && setErrMsg('این کد اقتصادی قبلا ثبت شده است')
            'status' in error! && error.status === 400 && setErrMsg('فیلدهای مورد نیاز را تکمیل کنید')
        }
    }

    if(isSuccess) {
        toast.success(`مشتری با موفقیت ویرایش شد.`)
        handleModal()
    }

    const customInputs = [
        {
            id: 1,
            label: "نام نماینده",
            name: 'agentName',
            type:'text',
            required: false,
            errors: undefined,
        },
        {
            id: 2,
            label: "پست سازمانی",
            name: 'post',
            type:'text',
            required: false,
            errors: undefined,
        },
        {
            id: 3,
            label: "نام شرکت",
            name: 'companyName',
            type:'text',
            message: 'نام شرکت را وارد کنید',
            required: true,
            errors:  (errors.companyName?.message),
        },
        {
            id: 4,
            label: "کد اقتصادی",
            name: 'ecoCode',
            type:'number',
            message: 'کد اقتصادی را وارد کنید',
            required: true,
            errors:  (errors.ecoCode?.message),
        },
        {
            id: 5,
            label: "شماره ثبت",
            name: 'regNum',
            type:'number',
            required: false,
            errors: undefined,
        },
        {
            id: 6,
            label: "شناسه ملی",
            name: 'nationalId',
            type:'number',
            required: false,
            errors: undefined,
        },
        {
            id: 7,
            label: "آدرس",
            name: 'address',
            type:'text',
            required: false,
            errors: undefined,
            colSpan: 'col-span-2'
        },
        {
            id: 8,
            label: "کد پستی",
            name: 'postalCode',
            type:'number',
            required: false,
            errors: undefined,
        },
        {
            id: 9,
            label: "تلفن",
            name: 'phone',
            type:'number',
            required: false,
            errors: undefined,
        },
    ]
    // console.log(errors)
    if(!finalCustomer) return <Loading />
    return (
        <div className="py-5 px-8 w-full text-black dark:text-white">
            <form
                className="flex flex-col"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex justify-between items-center">
                    <p className="md:text-2xl text-xl font-bold">
                        ویرایش مشتری نهایی
                    </p>

                    <AiOutlineClose 
                        className="cursor-pointer text-xl hover:text-2xl transition-all" 
                        onClick={handleModal}
                    />
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
                            colSpan={customInput.colSpan}
                            className='p-4 rounded-[50px] bg-blue-100 outline-none text-black'
                        />
                    ))}
                    <p className="text-red-500">{errMsg? errMsg : ' '}</p>
                </div>
                <div className="flex items-center gap-6">
                    <button
                        className={`bg-[#5858FA] py-3 w-2/3 rounded-lg text-xl border-[1px] border-[#5858FA] hover:border-[#3636a3] hover:bg-[#3636a3] transition-all text-white`}
                    >
                        ذخیره
                    </button>

                    <button 
                        onClick={handleModal}
                        className=" py-3 w-1/3 rounded-lg text-xl border-[1px] border-[#808080] dark:border-white hover:bg-black hover:text-white transition-all"
                    >
                        لغو
                    </button>
                </div>
            </form>
        </div>

    )
}

export default EditFinalCustomer