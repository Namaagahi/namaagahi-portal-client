import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSendLogoutMutation } from '../auth/authApiSlice'
import Loading from '../loading/Loading'

const Logout = ({ handleModal }: { handleModal: () => void }) => {
    const { push } = useRouter()

    const [sendLogout, {
      isLoading
    }] = useSendLogoutMutation()
  
  
    const onLogoutHandler = () => {
      sendLogout(undefined)
      handleModal()
      push('/')
    }

    if(isLoading) return <Loading />
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