import React from 'react'

interface ISelectOptions{
    label: string;
    value: string | number;
}

interface ISelectInput{
    label?: string;
    name: string;
    theme?: string;
    required?: boolean;
    register?: any;
    options: ISelectOptions[];
    value?: string;
    onChange?: ()=>void
}

const SelectInput:React.FC<ISelectInput> = ({
    label,
    name,
    theme,
    required,
    options,
    register,
    onChange,
    value
}) => {
  return (
    <div className={`flex flex-col text-newtral_pri items-${theme} justify-${theme}`}>
        {label ? <label htmlFor={name}>{label}</label> : ''}
        <select {...register(`${name}`)} required={required} name={name} onChange={onChange} className={`rounded outline-none bg-inherit p-2 border border-neutral-500 text-neutral-700 w-[200px] outline-[2px]`}>
            {options.map((option) => (
            <option key={option.value} className='hover:text-white' value={option.value}>
                {option.label}
            </option>
            ))}
        </select>
    </div>
  )
}

export default SelectInput