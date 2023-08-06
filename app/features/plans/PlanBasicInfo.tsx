import CustomInput from '@/app/components/inputs/CustomInput'
import SelectInput from '@/app/components/inputs/SelectInput'
import { selectAllInitialCustomers, useGetAllInitialCustomersQuery } from '../../apiSlices/initialCustomersApiSlice'
import { useSelector } from 'react-redux'

const PlanBasicInfo = (props: any) => {

    const { control, errors } = props
    
    useGetAllInitialCustomersQuery(undefined, {
        refetchOnFocus: false,
        refetchOnMountOrArgChange: false 
    })

    const allInitialCustomers = useSelector(state => selectAllInitialCustomers(state))

    return (
        <div className='flex flex-col gap-8 items-start w-full p-8 bg-bgform rounded-[30px] text-black'>
            <small className="pr-3 text-slate-500 inline-block font-bold">اطلاعات پایه</small>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                <CustomInput 
                    control={control}
                    name={'name'}
                    label={'نام پلن'}
                    errors={errors.name?.message}
                    required={true}
                    pattern={/^[P][L][0-9]{4}$/}
                    patternMessage={'فرمت پلن باید به صورت PL و چهار عدد بعد از آن باشد'}
                    type={'text'}
                />
                <SelectInput
                    control={control}
                    name={'customerName'}
                    label={'نام مشتری'}
                    required={true}
                    errors={errors.customerName?.message}
                    options={allInitialCustomers}
                />
                <CustomInput 
                    control={control}
                    name={'brand'}
                    label={'برند'}
                    errors={errors.brand?.message}
                    required={true}
                    type={'text'}
                />
            </div>
        </div>
    )
}

export default PlanBasicInfo