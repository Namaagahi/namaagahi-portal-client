import { BasicPlanInfoSectionProps } from "@/app/lib/interfaces"
import { useGetStructuresQuery } from "../structures/structuresApiSlice"
import { useSelector } from "react-redux"
import { selectAllInitialCustomers } from "../initialCustomers/initialCustomersApiSlice"

const BasicPlanInfoSection = (props: BasicPlanInfoSectionProps) => {

    useGetStructuresQuery(undefined, {
        refetchOnFocus: false,
        refetchOnMountOrArgChange: false
    })

    
    const allInitialCustomers = useSelector(state => selectAllInitialCustomers(state))

    const { register, errors } = props

    return (
        <div className='flex flex-col gap-8 items-start w-full p-8 bg-bgform rounded-[30px] text-black'>
            <small className="pr-3 text-slate-500 inline-block font-bold">اطلاعات پایه</small>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">

                <div className='flex flex-col gap-3'>
                    <label htmlFor="name" className='text-[#767676] font-bold'>نام پلن</label>
                    <input
                    {...register("name", {
                        required: {
                            value: true,
                            message:  'نام پلن را وارد کنید'
                        },
                        pattern: {
                            value: /^[P][L][0-9]{4}$/,
                            message: 'فرمت کد پروژه باید به صورت PL و چهار عدد بعد از آن باشد'
                        }
                    })}
                    type="text"
                    id='name'
                    className='p-4 rounded-[50px] bg-white outline-none'
                    />
                    <small className="text-xs text-rose-600 ">{errors.name?.message}</small>
                </div>

                <div className='flex flex-col gap-3'>
                    <label htmlFor="customerName" className='text-[#767676] font-bold'>نام مشتری</label>
                    <select 
                    {...register("customerName", {
                        required: {
                        value: true,
                        message:  'مشتری را انتخاب کنید'
                    }
                    })}
                    className="select select-bordered px-6 py-3 rounded-[50px] bg-white outline-none"
                    >
                    {
                        allInitialCustomers.map((initialCustomer: any, index: number) => (
                        <option
                            selected
                            value={initialCustomer.name}
                            key={index}
                            id="typeName"
                        >
                            {initialCustomer.name}
                        </option>
                        ))
                    }
                    </select>
                    <small className="text-xs text-rose-600 ">{errors.customerName?.message}</small>
                </div>

                <div className='flex flex-col gap-3'>
                    <label htmlFor="brand" className='text-[#767676] font-bold'>برند</label>
                    <input
                        {...register("brand", {
                            required: {
                                value: true,
                                message:  'برند را وارد کنید'
                            },
                        })}
                        type="text"
                        id='brand'
                        className='p-4 rounded-[50px] bg-white outline-none'
                    />
                    <small className="text-xs text-rose-600 ">{errors.brand?.message}</small>
                </div>
            </div>
        </div>
    )
}

export default BasicPlanInfoSection