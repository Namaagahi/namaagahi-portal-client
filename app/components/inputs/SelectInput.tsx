import { SelectInputProps } from '@/app/lib/interfaces'
import { Controller } from 'react-hook-form'

const SelectInput = (props: SelectInputProps) => {

    const { control, defaultValue, name, label, required, options, errors } = props

    return (
        <div className='flex flex-col gap-3'>
            <label htmlFor={name} className='text-[#767676] font-bold'>{label}</label>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={{ 
                required: required && 'این فیلد اجباری است',
                }}
                render={({ field }) => 
                <select 
                    {...field} 
                    className='p-4 rounded-[50px] bg-white outline-none'
                >
                    <option value="" disabled hidden>
                    انتخاب
                    </option>
                    {options.map((option: any, index: number) => (
                    <option key={index} defaultValue={defaultValue} value={option.id} className='text-black'>
                        {option.name}
                    </option>
                    ))}
                </select>
                }
            />
            <small className="text-xs text-rose-600 ">{errors}</small>
        </div>
    )
}

export default SelectInput