"use client"
import { billboardPagePropsObject } from '@/app/lib/constants'
import Card from '@/app/components/main/Card'
import dynamic from 'next/dynamic'
const PageTitle = dynamic(
  () => import('@/app/components/main/PageTitle'),
  { ssr: false }
)
const SummarySection = dynamic(
  () => import('@/app/components/media/billboard/cards/SummarySection'),
  { ssr: false }
)

const Billboard = () => {

  return (
    <main className="min-h-screen">
      <PageTitle name={'بیلبورد'} />
      <div className='flex flex-col gap-2'>
        <SummarySection />
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
                subTitle={prop.subTitle}
                subTitleLink={prop.subTitleLink}
              />
            ))
          }
        </div>
      </div>
    </main>
  )
}

export default Billboard