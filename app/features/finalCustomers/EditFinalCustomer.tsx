import { useUpdateFinalCustomerMutation } from "@/app/apiSlices/finalCustomerApiSlice"
import useAuth from "@/app/hooks/useAuth"
import { AddFinalCustomerForm, EditFinalCustomerForm, FinalCustomerObject } from "@/app/lib/interfaces"
import { useFieldArray, useForm } from "react-hook-form"
import { AiOutlineClose } from "react-icons/ai"
import Loading from "../loading/Loading"
import CustomInput from "@/app/components/inputs/CustomInput"
import { toast } from "react-toastify"
import { useState } from "react"
import Agents from "./Agents"
 
type Props = {
    handleModal: () => void
    finalCustomer: FinalCustomerObject
}

const EditFinalCustomer = (props: Props) => {

    const {
        handleModal,
        finalCustomer
    } = props
    
    const { id } = useAuth()
    
    const [updateFinalCustomer, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateFinalCustomerMutation()

    const [errMsg, setErrMsg] = useState<string | null>(null)

    const editFinalCustomerForm = useForm<EditFinalCustomerForm>({
        defaultValues: {
            name: finalCustomer.name,
            nationalId: finalCustomer.nationalId,
            agent: JSON.parse(JSON.stringify(finalCustomer.agent)), 
            contractType: finalCustomer.contractType,
            customerType: finalCustomer.customerType,
            ecoCode: finalCustomer.ecoCode,
            regNum: finalCustomer.regNum,
            address: finalCustomer.address,
            postalCode: finalCustomer.postalCode,
            phone: finalCustomer.phone,
            planIds: finalCustomer.planIds
        },
        mode: 'onSubmit'
    })

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = editFinalCustomerForm

    const {
        fields: agentField,
        append: appendAgent,
        remove: removeAgent
      } = useFieldArray({
        control,
        name: "agent",
      })

    const onSubmit = async(data: any) => {
        const abc = await updateFinalCustomer({
            id: finalCustomer.id,
            finalCustomerId: finalCustomer.finalCustomerId,
            userId: id,
            username: finalCustomer.username,
            name: data.name,
            nationalId: parseFloat(data.nationalId),
            ecoCode: parseFloat(data.ecoCode),
            agent: data.agent,
            contractType: data.contractType,
            customerType: data.customerType,
            regNum: parseFloat(data.regNum),
            address: data.address,
            phone: parseFloat(data.phone),
            postalCode: parseFloat(data.postalCode),
            planIds: data.planIds
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
            label: "نام شرکت",
            name: 'name',
            type:'text',
            message: 'نام شرکت را وارد کنید',
            required: true,
            errors:  (errors.name?.message),
        },
        {
            id: 2,
            label: "شناسه ملی",
            name: 'nationalId',
            type:'number',
            required: true,
            message: 'شناسه ملی را وارد کنید',
            errors: (errors.nationalId?.message),
        },
        {
            id: 3,
            label: "کد اقتصادی",
            name: 'ecoCode',
            type:'number',
            required: false,
            errors:  undefined,
        },
        {
            id: 4,
            label: "شماره ثبت",
            name: 'regNum',
            type:'number',
            required: false,
            errors: undefined,
        },

        {
            id: 5,
            label: "آدرس",
            name: 'address',
            type:'text',
            required: false,
            errors: undefined,
            colSpan: 'col-span-2'
        },
        {
            id: 6,
            label: "کد پستی",
            name: 'postalCode',
            type:'number',
            required: false,
            errors: undefined,
        },
        {
            id: 7,
            label: "تلفن",
            name: 'phone',
            type:'number',
            required: false,
            errors: undefined,
        },
    ]

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
                <Agents 
                    agentField={agentField}
                    control={control}
                    appendAgent={appendAgent}
                    removeAgent={removeAgent}
                />
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

export default EditFinalCustomer