import useAuth from "@/app/hooks/useAuth"
import { EditInitialCustomerForm, InitialCustomerObject } from "@/app/lib/interfaces"
import { useForm } from "react-hook-form"
import { AiOutlineClose } from "react-icons/ai"
import Loading from "../loading/Loading"
import CustomInput from "@/app/components/inputs/CustomInput"
import { toast } from "react-toastify"
import { useState } from "react"
import { useUpdateInitialCustomerMutation } from "@/app/apiSlices/initialCustomersApiSlice"

type Props = {
    handleModal: () => void
    initialCustomer: InitialCustomerObject
}

const EditInitialCustomer = (props: Props) => {

    const {
        handleModal,
        initialCustomer
    } = props

    const { id } = useAuth()

    const [updateInitialCustomer, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateInitialCustomerMutation()

    const [errMsg, setErrMsg] = useState<string | null>(null)

    const editFinalCustomerForm = useForm<EditInitialCustomerForm>({
      defaultValues: {
        name: initialCustomer?.name,
        phoneNumber: initialCustomer?.phoneNumber,
        introductionMethod: initialCustomer?.introductionMethod
      },
      mode: 'onSubmit'
    })

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = editFinalCustomerForm


    const onSubmit = async(data: any) => {
        const abc = await updateInitialCustomer({
          id: initialCustomer.id,
          userId: id,
          name: data.name,
          phoneNumber: data.phoneNumber,
          introductionMethod: data.introductionMethod,
        })

        if(isError) {
            'status' in error! && error.status === 409 && setErrMsg('این نام پروژه قبلا ثبت شده است')
            'status' in error! && error.status === 400 && setErrMsg('فیلدهای مورد نیاز را تکمیل کنید')
        }
    }

    if(isSuccess) {
        toast.success(`پروژه با موفقیت ویرایش شد.`)
        handleModal()
    }

    const customInputs = [
        {
            id: 1,
            label: "نام پروژه",
            name: 'name',
            type:'text',
            message: 'نام پزوژه را وارد کنید',
            required: true,
            errors:  (errors.name?.message),
        },
        {
            id: 2,
            label: "تلفن",
            name: 'phoneNumber',
            type:'number',
            required: false,
            errors: undefined,
        },
        {
          id: 3,
          label: "نحوه آشنایی",
          name: 'introductionMethod',
          type:'text',
          required: false,
      },
    ]

    console.log("initialCustomer", initialCustomer)
    if(!initialCustomer) return <Loading />
    return (
        <div className="py-5 px-8 w-full text-black dark:text-white">
            <form
                className="flex flex-col"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex justify-between items-center">
                    <p className="md:text-2xl text-xl font-bold">
                        ویرایش پروژه
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
                            className='p-4 rounded-[50px] bg-blue-100 outline-none text-black'
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

export default EditInitialCustomer
