import { InitialCustomerObject, PlanObject, ProjectCodeObject } from '@/app/lib/interfaces'
import Status from '@/app/components/main/Status'
import moment from 'jalali-moment'
import { selectProjectCodeById, useGetAllProjectCodesQuery } from '@/app/apiSlices/projectCodeApiSlice'
import { useSelector } from 'react-redux'

type Props = {
  plan: PlanObject
  customer: InitialCustomerObject
}

const SinglePlanHeading = (props: Props) => {

    const {
      plan,
      customer
    } = props

    const {
      isLoading: projectCodesLoading,
    } = useGetAllProjectCodesQuery(undefined, {
      refetchOnFocus: false,
      refetchOnReconnect: false,
    })

    const projectCode: ProjectCodeObject = useSelector(state => selectProjectCodeById(state, plan.projectCodeId) as ProjectCodeObject)

    return (
      <div className="p-2 h-[15%] backdrop-blur bg-black/50 bg-black dark:bg-primary/80 flex items-center justify-between px-2 text-white font-bold">
        <div className="flex flex-col gap-2">
          <p>نوع پلن: {plan.mark.name === 'regular' ? 'عادی' : 'پکیج'}</p>
          <p>نام پروژه: {customer?.name}</p>
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
              textColor = {'#FFFFFF'}
            />
            : plan?.status === 'pending'?
            <Status
              status = {'معلق'}
              bgColor = {'#b56a35'}
              textColor = {'#FFFFFF'}
            />
            : plan?.status === 'rejected' &&
            <Status
              status = {'رد شده'}
              bgColor = {'#942300'}
              textColor = {'#ffc5b3'}
            />
          }
          {plan.status === 'done' && plan.projectCodeId ? <p>کد پروژه : {projectCode?.code}</p> : ''}
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p>
            کاربر ایجاد کننده: {plan?.username}
          </p>

          <p>
            تاریخ ایجاد: {moment(plan?.createdAt).format('jYYYY/jM/jD')}
          </p>

          <p>
            تاریخ به روزرسانی: {moment(plan?.updatedAt).format('jYYYY/jM/jD')}
          </p>
        </div>
      </div>
    )
}

export default SinglePlanHeading
