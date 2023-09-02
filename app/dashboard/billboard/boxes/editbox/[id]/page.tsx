"use client"
import { useGetBoxByIdQuery, useUpdateBoxMutation } from '@/app/apiSlices/boxesApiSlice'
import ScrollContainer from '@/app/components/main/ScrollContainer'
import EditBoxComp from '@/app/features/boxes/EditBoxComp'
import Loading from '@/app/features/loading/Loading'
import { BoxObject } from '@/app/lib/interfaces'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const EditBox = () => { 

  const { id } = useParams()
  const [box, setBox] = useState<unknown | null | BoxObject | any>(null)

  const { data, isLoading, isFetching } = useGetBoxByIdQuery(id, {
// pollingInterval: 5000
  })

  useEffect(() => {
    if(data)
      setBox(data?.entities[id])
  }, [data])

  if(isLoading || isFetching || !box) return <Loading />
  return (
    <>
      <EditBoxComp box={box} />
      <ScrollContainer />
    </>
  )
}

export default EditBox 