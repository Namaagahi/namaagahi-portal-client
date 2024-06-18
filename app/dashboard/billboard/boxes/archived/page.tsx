"use client";
import BoxComp from "@/app/features/boxes/BoxComp";
import usePageTitle from "@/app/hooks/usePageTitle";

const Boxes = () => {
  usePageTitle("آرشیو باکسها");

  return <BoxComp page="all" archived={true} />;
};

export default Boxes;
