// import { FC, useState } from "react";
// import {
//   Accordion as DefaultAccordion,
//   AccordionHeader,
//   AccordionBody,
// } from "@material-tailwind/react";
// import Link from "next/link";
// import { IoIosArrowBack } from "react-icons/io";

// interface IAccordionProps {
//   menu: any;
// }

// const Accordion: FC<IAccordionProps> = ({ menu }) => {
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => setOpen(!open);

//   return (
//     <DefaultAccordion open={open}>
//       <AccordionHeader
//         onClick={() => handleOpen()}
//         className={`group flex items-center text-lg font-bold border-0 mb-2 justify-start gap-4 p-3 cursor-pointer hover:text-buttonHover hover:mr-2  transition-all `}
//       >
//         <span
//           className={`transform  m-0 ${
//             open ? "-rotate-90 duration-400 block" : "hidden"
//           } group-hover:block`}
//         >
//           <IoIosArrowBack />
//         </span>
//         <span
//           className={`transform duration-200 ${
//             open && "hidden"
//           } group-hover:hidden`}
//         >
//           {menu.icon}
//         </span>
//         {menu.name}
//       </AccordionHeader>
//       <div className="">
//         {menu?.children?.map((x: any, index: number) => (
//           <AccordionBody
//             key={index}
//             className="pt-0  mr-12 font-normal text-md text-orange-200  cursor-pointer  hover:mr-14  transition-all"
//           >
//             <Link href={x.url}>{x.name}</Link>
//           </AccordionBody>
//         ))}
//       </div>
//     </DefaultAccordion>
//   );
// };

// export default Accordion;
