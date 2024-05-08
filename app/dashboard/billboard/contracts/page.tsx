"use client";
import ContractsMain from "@/app/features/contracts/ContractsMain";
import usePageTitle from "@/app/hooks/usePageTitle";

const Contracts = () => {
  usePageTitle("امور قراردادها");

  return <ContractsMain />;
};

export default Contracts;
