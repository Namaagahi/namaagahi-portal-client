import ToggleButton from '@/app/components/main/ToggleButton'
import LogoSmall from '../../components/main/LogoSmall'
import LogoFull from '@/app/components/main/LogoFull'
import { GiHamburgerMenu } from 'react-icons/gi'
import dynamic from 'next/dynamic'
import useAuth from '@/app/hooks/useAuth'
import { selectUserById, useGetUsersQuery } from '@/app/apiSlices/usersApiSlice'
import { useSelector } from 'react-redux'
import { UserObject } from '@/app/lib/interfaces'
import Loading from '../loading/Loading'
const Account = dynamic(
  () => import('./Account'),
  { ssr: false }
)

const Header = () => {

  return (
    <section className="pb-8 flex justify-between items-center">
      <LogoFull />
      
      <Account />

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