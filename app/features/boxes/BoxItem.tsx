import { BoxItemProps, BoxObject } from "@/app/lib/interfaces"
import { selectBoxById } from "../../apiSlices/boxesApiSlice"
import { useSelector } from "react-redux"
import dynamic from 'next/dynamic'
const ListItem = dynamic(
  () => import('@/app/components/main/ListItem'),
  { ssr: false }
)

const BoxItem = (props: BoxItemProps) => {
  
  const {
    boxId,
    index
  } = props 
  
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
