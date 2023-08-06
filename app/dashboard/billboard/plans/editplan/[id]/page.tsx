"use client"
import { selectPlanById, useGetAllPlansQuery } from '@/app/apiSlices/plansApiSlice'
import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import EditPlanComp from '@/app/features/plans/EditPlanComp'
import { PlanObject } from '@/app/lib/interfaces'
import Loading from '@/app/features/loading/Loading'

const EditPlan = () => {

    const { id } = useParams()
    
    const { isLoading, data: planData } = useGetAllPlansQuery(undefined, {
        refetchOnFocus: false,
        refetchOnMountOrArgChange: false
      })

    const plan: PlanObject | any = useSelector(state => selectPlanById(state as PlanObject , id))

    if(isLoading || !plan || !plan?.structures) return <Loading />
    return <EditPlanComp plan={plan} />
}

export default EditPlan