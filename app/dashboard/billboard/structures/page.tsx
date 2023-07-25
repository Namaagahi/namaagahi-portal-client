"use client"
import { selectAllStructures, selectStructureById, useGetStructuresQuery } from '@/app/features/structures/structuresApiSlice'
import CreateUpdateModal from '@/app/components/modals/CreateUpdateModal'
import TableComponent from '@/app/components/table/TableComponent'
import ConfirmModal from '@/app/components/modals/ConfirmModal'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import Loading from '@/app/features/loading/Loading'
import { useEffect, useMemo, useState } from 'react'
import { StructureObject } from '@/app/lib/interfaces'
import { ColumnDef } from '@tanstack/react-table'
import Status from '@/app/components/main/Status'
import Button from '@/app/components/main/Button'
import { EntityId } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import useAuth from '@/app/hooks/useAuth'
import PageTitle from '@/app/components/main/PageTitle'
import moment from 'jalali-moment'
import Link from 'next/link'
import { selectAllBoxes, useGetAllBoxesQuery } from '@/app/features/boxes/boxesApiSlice'

const Structures = () => {

  const { isAdmin } = useAuth()

  const { 
    isLoading,
    isSuccess, 
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
  const [structureBox, setStructureBox] = useState<StructureObject | undefined>()
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
  
  useEffect(() =>{
    setStructureBox(allBoxes.find((box: any) => box.boxId === structure?.parent))
  }, [structureId])
  
  console.log("structureId", structureId)

  const columns = useMemo<ColumnDef<StructureObject, any>[]>(() => {
    return(
      [
        {
          header: 'جدول سازه ها',
          footer: props => props.column.id,
          columns: [
            {
              accessorKey: 'username',
              accessorFn: row => row.username,
              id: 'username',
              cell: info => info.getValue(),
              header: () => <span>کاربر ایجاد کننده</span>,
              footer: props => props.column.id,
            },
            {
              accessorFn: row => row.name,
              id: 'name',
              cell: info => info.getValue(),
              header: () => <span>کد سامانه</span>,
              footer: props => props.column.id,
            },
            {
              accessorFn: row => row.location.district,
              id: 'district',
              cell: info => info.getValue(),
              header: () => <span>منطقه</span>,
              footer: props => props.column.id,
            },
            {
              accessorFn: row => row.location.path,
              id: 'path',
              cell: info => info.getValue(),
              header: () => <span>مسیر</span>,
              footer: props => props.column.id,
            },
            {
              accessorFn: row => row.location.address,
              id: 'address',
              cell: info => info.getValue(),
              header: () => <span>نشانی</span>,
              footer: props => props.column.id,
            },
            {
              accessorFn: row => row.isAvailable,
              id: 'isAvailable',
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
              footer: props => props.column.id,
            },
            {
              accessorFn: row => row.isChosen,
              id: 'isChosen',
              cell: info => {
                const isChosen = info.getValue();
                // const structureBox: any = allBoxes.find((box: any) => box.boxId === structure?.parent)
                return (
                  isChosen?
                  <Link href={`/dashboard/billboard/boxes/${structureBox && structureBox.id}`}  target="_blank">
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
              footer: props => props.column.id,
            },
            {
              id: 'createdAt',
              header: () => <span>تاریخ ایجاد</span>,
              footer: props => props.column.id,
              cell: (info) => {
                const createdAt = info.getValue()
                return (
                  <td className="px-6 py-4">{moment(createdAt).format('jYYYY/jM/jD')}</td>
                )}
            },
            {
              id: 'updatedAt',
              header: () => <span>تاریخ ویرایش</span>,
              footer: props => props.column.id,
              cell: (info) => {
                const updatedAt = info.getValue()
                return (
                  <td className="px-6 py-4">{moment(updatedAt).format('jYYYY/jM/jD')}</td>
                )}
            },
            {
              id: 'actions',
              header: () => <span>عملیات</span>,
              footer: props => props.column.id,
              cell: (info) => {
                const row = info.row.original;
                return (
                  <>
                  {isAdmin?
                    <td className="px-6 py-4 flex items-center gap-5" onClick={() => setStructureId(row.id)}>
                      <div className="flex items-center p-1 border-[1px] border-[#737373] rounded-md cursor-pointer">
                        <AiFillEdit
                          className="text-black dark:text-white hover:scale-125 transition-all"
                          size={20}
                          onClick={handleEditStructure}
                        />
                      </div>
                      <div className="flex justify-center items-center p-1 border-[1px] border-[#737373] rounded-md cursor-pointer">
                        <AiFillDelete
                          className="text-orange-600 dark:text-white hover:scale-125 transition-all"
                          size={20}
                          onClick={handleDeleteStructure}
                        />
                      </div>
                    </td>
                    :
                    <>
                      <td>دسترسی محدود شده</td>
                      <td>دسترسی محدود شده</td>
                    </>
                }
                  </>
                )}
            },
          ],
        }
      ]
    )
  },
  []
)

if(isLoading) return <Loading />

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