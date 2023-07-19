"use client"
import { selectAllStructures, useGetStructuresQuery, useUpdateStructureMutation } from '@/app/features/structures/structuresApiSlice'
import { structuresTableHeadings } from '@/app/lib/constants'
import PageTitle from '@/app/components/main/PageTitle'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import useAuth from '@/app/hooks/useAuth'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { selectAllBoxes, useGetAllBoxesQuery } from '@/app/features/boxes/boxesApiSlice'
const Table = dynamic(
  () => import('@/app/components/main/Table'),
  { ssr: false }
)
const Loading = dynamic(
  () => import('@/app/features/loading/Loading'),
  { ssr: false }
)
const Structure = dynamic(
  () => import('@/app/features/structures/Structure'),
  { ssr: false }
)

const Structures = () => {

  const { isAdmin, id } = useAuth()

  const { 
    data: structures,
    isLoading,
    isSuccess, 
    isError,
  } = useGetStructuresQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })

  const {
    data: boxes
} = useGetAllBoxesQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
})

  const [updateStructure] = useUpdateStructureMutation()

  const allStructures = useSelector(state => selectAllStructures(state))
  const allBoxes = useSelector(state => selectAllBoxes(state))

  // console.log(findChosenStructures())

  // useEffect(() => {
  //   const n1008 = allStructures.find((structure: any) => structure.name === "N1434")
  //   const update = async() => {
  //     await updateStructure({
  //       userId: n1008?.userId,
  //       id: n1008?.id,
  //       name: n1008?.name,
  //       location: n1008?.location,
  //       isChosen: false,
  //       isAvailable: true,
  //       parent: ''
  //     })
  //   }
  //   update()
  // },[])
  // useEffect(() => {
  //   allStructures.forEach(async(structure: any) => {
  //     await updateStructure({
  //       userId: structure?.userId,
  //       id: structure?.id,
  //       name: structure?.name,
  //       location: structure?.location,
  //       isChosen: false,
  //       isAvailable: true,
  //       parent:''
  //     })
  //   })
  // },[])

  useEffect(() => {
    const abc = async() => {
      const date = new Date()
      allStructures.forEach(async(structure: any) => {
      if(!structure.isChosen) return 
      const thisBox: any = allBoxes.find((box: any) => box.boxId === structure.parent)
      // console.log(thisBox)
        // if(thisBox.duration.endDate <  moment(date.getTime(), 'jYYYY-jMM-jDD'))
        // await updateStructure({
        //   userId: structure?.userId,
        //   id: structure?.id,
        //   name: structure?.name,
        //   location: structure?.location,
        //   isChosen: false, 
        //   isAvailable: true,
        //   parent: ''
        // })
    })
    }
    abc()
  }, [])

  console.log("STRS",allStructures)
  // console.log("BXS", allBoxes)

  if(isLoading) return <Loading/>

  if(isError) return (
    
    <div className='flex flex-col justify-center items-center min-h-screen gap-3'>
      <p className='text-xl'>هیچ سازه ای وجود ندارد</p>
      <p>برای ایجاد سازه جدید <Link href={'/dashboard/billboard/createstructure'}><span className='text-cyan-300'>کلیک کنید</span></Link></p>
    </div>
  )

  if(isSuccess) {

    const { ids } = structures
    

    let structureTableContent

      structureTableContent = ids?.length && ids.map((structureId: string) => <Structure page={'all'} key={structureId} structureId={structureId} />) 
    
    return (
      <main className="min-h-screen"> 
        <PageTitle name={'سازه ها'} />
        <Table
          tableContent = {structureTableContent}
          tableHeadings = {structuresTableHeadings}
        />
      </main>
    )
  }
}

export default Structures