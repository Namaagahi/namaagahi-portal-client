import React from 'react'
import Title from '../../main/Title'

const SalesSection = () => {
  return (
    <div className='bg-cyan-200 dark:bg-cyan-600 flex flex-col gap-2 rounded-xl p-4 hover:bg-slate-400 dark:hover:bg-slate-600 transition'>
    <Title title={'فروش'} fontSize={'text-xl'}  bulletSize={3}/>
  </div>
  )
}

export default SalesSection