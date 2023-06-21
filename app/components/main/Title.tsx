import { TitleProps } from '@/app/lib/interfaces'

const Title = (props: TitleProps) => {

  const { title, fontSize, bulletSize } = props
  
  return (
    <div className='flex justify-center items-center gap-3'>
      <span className={`relative flex h-${bulletSize} w-${bulletSize}`}>
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-700 dark:bg-sky-400 opacity-75"></span>
        <span className={`relative inline-flex rounded-full h-${bulletSize} w-${bulletSize} bg-sky-800 dark:bg-sky-500`}></span>
      </span>
      <h1 className={`${fontSize} font-bold`}>{title}</h1>
    </div>
  )
}

export default Title