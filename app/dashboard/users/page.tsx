"use client"
import CreateUpdateModal from "@/app/components/modals/CreateUpdateModal"
import { useGetUsersQuery } from "@/app/features/users/usersApiSlice"
import AccessDenied from "@/app/components/main/AccessDenied"
import { usersTableHeadings } from "@/app/lib/constants"
import PageTitle from "@/app/components/main/PageTitle"
import Button from "@/app/components/main/Button"
import useAuth from "@/app/hooks/useAuth"
import { useState } from "react"
import dynamic from 'next/dynamic'
const Loading = dynamic(
  () => import('@/app/features/loading/Loading'),
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

const Users = () => {

  const { isAdmin } = useAuth()

  const {
    data: users, 
    isLoading,
    isSuccess,
    isError,
  } = useGetUsersQuery(undefined, { 
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  }) 

  const [isNewUser, setIsNewUser] = useState(false)

  const handleNewUserModal = () => setIsNewUser(!isNewUser)

  if(isLoading) return <Loading />

  if(isError) return <p>ERROR</p>
  
  if(isSuccess){

    const { ids } = users

    const userTableContent = ids?.length && ids.map((userId: string) => <User key={userId} userId={userId} />)

    return (
      <>
        <PageTitle name={'مدیریت کاربران'}/>
          <Table 
            tableContent = {userTableContent}
            tableHeadings = {usersTableHeadings}
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
      </>
    )
  }

}

export default Users