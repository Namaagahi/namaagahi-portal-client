"use client"
import { useGetUsersQuery } from "@/app/features/users/usersApiSlice"
import useAuth from "@/app/hooks/useAuth"
import { useState } from "react"
import dynamic from 'next/dynamic'
const PageTitle = dynamic(
  () => import('@/app/components/main/PageTitle'),
  { ssr: false }
)
const AccessDenied = dynamic(
  () => import('@/app/components/main/AccessDenied'),
  { ssr: false }
)
const Loading = dynamic(
  () => import('@/app/features/loading/Loading'),
  { ssr: false }
)
const Button = dynamic(
  () => import('@/app/components/main/Button'),
  { ssr: false }
)
const Table = dynamic(
  () => import('@/app/components/main/Table'),
  { ssr: false }
)
const User = dynamic(
  () => import('@/app/features/users/User'),
  { ssr: false }
)
const CreateUpdateModal = dynamic(
  () => import('@/app/components/modals/CreateUpdateModal'),
  { ssr: false }
)

const Users = () => {

  const { isAdmin } = useAuth()

  const {
    data: users, 
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery(undefined, { 
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  }) 

  const [isNewUser, setIsNewUser] = useState(false)

  const handleNewUserModal = () => setIsNewUser(!isNewUser)

  const usersTableHeadings = ['آواتار', 'نام', 'نام کاربری', 'سطح دسترسی', 'عملیات', 'وضعیت']

  if(isLoading) return <Loading />
  if(isError) return <p>ERROR</p>
  if(isSuccess){

    const { ids } = users

    const userTableContent = ids?.length && ids.map((userId: string) => <User key={userId} userId={userId} />)

    return (
      <>
        <PageTitle name={'مدیریت کاربران'}/>
        {
          isAdmin ?
          <>
            <Table 
              tableContent = {userTableContent}
              tableHeadings = {usersTableHeadings}
            />

            <Button 
              onClickHandler={handleNewUserModal}
              title="کاربر جدید"
            />
          </>
        :
        <AccessDenied />
        }
        
        {
          isNewUser && 
            <CreateUpdateModal
              type={'newUser'}
              handleModal={handleNewUserModal}
            />
        }
      </>
    )
  }

}

export default Users