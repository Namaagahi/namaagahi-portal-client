import Title from '@/app/components/main/Title'
import Link from 'next/link'
import React from 'react'
import { FaDotCircle, FaPlusCircle } from 'react-icons/fa'

const StructureSection = () => {
  return (
    <div className='bg-secondary dark:bg-primary flex flex-col gap-4 rounded-xl p-4 hover:bg-slate-400 dark:hover:bg-slate-600 transition'>
    <Title title={'سازه'} fontSize={'text-xl'} bulletSize={4}/>
    <Link href={'/dashboard/billboard/structures'} className='flex items-center gap-2 font-bold dark:hover:text-emerald-400 hover:text-lime-800 transition-all'>
      <FaDotCircle/>
      <p>مشاهده سازه ها</p>
    </Link>
      <Link href={'/dashboard/billboard/createstructure'} className='flex items-center gap-2 pr-6 dark:hover:text-emerald-400 hover:text-lime-800 transition-all'>
        <FaPlusCircle/>
        <p>ایجاد سازه جدید </p>
      </Link>
  </div>
  )
}

export default StructureSection