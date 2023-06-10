"use client"
import dynamic from 'next/dynamic'
const PageTitle = dynamic(
  () => import('@/app/components/main/PageTitle'),
  { ssr: false }
)
const BoxCard = dynamic(
  () => import('@/app/features/boxes/BoxCard'),
  { ssr: false }
)

const Boxes = () => {
  return (
    <main className="min-h-screen">
      <PageTitle name={'باکس ها'} />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <BoxCard boxType='buyLong'/>
        <BoxCard boxType='buyShort'/>
        <BoxCard boxType='owner'/>
        <BoxCard boxType='owner'/>
        <BoxCard boxType='buyShort'/>
        <BoxCard boxType='owner'/>
      </div>
    </main>
  )
} 

export default Boxes