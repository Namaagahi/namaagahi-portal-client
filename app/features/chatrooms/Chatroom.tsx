import { useSocket } from '@/app/config/state-config/SocketContext'
import useAuth from '@/app/hooks/useAuth'
import { MessageObject } from '@/app/lib/interfaces'
import React, { useEffect, useRef, useState } from 'react'

const Chatroom = ({ chatroomId }: { chatroomId: string | string[] }) => {

    const { socket } = useSocket()
    const { id: userId } = useAuth()
    const [messages, setMessages] = useState<MessageObject[] | []>([])
    const messageRef = useRef<HTMLInputElement | null>(null)

    const sendMessage = () => {
      if (socket) {
        if (messageRef.current) {
          socket.emit("chatroomMessage", {
            chatroomId,
            message: messageRef.current.value, 
          })
          
          messageRef.current.value = ''
        } 
      }
    }
  
    useEffect(() => {
      if (socket) {
        socket.on("newMessage", (message) => {
          const newMessages = [...messages, message]
          setMessages(newMessages)
        })
      }
      //eslint-disable-next-line
    }, [messages])
  
    useEffect(() => {
      if (socket) {
        console.log("JOOOOOIN!")
        socket.emit("joinRoom", {
            chatroomId,
        })
      }
  
      return () => {
        if (socket) {
          socket.emit("leaveRoom", {
            chatroomId,
          })
        }
      }
      //eslint-disable-next-line
    }, [])

    return (
        <div className="chatroomPage">
            <div className="chatroomSection">
            <div className="cardHeader">Chatroom Name</div>
            <div className="chatroomContent">
                {messages.map((message, i) => (
                <div key={i} className="message">
                    <span
                    className={
                        userId === message.userId ? "ownMessage" : "otherMessage"
                    }
                    >
                    {message.name}:
                    </span>{" "}
                    {message.message}
                </div>
                ))}
            </div>
            <div className="chatroomActions">
                <div>
                <input
                    type="text"
                    name="message"
                    placeholder="Say something!"
                    ref={messageRef}
                />
                </div>
                <div>
                <button className="join" onClick={sendMessage}>
                    Send
                </button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Chatroom