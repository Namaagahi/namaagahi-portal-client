"use client"
import { selectAllBoxes, useGetAllBoxesQuery } from "@/app/apiSlices/boxesApiSlice"
import StructuresComp from "@/app/features/structures/StructuresComp"
import usePageTitle from "@/app/hooks/usePageTitle"
import { BoxObject } from "@/app/lib/interfaces"
import { useSelector } from "react-redux"

const MyStructures = () => {
  usePageTitle('سازه های من')

  useGetAllBoxesQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  })

  const allBoxes: BoxObject[] = useSelector(state => selectAllBoxes(state) as BoxObject[])

  return <StructuresComp page={'my'} allBoxes={allBoxes} />
}

export default MyStructures