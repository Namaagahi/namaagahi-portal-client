import React from 'react'
import Title from '../../main/Title'
import Link from 'next/link'
import { FaDotCircle, FaPlusCircle } from 'react-icons/fa'

const BoxSection = () => {
  return (
    <div className='bg-amber-200 dark:bg-amber-600 flex flex-col gap-4 rounded-xl p-4 hover:bg-slate-400 dark:hover:bg-slate-600 transition'>
    <Title title={'باکس'} fontSize={'text-xl'} bulletSize={3}/>
    <Link href={'/dashboard/billboard/boxes'} className='flex items-center gap-2 font-bold dark:hover:text-emerald-400 hover:text-lime-800 transition-all'>
      <FaDotCircle/>
      <p>مشاهده باکس ها</p>
    </Link>
      <Link href={'/dashboard/billboard/createbox'} className='flex items-center gap-2 pr-6 dark:hover:text-emerald-400 hover:text-lime-800 transition-all'>
        <FaPlusCircle/>
        <p>ایجاد باکس جدید </p>
      </Link>
  </div>
  )
}

export default BoxSection