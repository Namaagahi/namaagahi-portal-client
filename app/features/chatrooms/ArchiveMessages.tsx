import { MessageObject } from '@/app/lib/interfaces'
import moment from 'jalali-moment'
import React, { useEffect, useState } from 'react'

type Props = {
    allMessages: MessageObject[]
    userId: string
    chatroomId: string | string[]
}

const ArchiveMessages = (props: Props) => {

    const { allMessages, userId, chatroomId } = props
    const archiveMessages = allMessages.filter(message => message.chatroom === chatroomId)

    return (
        <div className='flex flex-col-reverse' >
            {archiveMessages[0] && archiveMessages.map((message, i) => {
                return (
                <div className={` ${userId === message.user ? 'items-start' : 'items-end'} h-full flex flex-col gap-2 my-1 `}>
                    <div key={i} className={
                    `flex flex-col space-y-2 w-[30%] p-3 text-white
                        ${userId === message.user ?
                        'bg-blue-900 rounded-tr-none rounded-xl'
                        :
                        'bg-red-900 rounded-tl-none rounded-xl'}`
                        }
                    >
                    <p className='text-xs text-gray-200'>{message.username}</p>
                    <p className='text-lg mx-2'>{message.message}</p>
                    </div>
    
                    <p className='text-xs text-gray-800'>{moment(message.createdAt).format('jYYYY/jM/jD - HH:mm:ss')}</p>
                </div>
                )
            })}
        </div>
    )
    }

export default ArchiveMessages