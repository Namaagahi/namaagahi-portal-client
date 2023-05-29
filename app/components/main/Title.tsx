import React from 'react'

const Title = ({title, fontSize, bulletSize}: {title: string, fontSize: string, bulletSize: number}) => {
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