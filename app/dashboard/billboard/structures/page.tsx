"use client"
import { selectAllBoxes, useGetAllBoxesQuery } from '@/app/apiSlices/boxesApiSlice'
import StructuresComp from '@/app/features/structures/StructuresComp'
import usePageTitle from '@/app/hooks/usePageTitle'
import { BoxObject } from '@/app/lib/interfaces'
import { useSelector } from 'react-redux'

const Structures = () => {
  usePageTitle('سازه ها')
  
  useGetAllBoxesQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  })

  const allBoxes: BoxObject[] = useSelector(state => selectAllBoxes(state) as BoxObject[])

  return <StructuresComp page={'all'} allBoxes={allBoxes} />
}

export default Structures