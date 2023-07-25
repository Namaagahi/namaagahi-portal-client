"use client"
import { ColumnDef } from '@tanstack/react-table'
import { useEffect, useMemo, useReducer, useState } from 'react'
import TableComponent from '@/app/components/table/TableComponent'
import { selectAllUsers, selectUserById, useGetUsersQuery } from '@/app/features/users/usersApiSlice'
import Loading from '@/app/features/loading/Loading'
import { useSelector } from 'react-redux'
import { UserObject } from '@/app/lib/interfaces'
import Image from 'next/image'
import useAuth from '@/app/hooks/useAuth'
import Status from '@/app/components/main/Status'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import ConfirmModal from '@/app/components/modals/ConfirmModal'
import CreateUpdateModal from '@/app/components/modals/CreateUpdateModal'
import { EntityId } from '@reduxjs/toolkit'
import Button from '@/app/components/main/Button'

const Test = () => {

  const { isAdmin } = useAuth()

  const {
    data: users, 
    isLoading,
    isSuccess,
    isError,
  } = useGetUsersQuery(undefined, { 
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  }) 

  const allUsers: UserObject[] | unknown = useSelector(state => selectAllUsers(state))
  const [isNewUser, setIsNewUser] = useState(false)
  const [isEditUser, setIsEditUser] = useState(false)
  const [isDeleteUser, setIsDeleteUser] = useState(false)
  const handleNewUserModal = () => setIsNewUser(!isNewUser)
  const handleEditUser = () => setIsEditUser(!isEditUser)
  const handleDeleteUser = () => setIsDeleteUser(!isDeleteUser)
  const [data, setData] = useState<UserObject[] | unknown>([])
  const [userId, setUserId] = useState<string | any | EntityId>('')
  const user: UserObject | any = useSelector(state => selectUserById(state, userId))

  useEffect(() =>{
    setData(allUsers)
  }, [allUsers])

  console.log("ALL USERS", allUsers)
  console.log("user", user)

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
              id: 'avatar',
              cell: info => {
                const avatar = info.getValue();
                return avatar ? <Image src={avatar} alt="avatar" width={35} height={35} /> : null;
              },
              header: () => <span>آواتار</span>,
              footer: props => props.column.id,
            },
            {
              accessorFn: row => row.name,
              id: 'name',
              cell: info => info.getValue(),
              header: () => <span>نام</span>,
              footer: props => props.column.id,
            },
            {
              accessorFn: row => row.username,
              id: 'username',
              cell: info => info.getValue(),
              header: () => <span>نام کاربری</span>,
              footer: props => props.column.id,
            },
            {
              accessorFn: row => row.roles,
              id: 'role',
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
              footer: props => props.column.id,
            },
            {
              accessorFn: row => row.active,
              id: 'active',
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
                    <Status
                      status = {'غیرفعال'}
                      bgColor = {'#d96f85'}
                      textColor = {'#2e030c'}
                    />   
                  }
                } else {
                  return <p>دسترسی محدود شده</p>
                }
               
              },
              header: () => <span>وضعیت</span>,
              footer: props => props.column.id,
            },
            {
              id: 'actions',
              header: () => <span>عملیات</span>,
              footer: props => props.column.id,
              cell: (info) => {
                const row = info.row.original;
                return (
                  <>
                  {isAdmin?
                    <td className="px-6 py-4 flex items-center gap-5" onClick={() => setUserId(row.id)}>
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
                      <td>دسترسی محدود شده</td>
                      <td>دسترسی محدود شده</td>
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

  return (
    <>    
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
}

export default Test