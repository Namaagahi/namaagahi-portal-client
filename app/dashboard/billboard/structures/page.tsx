"use client"
import { selectAllStructures, useGetStructuresQuery } from '@/app/features/structures/structuresApiSlice'
import { structuresTableHeadings } from '@/app/lib/constants'
import PageTitle from '@/app/components/main/PageTitle'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import useAuth from '@/app/hooks/useAuth'
import { useSelector } from 'react-redux'
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
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  const allStructures = useSelector(state => selectAllStructures(state))

  if(isLoading) return <Loading/>

  if(isError) return (
    
    <div className='flex flex-col justify-center items-center min-h-screen gap-3'>
      <p className='text-xl'>هیچ سازه ای وجود ندارد</p>
      <p>برای ایجاد سازه جدید <Link href={'/dashboard/billboard/createstructure'}><span className='text-cyan-300'>کلیک کنید</span></Link></p>
    </div>
  )

  if(isSuccess) {

    const { ids, entities } = structures
    
    const thisUserStructures = allStructures.filter(structure => structure.userId === id)
    console.log(thisUserStructures)

    let structureTableContent

    isAdmin ?
      structureTableContent = ids?.length && ids.map((structureId: string) => <Structure key={structureId} structureId={structureId} />) 
      :
      structureTableContent = thisUserStructures.length && thisUserStructures.map((structure => <Structure key={structure.id} structureId={structure.id} />))
    
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