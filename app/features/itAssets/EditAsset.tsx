import { AssetObject, StructureObject } from "@/app/lib/interfaces";
import dynamic from "next/dynamic";
import EditAssetForm from "./EditAssetForm";
const Loading = dynamic(() => import("@/app/features/loading/Loading"), {
  ssr: false,
});

type Props = {
  asset: AssetObject | undefined;
  handleModal: () => void;
};

const EditAsset = (props: Props) => {
  const { handleModal, asset } = props;

  return asset ? (
    <EditAssetForm asset={asset} handleModal={handleModal} />
  ) : (
    <Loading />
  );
};

export default EditAsset;
