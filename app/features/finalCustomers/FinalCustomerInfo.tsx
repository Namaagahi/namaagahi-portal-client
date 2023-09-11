import { FinalCustomerObject } from "@/app/lib/interfaces"

type Props = {
    finalCustomer?: FinalCustomerObject
}

const FinalCustomerInfo = (props: Props) => {
    
    const { finalCustomer } = props
    console.log("finalCustomer", finalCustomer)

    return (
        <div className='w-full h-full bg-secondary dark:bg-darkModeBg p-2 text-gray-700 dark:text-white mt-5 flex flex-col items-start justify-center'>
            <p>
                اطلاعات مشتری نهایی
            </p>
            <div className='w-full grid grid-cols-12 gap-3 mt-3'>
                <div className='col-span-3 gap-3 backdrop-blur bg-white/30  border-[1px] border-gray-400 rounded-md p-2'>
                    <p>نام شرکت / شخص:</p>
                    <p className='font-bold'>{finalCustomer?.name ? finalCustomer?.name : 'تعیین نشده'}</p>
                </div>
                
                <div className='col-span-2 gap-3 backdrop-blur bg-white/30  border-[1px] border-gray-400 rounded-md p-2'>
                    <p>شناسه ملی:</p>
                    <p className='font-bold'>{finalCustomer?.nationalId ? finalCustomer?.nationalId : 'تعیین نشده'}</p>
                </div>

                <div className='col-span-2 gap-3 backdrop-blur bg-white/30  border-[1px] border-gray-400 rounded-md p-2'>
                    <p>کد اقتصادی:</p>
                    <p className='font-bold'>{finalCustomer?.ecoCode ? finalCustomer?.ecoCode : 'تعیین نشده'}</p>
                </div>

                <div className='col-span-2 gap-3 backdrop-blur bg-white/30  border-[1px] border-gray-400 rounded-md p-2'>
                    <p>شماره ثبت:</p>
                    <p className='font-bold'>{finalCustomer?.regNum ? finalCustomer?.regNum : 'تعیین نشده'}</p>
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
                {finalCustomer?.agent.map((item, index: number) => {
                    return(
                        <div 
                            key={index}
                            className='col-span-3 gap-3 backdrop-blur bg-white/30  border-[1px] border-gray-400 rounded-md p-2'
                        >
                            <div className='flex items-center gap-2'>
                                <p>{`نام نماینده ${index + 1}:`}</p>
                                <p>{item.agentName}</p>
                            </div>
                            <div
                                className='flex items-center gap-2'
                            >
                                <p>{`پست سازمانی نماینده ${index + 1}:`}</p>
                                <p>{item.post}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default FinalCustomerInfo