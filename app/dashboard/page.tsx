"use client"
import UnderConstruction from '../components/main/UnderConstruction'
import PageTitle from '../components/main/PageTitle'

const Dashboard = () => {

  return (
    <main className="min-h-screen">
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