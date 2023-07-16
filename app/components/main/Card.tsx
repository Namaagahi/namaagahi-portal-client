import { FaDotCircle, FaPlusCircle } from 'react-icons/fa'
import { CardProps } from '@/app/lib/interfaces'
import Link from 'next/link'
import Title from './Title'
import useAuth from '@/app/hooks/useAuth'
 
const Card = (props: CardProps) => {

  const { status } = useAuth()
  const { title, mainLink, main, subTitleLink, subTitle, main2, main2Link } = props

  return (
    <div className='bg-secondary dark:bg-primary flex flex-col gap-4 rounded-xl p-4 hover:bg-slate-400 dark:hover:bg-slate-600 transition'>
      <Title title={title} fontSize={'text-xl'} bulletSize={4}/>
      <Link href={mainLink} className='flex items-center gap-2 font-bold dark:hover:text-emerald-400 hover:text-lime-800 transition-all'>
        <FaDotCircle/>
        <p>{main}</p>
      </Link>
      {status === 'پذیرشگر' && main2 &&
        <Link href={main2Link || ''}  className='flex items-center gap-2 font-bold dark:hover:text-emerald-400 hover:text-lime-800 transition-all'>
          <FaDotCircle/>
          <p>{main2}</p>
        </Link>
      }
      {subTitle &&      
        <Link href={subTitleLink || ''} className='flex items-center gap-2 pr-6 dark:hover:text-emerald-400 hover:text-lime-800 transition-all'>
          <FaPlusCircle/>
          <p>{subTitle}</p>
        </Link>
      }
  </div>
  )
}

export default Card