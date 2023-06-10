import Image from "next/image"

const LogoFull = () => {

  return (
    <>
      <div className="block dark:hidden">
        <Image 
          className="cursor-pointer md:block hidden"
          src={'/images/Logo-Black-text.webp'}
          alt="logo"
          width={170}
          height={50}
        />
      </div>
      
      <div className="hidden dark:block">
        <Image 
          className="cursor-pointer md:block hidden"
          src={'/images/Logo-White-Text.webp'}
          alt="logo"
          width={170}
          height={50}
        />
      </div>
    </>
  )
}

export default LogoFull