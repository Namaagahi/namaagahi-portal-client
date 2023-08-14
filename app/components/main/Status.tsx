type Props = { 
  status: string
  bgColor: string
  textColor: string 
}

const Status = (props: Props) => {

  const {
    status,
    bgColor,
    textColor
  } = props
  
  return (
    <span
      style={{background: bgColor, color: textColor}}
      className="w-[80px] text-[10px] text-center font-semibold inline-block py-1 px-2  rounded-xl last:mr-0 mr-1"
    >
      {status}
    </span>
  )
}

export default Status