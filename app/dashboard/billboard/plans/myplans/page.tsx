"use client"
import PlansComp from '@/app/features/plans/PlansComp'
import usePageTitle from '@/app/hooks/usePageTitle'

const MyPlans = () => {
  usePageTitle('پلنهای من')
    
    return(
        <PlansComp page={'my'} />
    )
} 

export default MyPlans