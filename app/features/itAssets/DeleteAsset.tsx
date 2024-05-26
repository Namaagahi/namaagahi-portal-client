"use client";
import { AssetObject } from "@/app/lib/interfaces";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import { useDeleteAssetMutation } from "@/app/apiSlices/itAssetsApiSlice";
const Loading = dynamic(() => import("@/app/features/loading/Loading"), {
  ssr: false,
});

type Props = {
  asset: AssetObject;
  handleModal: () => void;
};

const DeleteAsset = (props: Props) => {
  const { asset, handleModal } = props;
  const [DeleteAsset, { isLoading }] = useDeleteAssetMutation();

  const onDeleteAssetClick = async () => {
    await DeleteAsset({ id: asset?.id });
    handleModal();
    toast.success(`دارایی ${asset?.asset?.name} با موفقیت حذف شد`);
  };

  if (isLoading) return <Loading />;
  return (
    <div className="flex items-center gap-6">
      <button onClick={onDeleteAssetClick} className="deleteConfirmButton">
        حذف
      </button>

      <button onClick={handleModal} className="cancelButton">
        لغو
      </button>
    </div>
  );
};

export default DeleteAsset;
