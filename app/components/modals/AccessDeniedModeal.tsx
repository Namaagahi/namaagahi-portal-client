import { AccessDeniedModalProps } from '@/app/lib/interfaces'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const AccessDeniedModeal = (props: AccessDeniedModalProps) => {

    const { handleModal } = props

  return (
    <div className="modal-container">
        <div onClick={handleModal} className="backdrop-container"></div>
        <div className="create-update-modal-content-container">
            <AiOutlineClose className="cursor-pointer text-xl hover:text-2xl transition-all" onClick={handleModal}/>

            <div className="flex flex-col text-lg text-center py-12">
                <div className="p-7 border-[1px] border-x-transparent border-y-[#FA9E93]">
                <p>اجازه دسترسی به این قسمت برای گروه کاربری شما محدود شده است. در صورت وجود مغایرت با پشتیبانی تماس بگیرید.</p>
                </div>
            </div>
      
        </div>
    </div>
  )
}

export default AccessDeniedModeal