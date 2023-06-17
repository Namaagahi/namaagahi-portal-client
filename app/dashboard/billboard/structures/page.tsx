"use client"
import { useGetStructuresQuery } from '@/app/features/structures/structuresApiSlice'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const PageTitle = dynamic(
  () => import('@/app/components/main/PageTitle'),
  { ssr: false }
)
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

  const structuresTableHeadings = ['کاربر', 'کد سامانه', 'منطقه', 'مسیر', 'نشانی', 'وضعیت', 'عملیات', 'تاریخ ایجاد', 'تاریخ به روزرسانی']

  if(isLoading) return <Loading/>
  if(isError) return (
    <div className='flex flex-col justify-center items-center min-h-screen gap-3'>
      <p className='text-xl'>هیچ سازه ای وجود ندارد</p>
      <p>برای ایجاد سازه جدید <Link href={'/dashboard/billboard/createstructure'}><span className='text-cyan-300'>کلیک کنید</span></Link></p>
    </div>
  )
  if(isSuccess) {
    // console.log("STRUCTURES",structures)
    const { ids, entities } = structures

    const structureTableContent = ids?.length && ids.map((structureId: string) => <Structure key={structureId} structureId={structureId} />)
  
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