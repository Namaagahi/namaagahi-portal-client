"use client"
import { selectAllStructures, useGetStructuresQuery, useUpdateStructureMutation } from '@/app/apiSlices/structuresApiSlice'
import Loading from '@/app/features/loading/Loading'
import { useEffect, useState } from 'react'
import { StructureObject } from '@/app/lib/interfaces'
import { useSelector } from 'react-redux'
import PageTitle from '@/app/components/main/PageTitle'
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

    useGetAllBoxesQuery(undefined, {
      refetchOnFocus: false,
      refetchOnMountOrArgChange: false,
    })

    const allStructures: StructureObject[] | any = useSelector(state => selectAllStructures(state))
    const allBoxes: any = useSelector(state => selectAllBoxes(state))
    const [data, setData] = useState<StructureObject[] | unknown>([])
    
    const [updateStructure, { isError:iserror, error: Error }] = useUpdateStructureMutation()

  useGetStructuresQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })

    useEffect(()=>{ 
      if(!allBoxes[0]) {
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
      }
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
        allBoxes={allBoxes}
      />

    </>
  )
}

export default Structures