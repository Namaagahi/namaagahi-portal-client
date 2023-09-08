"use client"
import { billboardPagePropsObject } from '@/app/lib/constants'
import Card from '@/app/components/main/Card'
import dynamic from 'next/dynamic'
import usePageTitle from '@/app/hooks/usePageTitle'
const PageTitle = dynamic(
  () => import('@/app/components/main/PageTitle'),
  { ssr: false }
)
const SectionHeader = dynamic(
  () => import('@/app/components/media/billboard/cards/SectionHeader'),
  { ssr: false }
)

const Billboard = () => {
  usePageTitle('رسانه | بیلبورد')

  return (
    <main className="min-h-screen w-full">
      <PageTitle name={'بیلبورد'} />
      <div className='flex flex-col gap-2'>
        <SectionHeader title='مدیریت' />
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2'>
          {
            billboardPagePropsObject.map((prop) => (
              <Card
                key={prop.id}
                title={prop.title}
                main={prop.main}
                main2={prop.main2}
                mainLink={prop.mainLink}
                main2Link={prop.main2Link}
                subTitle={prop.subTitle!}
                subTitleLink={prop.subTitleLink!}
              />
            ))
          }
        </div>
        <div className='flex flex-col gap-2 mt-5'>
          <SectionHeader title='گزارشات' />
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2'>
            <Card
              title='سازه های خالی'
              main='گزارش سازه های خالی'
              mainLink='/dashboard/billboard/structures/availables'
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Billboard