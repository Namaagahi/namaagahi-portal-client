"use client"
import { useEffect, useState } from 'react'
import { selectAllInitialCustomers, useCreateNewInitialCustomerMutation, useGetAllInitialCustomersQuery } from '../../apiSlices/initialCustomersApiSlice'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { AiOutlineClose } from 'react-icons/ai'
import useAuth from '@/app/hooks/useAuth'
import { useSelector } from 'react-redux'
import { InitialCustomerObject } from '@/app/lib/interfaces'
import Loading from '../loading/Loading'

const NewInitialCustomerForm = ({handleModal}: {handleModal: () => void}) => {

  const { id } = useAuth()
  const { push } = useRouter()

  const [createNewInitialCustomer, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useCreateNewInitialCustomerMutation()

  const {
    isError: getInitalCustomersIsError,
  } = useGetAllInitialCustomersQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })
  const initialCustomers: InitialCustomerObject[] = useSelector(state => selectAllInitialCustomers(state) as InitialCustomerObject[])

  const [searchQuery, setSearchQuery] = useState<string>("")
  const [newInitialCustomerData, setNewInitialCustomerData] = useState({
    name:'',
    errorMsg:''
  })
  const { name, errorMsg } = newInitialCustomerData

  useEffect(() => {
    if(isSuccess) {
      setNewInitialCustomerData({...newInitialCustomerData, name:'' })
      push('/dashboard/billboard/initial-customers')
    }
  }, [isSuccess, push])

  const filteredCustomers = initialCustomers.filter((customer: InitialCustomerObject) => customer.name.includes(searchQuery))

  const onSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewInitialCustomerData({...newInitialCustomerData, name: e.target.value})
  const onSaveInitialCustomerClick = async(e: any) => {
    e.preventDefault()
    const data = await createNewInitialCustomer({ userId:id, name })
    if(!data.error) {
      handleModal()
      toast.success('پروژه جدید با موفقیت ساخته شد')
    }

    if(data.error?.status === 409)
      setNewInitialCustomerData({...newInitialCustomerData, errorMsg: 'مشتری قبلا تعریف شده است.'})
    if(data.error?.status === 400)
      setNewInitialCustomerData({...newInitialCustomerData, errorMsg: 'نام مشتری را وارد کنید.'})
  }

  if(isLoading) return <Loading />
  return (
    <div className="py-5 px-8 w-full text-black dark:text-white">
      <form
        className="flex flex-col"
        onSubmit={onSaveInitialCustomerClick}
      >
        <div className="flex justify-between items-center">
          <p className="md:text-2xl text-xl font-bold">
            پروژه جدید
          </p>

          <AiOutlineClose className="cursor-pointer text-xl hover:text-2xl transition-all" onClick={handleModal}/>
        </div>

        <div className="flex flex-col pt-12 pb-7">
          <label htmlFor="name">
              نام
          </label>
          <input
            type="text"
            placeholder="نام مشتری"
            id="name"
            value={name}
            autoComplete="off"
            onChange={onNameChange}
            className={`${isError && 'border-rose-700'} formInput2`}
          />

          <small className="text-xs text-rose-600 ">
            {errorMsg}
          </small>
        </div>

        <input
          type="text"
          placeholder="جستجوی مشتری"
          value={searchQuery}
          onChange={onSearchQueryChange}
          className='formInput2 my-4'
        />

        <ul className='mb-4 bg-gray-200 text-gray-700 font-bold rounded-md p-3 h-[100px] overflow-y-auto'>
          {getInitalCustomersIsError ?
            <p>
              هیچ پروژه ای تعریف نشده است
            </p>
          :
          filteredCustomers && filteredCustomers.map((customer: InitialCustomerObject) => (
            <li key={customer._id}>{customer.name}</li>
          ))}
        </ul>

        <div className="flex items-center gap-6">
          <button className="confirmButton">
            ذخیره
          </button>

          <button
            onClick={handleModal}
            className="cancelButton"
          >
            لغو
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewInitialCustomerForm
