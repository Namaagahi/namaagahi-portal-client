import React, { useState } from 'react'
import { selectInitialCustomerById, useGetAllInitialCustomersQuery } from '../../apiSlices/initialCustomersApiSlice'
import { InitialCustomerObject, UserObject } from '@/app/lib/interfaces'
import { useSelector } from 'react-redux'
import { AiFillDelete } from 'react-icons/ai'
import ConfirmModal from '@/app/components/modals/ConfirmModal'
import moment from 'jalali-moment'
import { selectAllUsers, useGetUsersQuery } from '../../apiSlices/usersApiSlice'

type Props = {
  initialCustomerId: string
}

const InitialCustomer = (props: Props) => {

  const { initialCustomerId } = props

  useGetUsersQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })

  useGetAllInitialCustomersQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })

  const allUsers: UserObject[]  = useSelector(selectAllUsers) as UserObject[]
  const initialCustomer: InitialCustomerObject = useSelector(state => selectInitialCustomerById(state, initialCustomerId) as InitialCustomerObject)
  const foundUser = allUsers.find((user: UserObject) => user.id === initialCustomer.userId)

  const [isDeleteInitialCustomer, setIsDeleteInitialCustomer] = useState<boolean>(false)

  if(initialCustomer) {

    const handleDeleteInitialCustomer = () => setIsDeleteInitialCustomer(!isDeleteInitialCustomer)

    return (
      <>
        <tr
          key={initialCustomer._id}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <td className="px-6 py-4">
            {foundUser?.username}
          </td>

          <td className="px-6 py-4">
            {initialCustomer.name}
          </td>

          <td className="px-6 py-4 flex items-center gap-5">
            <div className="flex justify-center items-center p-1 border-[1px] border-[#737373] rounded-md cursor-pointer">
              <AiFillDelete
                className="text-orange-600 dark:text-white hover:scale-125 transition-all" size={20}
                onClick={handleDeleteInitialCustomer}
              />
            </div>
          </td>

          <td className="px-6 py-4">
            {moment(initialCustomer.createdAt).format('jYYYY/jM/jD')}
          </td>

          <td className="px-6 py-4">
            {moment(initialCustomer.createdAt).format('jYYYY/jM/jD')}
          </td>
        </tr>

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
  } else return null
}

export default InitialCustomer
