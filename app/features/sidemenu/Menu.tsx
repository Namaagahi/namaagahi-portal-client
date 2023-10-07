"use client"
import { MenuItemsObj } from "@/app/lib/interfaces"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import SubMenu from "./SubMenu"
import { billboardSellList, billboardSettingsList } from "@/app/lib/constants"

type Props = { 
  menuItems: MenuItemsObj[]
}

const Menu = (props : Props) => {

  const { menuItems } = props
  const [mobileMenu, setMobileMenu] = useState<boolean>(true)
  const path = usePathname()
  const activeStyle = {background: "#faa75c", fontWeight: 500, color: "black", border:"#C91416"}

  return (
    <div className={`${mobileMenu ? 'block' : 'hidden'} w-full xl:w-[300px] max-h-[800px] bg-gray-200 backdrop-blur dark:bg-darkModeBg/30 p-4 rounded-2xl`}>
      <div className="border-y py-5 border-slate-500 dark:border-slate-300 ">
        <small className="pr-3 text-slate-500 inline-block mb-2">
          مدیریت
        </small>

        <ul className="flex flex-col gap-1">
          {menuItems.map((item: MenuItemsObj) => (
            <Link href={item.path} key={item.name}>
              <li
              className="flex items-center justify-start gap-1 p-3 cursor-pointer hover:text-buttonHover hover:scale-110 rounded-2xl transition-all"
              style={path === item.path ? activeStyle : {}}
              >
                {item.icon}
                <p className="text-md">
                  {item.name}
                </p>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="border-b py-5 border-slate-500 dark:border-slate-300 ">
        <Link href={'/dashboard/billboard'}>
          <small className="pr-3 text-slate-500 inline-block mb-2 hover:text-lg transition-all">
            بیلبورد
          </small>
        </Link>
        
        <ul className="flex flex-col gap-1">
            {billboardSettingsList.map((item: any) => (
                <div
                  key={item.name}
                  style={path === item.path ? activeStyle : {}}
                >
                  <SubMenu data={item} />
                </div>
            ))}
            <div className="border-b py-5 border-slate-500 dark:border-slate-300 "/>

            {billboardSellList.map((item: any) => (
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