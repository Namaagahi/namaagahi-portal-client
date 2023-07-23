"use client"
import { selectAllPlans, useGetAllPlansQuery } from '@/app/features/plans/plansApiSlice'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import Plan from '@/app/features/plans/Plan'
import { plansTableHeadings } from '@/app/lib/constants'
const PageTitle = dynamic(
  () => import('@/app/components/main/PageTitle'),
  { ssr: false }
)
const Loading = dynamic(
    () => import('@/app/features/loading/Loading'),
    { ssr: false }
)
const Table = dynamic(
  () => import('@/app/components/main/Table'),
  { ssr: false }
)

const Plans = () => {

    const {
        data: plans,
        isLoading,
        isError,
        isSuccess
    } = useGetAllPlansQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
    })

    if(isLoading) return <Loading />
    console.log(plans)
    if(isError) return (

        <div className='flex flex-col justify-center items-center min-h-screen gap-3'>
          <p className='text-xl'>هیچ پلنی وجود ندارد</p>
          <p>برای ایجاد پلن جدید 
            <Link href={'/dashboard/billboard/createplan'}>
              <span className='text-cyan-300'>کلیک کنید</span>
            </Link>
          </p>
        </div>
      )

  if(isSuccess){

    const { ids } = plans

    const planItemContent = ids?.length && ids.map((planId: string, index: number) => <Plan page={"all"} key={planId} planId={planId} index={index} />)

    return (
      <main className="min-h-screen w-full">
        <PageTitle name={'پلن ها'} />
        <Table 
          tableContent = {planItemContent}
          tableHeadings = {plansTableHeadings}
        />
      </main>
    )
  }
}

export default Plans
