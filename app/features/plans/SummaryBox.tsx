import {
  AddPlanForm,
  CombinedStructure,
  EditPlanForm,
} from "@/app/lib/interfaces";
import { UseFormSetValue } from "react-hook-form";
import Loading from "../loading/Loading";
import { useEffect } from "react";

type Props = {
  structure: CombinedStructure;
  selectedStructure: CombinedStructure;
  setValue: UseFormSetValue<EditPlanForm> | UseFormSetValue<AddPlanForm>;
  fieldIndex: number;
};

const SummaryBox = (props: Props) => {
  const { structure, selectedStructure, setValue, fieldIndex } = props;

  useEffect(() => {
    setValue(`structures.${fieldIndex}.structureRecord`, selectedStructure);
  }, []);

  if (!structure) return <Loading />;
  return (
    <>
      <div className="flex gap-3">
        <label
          htmlFor="typeName"
          className="text-[#767676] dark:text-white font-bold"
        >
          مسیر
        </label>

        <p>{structure?.location?.path}</p>
      </div>

      <div className="flex gap-3">
        <label
          htmlFor="typeName"
          className="text-[#767676] dark:text-white font-bold"
        >
          نشانی
        </label>

        <p>{structure?.location?.address}</p>
      </div>

      <div className="flex gap-3">
        <label
          htmlFor="typeName"
          className="text-[#767676] dark:text-white font-bold"
        >
          مساحت
        </label>

        <p>{structure?.marks?.markOptions?.printSize}</p>
      </div>
    </>
  );
};

export default SummaryBox;
