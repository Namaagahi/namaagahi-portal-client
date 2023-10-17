"use client"
import { useGetBoxByIdQuery, boxesApiSlice } from '@/app/apiSlices/boxesApiSlice'
import ScrollContainer from '@/app/components/main/ScrollContainer'
import EditBoxComp from '@/app/features/boxes/EditBoxComp'
import Loading from '@/app/features/loading/Loading'
import usePageTitle from '@/app/hooks/usePageTitle'
import { BoxObject } from '@/app/lib/interfaces'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const EditBox = () => { 
  usePageTitle('ویرایش باکس')

  const { id } = useParams()
  const [box, setBox] = useState<null | BoxObject>(null)
  const { data, isLoading, isFetching, refetch } = useGetBoxByIdQuery(id as string, {
    refetchOnMountOrArgChange: 5, 
    // refetchOnFocus: true
  })

const abc = window.localStorage.getItem('editBoxForm')
  useEffect(() => {
    if(data && typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.getItem('editBoxForm') ? 
        setBox({...JSON.parse(window.localStorage.getItem('editBoxForm') as string) , ...JSON.parse(JSON.stringify(data?.entities['id'] as BoxObject))}) 
        :
        setBox(JSON.parse(JSON.stringify(data?.entities['id'] as BoxObject)))
    }window
  }, [data, refetch])
  
  if(isLoading || isFetching || !box) return <Loading />
  return (
    <>
      <EditBoxComp box={box} key={box.version} />
      <ScrollContainer />
    </>
  )
}

export default EditBox  