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
