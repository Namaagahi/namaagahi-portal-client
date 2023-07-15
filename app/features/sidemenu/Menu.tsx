"use client"
import { MenuItemsObj } from "@/app/lib/interfaces"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import dynamic from 'next/dynamic'
const SubMenu = dynamic(
  () => import('./SubMenu'),
  { ssr: false }
)

const Menu = ({ menuItems, subMenusList } : { menuItems: MenuItemsObj[], subMenusList:any }) => {

  const [mobileMenu, setMobileMenu] = useState(true)

  const path = usePathname()
  
  const activeStyle = {background: "#C91416", fontWeight: 500, color: "white", border:"#C91416"}

  return (
    <div className={`${mobileMenu ? 'block' : 'hidden'} w-full xl:w-[300px] max-h-[800px] bg-[#E6E6E6] dark:bg-black p-4 rounded-2xl`}>
      <div className="border-y py-5 border-slate-500 dark:border-slate-300 ">
      <small className="pr-3 text-slate-500 inline-block mb-2">مدیریت</small>
      <ul className="flex flex-col gap-4">
        {menuItems.map((item: MenuItemsObj) => (
          <Link href={item.path} key={item.name}>
            <li
            className="flex items-center justify-start gap-2 p-3 cursor-pointer hover:bg-[#C91416] hover:bg-opacity-60 hover:text-white rounded-2xl transition-all"
            style={path === item.path ? activeStyle : {}}
            >
              {item.icon}
              <p className="text-xl">{item.name}</p>
            </li>
          </Link>
        ))}
      </ul>
      </div>
      <div className="border-b py-5 border-slate-500 dark:border-slate-300 ">
      <small className="pr-3 text-slate-500 inline-block mb-2">محتوا</small>
      <ul className="flex flex-col gap-4">
          {subMenusList.map((item: any) => (
              <div
                key={item.name}
                style={path === item.path ? activeStyle : {}}
              >
                <SubMenu data={item} />
              </div>
          ))}
      </ul>
      </div>
    </div>
  )
}

export default Menu