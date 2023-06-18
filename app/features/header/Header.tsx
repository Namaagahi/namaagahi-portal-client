import { GiHamburgerMenu } from 'react-icons/gi'
import dynamic from 'next/dynamic'
const LogoFull = dynamic(
  () => import('../../components/main/LogoFull'),
  { ssr: false }
)
const LogoSmall = dynamic(
  () => import('../../components/main/LogoSmall'),
  { ssr: false }
)
const ToggleButton = dynamic(
  () => import('../../components/main/ToggleButton'),
  { ssr: false }
)
const Account = dynamic(
  () => import('./Account'),
  { ssr: false }
)

const Header = () => {
  
  return (
    <section className="pb-8 flex justify-between items-center">
      <LogoFull />
      <Account/>
      <div className="flex items-center gap-3">
        <ToggleButton />
        <div className="hidden xl:block">
          <LogoSmall/>
        </div>
      </div>
      <div className="block xl:hidden cursor-pointer">
        <GiHamburgerMenu size={30}/>
      </div>
    </section>
  )
}

export default Header