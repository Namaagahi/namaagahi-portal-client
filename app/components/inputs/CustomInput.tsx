import { Control, Controller, FieldError } from 'react-hook-form'

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
    errors?: string | any
    onChange?: any
    placeholder?: string
    ref?: any
    key?: string | number
    onWheel?: any
    disabled?: boolean
    className: string,
    colSpan? : string
    autoComplete?: string
    isHidden?: boolean
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
        disabled,
        className,
        colSpan,
        autoComplete,
        isHidden
    } = props

    return (
        <div className={`${!isHidden? 'block' : 'hidden'} flex flex-col gap-3 ${colSpan}`}>
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
                                className={className}
                                onChange={onChange} 
                                placeholder={placeholder}
                                ref={ref}
                                key={key}
                                onWheel={onWheel}
                                disabled={disabled}
                                defaultValue={defaultValue}
                                autoComplete={autoComplete}
                            />
                            :
                            <input 
                                type={type} 
                                {...field} 
                                className={className}
                                key={key}
                                autoComplete={autoComplete}
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