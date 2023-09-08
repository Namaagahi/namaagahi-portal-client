"use client"
import UnderConstruction from '../components/main/UnderConstruction'
import PageTitle from '../components/main/PageTitle'
import usePageTitle from '../hooks/usePageTitle'

const Dashboard = () => {
  usePageTitle('داشبورد')
  return (
    <main className="min-h-screen flex flex-col gap-4">
      <PageTitle name={'داشبورد'} />
      <div className="w-full">
        <UnderConstruction 
          desc='در این داشبورد تمامی چارت ها و گزارشات آماری بر اساس اطلاعات موجود در پلتفرم نمایش داده خواهد شد.'
        />
      </div>
    </main>
  )
}

export default Dashboard 