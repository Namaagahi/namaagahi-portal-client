import dynamic from 'next/dynamic'
import { BoxObject } from "@/app/lib/interfaces"
import { useSelector } from "react-redux"
import { selectBoxById } from "./boxesApiSlice"
const ListItem = dynamic(
  () => import('@/app/components/main/ListItem'),
  { ssr: false }
)


const BoxItem = ({boxId, index}: { boxId: string, index: number }) => {

    const box: BoxObject | any = useSelector(state => selectBoxById(state, boxId))
  
    return (
        <ListItem 
            number={index}
            param={boxId}
            prop={box}
            startDate={box.duration.startDate}
            endDate={box.duration.endDate}
            diff={box.duration.diff}
            titles={{
                'نام باکس': box.name,
                'نوع باکس': box.mark.name,
                'کاربر ایجاد کننده': box.username,
                'کد پروژه': box.mark.markOptions?.projectNumber,
                'برند': box.mark.markOptions?.brand
            }}
        />
  )
} 

export default BoxItem
