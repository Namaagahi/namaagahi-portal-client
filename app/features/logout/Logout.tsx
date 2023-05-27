import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSendLogoutMutation } from '../auth/authApiSlice'

const Logout = ({ handleModal }: { handleModal: () => void }) => {
    const { push } = useRouter()

    const [sendLogout, {
      isLoading,
      isSuccess,
      isError,
      error
    }] = useSendLogoutMutation()
  
    useEffect(() => { if(isSuccess) push('/') },[isSuccess, push])
  
    const onLogoutHandler = () => sendLogout(undefined)
  
    if(isError) return <p>Error: {'message' in error && error?.message}</p>
  return (
    <div className="flex items-center gap-6">
            <button
                onClick={onLogoutHandler}
                className="btn-confirm"
            >
                تایید
            </button>

            <button 
                onClick={handleModal}
                className="btn-cancel"
            >لغو</button>
        </div>
  )
}

export default Logout