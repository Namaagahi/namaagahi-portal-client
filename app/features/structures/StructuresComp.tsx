"use client"
import { selectAllStructures, useGetStructuresQuery, useUpdateStructureMutation } from '@/app/apiSlices/structuresApiSlice'
import { selectAllBoxes, useGetAllBoxesQuery } from '@/app/apiSlices/boxesApiSlice'
import { BoxObject, StructureObject } from '@/app/lib/interfaces'
import PageTitle from '@/app/components/main/PageTitle'
import AllStructuresTable from './AllStructuresTable'
import Loading from '@/app/features/loading/Loading'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

type Props = {
  page: string
  allBoxes: BoxObject[]
}

const Structures = (props: Props) => {

    const {
      page,
      allBoxes
    } = props

    const { 
      isLoading,
      isError,
    } = useGetStructuresQuery(undefined, {
      refetchOnFocus: false,
      refetchOnMountOrArgChange: false
    })

    const allStructures: StructureObject[] = useSelector(state => selectAllStructures(state) as StructureObject[])

    const [data, setData] = useState<StructureObject[]>([])
    
    const [updateStructure] = useUpdateStructureMutation()

  useGetStructuresQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })

  // useEffect(()=>{ 
  //       allStructures.forEach(async(structure: StructureObject) => {
  //         if(structure.isChosen || structure.parent.length) {
  //           await updateStructure({
  //             id: structure.id,
  //             userId: structure.userId,
  //             name: structure.name,
  //             location: structure.location,
  //             isAvailable: structure.isAvailable,
  //             isChosen: false,
  //             parent: ''
  //           })
  //         }
  //       })
  // }, [])
  
    useEffect(() =>{
      setData(allStructures)
    }, [allStructures])

  console.log("ALLBOXES", allBoxes)

  
  if(isLoading || !allStructures[0]) return <Loading />
  
  if(isError) return (
  
    <div className='flex flex-col justify-center items-center min-h-screen gap-3'>
      <p className='text-xl'>
        هیچ سازه ای وجود ندارد
      </p>
    </div>
  )
  return (
    <>
      <PageTitle name={'سازه ها'} /> 

      <AllStructuresTable 
        data= {data}
        page={page}
        allBoxes={allBoxes}
        handleData={(val: StructureObject[]) => setData(val)}
      />
    </>
  )
}

export default Structures