import {
  selectAllInitialCustomers,
  useGetAllInitialCustomersQuery,
} from "../../apiSlices/initialCustomersApiSlice";
import {
  AddPlanForm,
  EditPlanForm,
  InitialCustomerObject,
  PlanObject,
} from "@/app/lib/interfaces";
import { Control, FieldErrors, UseFormSetValue } from "react-hook-form";
import { useSelector } from "react-redux";
import RegularPlanBasicInfo from "./RegularPlanBasicInfo";
import PackagePlanBasicInfo from "./PackagePlanBasicInfo";

type Props = {
  page: string;
  mark: string;
  control: Control<EditPlanForm, any> | Control<AddPlanForm, any>;
  errors: FieldErrors<EditPlanForm>;
  plan?: PlanObject;
  setValue: UseFormSetValue<AddPlanForm> | UseFormSetValue<EditPlanForm>;
};

const PlanBasicInfo = (props: Props) => {
  const { page, mark, control, errors, plan, setValue } = props;

  useGetAllInitialCustomersQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });

  const allInitialCustomers: InitialCustomerObject[] = useSelector(
    (state) => selectAllInitialCustomers(state) as InitialCustomerObject[]
  );

  return mark === "regular" ? (
    <RegularPlanBasicInfo
      page={page}
      control={control}
      allInitialCustomers={allInitialCustomers}
      errors={errors}
      plan={plan}
    />
  ) : (
    <PackagePlanBasicInfo
      control={control}
      allInitialCustomers={allInitialCustomers}
      errors={errors}
      setValue={setValue}
    />
  );
};

export default PlanBasicInfo;
