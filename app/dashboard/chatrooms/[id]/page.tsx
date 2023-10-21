"use client"
import { selectChatroomById, useGetAllChatroomsQuery } from '@/app/apiSlices/chatroomsApiSlice'
import PageTitle from '@/app/components/main/PageTitle'
import { useSocket } from '@/app/config/state-config/SocketContext'
import Chatroom from '@/app/features/chatrooms/Chatroom'
import Loading from '@/app/features/loading/Loading'
import useAuth from '@/app/hooks/useAuth'
import usePageTitle from '@/app/hooks/usePageTitle'
import { ChatroomObject, MessageObject } from '@/app/lib/interfaces'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
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
      <Chatroom chatroomId={id} />
    </main>
  )
}
 
export default SingleChatroom