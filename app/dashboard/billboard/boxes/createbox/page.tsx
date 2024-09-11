"use client";
import SearchContainer from "@/app/components/main/SearchContainer";
import ScrollContainer from "@/app/components/main/ScrollContainer";
import PageTitle from "@/app/components/main/PageTitle";
import { useState } from "react";
import dynamic from "next/dynamic";
import usePageTitle from "@/app/hooks/usePageTitle";
const NewBox = dynamic(() => import("@/app/features/boxes/NewBox"), {
  ssr: false,
});
const CreateBox = () => {
  usePageTitle("ایجاد باکس جدید");

  const [boxMark, setBoxMark] = useState<string>("");

  return (
    <main className="min-h-screen">
      <PageTitle name={"ایجاد باکس جدید"} />
      <SearchContainer />
      <div className="flex flex-col gap-9 justify-center">
        <div className="formContainer">
          <small className="pr-3 text-slate-500 inline-block font-bold">
            نوع باکس
          </small>

          <p className="font-bold text-lg dark:text-gray-200">
            نوع باکس را انتخاب کنید
          </p>

          <div className="w-full grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-12 items-center">
            <button
              onClick={() => setBoxMark("owner")}
              className={`${
                boxMark === "owner" && "bg-primary text-white shadow-md"
              } formChooseButton w-full`}
            >
              مزایده ای
            </button>

            <button
              onClick={() => setBoxMark("buyShort")}
              className={`${
                boxMark === "buyShort" && "bg-primary text-white shadow-md"
              } formChooseButton w-full`}
            >
              روز شمار
            </button>

            <button
              onClick={() => setBoxMark("buyLong")}
              className={`${
                boxMark === "buyLong" && "bg-primary text-white shadow-md"
              } formChooseButton w-full`}
            >
              بلند مدت
            </button>
          </div>
        </div>
        {boxMark && <NewBox mark={boxMark} />}
      </div>
      <ScrollContainer />
    </main>
  );
};

export default CreateBox;
