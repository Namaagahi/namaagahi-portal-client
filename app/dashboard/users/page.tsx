"use client"
import CreateUpdateModal from "@/app/components/modals/CreateUpdateModal"
import FiltersContainer from "@/app/components/main/FiltersContainer"
import { useGetUsersQuery } from "@/app/features/users/usersApiSlice"
import PageTitle from "@/app/components/main/PageTitle"
import Loading from "@/app/features/loading/Loading"
import Button from "@/app/components/main/Button"
import Table from "@/app/components/main/Table"
import User from "@/app/features/users/User"
import { useState } from "react"

const Users = () => {

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
  if(isError) return <p>{'data' in error && error?.data?.message}</p>
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

        <Button 
          onClickHandler={handleNewUserModal}
          title="کاربر جدید"
        />
        
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