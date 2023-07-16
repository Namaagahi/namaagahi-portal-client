"use client"
import { useEffect, useState } from 'react'
import { useCreateNewInitialCustomerMutation } from './initialCustomersApiSlice'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { AiOutlineClose } from 'react-icons/ai'
import useAuth from '@/app/hooks/useAuth'

const NewInitialCustomerForm = ({handleModal}: {handleModal: () => void}) => {

    const { id } = useAuth()
    
    const [createNewInitialCustomer, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useCreateNewInitialCustomerMutation()

    const { push } = useRouter()
      
    const [newInitialCustomerData, setNewInitialCustomerData] = useState({
        name:'',
    })
    const { name } = newInitialCustomerData

    useEffect(() => {
        if(isSuccess) {
            setNewInitialCustomerData({...newInitialCustomerData, name:'' })
            push('/dashboard/billboard/initial-customers')
        }
    }, [isSuccess, push])

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewInitialCustomerData({...newInitialCustomerData, name: e.target.value})

    const onSaveInitialCustomerClick = async(e: any) => {
        e.preventDefault()
        await createNewInitialCustomer({ userId:id, name })
        handleModal()
        toast.success('مشتری اولیه جدید با موفقیت ساخته شد')
    }
    
  return (
    <div className="py-5 px-8 w-full text-black dark:text-white">
        <form
            className="flex flex-col"
            onSubmit={onSaveInitialCustomerClick}
        >
            <div className="flex justify-between items-center">
                <p className="md:text-2xl text-xl font-bold">مشتری اولیه جدید</p>
                <AiOutlineClose className="cursor-pointer text-xl hover:text-2xl transition-all" onClick={handleModal}/>
            </div>
            <div className="flex flex-col pt-12 pb-7">
                <label htmlFor="name">نام</label>
                <input
                    type="text"
                    placeholder="نام مشتری"
                    id="name"
                    value={name}
                    autoComplete="off"
                    onChange={onNameChange}
                    className={`${isError && 'border-rose-700'} form-input`}
                />
            </div>
            <div className="flex items-center gap-6">
                <button
                    className="bg-[#5858FA] py-3 w-2/3 rounded-lg text-xl border-[1px] border-[#5858FA] hover:border-[#3636a3] hover:bg-[#3636a3] transition-all text-white"
                 >ذخیره</button>
                <button 
                    onClick={handleModal}
                    className=" py-3 w-1/3 rounded-lg text-xl border-[1px] border-[#808080] dark:border-white hover:bg-black hover:text-white transition-all"
                >لغو</button>
            </div>
        </form>
    </div>
  )
}

export default NewInitialCustomerForm