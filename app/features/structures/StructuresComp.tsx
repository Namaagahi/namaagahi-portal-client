"use client"
import { selectAllStructures, selectStructureById, useGetStructuresQuery } from '@/app/apiSlices/structuresApiSlice'
import CreateUpdateModal from '@/app/components/modals/CreateUpdateModal'
import TableComponent from '@/app/components/table/TableComponent'
import ConfirmModal from '@/app/components/modals/ConfirmModal'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import Loading from '@/app/features/loading/Loading'
import { useEffect, useMemo, useState } from 'react'
import { StructureObject } from '@/app/lib/interfaces'
import { ColumnDef } from '@tanstack/react-table'
import Status from '@/app/components/main/Status'
import { EntityId } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import useAuth from '@/app/hooks/useAuth'
import PageTitle from '@/app/components/main/PageTitle'
import moment from 'jalali-moment'
import Link from 'next/link'
import { selectAllBoxes, useGetAllBoxesQuery } from '@/app/apiSlices/boxesApiSlice'

const Structures = (props: any) => {

    const { page } = props

    const { isAdmin, isMediaManager } = useAuth()

    const { 
      isLoading,
      isError,
    } = useGetStructuresQuery(undefined, {
      refetchOnFocus: false,
      refetchOnMountOrArgChange: false
    })
  
    useGetAllBoxesQuery(undefined, {
      refetchOnFocus: false,
      refetchOnMountOrArgChange: false,
    })
  
    const [structureId, setStructureId] = useState<string | any | EntityId>('')
    const allStructures: StructureObject[] | unknown = useSelector(state => selectAllStructures(state))
    const structure: StructureObject | any = useSelector(state => selectStructureById(state, structureId!))
    const allBoxes: any = useSelector(state => selectAllBoxes(state))
    const [isEditStructure, setIsEditStructure] = useState(false)
    const [isDeleteStructure, setIsDeleteStructure] = useState(false)
    const handleEditStructure = () => setIsEditStructure(!isEditStructure)
    const handleDeleteStructure = () => setIsDeleteStructure(!isDeleteStructure)
    const [data, setData] = useState<StructureObject[] | unknown>([])
  
    useEffect(() =>{
      setData(allStructures)
    }, [allStructures])
  
    const columns = useMemo<ColumnDef<StructureObject, any>[]>(() => {
      return(
        [
          {
            header: 'جدول سازه ها',
            columns: [
              {
                accessorKey: "_id",
                accessorFn: row => row.id,
                id: '_id',
                cell: info => null,
                header: () => null,
              },
              {
                accessorKey: "parent",
                accessorFn: row => row.parent,
                id: 'parent',
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
                id: 'کد سامانه',
                cell: info => info.getValue(),
                header: () => <span>کد سامانه</span>,
              },
              {
                accessorFn: row => row.location.district,
                id: 'منطقه',
                cell: info => info.getValue(),
                header: () => <span>منطقه</span>,
              },
              {
                accessorFn: row => row.location.path,
                id: 'مسیر',
                cell: info => info.getValue(),
                header: () => <span>مسیر</span>,
              },
              {
                accessorFn: row => row.location.address,
                id: 'آدرس',
                cell: info => info.getValue(),
                header: () => <span>نشانی</span>,
              },
              {
                accessorFn: row => row.isAvailable,
                id: 'وضعیت',
                cell: info => {
                  const isAvailable = info.getValue();
                  if(isAdmin) {
                    if(isAvailable) {
                      return (
                      <Status 
                        status = {'خالی '} 
                        bgColor = {'#a8edbb'}
                        textColor = {'#0a541e'}
                      />
                      )
                    } else {
                      return (
                        <Status
                          status = {'پر'}
                          bgColor = {'#d96f85'}
                          textColor = {'#2e030c'}
                      />     
                      )
                    }
                  } else {
                    return <p>دسترسی محدود شده</p>
                  }
                 
                },
                header: () => <span>وضعیت</span>,
              },
              {
                accessorFn: row => row.isChosen,
                id: 'باکس',
                cell: info => {
                  const isChosen = info.getValue();
                  const structureBox: any = allBoxes.find((box: any) => box.boxId === info.row.original.parent)
                  // console.log("structureBox", structureBox)
                  return (
                    (isChosen) ?
                    <Link href={`/dashboard/billboard/boxes/${structureBox?.id}`}  target="_blank">
                      <Status
                        status = {structureBox ? structureBox?.name : "در باکس"}
                        bgColor = {'#00ff37'}
                        textColor = {'#0a541e'}
                      />
                    </Link>
                    :
                    <Status
                      status = {'خارج'}
                      bgColor = {'#ff66b3'}
                      textColor = {'#2e030c'}
                    />  
                  ) 
                },
                header: () => <span>باکس</span>,
              },
              {
                id: 'تاریخ ایجاد',
                header: () => <span>تاریخ ایجاد</span>,
                cell: (info) => {
                  const createdAt = info.getValue()
                  return (
                    <td className="px-6">{moment(createdAt).format('jYYYY/jM/jD')}</td>
                  )}
              },
              {
                id: 'تاریخ ویرایش',
                header: () => <span>تاریخ ویرایش</span>,
                cell: (info) => {
                  const updatedAt = info.getValue()
                  return (
                    <td className="px-6">{moment(updatedAt).format('jYYYY/jM/jD')}</td>
                  )}
              },
              {
                id: 'عملیات',
                header: () => <span>عملیات</span>,
                cell: (info) => {
                  const row = info.row.original;
                  return (
                    <div className="px-6 flex items-center gap-2" onClick={() => setStructureId(row.id)}>
                        {(isMediaManager || isAdmin) && page === 'all' ?
                        <>
                            <AiFillEdit 
                                className="text-black dark:text-white hover:scale-125 transition-all p-1 border-[1px] border-[#737373] rounded-md cursor-pointer" size={20}
                                onClick={handleEditStructure}
                            />
                        
                            <AiFillDelete 
                                className="text-orange-600 dark:text-white hover:scale-125 transition-all p-1 border-[1px] border-[#737373] rounded-md cursor-pointer" size={20}
                                onClick={handleDeleteStructure}    
                            />
                        </>
                        : page === 'all' &&
                        <p>دسترسی محدود</p>
                        }
                        {page === 'my' &&
                        <>
                            <AiFillEdit 
                                className="text-black dark:text-white hover:scale-125 transition-all p-1 border-[1px] border-[#737373] rounded-md" size={20}
                                onClick={handleEditStructure}
                            />
                        
                            <AiFillDelete 
                                className="text-orange-600 dark:text-white hover:scale-125 transition-all p-1 border-[1px] border-[#737373] rounded-md" size={20}
                                onClick={handleDeleteStructure}    
                            />
                        </>
                        }
                    </div>
                  )}
              },
            ],
          }
        ]
      )
    },
    []
  )
  
  if(isLoading || !allBoxes) return <Loading />
  
  if(isError) return (
  
    <div className='flex flex-col justify-center items-center min-h-screen gap-3'>
      <p className='text-xl'>هیچ سازه ای وجود ندارد</p>
    </div>
  )
  return (
    <>
      <PageTitle name={'سازه ها'} /> 
      <TableComponent 
        columns={columns}
        data={data}
      />
      {
        isDeleteStructure && 
        <ConfirmModal 
          prop={structure} 
          handleModal={handleDeleteStructure}
          type={'delete'} 
          deleteType="structure"
        /> 
      }
      {
        isEditStructure &&  
        <CreateUpdateModal 
          prop={structure}
          handleModal={handleEditStructure}
          type={'editStructure'}
        />
      }
    </>
  )
}

export default Structures