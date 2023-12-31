"use client"
import { selectChatroomById, useGetAllChatroomsQuery } from '@/app/apiSlices/chatroomsApiSlice'
import PageTitle from '@/app/components/main/PageTitle'
import Chatroom from '@/app/features/chatrooms/Chatroom'
import Loading from '@/app/features/loading/Loading'
import usePageTitle from '@/app/hooks/usePageTitle'
import { ChatroomObject } from '@/app/lib/interfaces'
import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'

const SingleChatroom = () => {
  usePageTitle('چت روم')

  const { id } = useParams()

  useGetAllChatroomsQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })

  const chatroom: ChatroomObject = useSelector(state => selectChatroomById(state as ChatroomObject , id as string) as ChatroomObject)

  if(!chatroom) return <Loading />
  return (
    <main className='min-h-screen w-full'>
      <PageTitle name={`چت روم ${chatroom.name}`} />
      <Chatroom 
        chatroomId={id}
        chatroom={chatroom} 
      />
    </main>
  )
}
 
export default SingleChatroom