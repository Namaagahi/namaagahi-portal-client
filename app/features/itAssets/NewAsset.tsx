import { AssetObject, StructureObject, UserObject } from "@/app/lib/interfaces";
import { AiOutlineClose } from "react-icons/ai";
import React, { useState } from "react";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import useAuth from "@/app/hooks/useAuth";
import {
  selectAllUsers,
  useGetUsersQuery,
} from "../../apiSlices/usersApiSlice";
import { useSelector } from "react-redux";
import {
  useAddNewAssetMutation,
  useUpdateAssetMutation,
} from "@/app/apiSlices/itAssetsApiSlice";
const Loading = dynamic(() => import("@/app/features/loading/Loading"), {
  ssr: false,
});

type Props = {
  handleModal: () => void;
};

const NewAsset = (props: Props) => {
  const { handleModal } = props;
  const { isMaster, isAdmin, id } = useAuth();

  const [addNewAsset, { isLoading, isError, error }] = useAddNewAssetMutation();

  const [assetData, setAssetData] = useState<any>({
    name: "",
    code: "",
    department: "",
    unit: "",
    assetName: "",
    serial: "",
    assetCode: "",
    describtion: "",
  });

  const {
    name,
    code,
    department,
    unit,
    assetName,
    serial,
    assetCode,
    describtion,
  } = assetData;

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAssetData({ ...assetData, name: e.target.value });
  const onCodeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAssetData({ ...assetData, code: e.target.value });
  const onDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setAssetData({ ...assetData, department: e.target.value });
  const onUnitChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAssetData({ ...assetData, unit: e.target.value });
  const onAssetNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAssetData({ ...assetData, assetName: e.target.value });
  const onAssetSerialChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAssetData({ ...assetData, serial: e.target.value });
  const onAssetCodeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAssetData({ ...assetData, assetCode: e.target.value });
  const onDescribtionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAssetData({ ...assetData, describtion: e.target.value });

  const onSaveStructureClick = async () => {
    await addNewAsset({
      userId: id,
      personel: { name, code },
      department,
      unit,
      asset: { name: assetName, serial, code: assetCode },
      describtion,
    });

    handleModal();
    toast.success(`دارایی ${assetData?.name} با موفقیت ثبت شد`);
  };

  return (
    <div className="modalContainer">
      <div onClick={handleModal} className="backdropContainer"></div>
      <div className={`createUpdateModalContentContainer `}>
        <div className="py-5 px-8 w-full text-black dark:text-white">
          <form className="flex flex-col" onSubmit={onSaveStructureClick}>
            <div className="flex justify-between items-center">
              <p className="md:text-2xl text-xl font-bold">ایجاد دارایی</p>

              <AiOutlineClose
                className="cursor-pointer text-xl hover:text-2xl transition-all"
                onClick={handleModal}
              />
            </div>

            {/* {(isMaster || isAdmin) && (
          <div className="flex items-center justify-between w-full pt-12">
            <label htmlFor="userId">کاربر</label>
          </div>
        )} */}

            <div className="flex flex-col pb-7">
              <div className="flex items-center gap-4 justify-between w-full pt-12">
                <label htmlFor="name">مسئول دارایی</label>

                <input
                  id="name"
                  value={name}
                  type="text"
                  className={`${
                    isError && "border-rose-700"
                  } formInput2 w-[80%]`}
                  onChange={onNameChange}
                />
              </div>

              <div className="flex items-center gap-4 justify-between w-full">
                <label htmlFor="code">کد پرسنلی</label>

                <input
                  id="code"
                  value={code}
                  type="text"
                  className={`${
                    isError && "border-rose-700"
                  } formInput2 w-[80%]`}
                  onChange={onCodeChange}
                />
              </div>

              <div className="flex items-center gap-4 justify-between w-full">
                <label htmlFor="department">ساختمان</label>

                <select
                  id="department"
                  value={assetData.department}
                  onChange={onDepartmentChange}
                  className={`${
                    isError && "border-rose-700"
                  } formInput2 w-[80%] `}
                >
                  <option value="" className="bg-black" disabled hidden>
                    انتخاب کنید
                  </option>
                  <option className="bg-black color">نما آگهی</option>
                  <option className="bg-black">BOOM</option>
                  <option className="bg-black">باشگاه انقلاب</option>
                </select>
              </div>

              <div className="flex items-center gap-4 justify-between w-full">
                <label htmlFor="unit">واحد</label>

                <input
                  id="unit"
                  value={unit}
                  type="text"
                  className={`${
                    isError && "border-rose-700"
                  } formInput2 w-[80%]`}
                  onChange={onUnitChange}
                />
              </div>

              <div className="flex items-center gap-4 justify-between w-full">
                <label htmlFor="assetName">شرح دارایی</label>

                <input
                  id="assetName"
                  value={assetName}
                  type="text"
                  className={`${
                    isError && "border-rose-700"
                  } formInput2 w-[80%]`}
                  onChange={onAssetNameChange}
                />
              </div>
              <div className="flex items-center gap-4 justify-between w-full">
                <label htmlFor="serial">سریال</label>

                <input
                  id="serial"
                  value={serial}
                  type="text"
                  className={`${
                    isError && "border-rose-700"
                  } formInput2 w-[80%]`}
                  onChange={onAssetSerialChange}
                />
              </div>
              <div className="flex items-center gap-4 justify-between w-full">
                <label htmlFor="assetCode">کد اموال</label>

                <input
                  id="assetCode"
                  value={assetCode}
                  type="text"
                  className={`${
                    isError && "border-rose-700"
                  } formInput2 w-[80%]`}
                  onChange={onAssetCodeChange}
                />
              </div>
              <div className="flex items-center gap-4 justify-between w-full">
                <label htmlFor="describtion">توضیحات</label>

                <input
                  id="describtion"
                  value={describtion}
                  type="text"
                  className={`${
                    isError && "border-rose-700"
                  } formInput2 w-[80%]`}
                  onChange={onDescribtionChange}
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button className={`confirmButton`}>ذخیره</button>

              <button onClick={handleModal} className="cancelButton">
                لغو
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewAsset;
