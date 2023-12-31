"use client"
import { useGetAllBoxesQuery } from '@/app/apiSlices/boxesApiSlice'
import Button from '@/app/components/main/Button'
import PageTitle from '@/app/components/main/PageTitle'
import SearchContainer from '@/app/components/main/SearchContainer'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const BoxItem = dynamic(
  () => import('@/app/features/boxes/BoxItem'),
  { ssr: false }
)
const Loading = dynamic(
  () => import('@/app/features/loading/Loading'),
  { ssr: false }
)

type Props = {
    page: string
}

const BoxComp = (props: Props) => {

  const { page } = props
  const { push } = useRouter()

  const {
    data: boxes,
    isLoading,
    isSuccess,
    isError,
  } = useGetAllBoxesQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    pollingInterval: 5000
  })

  if(isLoading) return <Loading/>

  if(isError) return (
    <div className='flex flex-col justify-center items-center min-h-screen gap-3'>
      <p className='text-xl'>
        هیچ باکسی وجود ندارد
      </p>

      <p>
        برای ایجاد باکس جدید
        <Link href={'/dashboard/billboard/boxes/createbox'}>
          <span className='text-cyan-300'>
            کلیک کنید
          </span>
        </Link>
      </p>
    </div>
  )

  const { ids } = boxes
  const boxItemsContent = ids?.length && ids.map((boxId: string, index: number) => <BoxItem key={boxId} boxId={boxId} index={index} page={page} />)

  return (
    <main className="min-h-screen">
      <PageTitle name={'باکس ها'} />

      <div className="flex items-center justify-between gap-3">
        <SearchContainer />
        <Button
          onClickHandler={() => push('/dashboard/billboard/boxes/createbox')}
          title="باکس جدید"
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {boxItemsContent}
      </div>
    </main>
  )
}

export default BoxComp
