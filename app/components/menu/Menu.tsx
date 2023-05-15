"use client"
import { menuItemsObj } from "@/app/lib/interfaces"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const Menu = ({menuItems} : {menuItems: menuItemsObj[]}) => {
  const [mobileMenu, setMobileMenu] = useState(true)
  const path = usePathname()
  const activeStyle = {background: "#C91416", fontWeight: 500, color: "white", border:"#C91416"}

  return (
    <div className={`${mobileMenu ? 'block' : 'hidden'} w-full xl:w-[260px] bg-[#E6E6E6] dark:bg-black p-4 rounded-2xl`}>
      <ul className="flex flex-col gap-4">
          {menuItems.map((item: menuItemsObj) => (
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
  )
}

export default Menu