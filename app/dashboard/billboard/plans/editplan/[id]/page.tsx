"use client"
import { selectPlanById, useGetAllPlansQuery } from '@/app/apiSlices/plansApiSlice'
import EditPlanComp from '@/app/features/plans/EditPlanComp'
import Loading from '@/app/features/loading/Loading'
import { PlanObject } from '@/app/lib/interfaces'
import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'

const EditPlan = () => {

  const { id } = useParams()
  
  const { isLoading, data: planData } = useGetAllPlansQuery(undefined, {
      refetchOnFocus: false,
      refetchOnMountOrArgChange: false
    })

  const plan: PlanObject = useSelector(state => selectPlanById(state as PlanObject , id) as PlanObject)

  if(isLoading || !plan || !plan?.structures) return <Loading />
  return <EditPlanComp plan={plan} />
}

export default EditPlan