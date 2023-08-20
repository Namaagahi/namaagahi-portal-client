"use client"
import { selectAllUsers, selectUserById, useGetUsersQuery } from '@/app/apiSlices/usersApiSlice'
import CreateUpdateModal from '@/app/components/modals/CreateUpdateModal'
import TableComponent from '@/app/components/table/TableComponent'
import ConfirmModal from '@/app/components/modals/ConfirmModal'
import AccessDenied from '@/app/components/main/AccessDenied'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import PageTitle from '@/app/components/main/PageTitle'
import Loading from '@/app/features/loading/Loading'
import { useEffect, useMemo, useState } from 'react'
import { UserObject } from '@/app/lib/interfaces'
import { ColumnDef } from '@tanstack/react-table'
import Status from '@/app/components/main/Status'
import Button from '@/app/components/main/Button'
import { EntityId } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import useAuth from '@/app/hooks/useAuth'
import Image from 'next/image'

const Users = () => {

  const { isAdmin } = useAuth()

  const {
    isLoading,
    isError,
  } = useGetUsersQuery(undefined, { 
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  }) 

  const allUsers: UserObject[] = useSelector(state => selectAllUsers(state) as UserObject[])
  const [isNewUser, setIsNewUser] = useState<boolean>(false)
  const [isEditUser, setIsEditUser] = useState<boolean>(false)
  const [isDeleteUser, setIsDeleteUser] = useState<boolean>(false)
  const handleNewUserModal = () => setIsNewUser(!isNewUser)
  const handleEditUser = () => setIsEditUser(!isEditUser)
  const handleDeleteUser = () => setIsDeleteUser(!isDeleteUser)
  const [data, setData] = useState<UserObject[]>([])
  const [userId, setUserId] = useState<string | any | EntityId>('')
  const user: UserObject | any = useSelector(state => selectUserById(state, userId) as UserObject)

  useEffect(() =>{
    setData(allUsers)
  }, [allUsers])

  const columns = useMemo<ColumnDef<UserObject, any>[]>(() => {
    return(
      [
        {
          header: 'جدول کاربران',
          footer: props => props.column.id,
          columns: [
            {
              accessorKey: 'avatar',
              accessorFn: row => row.avatar,
              id: 'آواتار',
              cell: info => {
                const avatar = info.getValue();
                return (
                  <div className='flex justify-center'>
                    <Image src={avatar} alt="avatar" width={35} height={35}  /> 
                  </div>
                ) 
              },
              header: () => <span>آواتار</span>,
            },
            {
              accessorFn: row => row.name,
              id: 'نام',
              cell: info => info.getValue(),
              header: () => <span>نام</span>,
            },
            {
              accessorFn: row => row.username,
              id: 'نام کاربری',
              cell: info => info.getValue(),
              header: () => <span>نام کاربری</span>,
            },
            {
              accessorFn: row => row.roles,
              id: 'سطح دسترسی',
              cell: info => {
                const roles = info.getValue();
                if (roles?.includes('ادمین')) {
                  return <p>ادمین</p>;
                } else if (roles?.includes('مدیررسانه')) {
                  return <p>مدیر رسانه</p>;
                } else if (roles?.includes('پذیرشگر')) {
                  return <p>پذیرشگر</p>;
                } else {
                  return null;
                }
              },
              header: () => <span>سطح دسترسی</span>,
            },
            {
              accessorFn: row => row.active,
              id: 'وضعیت',
              cell: info => {
                const active = info.getValue();
                if(isAdmin) {
                  if(active) {
                    return (
                      <Status 
                        status = {'فعال'} 
                        bgColor = {'#a8edbb'}
                        textColor = {'#0a541e'}
                      />
                    )
                  } else {
                    return (
                      <Status
                        status = {'غیرفعال'}
                        bgColor = {'#d96f85'}
                        textColor = {'#2e030c'}
                      />   
                    )
                  }
                } else {
                  return (
                    <p>
                      دسترسی محدود شده
                    </p>
                  )
                }
               
              },
              header: () => <span>وضعیت</span>,
            },
            {
              id: 'عملیات',
              header: () => <span>عملیات</span>,
              cell: (info) => {
                const row = info.row.original;
                return (
                  <>
                  {isAdmin?
                    <td className="px-6 flex items-center justify-center gap-5" onClick={() => setUserId(row.id)}>
                      <div className="flex items-center p-1 border-[1px] border-[#737373] rounded-md cursor-pointer">
                        <AiFillEdit
                          className="text-black dark:text-white hover:scale-125 transition-all"
                          size={20}
                          onClick={handleEditUser}
                        />
                      </div>
                      <div className="flex justify-center items-center p-1 border-[1px] border-[#737373] rounded-md cursor-pointer">
                        <AiFillDelete
                          className="text-orange-600 dark:text-white hover:scale-125 transition-all"
                          size={20}
                          onClick={handleDeleteUser}
                        />
                      </div>
                    </td>
                    :
                    <>
                      <td>
                        دسترسی محدود شده
                      </td>
                      <td>
                        دسترسی محدود شده
                      </td>
                    </>
                }
                  </>
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
    <p className='text-xl'>هیچ کاربری وجود ندارد</p>
  </div>
)

if(isAdmin) {
  return (
    <>    
      <PageTitle name={'کاربران'} /> 
      <TableComponent 
        columns={columns}
        data={data}
      />
      {isAdmin && 
        <Button 
          onClickHandler={handleNewUserModal}
          title="کاربر جدید"
        />
      }
      {
        isNewUser && 
          <CreateUpdateModal
            type={'newUser'}
            handleModal={handleNewUserModal}
          />
      }
      {
        isDeleteUser && 
          <ConfirmModal 
            prop={user} 
            handleModal={handleDeleteUser}
            type={'delete'}
            deleteType="user"
          />

      }

      {
        isEditUser && 
          <CreateUpdateModal 
            type={'editUser'}
            handleModal={handleEditUser} 
            prop={user}
          />
      }
    </>
  )
} else return (
  <>
    <PageTitle name={'کاربران'} />
    <AccessDenied />
  </>
)
}

export default Users