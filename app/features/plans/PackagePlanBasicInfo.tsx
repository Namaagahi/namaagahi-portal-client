import CustomInput from "@/app/components/inputs/CustomInput";
import SelectInput from "@/app/components/inputs/SelectInput";
import {
  AddPlanForm,
  EditPlanForm,
  InitialCustomerObject,
} from "@/app/lib/interfaces";
import { convertToNumber } from "@/app/utilities/convertToNumber";
import { Control, FieldErrors, UseFormSetValue } from "react-hook-form";

type Props = {
  control: Control<EditPlanForm, any> | Control<AddPlanForm, any>;
  allInitialCustomers: InitialCustomerObject[];
  errors: FieldErrors<EditPlanForm>;
  setValue: UseFormSetValue<AddPlanForm> | UseFormSetValue<EditPlanForm>;
};

const PackagePlanBasicInfo = (props: Props) => {
  const { control, allInitialCustomers, errors, setValue } = props;

  function handleTextbox1Change(
    event: React.ChangeEvent<HTMLInputElement>,
    fieldIndex: number,
    prop: any
  ) {
    const newValue = event.target.value.replace(/,/g, "");
    const numberValue = convertToNumber(newValue);
    const formattedValue =
      numberValue !== null
        ? new Intl.NumberFormat("en-US", {
            style: "decimal",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }).format(numberValue)
        : "";
    setValue(prop, formattedValue);
  }
  const type = [{ name: "تهران" }, { name: "شهرستان" }];

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
          <SelectInput
            control={control}
            name={"type"}
            label={"نوع"}
            errors={errors.type?.message}
            required={true}
            options={type}
          />
          <CustomInput
            control={control}
            name={"proposalCode"}
            label={"کد پروپوزال"}
            errors={errors.proposalCode?.message}
            required={false}
            message="کد پروپوزال را وارد کنید"
            type={"text"}
            className="formInput"
          />
          <CustomInput
            control={control}
            name={"totalPackagePrice"}
            label={"قیمت پکیج"}
            errors={errors.totalPackagePrice?.message}
            required={true}
            message="قیمت پکیج را وارد کنید"
            onChange={(event: any) =>
              handleTextbox1Change(event, 0, `totalPackagePrice`)
            }
            type={"text"}
            className="formInput"
          />
        </div>
      </div>
    </div>
  );
};

export default PackagePlanBasicInfo;
