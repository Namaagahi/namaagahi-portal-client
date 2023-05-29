import React from 'react'
import Title from '../../main/Title'

const PlanSection = () => {
  return (
    <div className='bg-lime-200 dark:bg-lime-600 flex flex-col gap-2 rounded-xl p-4 hover:bg-slate-400 dark:hover:bg-slate-600 transition'>
    <Title title={'پلن'} fontSize={'text-xl'}  bulletSize={3}/>
  </div>
  )
}

export default PlanSection