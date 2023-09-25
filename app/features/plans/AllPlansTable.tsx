import Status from '@/app/components/main/Status'
import ConfirmModal from '@/app/components/modals/ConfirmModal'
import TableComponent from '@/app/components/table/TableComponent'
import useAuth from '@/app/hooks/useAuth'
import { InitialCustomerObject, PlanObject } from '@/app/lib/interfaces'
import { EntityId } from '@reduxjs/toolkit'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'jalali-moment'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { FaFilePdf } from 'react-icons/fa'

const AllPlansTable = (props: any) => {

    const { page, data, allInitialCustomers, setPlanId, plan } = props
    const { isMaster, isAdmin, isMediaManager } = useAuth()
    const [isDeletePlan, setIsDeletePlan] = useState<boolean>(false)

    const handleDeletePlan = () => setIsDeletePlan(!isDeletePlan)

    const columns = useMemo<ColumnDef<PlanObject>[]>(() => {
      return(
        [
          {
            header: 'جدول پلن ها',
            columns: [ 
              {
                accessorKey: "_id",
                accessorFn: row => row.id,
                id: '_id',
                cell: info => null,
                header: () => null,
              },
              {
                accessorKey: 'username',
                accessorFn: row => row.username,
                id: 'کاربر ایجاد کننده',
                cell: info => info.getValue(),
                header: () => <span>کاربر ایجاد کننده</span>,
              },
              {
                accessorFn: row => row.planId,
                id: 'شماره پلن',
                cell: info => info.getValue(),
                header: () => <span>شماره پلن</span>,
              },
              {
                accessorFn: row => row.mark.name,
                id: 'نوع پلن',
                cell: info => {
                  return (
                    <p>{info.getValue() === 'regular' ? 'عادی' : 'پکیج'}</p>
                  )
                },
                header: () => <span>نوع پلن</span>,
              },
              {
                accessorFn: row => row.initialCustomerId,
                id: 'مشتری',
                cell: info => {
                  const customer: InitialCustomerObject | undefined = allInitialCustomers.find((customer: InitialCustomerObject) => customer.id === info.getValue())
                  return(
                      <div>
                        {customer?.name}
                      </div>
                  )
                },
                header: () => <span>نام مشتری</span>,
                enableColumnFilter: false,
              },
              {
                accessorFn: row => row.brand,
                id: 'برند',
                cell: info => info.getValue(),
                header: () => <span>برند</span>,
                
              },
              {
                accessorFn: row => row.structures,
                id: 'تعداد سازه ها',
                cell: info => info.getValue().length,
                header: () => <span>تعداد سازه</span>,
                enableColumnFilter: false,
              },
              {
                accessorFn: row => row.status,
                id: 'وضعیت',
                cell: info => {
                  const status = info.getValue()
                  return(
                      <div>
                      {status === 'suggested'?
                      <Status
                          status = {'پیشنهادی '}
                          bgColor = {'#e8ac05'}
                          textColor = {'#FFFFFF'}
                      />
                      : status === 'done'?
                      <Status
                          status = {'تایید شده'}
                          bgColor = {'#439400'}
                          textColor = {'#FFFFFF'}
                      /> 
                      : status === 'pending'?
                      <Status
                          status = {'معلق'}
                          bgColor = {'#b56a35'}
                          textColor = {'#FFFFFF'}
                      /> 
                      : status === 'rejected' &&
                      <Status
                      status = {'رد شده'}
                      bgColor = {'#942300'}
                      textColor = {'#FFFFFF'}
                  />
                  }
                  </div>
                  ) 
                },
                header: () => <span>وضعیت</span>,
              },
              {
                id: 'پیش فاکتور',
                header: () => <span>پیش فاکتور</span>,
                cell: (info) => {
                  const row = info.row.original
                  return (
                    <Link href={`/dashboard/billboard/plans/invoice/${row.id}`} target='_blank'>
                      <div className='flex justify-center text-xl text-red-600 dark:text-red-300 transition-all dark:hover:text-gray-300 hover:text-gray-500 cursor-pointer'>
                        <FaFilePdf />
                      </div>
                    </Link>
                  )}
              },
              {
                id: 'مشاهده',
                header: () => <span>مشاهده پلن</span>,
                cell: ({row}) => {
                  return (
                    <Link href={`/dashboard/billboard/plans/${row.original.id}`}>
                        <p className=" cursor-pointer transition-all">
                            <Status
                                status = {'مشاهده '}
                                bgColor = {'#D0BFFF'}
                                textColor = {'#0a541e'}
                            />
                        </p>
                    </Link>
                  )}
              },
              {
                id: 'عملیات',
                header: () => <span>عملیات</span>,
                cell: (info) => {
                  const row = info.row.original
                  return (
                    <div className="flex items-center justify-center gap-2" onClick={() => setPlanId(row.id)}>
                        {isMaster && page === 'all' ? 
                        <>
                          <Link href={`/dashboard/billboard/plans/editplan/${row.id}`}>
                            <AiFillEdit
                              className="text-black dark:text-white hover:scale-125 transition-all p-1 border-[1px] border-[#737373] rounded-md cursor-pointer" size={20}
                            />
                          </Link>
                          <AiFillDelete 
                            className="text-orange-600 dark:text-white hover:scale-125 transition-all p-1 border-[1px] border-[#737373] rounded-md cursor-pointer" size={20}
                            onClick={handleDeletePlan}    
                          />
                        </>
                        : (isMaster || isMediaManager || isAdmin) && page === 'all' ?
                        <>
                          <Link href={`/dashboard/billboard/plans/editplan/${row.id}`}>
                            <AiFillEdit
                              className="text-black dark:text-white hover:scale-125 transition-all p-1 border-[1px] border-[#737373] rounded-md cursor-pointer" size={20}
                            />
                          </Link>
                        </>
                        : page === 'all' &&
                        <p>دسترسی محدود</p>
                        }
                        {page === 'my' &&
                        <>
                          <Link href={`/dashboard/billboard/plans/editplan/${row.id}`}>
                            <AiFillEdit
                              className="text-black dark:text-white hover:scale-125 transition-all p-1 border-[1px] border-[#737373] rounded-md cursor-pointer" size={20}
                            />
                          </Link>
                      
                          <AiFillDelete 
                            className="text-orange-600 dark:text-white hover:scale-125 transition-all p-1 border-[1px] border-[#737373] rounded-md" size={20}
                            onClick={handleDeletePlan}    
                          />
                        </>
                        }
                    </div>
                  )}
              },
              {
                accessorFn: row => row.createdAt,
                id: 'تاریخ ایجاد',
                header: () => <span>تاریخ ایجاد</span>,
                enableColumnFilter: false,
                cell: (info) => {
                  const createdAt = info.getValue()
                  return (
                    <p>{moment(createdAt).format('jYYYY/jM/jD')}</p>
                  )}
              },
              {
                accessorFn: row => row.updatedAt,
                id: 'تاریخ ویرایش',
                header: () => <span>تاریخ ویرایش</span>,
                enableColumnFilter: false,
                cell: (info) => {
                  const updatedAt = info.getValue()
                  console.log(updatedAt)
                  return (
                    <p>{moment(updatedAt).format('jYYYY/jM/jD')}</p>
                  )}
              },
            ],
          }
        ]
      )
    },[])

  return (
    <>
        <TableComponent 
            columns={columns}
            data={data}
        />
      
      {
        isDeletePlan && 
        <ConfirmModal 
          prop={plan} 
          handleModal={handleDeletePlan}
          type={'delete'} 
          deleteType="plan"
        /> 
      }
    </>
  )
}

export default AllPlansTable