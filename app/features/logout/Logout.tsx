"use client"
import { useRouter } from 'next/navigation'
import { useSendLogoutMutation } from '../auth/authApiSlice'
import dynamic from 'next/dynamic'
const Loading = dynamic(
  () => import('../loading/Loading'),
  { ssr: false }
)
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