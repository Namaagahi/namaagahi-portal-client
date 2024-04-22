import CustomInput from "@/app/components/inputs/CustomInput";
import SelectInput from "@/app/components/inputs/SelectInput";
import {
  AddPlanForm,
  EditPlanForm,
  InitialCustomerObject,
} from "@/app/lib/interfaces";
import { Control, FieldErrors } from "react-hook-form";

type Props = {
  control: Control<EditPlanForm, any> | Control<AddPlanForm, any>;
  allInitialCustomers: InitialCustomerObject[];
  errors: FieldErrors<EditPlanForm>;
};

const RegularPlanBasicInfo = (props: Props) => {
  const { control, allInitialCustomers, errors } = props;

  return (
    <div className="formContainer">
      <small className="pr-3 text-slate-500 inline-block font-bold">
        اطلاعات پایه
      </small>
      <div className="w-1/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 items-end">
        <div className="flex items-center gap-3">
          <SelectInput
            control={control}
            name={"initialCustomerId"}
            label={"نام مشتری"}
            required={true}
            errors={errors.initialCustomerId?.message}
            options={allInitialCustomers}
          />
          <CustomInput
            control={control}
            name={"brand"}
            label={"برند"}
            errors={errors.brand?.message}
            required={true}
            message="نام برند را وارد کنید"
            type={"text"}
            className="formInput"
          />
          <CustomInput
            control={control}
            name={"proposalCode"}
            label={"کد پروپوزال"}
            errors={errors.proposalCode?.message}
            required={true}
            message="کد پروپوزال را وارد کنید"
            type={"text"}
            className="formInput"
          />
        </div>
      </div>
    </div>
  );
};

export default RegularPlanBasicInfo;
