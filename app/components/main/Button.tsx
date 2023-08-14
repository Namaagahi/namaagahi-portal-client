type Props = {
  onClickHandler: () => void
  title: string
}

const Button = (props: Props) => {

  const {
    onClickHandler,
    title
  } = props
  
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