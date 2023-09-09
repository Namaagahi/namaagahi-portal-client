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
      className="createButton"
      onClick={onClickHandler}
    >
      <span className="createButton-text"> {title} </span>
    </button>
  )
}

export default Button 