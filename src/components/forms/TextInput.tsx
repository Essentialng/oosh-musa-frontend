import React, { Fragment } from 'react'
import { ITextInput } from '../../type/form.type'
import { MdCancel } from 'react-icons/md'

const TextInput:React.FC<ITextInput> = (
    {
        name,
        title,
        onChange,
        value,
        placeholder,
        fullWidth,
        icon,
        rounded,
        required,
        errors
    }
) => {
  return (
    <div className=
    {`${rounded ? `rounded-${rounded}` : ''} 
    ${fullWidth ? 'w-full' : ''}
     flex items-center justify-center border-2 gap-3 border-newtral_sec px-5 py-3`

    }>
        {title || icon && 
        <label 
        className='flex items-center justify-center gap-5' 
        htmlFor={name}
        >
            {title}
            {icon}
            {required ? <span className="text-red-500">*</span> : null}
        </label>}
        <
            input
            type='text'
            name={name}
            value={value || ''}
            placeholder={placeholder || ''}
            onChange={onChange}
            required={required}
            className='outline-none border-0'
        />
        {
            errors?.name === name && 
            <p className='flex items-center justify-center gap-2 text-sm'>
                <MdCancel className='w-3 h-3'/>
                {`${name} is required`}
            </p> 
        }
    </div>
  )
}

export default TextInput