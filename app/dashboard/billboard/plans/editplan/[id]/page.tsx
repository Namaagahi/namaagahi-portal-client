"use client"
import { selectPlanById, useGetAllPlansQuery } from '@/app/apiSlices/plansApiSlice'
import ScrollContainer from '@/app/components/main/ScrollContainer'
import EditPlanComp from '@/app/features/plans/EditPlanComp'
import Loading from '@/app/features/loading/Loading'
import { PlanObject } from '@/app/lib/interfaces'
import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import usePageTitle from '@/app/hooks/usePageTitle'

const EditPlan = () => {
  usePageTitle('ویرایش پلن')

  const { id } = useParams()

  const { isLoading, data: planData } = useGetAllPlansQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })

  const plan: PlanObject = useSelector(state => selectPlanById(state as PlanObject , id as string) as PlanObject)

  if(isLoading || !plan || !plan?.structures) return <Loading />
  return (
    <>
      <EditPlanComp plan={plan} />
      <ScrollContainer />
    </>
  )

}

export default EditPlan
