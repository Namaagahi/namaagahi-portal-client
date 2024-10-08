import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BoxObject } from "@/app/lib/interfaces";
import ConfirmModal from "../modals/ConfirmModal";
import useAuth from "@/app/hooks/useAuth";
import moment from "jalali-moment";
import { useState } from "react";
import Link from "next/link";
import RenewalBox from "@/app/features/boxes/RenewalBox";
import { usePathname } from "next/navigation";

type Props = {
  number: number;
  param: string;
  prop: BoxObject;
  startDate: number;
  endDate: number;
  diff: number | undefined;
  titles: Object;
};

const ListItem = (props: Props) => {
  const { number, param, prop, startDate, endDate, diff, titles } = props;

  const { isAdmin, isMaster, isMediaManager } = useAuth();
  const [isDeleteBox, setIsDeleteBox] = useState(false);
  const [isRenewal, setIsRenewal] = useState(false);
  const handleDeleteModal = () => setIsDeleteBox(!isDeleteBox);
  const handleRenewal = () => setIsRenewal(!isRenewal);
  const url = usePathname();

  return (
    <>
      <div className="relative p-7 pt-14 w-full min-h-[232px] flex flex-col justify-center items-center gap-2 rounded-md shadow-md bg-gray-300 dark:bg-white text-gray-800 overflow-hidden">
        <div className="absolute right-7 top-0 min-h-[48px] w-10 rounded-b-[20px] bg-[#18A661] flex justify-center items-center font-bold text-xl">
          {number + 1}
        </div>
        {isMaster && (
          <div className="absolute left-16 top-0 min-h-[48px] w-8 rounded-b-[20px] bg-[#f04a17] flex justify-center items-center font-bold text-xl text-white hover:scale-125 cursor-pointer transition-all">
            <AiFillDelete onClick={handleDeleteModal} />
          </div>
        )}

        {(isAdmin || isMediaManager) && (
          <>
            <Link href={`/dashboard/billboard/boxes/editbox/${param}`}>
              <div className="absolute left-6 top-0 min-h-[48px] w-8 rounded-b-[20px] bg-[#feb420] flex justify-center items-center font-bold text-xl text-white hover:scale-125 cursor-pointer transition-all">
                <AiFillEdit />
              </div>
            </Link>
          </>
        )}

        <div className="flex justify-between items-center gap-2 w-full font-bold mt-2 text-xs sm:text-sm md:text-base">
          <div className="w-[60%] sm:w-[30%] bg-gray-700 rounded-md border-2 border-yellow-400 p-1 text-white text-center">
            {moment.unix(startDate).format("jYYYY-jMM-jDD")}
          </div>

          <div className="w-[60%] sm:w-[30%] bg-gray-700 rounded-md border-2 border-yellow-400 p-1 text-white text-center">
            {moment.unix(endDate).format("jYYYY-jMM-jDD")}
          </div>

          <div className="w-[30%] sm:w-[30%] bg-gray-700 rounded-md border-2 border-yellow-400 p-1 text-white text-center">
            {diff} روز
          </div>
        </div>

        <div className="lg:w-6/7 w-full dark:bg-slate-300 bg-white rounded-md p-3 my-10">
          {Object.entries(titles).map(([key, val]: any) => (
            <div key={key} className="flex justify-between ">
              <p>{val && key}</p>

              {key === "نوع باکس" ? (
                <p>
                  {val === "owner"
                    ? "مزایده ای"
                    : val === "buyShort"
                    ? "روز شمار"
                    : "بلند مدت"}
                </p>
              ) : (
                <p>{val}</p>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-cente w-[100%]">
          <Link href={`/dashboard/billboard/boxes/${param}`}>
            <div className="p-3 hover:bg-[#034726] duration-500 rounded-[50%] w-[70px] bg-[#18A661] flex justify-center items-center cursor-pointer text-white font-bold">
              مشاهده
            </div>
          </Link>
          {url.includes("archived") && (
            <button onClick={handleRenewal}>
              <div className="p-3 hover:bg-[#034726] duration-500 rounded-[50%] w-[70px] bg-[#18A661] flex justify-center items-center cursor-pointer text-white font-bold">
                تمدید
              </div>
            </button>
          )}
        </div>
      </div>

      {isDeleteBox && (
        <ConfirmModal
          prop={prop}
          handleModal={handleDeleteModal}
          type={"delete"}
          deleteType="box"
        />
      )}
      {isRenewal && <RenewalBox handleModal={handleRenewal} boxId={param} />}
    </>
  );
};

export default ListItem;
