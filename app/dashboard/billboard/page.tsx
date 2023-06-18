"use client"
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

  const pageProps = [
    {
      id:1,
      title: 'باکس',
      main:'مشاهده باکس ها',
      mainLink:'/dashboard/billboard/boxes', 
      subTitle:'ایجاد باکس جدید', 
      subTitleLink:'/dashboard/billboard/createbox'
    },
    {
      id:2,
      title: 'سازه',
      main:'مشاهده سازه ها',
      mainLink:'/dashboard/billboard/structures', 
      subTitle:'ایجاد سازه جدید', 
      subTitleLink:'/dashboard/billboard/createstructure'
    },
  ]
  return (
    <main className="min-h-screen">
      <PageTitle name={'بیلبورد'} />
      <div className='flex flex-col gap-2'>
        <SummarySection />
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2'>
          {
            pageProps.map((prop) => (
              <Card
                key={prop.id}
                title={prop.title}
                main={prop.main}
                mainLink={prop.mainLink}
                subTitle={prop.subTitle}
                subTitleLink={prop.subTitleLink}
              />
            ))
          }
          {/* <BoxSection />
          <StructureSection/>
          <PlanSection />
          <ExecutionSection />
          <ContractorSection />
          <SalesSection />
          <ReportsSection /> */}
        </div>
      </div>
    </main>
  )
}

export default Billboard