"use client"
import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { io, Socket } from 'socket.io-client'

interface SocketContextType {
  socket: Socket | null;
  setupSocket: () => void
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

interface SocketProviderProps {
  children: React.ReactNode
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {

    const [socket, setSocket] = useState<Socket | null>(null)

    const token = typeof window !== 'undefined' && window.localStorage && window.localStorage.getItem("CC_Token")
    const setupSocket = () => {
        if (typeof window !== 'undefined' && window.localStorage) {
          if (token) {
            const newSocket = io(process.env.SERVER!, {
              query: {
                token,
              },
            })
      
            newSocket.on("disconnect", () => {
              setSocket(null);
              setTimeout(setupSocket, 3000)
              // toast.warn("سوکت قطع شد")
            })
      
            newSocket.on("connect", () => {
              // toast.info("سوکت وصل شد")
            })
      
            setSocket(newSocket)
          }
        }
    }

    useEffect(() => {
        setupSocket()
        //eslint-disable-next-line
    }, [token])

    return (
        <SocketContext.Provider value={{ socket, setupSocket }}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) throw new Error('useSocket must be used within a SocketProvider')
  return context
}