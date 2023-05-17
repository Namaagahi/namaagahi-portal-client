"use client"
import PageTitle from "@/app/components/main/PageTitle"
import { useGetUsersQuery } from "@/app/features/users/usersApiSlice"
import { User } from "@/app/lib/interfaces"
import Link from "next/link"

const Users = () => {
  const {
    data: users, 
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery('') 
console.log(users)
  let content
  if(isLoading) {
    content = <p>Loading ...</p>
  } else if (isSuccess) {
    content = (
      <section>
        <PageTitle name={'مدیریت کاربران'} />
      </section>
    )
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>
  }
  return content
}

export default Users