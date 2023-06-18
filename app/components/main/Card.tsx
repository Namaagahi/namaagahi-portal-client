import Title from './Title'
import Link from 'next/link'
import { FaDotCircle, FaPlusCircle } from 'react-icons/fa'
 
const Card = ({title, main, mainLink, subTitle, subTitleLink}:
     {title: string , main: string, mainLink: string, subTitle: string, subTitleLink: string}) => {
  return (
    <div className='bg-secondary dark:bg-primary flex flex-col gap-4 rounded-xl p-4 hover:bg-slate-400 dark:hover:bg-slate-600 transition'>
    <Title title={title} fontSize={'text-xl'} bulletSize={4}/>
    <Link href={mainLink} className='flex items-center gap-2 font-bold dark:hover:text-emerald-400 hover:text-lime-800 transition-all'>
      <FaDotCircle/>
      <p>{main}</p>
    </Link>
      <Link href={subTitleLink} className='flex items-center gap-2 pr-6 dark:hover:text-emerald-400 hover:text-lime-800 transition-all'>
        <FaPlusCircle/>
        <p>{subTitle}</p>
      </Link>
  </div>
  )
}

export default Card