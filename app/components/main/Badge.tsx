import { BadgeProps } from '@/app/lib/interfaces'

const Badge = (props: BadgeProps) => {

  const { index } = props

  return (
    <div className='relative'>
      <div className="badge">
        {index + 1}
      </div>
    </div>
  )
}

export default Badge