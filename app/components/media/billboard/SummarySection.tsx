import React from 'react'
import Title from '../../main/Title'

const SummarySection = () => {
  return (
    <div className='grid grid-cols-1'>
    <div className='bg-slate-400 dark:bg-slate-600 flex flex-col gap-2 rounded-xl p-4'>
      <Title title={'خلاصه وضعیت'} fontSize={'text-3xl'} bulletSize={4}/>
    </div>
  </div>
  )
}

export default SummarySection