"use client"
import dynamic from 'next/dynamic'
const PageTitle = dynamic(
  () => import('@/app/components/main/PageTitle'),
  { ssr: false }
)
const BoxSection = dynamic(
  () => import('@/app/components/media/billboard/cards/BoxSection'),
  { ssr: false }
)
const ContractorSection = dynamic(
  () => import('@/app/components/media/billboard/cards/ContractorSection'),
  { ssr: false }
)
const ExecutionSection = dynamic(
  () => import('@/app/components/media/billboard/cards/ExecutionSection'),
  { ssr: false }
)
const PlanSection = dynamic(
  () => import('@/app/components/media/billboard/cards/PlanSection'),
  { ssr: false }
)
const ReportsSection = dynamic(
  () => import('@/app/components/media/billboard/cards/ReportsSection'),
  { ssr: false }
)
const SalesSection = dynamic(
  () => import('@/app/components/media/billboard/cards/SalesSection'),
  { ssr: false }
)
const StructureSection = dynamic(
  () => import('@/app/components/media/billboard/cards/StructureSection'),
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
          <BoxSection />
          <StructureSection/>
          <PlanSection />
          <ExecutionSection />
          <ContractorSection />
          <SalesSection />
          <ReportsSection />
        </div>
      </div>
    </main>
  )
}

export default Billboard