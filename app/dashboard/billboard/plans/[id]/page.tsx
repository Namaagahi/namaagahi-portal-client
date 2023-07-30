"use client"
import PageTitle from '@/app/components/main/PageTitle'
import TableComponent from '@/app/components/table/TableComponent'
import { selectInitialCustomerById, useGetAllInitialCustomersQuery } from '@/app/features/initialCustomers/initialCustomersApiSlice'
import Loading from '@/app/features/loading/Loading'
import SinglePlanHeading from '@/app/features/plans/SinglePlanHeading'
import { selectPlanById, useGetAllPlansQuery } from '@/app/features/plans/plansApiSlice'
import { InitialCustomerObject, PlanObject, PlanStructure } from '@/app/lib/interfaces'
import { ColumnDef } from '@tanstack/react-table'
import { useParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

const SinglePlan = () => {

  const { id } = useParams()
  const [data, setData] = useState< | any>([])


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

  useEffect(() =>{
    if(plan) setData(plan?.structures)
  }, [plan])

  function formatNumber(number: number, separator: string): string {
    const options = {
      useGrouping: true,
      minimumFractionDigits: 0,
    }
    return number?.toLocaleString(undefined, options).replace(/,/g, separator);
}


  const columns = useMemo<ColumnDef<PlanStructure, any>[]>(() => {
    return(
    [
        {
        header: ' ',
        columns: [
            {
            accessorKey: "_id",
            accessorFn: row => row.structureId,
            id: '_id',
            cell: info => null,
            header: () => null,
            },
            {
            accessorFn: row => row.structureRecord.name,
            id: 'کد سامانه',
            cell: info => info.getValue(),
            header: () => <span>کد سامانه</span>,
            },
            {
            accessorFn: row => row.structureRecord.location.path,
            id: 'مسیر',
            cell: info => info.getValue(),
            header: () => <span>مسیر</span>,
            },
            {
            accessorFn: row => row.structureRecord.location.address,
            id: 'آدرس',
            cell: info => info.getValue(),
            header: () => <span>آدرس</span>,
            },
            {
            accessorFn: row => row.structureRecord.marks.name,
            id: 'نوع سازه',
            cell: info => info.getValue(),
            header: () => <span>نوع سازه</span>,
            },
            {
            accessorFn: row => row.structureRecord.marks.markOptions.docSize,
            id: 'مساحت',
            cell: info => info.getValue(),
            header: () => <span>مساحت</span>,
            },
            {
            accessorFn: row => row.monthlyFee,
            id: 'تعرفه ماهیانه',
            cell: info => formatNumber(info.getValue(),','),
            header: () => <span>تعرفه ماهیانه</span>,
            },
            {
            accessorFn: row => row.monthlyFeeWithDiscount,
            id: 'قیمت ماهانه پس از تخفیف',
            cell: info => formatNumber(info.getValue(),','),
            header: () => <span>قیمت ماهانه پس از تخفیف</span>,
            // footer: () => <span>قیمت ماهانه پس از تخفیف</span>,
            footer: (info: any, rows: any) => {
              console.log("data", data)
              console.log("rows", info)
              if(data[0]) {
              return (
                <div className='flex justify-center items-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 rounded-xl '>
                  {formatNumber(data.reduce((total: any, item: any) => total + item.monthlyFeeWithDiscount, 0), ',')}
                </div>
              )
            }
            },
            },
            {
            accessorFn: row => row.discountType,
            id: 'مقیاس تخفیف',
            cell: info => {
              return(
                info.getValue() === 'percentage' ? <p>درصد</p> : <p>رقم</p>
              )
            },
            header: () => <span>مقیاس تخفیف</span>,
            },
            {
            accessorFn: row => row.discountFee,
            id: 'مقدار تخفیف',
            cell: info => info.getValue(),
            header: () => <span>مقدار تخفیف</span>,
            },
            {
            accessorFn: row => row.duration.sellStart,
            id: 'شروع اکران',
            cell: info => info.getValue(),
            header: () => <span>شروع اکران</span>,
            },
            {
            accessorFn: row => row.duration.sellEnd,
            id: 'پایان اکران',
            cell: info => info.getValue(),
            header: () => <span>پایان اکران</span>,
            },
            {
            accessorFn: row => row.duration.diff,
            id: 'طول دوره',
            cell: info => info.getValue(),
            header: () => <span>طول دوره</span>,
            },
        ],
        },
    ]
    )
  },
  []
  )

  if(!data[0]) return <Loading />

  return (
    <>
      <main className='min-h-screen w-full'>
        <PageTitle name={`پلن ${plan?.name}`} />
        <div className="flex flex-col rounded-lg min-h-[750px] mb-48 bg-slate-300 dark:bg-slate-100 overflow-hidden shadow-md">
          <div className=" h-full duration-1000">
            <SinglePlanHeading
              plan={plan}
              customer={customer}
            />
            <small className=" mt-2 text-black px-2">فروش</small>
            <div className="max-h-[30%] bg-cyan-200 dark:bg-cyan-900 overflow-y-auto  w-full p-2">
              <TableComponent 
                  columns={columns}
                  data={data}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default SinglePlan 