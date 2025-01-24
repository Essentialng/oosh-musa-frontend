import React from 'react'

interface ITextArea{
    label?: string;
    name: string;
    placeholder?: string;
    theme?: string;
    required?: boolean;
    height?: number;
    width?: string;
}

const TextArea:React.FC<ITextArea> = ({
    label,
    name,
    placeholder,
    theme,
    height,
    required,
    width
}) => {
  return (
    <div className={`flex flex-col items-${theme} justify-${theme}`}>
        {label ? <label htmlFor={name}>{label}</label> : ''}
        <textarea required={required} name={name} className={`rounded outline-none bg-inherit p-2 border border-neutral-500 w-${width || '[200px]'} outline-[2px] ${height? `h-[${height}px]` : ''}`} placeholder={placeholder ? placeholder : ''} />
    </div>
  )
}

export default TextArea