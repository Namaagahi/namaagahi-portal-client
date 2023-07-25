"use client"

import Image from "next/image"

const Test = () => {
  return (
    <main className='min-h-screen'>
      <div className='relative flex flex-col justify-between items-center p-14'>
        <div className='flex flex-col items-center justify-center w-80 h-32'>
          <p className='text-black dark:text-white text-7xl font-bold'>404</p>
          <p className='text-black dark:text-white text-2xl font-bold'>صفحه مورد نظر پیدا نشد!</p>
        </div>
        <div className="mt-16">
          <Image src={'/images/404.png'} width={635} height={449} alt="404 image" />
        </div>
      </div>
    </main>
  )
}

export default Test