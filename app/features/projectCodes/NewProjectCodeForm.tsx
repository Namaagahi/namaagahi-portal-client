import { useCreateNewProjectCodeMutation } from "@/app/apiSlices/projectCodeApiSlice"
import useAuth from "@/app/hooks/useAuth"
import { mediaTypes, newProjectCodeDefaultValues, years } from "@/app/lib/constants"
import { AddProjectCodeForm, FinalCustomerObject, ProjectCodeObject } from "@/app/lib/interfaces"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { AiOutlineClose } from "react-icons/ai"
import { toast } from "react-toastify"
import Loading from "../loading/Loading"
import CustomInput from "@/app/components/inputs/CustomInput"
import SelectInput from "@/app/components/inputs/SelectInput"
import { selectAllFinalCustomers, useGetAllFinalCustomersQuery } from "@/app/apiSlices/finalCustomerApiSlice"
import { useSelector } from "react-redux"

type Props = {
    handleModal: () => void
}

const NewProjectCodeForm = (props: Props) => {

    const { handleModal } = props
    const { id } = useAuth()
    const { push } = useRouter()

    const [createNewProjectCode, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useCreateNewProjectCodeMutation()

    const {
        isLoading: finalCustomersLoading,
      } = useGetAllFinalCustomersQuery(undefined, { 
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    }) 

    const allFinalCustomers: FinalCustomerObject[] = useSelector(state => selectAllFinalCustomers(state) as FinalCustomerObject[])

    const finalCustomersOptions = allFinalCustomers.map(customer => ({
        id: customer._id,
        name: customer.name
    }))
      
    const createProjectCodeForm = useForm<AddProjectCodeForm>({
        defaultValues: newProjectCodeDefaultValues,
            mode: 'onSubmit'
    })

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = createProjectCodeForm

    const onSubmit = async(data: any) => {
        const abc1 = await createNewProjectCode({
            userId: id,
            media: data.media,
            year: parseFloat(data.year), 
            finalCustomerId: data.finalCustomerId,
            brand: data.brand,
            desc: data.desc, 
        })

        if(isError) {
            'status' in error! && error.status === 409 && toast.error('این  کد پروژه قبلا ثبت شده است')
            'status' in error! && error.status === 400 && toast.error('فیلدهای مورد نیاز را تکمیل کنید')
        }
        toast.success(`کد پروژه جدید با موفقیت ساخته شد.`)
        // window.location.assign('/dashboard/project-codes')
        handleModal()
    }

    if(isSuccess) handleModal()
    
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

    // console.log("finalCustomersOptions", finalCustomersOptions)

    if(isLoading || finalCustomersLoading || !finalCustomersOptions[0]) return <Loading/>
    return (
        <div className="py-5 px-8 w-full text-black dark:text-white">
            <form
                className="flex flex-col"
                onSubmit={handleSubmit(onSubmit)}
            >

                <div className="flex justify-between items-center mb-5">
                    <p className="md:text-2xl text-xl font-bold">
                        ایجاد کد پروژه
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

export default NewProjectCodeForm