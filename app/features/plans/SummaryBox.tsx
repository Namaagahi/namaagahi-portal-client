import {
  AddPlanForm,
  BoxObject,
  CombinedStructure,
  EditPlanForm,
} from "@/app/lib/interfaces";
import { UseFormSetValue } from "react-hook-form";
import Loading from "../loading/Loading";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAllBoxes } from "@/app/apiSlices/boxesApiSlice";

type Props = {
  structure: CombinedStructure;
  selectedStructure: CombinedStructure;
  setValue: UseFormSetValue<EditPlanForm> | UseFormSetValue<AddPlanForm>;
  fieldIndex: number;
  structureId?: string;
};

const SummaryBox = (props: Props) => {
  const { structure, selectedStructure, setValue, fieldIndex, structureId } =
    props;

  useEffect(() => {
    setValue(`structures.${fieldIndex}.structureRecord`, selectedStructure);
  }, []);

  const allBoxes: BoxObject[] = useSelector(
    (state) => selectAllBoxes(state) as BoxObject[]
  );

  const selectedStructureFromBox = allBoxes
    .map((box) => box.structures)
    .flat()
    .filter((str) => str.structureId === structureId);

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

        <p>{selectedStructureFromBox[0]?.marks?.markOptions?.printSize}</p>
      </div>
    </>
  );
};

export default SummaryBox;
