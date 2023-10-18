"use client"
import { selectAllChatrooms, selectChatroomById, useGetAllChatroomsQuery } from "@/app/apiSlices/chatroomsApiSlice"
import Button from "@/app/components/main/Button"
import PageTitle from "@/app/components/main/PageTitle"
import SearchContainer from "@/app/components/main/SearchContainer"
import Status from "@/app/components/main/Status"
import ConfirmModal from "@/app/components/modals/ConfirmModal"
import CreateUpdateModal from "@/app/components/modals/CreateUpdateModal"
import TableComponent from "@/app/components/table/TableComponent"
import { useSocket } from "@/app/config/state-config/SocketContext"
import useAuth from "@/app/hooks/useAuth"
import usePageTitle from "@/app/hooks/usePageTitle"
import { ChatroomObject } from "@/app/lib/interfaces"
import { EntityId } from "@reduxjs/toolkit"
import { ColumnDef } from "@tanstack/react-table"
import moment from "jalali-moment"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { AiFillDelete } from "react-icons/ai"
import { useSelector } from "react-redux"

const Chatrooms = () => {
  usePageTitle('چت روم ها')

  const { isAdmin, isMaster, isProjectManager } = useAuth()
  const { socket, setupSocket } = useSocket()

  useEffect(() => {
    setupSocket()
  }, [])
  
  const {
    isLoading,
    isError,
  } = useGetAllChatroomsQuery(undefined, { 
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  }) 

  const allChatrooms: ChatroomObject[] = useSelector(state => selectAllChatrooms(state) as ChatroomObject[])
  const [isNewChatroom, setIsNewChatroom] = useState<boolean>(false)
  const [isDeleteChatroom, setIsDeleteChatroom] = useState<boolean>(false)
  const [data, setData] = useState<ChatroomObject[] | unknown>([])
  const [chatroomId, setChatroomId] = useState<string | any | EntityId>('')
  const chatroom: ChatroomObject  = useSelector(state => selectChatroomById(state, chatroomId) as ChatroomObject)

  const handleNewChatroomModal = () => setIsNewChatroom(!isNewChatroom)
  const handleDeleteChatroom = () => setIsDeleteChatroom(!isDeleteChatroom)

  useEffect(() => {
    setData(allChatrooms)
  }, [allChatrooms])

  const columns = useMemo<ColumnDef<ChatroomObject, any>[]>(() => {
    return(
      [
        {
          header: 'جدول چت روم ها',
          columns: [
            {
              accessorKey: "_id",
              accessorFn: row => row.id,
              id: '_id',
              cell: info => null,
              header: () => null,
            },
            {
              accessorKey: 'username',
              accessorFn: row => row.username,
              id: 'کاربر ایجاد کننده',
              cell: info => info.getValue(),
              header: () => <span>کاربر ایجاد کننده</span>,
            },
            {
              accessorFn: row => row.name,
              id: 'نام',
              cell: info => info.getValue(),
              header: () => <span>نام</span>,
            },
            {
              id: 'عملیات',
              header: () => <span>عملیات</span>,
              cell: (info) => {
                const row = info.row.original
                return (
                  <>
                  {(isMaster || isAdmin || isProjectManager)?
                    <p className="px-6 flex items-center justify-center gap-5" onClick={() => setChatroomId(row.id)}>
                      <div className="flex items-center p-1 border-[1px] border-[#737373] rounded-md cursor-pointer">
                        <AiFillDelete
                          className="text-black dark:text-white hover:scale-125 transition-all"
                          size={20}
                          onClick={handleDeleteChatroom}
                        />
                      </div>
                    </p>
                    :
                    <>
                      <p>دسترسی محدود شده</p>
                    </>
                }
                  </>
                )}
            },
            {
                id: 'مشاهده',
                header: () => <span>مشاهده چت روم</span>,
                cell: ({row}) => {
                  return (
                    <Link href={`/dashboard/chatrooms/${row.original.id}`}>
                        <p className=" cursor-pointer transition-all">
                            <Status
                                status = {'ورود '}
                                bgColor = {'#D0BFFF'}
                                textColor = {'#0a541e'}
                            />
                        </p>
                    </Link>
                  )}
              },
            {
              id: 'تاریخ ایجاد',
              header: () => <span>تاریخ ایجاد</span>,
              cell: (info) => {
                const createdAt = info.getValue()
                return (
                    <p>{moment(createdAt).format('jYYYY/jM/jD')}</p>
                )}
            },
            {
              id: 'تاریخ ویرایش',
              header: () => <span>تاریخ ویرایش</span>,
              cell: (info) => {
                const updatedAt = info.getValue()
                return (
                    <p>{moment(updatedAt).format('jYYYY/jM/jD')}</p>
                )}
            },
          ],
        }
      ]
    )
  },
  []
  )
  return (
    <>
        <PageTitle name={'چت روم ها'} />

        <div className="flex items-center justify-between gap-3">
            <SearchContainer />

            {(isAdmin || isMaster) &&
                <Button 
                    onClickHandler={handleNewChatroomModal}
                    title="چت روم جدید"
                />
            }
        </div>

        <TableComponent 
            columns={columns}
            data={data}
        />

        {
            isNewChatroom && 
            <CreateUpdateModal
                type={'newChatroom'}
                handleModal={handleNewChatroomModal}
            />
        }

        {
            isDeleteChatroom && 
            <ConfirmModal 
                prop={chatroom} 
                handleModal={handleDeleteChatroom}
                type={'delete'}
                deleteType="chatroom"
            />
      }
    </>
  ) 
}

export default Chatrooms