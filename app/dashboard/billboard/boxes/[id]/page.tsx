"use client"
import { selectBoxById } from '@/app/features/boxes/boxesApiSlice'
import { BoxObject } from '@/app/lib/interfaces'
import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import { AiFillEdit } from 'react-icons/ai'
import moment from 'moment-jalaali'
import dynamic from 'next/dynamic'
const Loading = dynamic(
    () => import('@/app/features/loading/Loading'),
    { ssr: false }
  )
const Table = dynamic(
    () => import('@/app/components/main/Table'),
    { ssr: false }
  )

const SingleBox = () => {
    
    const { id } = useParams()

    const box: BoxObject | any = useSelector(state => selectBoxById(state, id))

    const startDateJalali = moment(moment(box?.duration?.startDate).format('jYYYY-jMM-jDD'), 'jYYYY-jMM-jDD')  
    const endDateJalali = moment(moment(box?.duration?.endDate).format('jYYYY-jMM-jDD'), 'jYYYY-jMM-jDD') 
    const diff = endDateJalali.diff(startDateJalali, 'day') + 1

    const boxStructureHeadings = ['کد سامانه', 'مسیر', 'بهای تمام شده دوره', 'تاریخ شروع', 'تاریخ پایان', 'ویرایش تاریخ']
    const plannedStructureHeadings = ['کد سامانه', 'شماره پلن', 'نام مشتری', 'مسیر', 'قیمت فروش دوره', 'تاریخ شروع پلن', 'تاریخ پایان پلن', ]
    const structureRevenueHeadings = ['کد سامانه', 'مسیر', 'بهای تمام شده', 'مجموع فروش دوره', 'سود / زیان' ]
    const boxRevenueHeadings = ['بهای تمام شده باکس', 'مجموع فروش باکس', 'سود / زیان تجمیعی' ]

    if(!box) return <Loading />
    console.log(box)
    return ( 
    <div className="flex flex-col rounded-lg w-full min-h-[750px] mb-48 bg-slate-300 dark:bg-slate-100 overflow-hidden shadow-md ">
        <div className="  w-full h-full duration-1000">
            <div className="  w-full h-full bg-gray-100 overflow-hidden">
                <div className="h-[15%] backdrop-blur bg-black/50 bg-black dark:bg-[#2563EB]/80 flex items-center justify-between px-2 text-white font-bold">
                    <div className="flex flex-col gap-2">
                        {box.type.name === 'buyShort'? <p>خرید کوتاه مدت</p> : box.type.name === 'buyLong'? <p>خرید بلند مدت</p>: <p>مزایده ای</p>}
                        <p>{box.name}</p>
                    </div>
                    {
                    box.type.name === 'buyShort' && 
                        <div className="flex flex-col gap-2">
                            <p>{box.type.typeOptions.projectNumber}</p>
                            <p>{box.type.typeOptions.brand}</p>
                        </div>
                    }
                    <div className="flex flex-col gap-2 text-sm">
                        <p>{moment(box.duration.startDate).format('jYYYY-jMM-jDD')}</p>
                        <p>{moment(box.duration.endDate).format('jYYYY-jMM-jDD')}</p>
                        <p>مدت قرارداد: {diff} روز</p>
                    </div>
                </div>
                {
                    box.structureIds?.length ? <p>باکس سازه دارد</p> : <p>باکس سازه ندارد</p>
                } 

                <small className=" mt-2 text-black px-2">خرید</small>
                <div className="max-h-[30%] bg-rose-200 overflow-y-auto text-black">
                    <Table 
                        tableHeadings={boxStructureHeadings}
                        tableContent={
                        <>                
                            <td className="px-6 py-4">ST1000</td>
                            <td className="px-6 py-4">مدرس</td>
                            <td className="px-6 py-4">17.000.000</td>
                            <td className="px-6 py-4">1402/05/15</td>
                            <td className="px-6 py-4">1403/05/15</td>
                            <td className="px-6 py-4 flex items-center gap-5">
                            <td className="flex items-center p-1 border-[1px] border-[#737373] rounded-md cursor-pointer">
                                <AiFillEdit
                                    className="text-black  hover:scale-125 transition-all" size={20}
                                />
                            </td>
                        </td>
                        </>}
                    />
                </div>

                <small className=" mt-2 text-black px-2">فروش</small>
                <div className="max-h-[30%] bg-lime-200 overflow-y-auto text-black">
                    <Table 
                        tableHeadings={plannedStructureHeadings}
                        tableContent={
                        <>                
                            <td className="px-6 py-4">ST1000</td>
                            <td className="px-6 py-4">PL1000</td>
                            <td className="px-6 py-4">دیپوینت</td>
                            <td className="px-6 py-4">مدرس</td>
                            <td className="px-6 py-4">18.000.000</td>
                            <td className="px-6 py-4">1402/05/15</td>
                            <td className="px-6 py-4">1402/06/20</td>
                        </>}
                    />
                </div>

                <small className=" mt-2 text-black px-2">سود/ زیان جزئی </small>
                <div className="max-h-[30%] bg-slate-200 overflow-y-auto text-black">
                    <Table 
                        tableHeadings={structureRevenueHeadings}
                        tableContent={
                        <>                
                            <td className="px-6 py-4">ST1000</td>
                            <td className="px-6 py-4">مدرس</td>
                            <td className="px-6 py-4">17.000.000</td>
                            <td className="px-6 py-4">18.000.000</td>
                            <td className="px-6 py-4">1.000.000</td>
                        </>}
                    />
                </div>

                <small className=" mt-2 text-black px-2">سود/ زیان تجمیعی </small>
                <div className="max-h-[30%] bg-slate-200 overflow-y-auto text-black">
                    <Table 
                        tableHeadings={boxRevenueHeadings}
                        tableContent={
                        <>                
                            <td className="px-6 py-4">17.000.000</td>
                            <td className="px-6 py-4">18.000.000</td>
                            <td className="px-6 py-4">1.000.000</td>
                        </>}
                    />
                </div>
            </div>
        </div>
    </div>
    )
}

export default SingleBox