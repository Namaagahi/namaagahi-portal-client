import dynamic from 'next/dynamic'
import { BoxObject } from "@/app/lib/interfaces"
import { useSelector } from "react-redux"
import { selectBoxById } from "./boxesApiSlice"
import ListItem from "@/app/components/main/ListItem"
const Table = dynamic(
  () => import('@/app/components/main/Table'),
  { ssr: false }
)

const BoxItem = ({boxId, index}: { boxId: string, index: number }) => {

    const box: BoxObject | any = useSelector(state => selectBoxById(state, boxId))
    console.log(box)

    const boxStructureHeadings = ['کد سامانه', 'مسیر', 'بهای تمام شده دوره', 'تاریخ شروع', 'تاریخ پایان', 'ویرایش تاریخ']
    const plannedStructureHeadings = ['کد سامانه', 'شماره پلن', 'نام مشتری', 'مسیر', 'قیمت فروش دوره', 'تاریخ شروع پلن', 'تاریخ پایان پلن', ]
    const structureRevenueHeadings = ['کد سامانه', 'مسیر', 'بهای تمام شده', 'مجموع فروش دوره', 'سود / زیان' ]
    const boxRevenueHeadings = ['بهای تمام شده باکس', 'مجموع فروش باکس', 'سود / زیان تجمیعی' ]
  
    return (
        <ListItem 
            number={index}
            param={box.name}
            prop={box}
            startDate={box.duration.startDate}
            endDate={box.duration.endDate}
            titles={{
                'نام باکس': box.name,
                'نوع باکس': box.type.name,
                'کاربر ایجاد کننده': box.username,
                'کد پروژه': box.type.typeOptions?.projectNumber,
                'برند': box.type.typeOptions?.brand
            }}
        />
  )
} 

export default BoxItem
