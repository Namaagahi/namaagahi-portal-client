import LogoFull from "../main/LogoFull"
import LogoSmall from "../main/LogoSmall"
import Account from "./Account"

const Header = () => {
  return (
    <section className="p-4 md:p-8 flex justify-between items-center">
      <Account/>
      <LogoFull />
      <LogoSmall/>
    </section>
  )
}

export default Header