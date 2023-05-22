import React from 'react'

const Button = ({onClickHandler, title}: {onClickHandler: () => void, title: string}) => {
  return (
    <button 
        className="w-[150px] m-4 p-1 rounded-full from-rose-400 via-fuchsia-500 to-indigo-500 bg-gradient-to-r"
        onClick={onClickHandler}
    >
        <span className="block text-black px-4 py-2 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white transition"> {title} </span>
    </button>
  )
}

export default Button