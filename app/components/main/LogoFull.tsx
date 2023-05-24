import Image from "next/image"

const LogoFull = () => {

  return (
    <>
      <div className="block dark:hidden">
        <Image 
          className="cursor-pointer md:block hidden"
          src={'/images/Logo-Black-text.png'}
          alt="profile-image"
          width={170}
          height={50}
          priority
        />
      </div>
      
      <div className="hidden dark:block">
        <Image 
          className="cursor-pointer md:block hidden"
          src={'/images/Logo-White-text.png'}
          alt="profile-image"
          width={170}
          height={50}
          priority
        />
      </div>
    </>
  )
}

export default LogoFull