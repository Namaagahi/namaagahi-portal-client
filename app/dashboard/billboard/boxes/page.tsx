"use client"
import { useGetAllBoxesQuery } from '@/app/features/boxes/boxesApiSlice'
import useAuth from '@/app/hooks/useAuth'
import dynamic from 'next/dynamic'
const PageTitle = dynamic(
  () => import('@/app/components/main/PageTitle'),
  { ssr: false }
)
const BoxCard = dynamic(
  () => import('@/app/features/boxes/BoxCard'),
  { ssr: false }
)
const Loading = dynamic(
  () => import('@/app/features/loading/Loading'),
  { ssr: false }
)

const Boxes = () => {

  const { username, isAdmin, isMediaManager } = useAuth()

  const {
    data: boxes,
    isLoading,
    isSuccess, 
    isError,
  } = useGetAllBoxesQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })
  

  if(isLoading) return <Loading/>
  if(isError) return (
    <div className='flex flex-col justify-center items-center min-h-screen gap-3'>
      <p className='text-xl'>هیچ باکسی ای وجود ندارد</p>
    </div>
  )

  if(isSuccess){
    console.log("BOXES", boxes)
    const { ids, entities } = boxes

    const boxCardsContent = ids?.length && ids.map((boxId: string) => <BoxCard key={boxId} boxId={boxId} />)

    return (
      <main className="min-h-screen">
        <PageTitle name={'باکس ها'} />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {boxCardsContent}
          {/* <BoxCard boxType='buyLong'/>
          <BoxCard boxType='buyShort'/>
          <BoxCard boxType='owner'/>
          <BoxCard boxType='owner'/>
          <BoxCard boxType='buyShort'/>
          <BoxCard boxType='owner'/> */}
        </div>
      </main>
    )
  }
} 

export default Boxes