import { BoxObject } from "@/app/lib/interfaces"
import Loading from "../loading/Loading"
import moment from "jalali-moment"

type Props = {
    box: BoxObject
}

const SingleBoxHeading = (props : Props) => {

    const { box } = props

    if(!box) return <Loading />

    return (
        <div className="p-2 h-[15%] backdrop-blur bg-black/50 bg-black dark:bg-[#2563EB]/80 flex items-center justify-between px-2 text-white font-bold">
            <div className="flex flex-col gap-2">
                {box?.mark.name === 'buyShort'?
                <p>خرید کوتاه مدت</p>
                : box?.mark.name === 'buyLong'?
                <p>خرید بلند مدت</p>
                : <p>مزایده ای</p>}

                <p>{box?.name}</p>
            </div>

            {
            box.mark.name === 'buyShort' && 
                <div className="flex flex-col gap-2">
                    <p>{box?.mark.markOptions.projectNumber}</p>
                    <p>{box?.mark.markOptions.brand}</p>
                </div>
            }

            <div className="flex flex-col gap-2 text-sm">
                <p>
                    {moment(new Date(box?.duration.startDate).toISOString()).format('jYYYY-jM-jD')}
                </p>

                <p>
                    {moment(new Date(box?.duration.endDate).toISOString()).format('jYYYY-jM-jD')}
                </p>
                
                <p>
                    مدت قرارداد: {box?.duration.diff} روز
                </p>
            </div>
        </div>
    )
}

export default SingleBoxHeading