"use client"
import { selectInitialCustomerById, useGetAllInitialCustomersQuery } from '@/app/apiSlices/initialCustomersApiSlice'
import { selectPlanById, useGetAllPlansQuery } from '@/app/apiSlices/plansApiSlice'
import { InitialCustomerObject, PlanObject } from '@/app/lib/interfaces'
import SinglePlanHeading from '@/app/features/plans/SinglePlanHeading'
import SinglePlanTable from '@/app/features/plans/SinglePlanTable'
import PageTitle from '@/app/components/main/PageTitle'
import Loading from '@/app/features/loading/Loading'
import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'

const SinglePlan = () => {
 
  const { id } = useParams()
  
  const { isLoading }=useGetAllPlansQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })

  useGetAllInitialCustomersQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })

  const plan: PlanObject | any = useSelector(state => selectPlanById(state as PlanObject , id))
  const customer: InitialCustomerObject | any = useSelector(state => selectInitialCustomerById(state, plan?.customerName))

  if(isLoading || !plan) return <Loading />

  return (
      <main className='min-h-screen w-full'>
        <PageTitle name={`پلن ${plan?.planId}`} />
        <div className="flex flex-col rounded-lg min-h-[750px] mb-48 bg-slate-300 dark:bg-slate-100 overflow-hidden shadow-md">
          <div className=" h-full duration-1000">
            <SinglePlanHeading
              plan={plan}
              customer={customer}
            />
            <small className=" mt-2 text-black px-2">فروش</small>
            <div className="max-h-[30%] bg-cyan-200 dark:bg-cyan-900 overflow-y-auto  w-full p-2">
              <SinglePlanTable data ={plan?.structures} />
            </div>
          </div>
        </div>
      </main>
  )
}

export default SinglePlan 