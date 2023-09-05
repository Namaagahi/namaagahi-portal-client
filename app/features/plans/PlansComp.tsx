"use client"
import { selectAllInitialCustomers, useGetAllInitialCustomersQuery } from '../../apiSlices/initialCustomersApiSlice'
import { selectAllPlans, selectPlanById, useGetAllPlansQuery } from '@/app/apiSlices/plansApiSlice'
import { InitialCustomerObject, PlanObject } from '@/app/lib/interfaces'
import { useGetAllBoxesQuery } from '@/app/apiSlices/boxesApiSlice'
import TableComponent from '@/app/components/table/TableComponent'
import ConfirmModal from '@/app/components/modals/ConfirmModal'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import PageTitle from '@/app/components/main/PageTitle'
import Loading from '@/app/features/loading/Loading'
import { useEffect, useMemo, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import Status from '@/app/components/main/Status'
import { EntityId } from '@reduxjs/toolkit'
import { FaFilePdf } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import useAuth from '@/app/hooks/useAuth'
import moment from 'jalali-moment'
import Link from 'next/link'

type Props = { 
  page: string
}

const PlansComp = (props: Props) => {

  const { page } = props
  const { isMaster, isAdmin, isMediaManager, id } = useAuth()

  const { 
    isLoading,
    isError,
  } = useGetAllPlansQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })

  useGetAllInitialCustomersQuery(undefined, { 
      refetchOnFocus: false, 
      refetchOnMountOrArgChange: false
  })  

  useGetAllBoxesQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  })

  const [planId, setPlanId] = useState<string | any | EntityId>('')
  const allPlans: PlanObject[] = useSelector(state => selectAllPlans(state) as PlanObject[]) 
  const plan: PlanObject = useSelector(state => selectPlanById(state, planId!) as PlanObject)
  const allInitialCustomers: InitialCustomerObject[] = useSelector(state => selectAllInitialCustomers(state) as InitialCustomerObject[])
  const [isDeletePlan, setIsDeletePlan] = useState<boolean>(false)
  const handleDeletePlan = () => setIsDeletePlan(!isDeletePlan)
  const [data, setData] = useState<PlanObject[] | []>([])

  useEffect(() =>{
    if(page === 'my') {
      setData(allPlans.filter(plan => plan.userId === id))
    } else {
      setData(allPlans)
    }
    }, [allPlans])
    
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
                        textColor = {'#0a541e'}
                    />
                    : status === 'done'?
                    <Status
                        status = {'تایید شده'}
                        bgColor = {'#439400'}
                        textColor = {'#2e030c'}
                    /> 
                    : status === 'pending'?
                    <Status
                        status = {'معلق'}
                        bgColor = {'#b56a35'}
                        textColor = {'#2e030c'}
                    /> 
                    : status === 'rejected' &&
                    <Status
                    status = {'رد شده'}
                    bgColor = {'#942300'}
                    textColor = {'#ffc5b3'}
                />
                }
                </div>
                ) 
              },
              header: () => <span>وضعیت</span>,
            },
            {
              accessorFn: row => row.createdAt,
              id: 'تاریخ ایجاد',
              header: () => <span>تاریخ ایجاد</span>,
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
              cell: (info) => {
                const updatedAt = info.getValue()
                return (
                  <p>{moment(updatedAt).format('jYYYY/jM/jD')}</p>
                )}
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
              id: 'عملیات',
              header: () => <span>عملیات</span>,
              cell: (info) => {
                const row = info.row.original
                return (
                  <div className="flex items-center justify-center gap-2" onClick={() => setPlanId(row.id)}>
                      {(isMediaManager || isAdmin || isMaster) && page === 'all' ?
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
                id: 'مشاهده',
                header: () => <span></span>,
                cell: ({row}) => {
                  return (
                    <Link href={`/dashboard/billboard/plans/${row.original.id}`}>
                        <p className=" cursor-pointer transition-all">
                            <Status
                                status = {'مشاهده '}
                                bgColor = {'#34ebc9'}
                                textColor = {'#0a541e'}
                            />
                        </p>
                    </Link>
                  )}
              },
          ],
        }
      ]
    )
  },[])

  if(isLoading) return <Loading /> 
  if(!data[0]) return (
    <div className='flex flex-col justify-center items-center min-h-screen gap-3'>
      <p className='text-xl'>
        شما هیچ پلنی ثبت نکرده اید
      </p>

      <p>
        برای ایجاد پلن جدید 
        <Link href={'/dashboard/billboard/plans/createplan'}>
          <span className='text-cyan-300'>
            کلیک کنید
          </span>
        </Link>
      </p>
    </div>
  )

  if(isError) return (
    <div className='flex flex-col justify-center items-center min-h-screen gap-3'>
      <p className='text-xl'>
        هیچ پلنی وجود ندارد
      </p>

      <p>
        برای ایجاد پلن جدید 
        <Link href={'/dashboard/billboard/plans/createplan'}>
          <span className='text-cyan-300'>
            کلیک کنید
          </span>
        </Link>
      </p>
    </div>
  )
  
  return (
    <>
      <PageTitle name={'پلن ها'} /> 
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

export default PlansComp