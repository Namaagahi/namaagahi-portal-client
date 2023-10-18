import { useCreateNewChatroomMutation } from '@/app/apiSlices/chatroomsApiSlice'
import useAuth from '@/app/hooks/useAuth'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { toast } from 'react-toastify'
import Loading from '../loading/Loading'

const NewChatroom = ({handleModal}: {handleModal: () => void}) => {

    const { id } = useAuth()
    const { push } = useRouter()

    const [newChatroomData, setNewChatroomData] = useState({
        name:'',
        errorMsg:''
    })
    const { name, errorMsg } = newChatroomData

    const [createNewChatroom, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useCreateNewChatroomMutation()

    useEffect(() => {
        if(isSuccess) {
            setNewChatroomData({...newChatroomData, name:'' })
            push('/dashboard/chatrooms')
        }
    }, [isSuccess, push])

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewChatroomData({...newChatroomData, name: e.target.value})

    const onSaveChatroomClick = async(e: any) => {
        e.preventDefault()
        const data = await createNewChatroom({ userId:id, name })

        if(!data.error) {
            handleModal()
            toast.success('چت روم جدید با موفقیت ساخته شد')
        } 
        if(data.error?.status === 409)
            setNewChatroomData({...newChatroomData, errorMsg: 'چت روم قبلا تعریف شده است.'})
        if(data.error?.status === 400)
            setNewChatroomData({...newChatroomData, errorMsg: 'نام چت روم را وارد کنید.'})
    }

    if(isLoading) return <Loading />
    return (
        <div className="py-5 px-8 w-full text-black dark:text-white">
            <form
                className="flex flex-col"
                onSubmit={onSaveChatroomClick}
            >
                <div className="flex justify-between items-center">
                    <p className="md:text-2xl text-xl font-bold">
                        چت روم جدید
                    </p>

                    <AiOutlineClose className="cursor-pointer text-xl hover:text-2xl transition-all" onClick={handleModal}/>
                </div>

                <div className="flex flex-col pt-12 pb-7">
                    <label htmlFor="name">
                        نام
                    </label>
                    <input
                        type="text"
                        placeholder="نام چت روم"
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

                <div className="flex items-center gap-6">
                    <button
                        className="confirmButton"
                    >
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

export default NewChatroom