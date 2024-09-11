"use client";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
// import Accordion from "./Accordion";

const SubMenu = ({ data }: any) => {
  const path = usePathname();
  const activeStyle = {
    background: "#faa75c",
    fontWeight: 500,
    color: "black",
    border: "#C91416",
  };
  const [subMenuOpen, setSubMenuOpen] = useState<boolean>(false);

  return (
    <>
      <li
        className="flex w-full items-center justify-between gap-2 p-2 cursor-pointer  hover:text-buttonHover hover:mr-2 rounded-2xl transition-all"
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        <div className="flex gap-2 items-center">
          {data.icon}
          <p className="text-lg font-bold">{data.name}</p>
        </div>

        <IoIosArrowBack
          className={` ${subMenuOpen && "-rotate-90"} duration-200 `}
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
        className="flex flex-col gap-1 pr-4 w-full overflow-hidden"
      >
        {data.menus?.map((menu: any) => (
          <>
            {!menu.children ? (
              <Link href={menu.path} key={menu.name}>
                <li
                  className="flex items-center justify-start gap-4 p-3 cursor-pointer hover:text-buttonHover hover:mr-2 rounded-2xl transition-all"
                  style={path === menu.path ? activeStyle : {}}
                >
                  {menu.icon}
                  <p className="text-md">{menu.name}</p>
                </li>
              </Link>
            ) : // <Accordion menu={menu} />
            null}
          </>
        ))}
      </motion.ul>
    </>
  );
};

export default SubMenu;
