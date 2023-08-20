"use client"
import { selectBoxById, useGetAllBoxesQuery } from '@/app/apiSlices/boxesApiSlice'
import EditBoxComp from '@/app/features/boxes/EditBoxComp'
import Loading from '@/app/features/loading/Loading'
import { BoxObject } from '@/app/lib/interfaces'
import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'

const EditBox = () => { 

  const { id } = useParams()
    
  const { isLoading }=useGetAllBoxesQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })

  const box: BoxObject = useSelector(state => selectBoxById(state as BoxObject , id) as BoxObject)

  if(isLoading || !box) return <Loading />
  return <EditBoxComp box={box} />
}

export default EditBox 