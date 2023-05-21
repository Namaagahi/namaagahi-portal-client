"use client"
import FiltersContainer from "@/app/components/main/FiltersContainer"
import PageTitle from "@/app/components/main/PageTitle"
import Table from "@/app/components/main/Table"
import User from "@/app/components/users/User"
import { useGetUsersQuery } from "@/app/state & api/usersApiSlice"


const Users = () => {
  const {
    data: users, 
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery(undefined) 


  const usersTableHeadings = ['آواتار', 'نام', 'نام کاربری', 'سطح دسترسی', 'عملیات', 'وضعیت']

  if(isLoading) return <>Loading ...</>
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
      </>
    )
  }

}

export default Users