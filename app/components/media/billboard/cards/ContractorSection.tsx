import React from 'react'
import Title from '../../../main/Title'

const ContractorSection = () => {
  return (
    <div className='bg-secondary dark:bg-primary  flex flex-col gap-2 rounded-xl p-4 hover:bg-slate-400 dark:hover:bg-slate-600 transition'>
    <Title title={'پیمانکاران'} fontSize={'text-xl'}  bulletSize={4}/>
  </div>
  )
}

export default ContractorSection