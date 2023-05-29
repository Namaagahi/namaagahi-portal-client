import PageTitle from '@/app/components/main/PageTitle'
import BoxSection from '@/app/components/media/billboard/BoxSection'
import ContractorSection from '@/app/components/media/billboard/ContractorSection'
import ExecutionSection from '@/app/components/media/billboard/ExecutionSection'
import PlanSection from '@/app/components/media/billboard/PlanSection'
import SalesSection from '@/app/components/media/billboard/SalesSection'
import SummarySection from '@/app/components/media/billboard/SummarySection'

const Billboard = () => {
  return (
    <main className="min-h-screen">
      <PageTitle name={'بیلبورد'} />
      <div className='flex flex-col gap-2'>
        <SummarySection />
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2'>
          <BoxSection />
          <PlanSection />
          <ExecutionSection />
          <ContractorSection />
          <SalesSection />
        </div>
      </div>
    </main>
  )
}

export default Billboard