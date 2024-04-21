import { ChangeEvent, ChangeEventHandler } from "react";
import { Control, Controller } from "react-hook-form";

type SelectInputProps = {
  control: Control<any, any>;
  defaultValue?: string;
  name: string;
  label: string;
  required?: boolean;
  options: any[];
  errors?: string;
};

const SelectInput = (props: SelectInputProps) => {
  const { control, defaultValue, name, label, required, options, errors } =
    props;

  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={name}
        className="text-[#767676]  dark:text-gray-200 font-bold"
      >
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={{
          required: required && "این فیلد اجباری است",
        }}
        render={({ field }) => (
          <select
            {...field}
            className="formInput p-[4.5px] dark:text-black bg-slate-200"
          >
            <option value="" disabled hidden>
              انتخاب
            </option>

            {options.map((option: any, index: number) => (
              <option
                key={index}
                defaultValue={defaultValue}
                value={option.id}
                className="text-black"
              >
                {option.name}
              </option>
            ))}
          </select>
        )}
      />
      <small className="text-xs dark:text-rose-200 text-rose-700 ">
        {errors}
      </small>
    </div>
  );
};

export default SelectInput;
