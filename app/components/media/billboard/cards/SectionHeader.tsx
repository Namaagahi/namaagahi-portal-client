import Title from '../../../main/Title'

const SectionHeader = ({title}:{title: string}) => {

  return (
    <div className='grid grid-cols-1'>
    <div className='bg-slate-400 dark:bg-slate-600 flex flex-col gap-2 rounded-xl p-4'>
      <Title title={title} fontSize={'text-3xl'} bulletSize={4}/>
    </div>
  </div>
  )
}

export default SectionHeader