"use client"
import { selectAllInitialCustomers, selectInitialCustomerById, useGetAllInitialCustomersQuery } from '@/app/features/initialCustomers/initialCustomersApiSlice'
import CreateUpdateModal from '@/app/components/modals/CreateUpdateModal'
import TableComponent from '@/app/components/table/TableComponent'
import ConfirmModal from '@/app/components/modals/ConfirmModal'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import Loading from '@/app/features/loading/Loading'
import { useEffect, useMemo, useState } from 'react'
import { InitialCustomerObject } from '@/app/lib/interfaces'
import { ColumnDef } from '@tanstack/react-table'
import Status from '@/app/components/main/Status'
import Button from '@/app/components/main/Button'
import { EntityId } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import useAuth from '@/app/hooks/useAuth'
import Image from 'next/image'
import AccessDenied from '@/app/components/main/AccessDenied'
import PageTitle from '@/app/components/main/PageTitle'
import moment from 'jalali-moment'
    
const InitialCustomers = () => {
    
  const { isAdmin } = useAuth()
    
  const {
    isLoading,
    isSuccess,
    isError,
  } = useGetAllInitialCustomersQuery(undefined, { 
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  }) 

  const allInitialCustomers: InitialCustomerObject[] | unknown = useSelector(state => selectAllInitialCustomers(state))
  const [inNewInitialCustomer, setIsNewInitialCustomer] = useState(false)
  const [isEditInitialCustomer, setIsEditInitialCustomer] = useState(false)
  const [isDeleteInitialCustomer, setIsDeleteInitialCustomer] = useState(false)
  const handleNewInitialCustomerModal = () => setIsNewInitialCustomer(!inNewInitialCustomer)
  const handleEditInitialCustomer = () => setIsEditInitialCustomer(!isEditInitialCustomer)
  const handleDeleteInitialCustomer = () => setIsDeleteInitialCustomer(!isDeleteInitialCustomer)
  const [data, setData] = useState<InitialCustomerObject[] | unknown>([])
  const [initialCustomerId, setInitialCustomerId] = useState<string | any | EntityId>('')
  const initialCustomer: InitialCustomerObject | any = useSelector(state => selectInitialCustomerById(state, initialCustomerId))
  
  useEffect(() =>{
    setData(allInitialCustomers)
  }, [allInitialCustomers])

  const columns = useMemo<ColumnDef<InitialCustomerObject, any>[]>(() => {
    return(
      [
        {
          header: 'جدول کاربران',
          footer: props => props.column.id,
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
              accessorFn: row => row.name,
              id: 'نام',
              cell: info => info.getValue(),
              header: () => <span>نام</span>,
              footer: props => props.column.id,
            },
            {
              id: 'عملیات',
              header: () => <span>عملیات</span>,
              footer: props => props.column.id,
              cell: (info) => {
                const row = info.row.original;
                return (
                  <>
                  {isAdmin?
                    <td className="px-6 flex items-center justify-center gap-5" onClick={() => setInitialCustomerId(row.id)}>
                      <div className="flex items-center p-1 border-[1px] border-[#737373] rounded-md cursor-pointer">
                        <AiFillDelete
                          className="text-black dark:text-white hover:scale-125 transition-all"
                          size={20}
                          onClick={handleDeleteInitialCustomer}
                        />
                      </div>
                      {/* <div className="flex justify-center items-center p-1 border-[1px] border-[#737373] rounded-md cursor-pointer">
                        <AiFillDelete
                          className="text-orange-600 dark:text-white hover:scale-125 transition-all"
                          size={20}
                          onClick={handleDeleteUser}
                        />
                      </div> */}
                    </td>
                    :
                    <>
                      <td>دسترسی محدود شده</td>
                      <td>دسترسی محدود شده</td>
                    </>
                }
                  </>
                )}
            },
            {
              id: 'تاریخ ایجاد',
              header: () => <span>تاریخ ایجاد</span>,
              cell: (info) => {
                const createdAt = info.getValue()
                return (
                  <div className='flex justify-center'>
                    <td className="px-6">{moment(createdAt).format('jYYYY/jM/jD')}</td>
                  </div>
                )}
            },
            {
              id: 'تاریخ ویرایش',
              header: () => <span>تاریخ ویرایش</span>,
              cell: (info) => {
                const updatedAt = info.getValue()
                return (
                  <div className='flex justify-center'>
                    <td className="px-6">{moment(updatedAt).format('jYYYY/jM/jD')}</td>
                  </div>
                )}
            },
          ],
        }
      ]
    )
  },
  []
)


if(isLoading) return <Loading />

if(isError) return (

  <div className='flex flex-col justify-center items-center min-h-screen gap-3'>
    <p className='text-xl'>هیچ مشتری اولیه ای وجود ندارد</p>
  </div>
)

  return (
    <>            
      <PageTitle name={'مشتریان اولیه'} /> 
      <TableComponent 
        columns={columns}
        data={data}
      />
      {isAdmin && 
        <Button 
          onClickHandler={handleNewInitialCustomerModal}
          title="مشتری اولیه جدید"
        />
      }
      {
        inNewInitialCustomer && 
          <CreateUpdateModal
            type={'newInitialCustomer'}
            handleModal={handleNewInitialCustomerModal}
          />
      }
      {
        isDeleteInitialCustomer && 
          <ConfirmModal 
            prop={inNewInitialCustomer} 
            handleModal={handleDeleteInitialCustomer}
            type={'delete'}
            deleteType="initialCustomer"
          />

      }
    </>

  )
}

export default InitialCustomers 