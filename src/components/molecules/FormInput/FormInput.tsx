import React from 'react';
import { UseFormRegister, RegisterOptions } from 'react-hook-form';
import ErrorText from '../ErrorText/ErrorText';

interface IFormInput {
    icon?: React.ReactNode;
    type?: string;
    name?: string;
    label?: string;
    register: UseFormRegister<any>;
    placeholder: string;
    id?: string;
    className?: string;
    validation?: RegisterOptions;
    error: any,
    required: boolean,
    theme?: string
}

const FormInput: React.FC<IFormInput> = ({
    icon,
    type = 'email',
    name,
    label,
    register,
    placeholder,
    className,
    id,
    validation = { required: true },
    error
}) => {
    if (label) {
        return (
            <div>
                <label className={className}>
                    {icon}
                    <input 
                        id={id} 
                        {...register(`${name}`, validation)} 
                        type={type} 
                        className="grow" 
                        placeholder={placeholder}
                    />
                </label>
                <ErrorText message={error.email?.message || 'This field is required'} />
            </div>
        );

    }else{

        return (
            <div>
                <input 
                    id={id} 
                    type={type} 
                    className={className} 
                    placeholder={placeholder}
                />
            </div>
        );
    }
    
};

export default FormInput;