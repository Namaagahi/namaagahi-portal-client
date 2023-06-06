import React from 'react'

const Badge = ({index}: {index: number}) => {
  return (
    <div className='relative'>
        <div className="absolute inline-flex items-center justify-center w-8 h-8 text-lg font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
            {index + 1}
        </div>
    </div>
  )
}

export default Badge