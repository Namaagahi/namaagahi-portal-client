"use client"
import { IoIosArrowDown } from "react-icons/io"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link";

 const SubMenu = ({ data } :any) => {
  const path = usePathname()
  const activeStyle = {background: "#C91416", fontWeight: 500, color: "white", border:"#C91416"}
  const [subMenuOpen, setSubMenuOpen] = useState(false)
  
  return (
    <>
      <li
        className="flex w-full items-center justify-between gap-2 p-2 cursor-pointer hover:bg-[#C91416] hover:bg-opacity-60 hover:text-white rounded-2xl transition-all"
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        <div className="flex gap-2 items-center">
            {data.icon}
            <p className="text-2xl font-bold">{data.name}</p>
        </div>
        <IoIosArrowDown
          className={` ${subMenuOpen && "rotate-180"} duration-200 `}
        />
      </li>
      <motion.ul
        animate={
          subMenuOpen
            ? {
                height: "fit-content",
              }
            : {
                height: 0,
              }
        }
        className="flex flex-col gap-1 mt-2 pr-4 w-full overflow-hidden"
      >
        {data.menus?.map((menu: any) => (
            <Link 
                href={menu.path} 
                key={menu.name}
            >
                <li 
                    className="flex items-center justify-start gap-4 p-3 cursor-pointer hover:bg-[#C91416] hover:bg-opacity-60 hover:text-white rounded-2xl transition-all"
                    style={path === menu.path ? activeStyle : {}}
                >
                    {menu.icon}
                    <p className="text-xl">{menu.name}</p>
                </li>
            </Link>
        ))}
      </motion.ul>
    </>
  )
}

export default SubMenu
