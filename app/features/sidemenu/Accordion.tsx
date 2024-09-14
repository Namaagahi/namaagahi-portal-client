import { FC, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

interface IAccordionProps {
  menu: any;
}

const Accordion: FC<IAccordionProps> = ({ menu }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <div
        onClick={handleOpen}
        className="group flex items-center justify-start gap-4 p-3 cursor-pointer hover:text-buttonHover hover:mr-2 rounded-2xl transition-all"
      >
        <span
          className={`transform  m-0 ${
            open ? "-rotate-90 duration-400 block" : "hidden"
          } group-hover:block`}
        >
          <IoIosArrowBack />
        </span>
        <span
          className={`transform duration-200 ${
            open && "hidden"
          } group-hover:hidden`}
        >
          {menu.icon}
        </span>
        {menu.name}
      </div>

      <motion.ul
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        style={{
          overflow: "hidden",
          listStyleType: "none",
          padding: 0,
          marginLeft: "2rem",
        }}
      >
        {menu?.children?.map((x: any, index: number) => (
          <li
            key={index}
            className="pt-0  mr-12 font-normal text-md text-amber-700 dark:text-orange-200 mb-3  cursor-pointer  hover:mr-14  transition-all"
          >
            <Link href={x.url}>{x.name}</Link>
          </li>
        ))}
      </motion.ul>
    </>
  );
};

export default Accordion;
