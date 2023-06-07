import Table from "@/app/components/main/Table"
import { AiFillDelete, AiFillEdit } from "react-icons/ai"

const BoxCard = ({ boxType = 'buyLong' }:{ boxType: string }) => {

    const boxStructureHeadings = ['کد سامانه', 'مسیر', 'بهای تمام شده دوره', 'تاریخ شروع', 'تاریخ پایان', 'ویرایش تاریخ']
    const plannedStructureHeadings = ['کد سامانه', 'شماره پلن', 'نام مشتری', 'مسیر', 'قیمت فروش دوره', 'تاریخ شروع پلن', 'تاریخ پایان پلن', ]
    const structureRevenueHeadings = ['کد سامانه', 'مسیر', 'بهای تمام شده', 'مجموع فروش دوره', 'سود / زیان' ]
    const boxRevenueHeadings = ['بهای تمام شده باکس', 'مجموع فروش باکس', 'سود / زیان تجمیعی' ]
  return (
    <div className="flex flex-col rounded-lg w-full h-[750px] bg-slate-300 dark:bg-slate-100 overflow-hidden shadow-md">
        <div className="h-[15%] backdrop-blur bg-black/50 bg-black dark:bg-[#2563EB]/80 flex items-center justify-between px-2 text-white font-bold">
            <div className="flex flex-col gap-2">
                {boxType === 'buyShort'? <p>خرید کوتاه مدت</p> : boxType === 'buyLong'? <p>خرید بلند مدت</p>: <p>مزایده ای</p>}
                <p>BX1000</p>
            </div>
            {
            boxType === 'buyShort' && 
            <div className="flex flex-col gap-2">
                <p>PR1000</p>
                <p>شهر فرش</p>
            </div>
            }
            <div className="flex flex-col gap-2 text-sm">
                <p>1402/05/15</p>
                <p>1403/05/15</p>
            </div>
        </div>
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
  )
} 

export default BoxCard