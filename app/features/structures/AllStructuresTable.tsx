import { selectStructureById } from '@/app/apiSlices/structuresApiSlice'
import CreateUpdateModal from '@/app/components/modals/CreateUpdateModal'
import TableComponent from '@/app/components/table/TableComponent'
import { BoxObject, PlanObject, StructureObject } from '@/app/lib/interfaces'
import ConfirmModal from '@/app/components/modals/ConfirmModal'
import React, { useEffect, useMemo, useState } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import Status from '@/app/components/main/Status'
import { ColumnDef } from '@tanstack/react-table'
import { EntityId } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import useAuth from '@/app/hooks/useAuth'
import moment from 'jalali-moment'
import Link from 'next/link'

type Props = {
  data: StructureObject[]
  page: string
  allBoxes: BoxObject[]
  allPlans: PlanObject[]
  handleData: (val: StructureObject[]) => void
}

const AllStructuresTable = (props: Props) => {
    const {
        data,
        page,
        allBoxes, 
        allPlans,
        handleData,
    } = props
    
    const { isAdmin, isMediaManager, id } = useAuth()
    const [structureId, setStructureId] = useState<string | any | EntityId>('')
    const structure: StructureObject = useSelector(state => selectStructureById(state, structureId!) as StructureObject)
    const [isEditStructure, setIsEditStructure] = useState<boolean>(false)
    const [isDeleteStructure, setIsDeleteStructure] = useState<boolean>(false)
    const handleEditStructure = () => setIsEditStructure(!isEditStructure)
    const handleDeleteStructure = () => setIsDeleteStructure(!isDeleteStructure)

    useEffect(() =>{
      if(page === 'my') {
        const clone = data.filter((structure: StructureObject) => structure.userId === id)
        handleData(clone)
      }
    }, [data])

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
                  const isAvailable = info.getValue()
                  
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
                          status = {'در اجاره'}
                          bgColor = {'#d96f85'}
                          textColor = {'#2e030c'}
                      />     
                      )
                    }           
                },
                header: () => <span>وضعیت</span>,
                enableColumnFilter: false,
              },
              {
                accessorFn: row => row.isChosen,
                id: 'باکس',
                cell: info => {
                  const isChosen = info.getValue()
                  const structureBox: any = allBoxes.find((box: any) => box.boxId === info.row.original.parent)
                  return (
                    (isChosen) ?
                    <Link href={`/dashboard/billboard/boxes/${structureBox?.id}`}>
                      <Status
                        status = {structureBox ? structureBox?.name : "در باکس"}
                        bgColor = {'#00ff37'}
                        textColor = {'#0a541e'}
                      />
                    </Link>
                    :
                    <Status
                      status = {'بدون باکس'}
                      bgColor = {'#ff66b3'}
                      textColor = {'#2e030c'}
                    />  
                  ) 
                },
                header: () => <span>باکس</span>,
                enableColumnFilter: false,
              },
              {
                accessorFn: row => row.createdAt,
                id: 'تاریخ ایجاد',
                header: () => <span>تاریخ ایجاد</span>,
                cell: (info) => {
                  const createdAt = info.getValue()
                  return (
                    <p>{moment(createdAt).format('jYYYY/jM/jD')}</p>
                  )}
              },
              {
                accessorFn: row => row.updatedAt,
                id: 'تاریخ ویرایش',
                header: () => <span>تاریخ ویرایش</span>,
                cell: (info) => {
                  const updatedAt = info.getValue()
                  return (
                    <p>{moment(updatedAt).format('jYYYY/jM/jD')}</p>
                  )}
              },
              {
                id: 'عملیات',
                header: () => <span>عملیات</span>,
                cell: (info) => {
                  const row = info.row.original
                  return (
                    <div className="px-6 flex items-center justify-center gap-2" onClick={() => setStructureId(row.id)}>
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
    },[])

  return (
    <>
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

export default AllStructuresTable