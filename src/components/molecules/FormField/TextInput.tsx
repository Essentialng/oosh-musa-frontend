import React from 'react'

interface ITextInput{
    label?: string;
    name: string;
    type: string;
    placeholder?: string;
    theme?: string;
    required?:boolean;
    register:any;
    errors?:any;
}

const TextInput:React.FC<ITextInput> = ({
    label,
    name,
    type,
    placeholder,
    theme,
    required,
    register,
    errors
}) => {
  return (
    <div>
          {label && <label className="block text-sm font-medium mb-1">{label}</label>}
          <input
            {...register(name, { required: `${name} is required` })}
            className="w-full p-2 border rounded text-gray-700"
            type={type}
            placeholder={placeholder}
          />
          {errors[name] && (
            <span className="text-red-500 text-sm">{errors[name]?.message}</span>
          )}
        </div>
  )
}

export default TextInput