import React from 'react'
import Title from '../../main/Title'

const ReportsSection = () => {
  return (
    <div className='bg-indigo-200 dark:bg-indigo-600 flex flex-col gap-2 rounded-xl p-4 hover:bg-slate-400 dark:hover:bg-slate-600 transition'>
    <Title title={'گزارشات'} fontSize={'text-xl'}  bulletSize={3}/>
  </div>
  )
}

export default ReportsSection