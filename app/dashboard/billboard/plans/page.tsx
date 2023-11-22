"use client"
import PlansComp from '@/app/features/plans/PlansComp'
import usePageTitle from '@/app/hooks/usePageTitle'

const Plans = () => {
  usePageTitle('پلنها')

  return (
    <PlansComp page={'all'} />
  )
}

export default Plans
