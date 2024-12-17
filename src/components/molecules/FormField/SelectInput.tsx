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
    options: ISelectOptions[];
}

const SelectInput:React.FC<ISelectInput> = ({
    label,
    name,
    theme,
    required,
    options
}) => {
  return (
    <div className={`flex flex-col items-${theme} justify-${theme}`}>
        {label ? <label htmlFor={name}>{label}</label> : ''}
        <select required={required} name={name} className={`rounded outline-none bg-inherit p-2 border border-neutral-500 w-[200px] outline-[2px]`}>
            {options.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
            ))}
        </select>
    </div>
  )
}

export default SelectInput