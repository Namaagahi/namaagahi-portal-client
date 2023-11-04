"use client"
import { selectAllInitialCustomers, selectInitialCustomerById, useGetAllInitialCustomersQuery, useUpdateInitialCustomerMutation } from '@/app/apiSlices/initialCustomersApiSlice'
import CreateUpdateModal from '@/app/components/modals/CreateUpdateModal'
import TableComponent from '@/app/components/table/TableComponent'
import ConfirmModal from '@/app/components/modals/ConfirmModal'
import { InitialCustomerObject } from '@/app/lib/interfaces'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import PageTitle from '@/app/components/main/PageTitle'
import Loading from '@/app/features/loading/Loading'
import { useEffect, useMemo, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import Button from '@/app/components/main/Button'
import { EntityId } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import useAuth from '@/app/hooks/useAuth'
import moment from 'jalali-moment'
import usePageTitle from '@/app/hooks/usePageTitle'
import SearchContainer from '@/app/components/main/SearchContainer'

const InitialCustomers = () => {
  usePageTitle('پروژه ها')

  const { isMaster, isAdmin, isProjectManager } = useAuth()

  const {
    isLoading,
    isError,
  } = useGetAllInitialCustomersQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })

  const [updateInitialCustomer, {
    isSuccess,
    error,
}] = useUpdateInitialCustomerMutation()

  const allInitialCustomers: InitialCustomerObject[] = useSelector(state => selectAllInitialCustomers(state) as InitialCustomerObject[])
  const [isNewInitialCustomer, setIsNewInitialCustomer] = useState<boolean>(false)
  const [isDeleteInitialCustomer, setIsDeleteInitialCustomer] = useState<boolean>(false)
  const [isEditInitialCustomer, setIsEditInitialCustomer] = useState<boolean>(false)
  const handleEditInitialCustomer = () => setIsEditInitialCustomer(!isEditInitialCustomer)
  const handleNewInitialCustomerModal = () => setIsNewInitialCustomer(!isNewInitialCustomer)
  const handleDeleteInitialCustomer = () => setIsDeleteInitialCustomer(!isDeleteInitialCustomer)
  const [data, setData] = useState<InitialCustomerObject[] | unknown>([])
  const [initialCustomerId, setInitialCustomerId] = useState<string | any | EntityId>('')
  const initialCustomer: InitialCustomerObject  = useSelector(state => selectInitialCustomerById(state, initialCustomerId) as InitialCustomerObject)

  useEffect(() => {
    setData(allInitialCustomers)
  }, [allInitialCustomers])

  // useEffect(() => {
  //   allInitialCustomers.forEach(async(initialCustomer: any) => {
  //       await updateInitialCustomer({
  //         userId: initialCustomer?.userId,
  //         id: initialCustomer?.id,
  //         name: initialCustomer?.name,
  //         phoneNumber: '',
  //         introductionMethod: ''
  //       })
  //   })
  // },[])

  const columns = useMemo<ColumnDef<InitialCustomerObject, any>[]>(() => {
    return(
      [
        {
          header: 'جدول پروژه ها',
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
            },
            {
              accessorFn: row => row.phoneNumber,
              id: 'شماره تماس',
              cell: info => {
                return (
                  <p className={`${!info.getValue()&& 'text-red-500'}`}>
                    {!info.getValue()? "تعیین نشده" : info.getValue()}
                  </p>
                )
              },
              header: () => <span>شماره تماس</span>,
            },
            {
              accessorFn: row => row.introductionMethod,
              id: 'نحوه آشنایی',
              cell: info => {
                return (
                  <p className={`${!info.getValue()&& 'text-red-500'}`}>
                    {!info.getValue()? "تعیین نشده" : info.getValue()}
                  </p>
                )
              },
              header: () => <span>نحوه آشنایی</span>,
            },
            {
              id: 'عملیات',
              header: () => <span>عملیات</span>,
              cell: (info) => {
                const row = info.row.original
                return (
                  <>
                  {(isMaster || isAdmin || isProjectManager)?
                    <p className="px-6 flex items-center justify-center gap-5" onClick={() => setInitialCustomerId(row.id)}>
                      <div className="flex items-center p-1 border-[1px] border-[#737373] rounded-md cursor-pointer">
                        <AiFillEdit
                          className="text-black dark:text-white hover:scale-125 transition-all"
                          size={20}
                          onClick={handleEditInitialCustomer}
                        />
                        <AiFillDelete
                          className="text-black dark:text-white hover:scale-125 transition-all"
                          size={20}
                          onClick={handleDeleteInitialCustomer}
                        />
                      </div>
                    </p>
                    :
                    <>
                      <p>دسترسی محدود شده</p>
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
                    <p>{moment(createdAt).format('jYYYY/jM/jD')}</p>
                )}
            },
            {
              id: 'تاریخ ویرایش',
              header: () => <span>تاریخ ویرایش</span>,
              cell: (info) => {
                const updatedAt = info.getValue()
                return (
                    <p>{moment(updatedAt).format('jYYYY/jM/jD')}</p>
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
      <p className='text-xl'>
        هیچ مشتری اولیه ای وجود ندارد
      </p>
    </div>
  )

  return (
    <>
      <PageTitle name={'پروژه ها'} />

      <div className="flex items-center justify-between gap-3">
        <SearchContainer />
        <Button
          onClickHandler={handleNewInitialCustomerModal}
          title="پروژه جدید"
        />
      </div>

      <TableComponent
        columns={columns}
        data={data}
      />

      {
        isNewInitialCustomer &&
          <CreateUpdateModal
            type={'newInitialCustomer'}
            handleModal={handleNewInitialCustomerModal}
          />
      }
      {
        isEditInitialCustomer &&
        <CreateUpdateModal
            prop={initialCustomer}
            handleModal={handleEditInitialCustomer}
            type={'editInitialCustomer'}
        />
      }
      {
        isDeleteInitialCustomer &&
          <ConfirmModal
            prop={initialCustomer}
            handleModal={handleDeleteInitialCustomer}
            type={'delete'}
            deleteType="initialCustomer"
          />

      }
    </>
  )
}

export default InitialCustomers
