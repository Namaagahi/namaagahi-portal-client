"use client"
import { selectAllStructures, useGetStructuresQuery } from '@/app/apiSlices/structuresApiSlice'
import { BoxObject, StructureObject } from '@/app/lib/interfaces'
import PageTitle from '@/app/components/main/PageTitle'
import AllStructuresTable from './AllStructuresTable'
import Loading from '@/app/features/loading/Loading'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SearchContainer from '@/app/components/main/SearchContainer'
import Button from '@/app/components/main/Button'
import { useRouter } from 'next/navigation'
import ScrollContainer from '@/app/components/main/ScrollContainer'

type Props = {
  page: string
  allBoxes: BoxObject[]
}

const Structures = (props: Props) => {

    const {
      page,
      allBoxes
    } = props

    const { push } =useRouter()

    const { 
      isLoading,
      isError,
    } = useGetStructuresQuery(undefined, {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      pollingInterval: 5000
    })

    const allStructures: StructureObject[] = useSelector(state => selectAllStructures(state) as StructureObject[])

    const [data, setData] = useState<StructureObject[]>([])

    useEffect(() =>{
      setData(allStructures)
    }, [allStructures])

    const handleButtonClick = () => push('/dashboard/billboard/structures/createstructure')

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
      <div className="flex items-center justify-between gap-3">
        <SearchContainer />
        <Button
          onClickHandler={handleButtonClick}
          title="سازه جدید"
        />
      </div>
      <AllStructuresTable 
        data= {data}
        page={page}
        allBoxes={allBoxes}
        handleData={(val: StructureObject[]) => setData(val)}
      />
      <ScrollContainer />
    </>
  )
}

export default Structures