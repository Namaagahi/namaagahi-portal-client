"use client"
import { useSendLogoutMutation } from '../../apiSlices/authApiSlice'
import { LogoutModalContentProps } from '@/app/lib/interfaces'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
const Loading = dynamic(
  () => import('../loading/Loading'),
  { ssr: false }
)
const Logout = (props: LogoutModalContentProps) => {

  const { handleModal } = props

  const { push } = useRouter()

  const [sendLogout, {
    isLoading,
  }] = useSendLogoutMutation()
  
  const onLogoutHandler = async () => {
    await sendLogout(undefined)
    push('/')
    handleModal()
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