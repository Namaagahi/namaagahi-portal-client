import Status from '@/app/components/main/Status'
import moment from 'jalali-moment'
import React from 'react'

const SinglePlanHeading = (props: any) => {

    const { plan, customer } = props
  return (
    <div className="p-2 h-[15%] backdrop-blur bg-black/50 bg-black dark:bg-[#2563EB]/80 flex items-center justify-between px-2 text-white font-bold">
        <div className="flex flex-col gap-2">
            <p>نام مشتری: {customer?.name}</p>
            <p>برند: {plan?.brand}</p>
            {plan?.status === 'suggested'?
                <Status
                    status = {'پیشنهادی '}
                    bgColor = {'#e8ac05'}
                    textColor = {'#0a541e'}
                />
                : plan?.status === 'done'?
                <Status
                    status = {'تایید شده'}
                    bgColor = {'#439400'}
                    textColor = {'#2e030c'}
                /> 
                : plan?.status === 'rejected' &&
                <Status
                status = {'رد شده'}
                bgColor = {'#942300'}
                textColor = {'#ffc5b3'}
            />
            }
        </div>

        <div className="flex flex-col gap-2 text-sm">
            <p>کاربر ایجاد کننده: {plan?.username}</p>
            <p>تاریخ ایجاد: {moment(plan?.createdAt).format('jYYYY/jM/jD')}</p>
            <p>تاریخ به روزرسانی: {moment(plan?.updatedAt).format('jYYYY/jM/jD')}</p>
        </div>
    </div>
  )
}

export default SinglePlanHeading