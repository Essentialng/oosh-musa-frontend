import React from 'react'
import ErrorText from '../ErrorText/ErrorText'

interface IAuthForm{
    label?: string;
    icon?: any;
    id?:string;
    register: any;
    name: string;
    type: string;
    placeholder: string;
    errors: any;
    required: boolean;
}

const FormInput:React.FC<IAuthForm> = ({
    label,
    icon,
    id,
    register,
    name,
    type,
    placeholder,
    errors,
    required
}) => {
  return (
    <div className='w-full'>
        <label className={`input bg-indigo-50 flex items-center gap-2 w-full rounded-full`}>
            {icon}
            <input 
                id={id} 
                {...register(`${name}`, {'required': required})} 
                type={type} 
                className="w-full" 
                placeholder={placeholder}
            />
        </label>
        {errors[name] && <ErrorText message={errors[name].message || 'This field is required'} />}
    </div>
  )
}

export default FormInput