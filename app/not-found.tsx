import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiArrowGoBackLine } from "react-icons/ri";

const NotFound = () => {
  return (
    <main className="max-h-screen">
      <div className="relative flex flex-col justify-between items-center p-14">
        <div className="fixed right-0 -bottom-11 -z-20">
          <Image
            src={"/images/Vector.png"}
            width={1100}
            height={800}
            alt="vector"
          />
        </div>
        <div className="flex flex-col items-center justify-center w-80 h-32 z-20">
          <p className="text-black dark:text-white text-7xl font-bold">404</p>
          <p className="text-black dark:text-white text-2xl font-bold">
            صفحه مورد نظر پیدا نشد!
          </p>
        </div>
        <div className="mt-16">
          <Image
            src={"/images/404.png"}
            width={635}
            height={449}
            alt="404 image"
          />
        </div>
        <Link href={"/dashboard"} className="mt-20">
          <button className="flex items-center justify-center gap-2 w-52 py-4 bg-[#F5E8FF] rounded-md text-black hover:bg-[#b554ff] transition-all text-2xl border-[3px] border-black shadow-inner">
            <p>داشبورد</p>
            <RiArrowGoBackLine />
          </button>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
