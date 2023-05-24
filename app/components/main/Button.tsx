import { CreateButtonProps } from '@/app/lib/interfaces'

const Button = (props: CreateButtonProps) => {

  const { onClickHandler, title } = props
  
  return (
    <button 
      className="btn-create"
      onClick={onClickHandler}
    >
      <span className="btn-create-text"> {title} </span>
    </button>
  )
}

export default Button 