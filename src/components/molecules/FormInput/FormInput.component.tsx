import React from 'react';
import ErrorText from '../ErrorText/ErrorText';

interface Props {
  name: string;
  register: any;
  errors?: any;
  errorMessage?: string;
  type: string;
  placeholder: string;
  icon: any;
  required: boolean;
}

const FormInput: React.FC<Props> = ({
  name,
  register,
  errors,
  type,
  placeholder,
  icon,
  required
}) => {
  return (
    <div className='w-full'>
    <div className="w-full px-4 py-2 bg-indigo-50 rounded-full">
      <div className="bg-indigo-50 flex items-center gap-2 w-full rounded-full">
        {icon && <span className="icon">{icon}</span>}
        <input
          className="w-full p-[2px] bg-inherit focus:border-none outline-none active:border-none"
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name, { required })}
          />
      </div>
    </div>
      {errors?.[name] && <ErrorText message={errors[name]?.message || 'This field is required'} />}
    </div>
  );
};

export default FormInput;
