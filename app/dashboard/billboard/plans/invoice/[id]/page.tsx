"use client"
import { selectInitialCustomerById, useGetAllInitialCustomersQuery } from '@/app/apiSlices/initialCustomersApiSlice'
import { selectPlanById, useGetAllPlansQuery } from '@/app/apiSlices/plansApiSlice'
import { InitialCustomerObject, PlanObject } from '@/app/lib/interfaces'
import PlanPdfDoc from '@/app/features/plans/PlanPdfDoc'
import Loading from '@/app/features/loading/Loading'
import { PDFViewer } from '@react-pdf/renderer'
import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'

const Invoice = () => {

  const { id } = useParams()

  const { isLoading } = useGetAllPlansQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })

  useGetAllInitialCustomersQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })
  
  const plan: PlanObject | undefined | any = useSelector((state) =>selectPlanById(state as PlanObject, id))
  const customer: InitialCustomerObject | any = useSelector(state => selectInitialCustomerById(state, plan?.customerName))

  console.log(plan)

  if ( isLoading || !plan) return <Loading />

  return (
    <>
      <PDFViewer height={800}>
        <PlanPdfDoc plan={plan} customer={customer}  />
      </PDFViewer>
    </>
  )
}

export default Invoice