const Status = ({ status, bgColor, textColor }: { status: string, bgColor: string, textColor:string }) => {
  return (
    <span
    style={{background: bgColor, color: textColor}}
     className="w-[55px] text-xs text-center font-semibold inline-block py-1 px-2  rounded-xl last:mr-0 mr-1">
        {status}
    </span>
  )
}

export default Status