import Image from "next/image"

const LogoFull = () => {
  return (
    <>
        <Image 
        className="cursor-pointer md:block hidden"
        src={'/images/Logo-Black-text.png'}
        alt="profile-image"
        width={170}
        height={50}
    />
    </>
  )
}

export default LogoFull