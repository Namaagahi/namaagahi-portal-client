import { FinalCustomerObject } from "@/app/lib/interfaces"

type Props = {
    finalCustomer?: FinalCustomerObject
}

const FinalCustomerInfo = (props: Props) => {
    
    const { finalCustomer } = props

    return (
        <div className='w-full h-full bg-teal-300 dark:bg-neutral-300 p-2 rounded-lg text-gray-700 mt-5 flex flex-col items-start justify-center'>
            <p>
                اطلاعات مشتری نهایی
            </p>
            <div className='w-full grid grid-cols-12 gap-3 mt-3'>
                <div className='col-span-2 gap-3 backdrop-blur bg-white/30  border-[1px] border-gray-400 rounded-md p-2'>
                    <p>نام نماینده:</p>
                    <p className='font-bold'>{finalCustomer?.agentName ? finalCustomer?.agentName : 'تعیین نشده'}</p>
                </div>

                <div className='col-span-2 gap-3 backdrop-blur bg-white/30 border-[1px] border-gray-400 rounded-md p-2'>
                    <p>پست سازمانی</p>
                    <p className='font-bold'>{finalCustomer?.post ? finalCustomer?.post : 'تعیین نشده'}</p>
                </div>

                <div className='col-span-2 gap-3 backdrop-blur bg-white/30  border-[1px] border-gray-400 rounded-md p-2'>
                    <p>نام شرکت:</p>
                    <p className='font-bold'>{finalCustomer?.companyName ? finalCustomer?.companyName : 'تعیین نشده'}</p>
                </div>

                <div className='col-span-2 gap-3 backdrop-blur bg-white/30  border-[1px] border-gray-400 rounded-md p-2'>
                    <p>کد اقتصادی:</p>
                    <p className='font-bold'>{finalCustomer?.ecoCode ? finalCustomer?.ecoCode : 'تعیین نشده'}</p>
                </div>

                <div className='col-span-2 gap-3 backdrop-blur bg-white/30  border-[1px] border-gray-400 rounded-md p-2'>
                    <p>شماره ثبت:</p>
                    <p className='font-bold'>{finalCustomer?.regNum ? finalCustomer?.regNum : 'تعیین نشده'}</p>
                </div>

                <div className='col-span-2 gap-3 backdrop-blur bg-white/30  border-[1px] border-gray-400 rounded-md p-2'>
                    <p>شناسه ملی:</p>
                    <p className='font-bold'>{finalCustomer?.nationalId ? finalCustomer?.nationalId : 'تعیین نشده'}</p>
                </div>

                <div className='col-span-4 gap-3 backdrop-blur bg-white/30  border-[1px] border-gray-400 rounded-md p-2'>
                    <p>آدرس:</p>
                    <p className='font-bold'>{finalCustomer?.address ? finalCustomer?.address : 'تعیین نشده'}</p>
                </div>

                <div className='col-span-2 gap-3 backdrop-blur bg-white/30  border-[1px] border-gray-400 rounded-md p-2'>
                    <p>کد پستی:</p>
                    <p className='font-bold'>{finalCustomer?.postalCode ? finalCustomer?.postalCode : 'تعیین نشده'}</p>
                </div>

                <div className='col-span-2 gap-3 backdrop-blur bg-white/30  border-[1px] border-gray-400 rounded-md p-2'>
                    <p>تلفن:</p>
                    <p className='font-bold'>{finalCustomer?.phone ? finalCustomer?.phone : 'تعیین نشده'}</p>
                </div>
            </div>
        </div>
    )
}

export default FinalCustomerInfo