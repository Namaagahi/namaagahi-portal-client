import Image from 'next/image'

const LogoSmall = () => {
  
  return (
    <Image
        src={'/images/Logo.webp'}
        alt="logo"
        width={50}
        height={50}
    />
  )
}

export default LogoSmall