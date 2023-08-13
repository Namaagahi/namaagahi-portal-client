import TableComponent from '@/app/components/table/TableComponent'
import { PlanStructure } from '@/app/lib/interfaces'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'jalali-moment'
import React, { useMemo } from 'react'

const SinglePlanTable = (props: any) => {

    const { data } = props

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
                accessorFn: row => row?.structureRecord.location.path,
                id: 'مسیر',
                cell: info => info.getValue(),
                header: () => <span>مسیر</span>,
                },
                {
                accessorFn: row => row?.structureRecord.location.address,
                id: 'آدرس',
                cell: info => info.getValue(),
                header: () => <span>آدرس</span>,
                },
                {
                accessorFn: row => row?.structureRecord.marks.name,
                id: 'نوع سازه',
                cell: info => info.getValue(),
                header: () => <span>نوع سازه</span>,
                },
                {
                accessorFn: row => row?.structureRecord.marks.markOptions.docSize,
                id: 'مساحت',
                cell: info => info.getValue(),
                header: () => <span>مساحت</span>,
                },
                {
                accessorFn: row => row?.monthlyFee,
                id: 'تعرفه ماهیانه',
                cell: info => formatNumber(info.getValue(),','),
                header: () => <span>تعرفه ماهیانه</span>,
                },
                {
                accessorFn: row => row?.monthlyFeeWithDiscount,
                id: 'قیمت ماهانه پس از تخفیف',
                cell: info => formatNumber(info.getValue(),','),
                header: () => <span>قیمت ماهانه پس از تخفیف</span>,
                },
                {
                accessorFn: row => row?.discountType,
                id: 'مقیاس تخفیف',
                cell: info => { 
                  return(
                    info.getValue() === 'percentage' ? <p>درصد</p> : <p>رقم</p>
                  )
                },
                header: () => <span>مقیاس تخفیف</span>,
                },
                {
                accessorFn: row => row?.discountFee,
                id: 'مقدار تخفیف',
                cell: info => info.getValue(),
                header: () => <span>مقدار تخفیف</span>,
                },
                {
                accessorFn: row => row?.duration.sellStart,
                id: 'شروع اکران',
                cell: info => <div>{moment(new Date(info.getValue()).toISOString()).format('jYYYY-jM-jD')}</div>,
                header: () => <span>شروع اکران</span>,
                },
                {
                accessorFn: row => row?.duration.sellEnd,
                id: 'پایان اکران',
                cell: info => <div>{moment(new Date(info.getValue()).toISOString()).format('jYYYY-jM-jD')}</div>,
                header: () => <span>پایان اکران</span>,
                },
                {
                accessorFn: row => row?.duration.diff, 
                id: 'طول دوره',
                cell: info => info.getValue(),
                header: () => <span>طول دوره</span>,
                },
                {
                accessorFn: row => row?.totalPeriodCost,
                id: 'جمع دوره',
                cell: info => formatNumber(info.getValue(), ','),
                header: () => <span>جمع دوره</span>,
                footer: (info: any, rows: any) => {
                  return (
                    <div className='flex justify-center items-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 rounded-xl '>
                      {formatNumber(data?.reduce((total: any, item: any) => total + item.totalPeriodCost, 0), ',')}
                    </div>
                  )
                },
                },
            ],
            },
        ]
        )
      },
      []
      )

      // console.log("data", data)

  return (
    <TableComponent 
        columns={columns}
        data={data}
    />
  )
}

export default SinglePlanTable