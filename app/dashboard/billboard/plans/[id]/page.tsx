"use client"
import { selectInitialCustomerById, useGetAllInitialCustomersQuery } from '@/app/apiSlices/initialCustomersApiSlice'
import { selectPlanById, useGetAllPlansQuery } from '@/app/apiSlices/plansApiSlice'
import { FinalCustomerObject, InitialCustomerObject, PlanObject } from '@/app/lib/interfaces'
import SinglePlanHeading from '@/app/features/plans/SinglePlanHeading'
import SinglePlanTable from '@/app/features/plans/SinglePlanTable'
import PageTitle from '@/app/components/main/PageTitle'
import Loading from '@/app/features/loading/Loading'
import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import FinalCustomerForm from '@/app/features/finalCustomers/FinalCustomerForm'
import useAuth from '@/app/hooks/useAuth'
import { selectAllFinalCustomers, useGetAllFinalCustomersQuery } from '@/app/apiSlices/finalCustomerApiSlice'
import FinalCustomerInfo from '@/app/features/finalCustomers/FinalCustomerInfo'
import usePageTitle from '@/app/hooks/usePageTitle'

const SinglePlan = () => {
  usePageTitle('مشاهده پلن')

  const { isMaster, isAdmin, isMediaManager } = useAuth()
  const { id } = useParams()
  
  const { isLoading }=useGetAllPlansQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })

  useGetAllInitialCustomersQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })

  useGetAllFinalCustomersQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
})

  const allFinalCustomers: FinalCustomerObject[] = useSelector(state => selectAllFinalCustomers(state) as FinalCustomerObject[]) 
  const plan: PlanObject = useSelector(state => selectPlanById(state as PlanObject , id) as PlanObject)
  const customer: InitialCustomerObject = useSelector(state => selectInitialCustomerById(state, plan?.initialCustomerId) as InitialCustomerObject)
  const finalCustomer = allFinalCustomers.find((finalCustomer: FinalCustomerObject) => finalCustomer?.finalCustomerId === plan?.finalCustomerId)
  
  if(isLoading || !plan) return <Loading />

// console.log(plan)
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
              <SinglePlanTable data ={plan.structures} />
            </div>
            {
              (plan.status === 'pending' || plan.status === 'done') && 
                <FinalCustomerInfo finalCustomer={finalCustomer} />
            }
            { 
              ((plan.status === 'suggested' || plan.status === 'pending') && (isMaster || isAdmin || isMediaManager)) &&
                <FinalCustomerForm plan={plan} /> 
            }
          </div>
        </div>
      </main>
  )
}

export default SinglePlan 