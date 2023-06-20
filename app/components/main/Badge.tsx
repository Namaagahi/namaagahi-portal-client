import React from 'react'

const Badge = ({index}: {index: number}) => {
  return (
    <div className='relative'>
        <div className="badge">
            {index + 1}
        </div>
    </div>
  )
}

export default Badge