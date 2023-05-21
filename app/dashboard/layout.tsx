import Header from "../components/header/Header"
import Menu from "../components/menu/Menu"
import { IoGrid } from 'react-icons/io5'
import { HiUsers } from 'react-icons/hi2'
import { TbPackages } from 'react-icons/tb'
import { FaFileContract } from 'react-icons/fa'
import { MdDashboardCustomize, MdBusinessCenter } from 'react-icons/md'
import { menuItemsObj } from "../lib/interfaces"
import Footer from "../components/footer/Footer"

const MainLayout = ({children}: {children: React.ReactNode}) => {
  const menuItems: menuItemsObj[] = [{
    name: 'داشبورد',
    path: '/dashboard',
    icon: <IoGrid size={20} />
  },
  {
    name: 'کاربران',
    path: '/dashboard/users',
    icon: <HiUsers size={20} />
  },
  {
    name: 'پکیج ها',
    path: '/dashboard/packages',
    icon: <TbPackages size={20} />
  },
  {
    name: 'پلن ها',
    path: '/dashboard/plans',
    icon: <MdBusinessCenter size={20} />
  },
  {
    name: 'قراردادها',
    path: '/dashboard/contracts',
    icon: <FaFileContract size={20} />
  }, {
    name: 'صفحه شش',
    path: '/dashboard/custom',
    icon: <MdDashboardCustomize size={20} />
}]

  return (
    <div className="p-4 md:p-8">
       <Header/> 
        <div className=" flex flex-col xl:flex-row gap-8 ">
          <Menu menuItems = {menuItems} />
          <div className="w-full flex flex-col  min-h-screen ">
            {children}
            <Footer />
          </div>
        </div>
    </div>
  )
}

export default MainLayout