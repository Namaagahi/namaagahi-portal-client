"use client"
import UnderConstruction from '../components/main/UnderConstruction'
import PageTitle from '../components/main/PageTitle'
import usePageTitle from '../hooks/usePageTitle'
import moment from 'jalali-moment'

const Dashboard = () => {
  usePageTitle('داشبورد')

  function getEquivalentValue(persianYear: number) {
    const baseYear = 1400
    const valueIncrement = 100
    
    if (persianYear < baseYear) throw new Error('Invalid Persian year')
    
    const equivalentValue = ((persianYear - baseYear) * valueIncrement)
    
    return equivalentValue
  }

  console.log("CODEd YEAR", getEquivalentValue(1403))
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