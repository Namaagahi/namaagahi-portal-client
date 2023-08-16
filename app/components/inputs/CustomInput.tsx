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
        key
    } = props

    return (
        <div className='flex flex-col gap-3'>
            <label htmlFor={name} className='text-[#767676] font-bold'>{label}</label>
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
                        onChange || ref || onWheel || placeholder ? 
                            <input 
                                type={type} 
                                {...field} 
                                className='p-4 rounded-[50px] bg-white outline-none'
                                onChange={onChange} 
                                placeholder={placeholder}
                                ref={ref}
                                key={key}
                                onWheel={onWheel}
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
            <small className="text-xs text-rose-600 ">{errors}</small>
        </div>
    )
}

export default CustomInput