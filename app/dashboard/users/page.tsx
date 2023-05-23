"use client"
import Button from "@/app/components/main/Button"
import FiltersContainer from "@/app/components/main/FiltersContainer"
import Loading from "@/app/features/loading/Loading"
import PageTitle from "@/app/components/main/PageTitle"
import Table from "@/app/components/main/Table"
import Modal from "@/app/components/modals/Modal"
import User from "@/app/features/users/User"
import { useGetUsersQuery } from "@/app/features/users/usersApiSlice"
import { useState } from "react"


const Users = () => {
  const {
    data: users, 
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery(undefined) 

  const [isNewUser, setIsNewUser] = useState(false)

  const handleNewUserModal = () => setIsNewUser(!isNewUser)

  const usersTableHeadings = ['آواتار', 'نام', 'نام کاربری', 'سطح دسترسی', 'عملیات', 'وضعیت']

  if(isLoading) return <Loading />
  if(isError) return <p>{error?.data?.message}</p>
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
            <Modal
              type={'newUser'}
              handleModal={handleNewUserModal}
            />
        }
      </>
    )
  }

}

export default Users