"use client"
import { selectInitialCustomerById, useGetAllInitialCustomersQuery } from '@/app/apiSlices/initialCustomersApiSlice'
import { selectPlanById, useGetAllPlansQuery } from '@/app/apiSlices/plansApiSlice'
import { InitialCustomerObject, PlanObject } from '@/app/lib/interfaces'
import PlanPdfDoc from '@/app/features/plans/PlanPdfDoc'
import Loading from '@/app/features/loading/Loading'
import { PDFViewer } from '@react-pdf/renderer'
import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import usePageTitle from '@/app/hooks/usePageTitle'

const Invoice = () => {
  usePageTitle('پیش فاکتور پلن')

  const { id } = useParams()

  const { isLoading } = useGetAllPlansQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })

  useGetAllInitialCustomersQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })
  
  const plan: PlanObject = useSelector((state) =>selectPlanById(state as PlanObject, id) as PlanObject)
  const customer: InitialCustomerObject = useSelector(state => selectInitialCustomerById(state, plan?.initialCustomerId) as InitialCustomerObject)

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