"use client"
import { useGetAllBoxesQuery } from '@/app/features/boxes/boxesApiSlice'
import dynamic from 'next/dynamic'
import Link from 'next/link'
const PageTitle = dynamic(
  () => import('@/app/components/main/PageTitle'),
  { ssr: false }
)
const BoxItem = dynamic(
  () => import('@/app/features/boxes/BoxItem'),
  { ssr: false }
)
const Loading = dynamic(
  () => import('@/app/features/loading/Loading'),
  { ssr: false }
)

const Boxes = () => {

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
      <p className='text-xl'>هیچ باکسی وجود ندارد</p>
      <p>برای ایجاد باکس جدید 
        <Link href={'/dashboard/billboard/createbox'}>
          <span className='text-cyan-300'>کلیک کنید</span>
        </Link>
      </p>
    </div>
  )

  if(isSuccess){

    const { ids } = boxes

    const boxItemsContent = ids?.length && ids.map((boxId: string, index: number) => <BoxItem key={boxId} boxId={boxId} index={index} />)
    
    return (
      <main className="min-h-screen">
        <PageTitle name={'باکس ها'} />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {boxItemsContent}
        </div>
      </main>
    )
  }
} 

export default Boxes