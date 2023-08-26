import { Control, Controller } from 'react-hook-form'

 type CustomInputProps = {
    control: Control<any, any>
    defaultValue?: string
    name: string
    label: string
    required?: boolean
    message?: string
    pattern?: RegExp
    patternMessage?: string
    type: string
    errors?: string
    onChange?: any
    placeholder?: string
    ref?: any
    key?: string
    onWheel?: any
    disabled?: boolean
  }
  
const CustomInput = (props: CustomInputProps) => {

    const {
        control,
        defaultValue,
        name,
        label,
        required,
        message,
        pattern,
        patternMessage,
        type,
        errors,
        onChange,
        onWheel,
        placeholder,
        ref,
        key,
        disabled
    } = props

    return (
        <div className='flex flex-col gap-3'>
            <label
                htmlFor={name}
                className='text-[#767676] font-bold'
            >
                {label}
            </label>

            <Controller
                control={control}
                name={name} 
                defaultValue={defaultValue}
                rules={{ 
                    required: required && message,
                    pattern: pattern && patternMessage ? {
                        value: pattern,
                        message: patternMessage
                      } : undefined
                }}
                render={({ field }) => {
                    return (
                        onChange || ref || onWheel || placeholder || disabled ? 
                            <input 
                                type={type} 
                                {...field} 
                                className={`${disabled ? "bg-gray-400" :"bg-white"} p-4 rounded-[50px] outline-none`}
                                onChange={onChange} 
                                placeholder={placeholder}
                                ref={ref}
                                key={key}
                                onWheel={onWheel}
                                disabled={disabled}
                                defaultValue={defaultValue}
                            />
                            :
                            <input 
                                type={type} 
                                {...field} 
                                className='p-4 rounded-[50px] bg-white outline-none'
                                key={key}
                            />
                        )
                    
                }
                }
            />

            <small className="text-xs text-rose-600 ">
                {errors}
            </small>
        </div>
    )
}

export default CustomInput