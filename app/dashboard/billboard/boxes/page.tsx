import PageTitle from '@/app/components/main/PageTitle'
import BoxCard from '@/app/features/boxes/BoxCard'
import React from 'react'

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