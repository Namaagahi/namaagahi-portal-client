"use client";
import { MenuItemsObj } from "@/app/lib/interfaces";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import SubMenu from "./SubMenu";
import {
  billboardFinancialList,
  billboardPrint,
  billboardSellList,
  billboardSettingsList,
  projectList,
  reports,
} from "@/app/lib/constants";
import useAuth from "@/app/hooks/useAuth";

type Props = {
  menuItems: MenuItemsObj[];
};

const Menu = ({ menuItems }: Props) => {
  const [mobileMenu, setMobileMenu] = useState<boolean>(true);
  const [filteredMenuItems, setFilteredMenuItems] = useState<MenuItemsObj[]>(
    []
  );
  const path = usePathname();
  const user = useAuth();
  const activeStyle = {
    background: "#faa75c",
    fontWeight: 500,
    color: "black",
    border: "#C91416",
  };

  useEffect(() => {
    if (user) {
      const updatedMenuItems = (user?.roles as string[])?.includes("کارشناس IT")
        ? menuItems
        : menuItems.filter((x) => x.name !== "IT");
      if (
        JSON.stringify(updatedMenuItems) !== JSON.stringify(filteredMenuItems)
      ) {
        setFilteredMenuItems(updatedMenuItems);
      }
    }
  }, [user, menuItems]);

  return (
    <div
      className={`${
        mobileMenu ? "block" : "hidden"
      } w-full xl:w-[300px] bg-gray-200 backdrop-blur dark:bg-darkModeBg/30 p-4 rounded-2xl m-3`}
    >
      <div className="border-y py-5 border-slate-500 dark:border-slate-300 ">
        <small className="pr-3 text-slate-500 inline-block mb-2">مدیریت</small>

        <ul className="flex flex-col gap-1">
          {filteredMenuItems.map((item: MenuItemsObj) => (
            <Link href={item.path} key={item.name}>
              <li
                className="flex items-center justify-start gap-1 p-3 cursor-pointer hover:text-buttonHover hover:scale-110 rounded-2xl transition-all"
                style={path === item.path ? activeStyle : {}}
              >
                {item.icon}
                <p className="text-md">{item.name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="border-b border-slate-500 dark:border-slate-300 ">
        <Link href={"/dashboard/billboard"}>
          <small className="pr-3 text-slate-500 inline-block mb-2 hover:text-lg transition-all">
            بیلبورد
          </small>
        </Link>

        <ul className="flex flex-col gap-1">
          {(user.isMaster || user.isAdmin || user.isProjectManager) && (
            <>
              {projectList.map((item: any) => (
                <div
                  key={item.name}
                  style={path === item.path ? activeStyle : {}}
                >
                  <SubMenu data={item} />
                  <div className="border-b border-slate-500 dark:border-slate-300" />
                </div>
              ))}
            </>
          )}
          {billboardSettingsList.map((item: any) => (
            <div key={item.name} style={path === item.path ? activeStyle : {}}>
              <SubMenu data={item} />
            </div>
          ))}
          {(user.isMaster || user.isAdmin || user.status === "پذیرشگر") && (
            <>
              <div className="border-b border-slate-500 dark:border-slate-300 " />
              {billboardSellList.map((item: any) => (
                <div
                  key={item.name}
                  style={path === item.path ? activeStyle : {}}
                >
                  <SubMenu data={item} />
                </div>
              ))}
            </>
          )}

          <div className="border-b border-slate-500 dark:border-slate-300 " />
          {billboardFinancialList.map((item: any) => (
            <div key={item.name} style={path === item.path ? activeStyle : {}}>
              <SubMenu data={item} />
            </div>
          ))}
          <div className="border-b border-slate-500 dark:border-slate-300 " />
          {reports.map((item: any) => (
            <div key={item.name} style={path === item.path ? activeStyle : {}}>
              <SubMenu data={item} />
            </div>
          ))}
          <div className="border-b border-slate-500 dark:border-slate-300 " />
          {billboardPrint.map((item: any) => (
            <div key={item.name} style={path === item.path ? activeStyle : {}}>
              <SubMenu data={item} />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
