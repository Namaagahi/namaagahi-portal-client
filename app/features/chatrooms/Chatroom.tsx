import { selectAllMessages, useGetAllMessagesQuery } from '@/app/apiSlices/messagesApiSlice'
import { useSocket } from '@/app/config/state-config/SocketContext'
import useAuth from '@/app/hooks/useAuth'
import { ChatroomObject, MessageObject } from '@/app/lib/interfaces'
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { AiFillDelete, AiOutlineSend } from 'react-icons/ai'
import Loading from '../loading/Loading'
import moment from 'jalali-moment'
import ArchiveMessages from './ArchiveMessages'
import ConfirmModal from '@/app/components/modals/ConfirmModal'

type Props = {
  chatroomId: string | string[] 
  chatroom: ChatroomObject
}

const Chatroom = (props: Props) => {

  const { chatroomId, chatroom } = props
  const { socket } = useSocket()
  const { id: userId, isMaster } = useAuth()

  const [page, setPage] = useState(0)
  const [newMessages, setNewMessages] = useState<MessageObject[] | []>([])
  const messageRef = useRef<HTMLInputElement | null>(null)
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [allMessages, setAllMessages] = useState<MessageObject[]>([])
  const [isDeleteMessages, setIsDeleteMessages] = useState<boolean>(false)

  const handleIsDeleteMessages = () => setIsDeleteMessages(!isDeleteMessages)

  const {
    isFetching,
    isLoading,
    isError,
    refetch,
    data
  } = useGetAllMessagesQuery(page, {
  
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  }) 

  const sendMessage = () => {
    if (socket) {
      if (messageRef.current) {
        socket.emit("chatroomMessage", {
          chatroomId,
          message: messageRef.current.value, 
        })
        
        messageRef.current.value = ''

        if (sectionRef.current) sectionRef.current.scrollTop = sectionRef.current.scrollHeight + 10000
      } 
    }
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') sendMessage()
  }

  const updateMessages = (newData: {[key:string]:MessageObject} ) => {
    if(allMessages) {
      const clone: null | MessageObject[] = [...allMessages]
      newData && Object.values(newData).forEach(item => {
        clone.push(item)
      })
      setAllMessages(clone)
    }
  }

  useEffect(() => {
    if(sectionRef.current) 
      sectionRef.current.scrollTo(0, sectionRef.current.scrollHeight)
  }, [newMessages, sectionRef])


  useEffect(() => {
    refetch().then((data) => {
      updateMessages(data?.data?.entities)
    })
  }, [page])

  if(data) {
    if(!allMessages[0]) updateMessages(data.entities)
  }

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (message) => {
        const messages = [...newMessages, message]
        setNewMessages(messages)
      })
    }
    //eslint-disable-next-line
  }, [newMessages])

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", {
          chatroomId,
      })
    }

    if (sectionRef.current) 
      sectionRef.current.scrollTop = sectionRef.current.scrollHeight + 10000

    return () => {
      if (socket) {
        socket.emit("leaveRoom", {
          chatroomId,
        })
      }
    }
    //eslint-disable-next-line
  }, [])

  if(isLoading) return <Loading />

  return (
    <>
      <div className=' relative w-[80%] h-[70vh] py-8 px-6 flex flex-col bg-gray-100 mx-auto rounded-lg text-black '>
        <section 
          className='overflow-y-scroll max-h-[90%] bg-gray-200 px-2 pb-10'
          ref={sectionRef}
          onScroll={(e) => {
            if(e.currentTarget.scrollTop === 0) {
              setPage((prevPage) => prevPage + 1)
            }
          } }
        >
          <div className='flex items-center justify-between '>
            <div className='flex items-center gap-2 '>
              <div className='w-16 h-16 inline-block text-center p-2 rounded-full bg-green-600 text-white' />

              <div className="flex flex-col">
                <p className='font-bold text-xl'>{chatroom.name}</p>
                <p className='text-lg'>{chatroom.username}</p>
              </div>

            </div> 
          </div>
          
          <div className="w-full my-4 border-grayborder border-b-[1px] mb-6 " />
          
          <div className='p-8 flex flex-col justify-between max-h-full  '>
            <ArchiveMessages
              allMessages={allMessages}
              userId={userId}
              chatroomId={chatroomId}
            />

            {newMessages.map((message, i) => { 
              return (
                <div className={` ${userId === message.userId ? 'items-start' : 'items-end'} h-full flex flex-col gap-2 my-1 `}>
                  <div key={i} className={
                    `flex flex-col space-y-2 w-[30%] p-3 text-white
                      ${userId === message.userId ?
                        'bg-blue-900 rounded-tr-none rounded-xl'
                      :
                        'bg-red-900 rounded-tl-none rounded-xl'}`
                      }
                  >
                    <p className='text-xs text-gray-200'>{message.name}</p>
                    <p className='text-lg mx-2'>{message.message}</p>
                  </div>

                  <p className='text-xs text-gray-400'>{moment(message.createdAt).format('jYYYY/jM/jD - HH:mm:ss')}</p>
                </div>
              )
            })}

          </div>
        </section>

          <div className="absolute bottom-4 w-[50%] flex flex-col">
            <div className='relative items-end'>
              <input
                className='rounded-lg outline-none border-[1px] border-[#C1CFFF] bg-transparent p-4 h-14 w-full'
                type="text"
                name="message"
                placeholder="پیام خود را وارد کنید..."
                ref={messageRef}
                onKeyPress={handleKeyPress}
              />
          
              <div className="absolute top-2 left-2">
                <AiOutlineSend
                  className="h-10 w-10 p-2 text-white rounded-lg bg-[#0A2689] hover:bg-[#1f2c58]"
                  onClick={sendMessage}
                />
              </div>
              {isMaster && (allMessages![0] || newMessages[0]) &&
                <AiFillDelete
                  size={25} 
                  className='mt-3 cursor-pointer hover:text-red-700 transition-all'
                  onClick={handleIsDeleteMessages}
                />
              }
            </div>
          </div>
      </div>
      {
        isDeleteMessages && 
          <ConfirmModal 
            prop={chatroomId} 
            handleModal={handleIsDeleteMessages}
            type={'delete'}
            deleteType="allMessages"
          />
      }
    </>
  )
}

export default Chatroom