"use client"
import { selectAllStructures, selectStructureById, useGetStructuresQuery, useUpdateStructureMutation } from '@/app/apiSlices/structuresApiSlice'
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
import AllStructuresTable from './AllStructuresTable'

const Structures = (props: any) => {

    const { page } = props

    const { 
      isLoading,
      isError,
    } = useGetStructuresQuery(undefined, {
      refetchOnFocus: false,
      refetchOnMountOrArgChange: false
    })

    const allStructures: StructureObject[] | any = useSelector(state => selectAllStructures(state))

    const [data, setData] = useState<StructureObject[] | unknown>([])
    
    const [updateStructure, { isError:iserror, error: Error }] = useUpdateStructureMutation()

  useGetStructuresQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })

    useEffect(()=>{ 
      allStructures.forEach(async(structure: StructureObject) => {
        if(structure.isChosen || structure.parent.length) {
          await updateStructure({
            id: structure.id,
            userId: structure.userId,
            name: structure.name,
            location: structure.location,
            isAvailable: structure.isAvailable,
            isChosen: false,
            parent: ''
          })
        }
      })
    }, [])
  
    useEffect(() =>{
      setData(allStructures)
    }, [allStructures])
  
  if(isLoading || !allStructures[0]) return <Loading />
  
  if(isError) return (
  
    <div className='flex flex-col justify-center items-center min-h-screen gap-3'>
      <p className='text-xl'>هیچ سازه ای وجود ندارد</p>
    </div>
  )
  return (
    <>
      <PageTitle name={'سازه ها'} /> 
      <AllStructuresTable 
        data= {data}
        page={page}
      />

    </>
  )
}

export default Structures