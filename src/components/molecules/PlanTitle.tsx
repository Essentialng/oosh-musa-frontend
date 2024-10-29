import React from 'react'

interface IPlanTitle{
    logo: any;
    title: string;
}

const PlanTitle:React.FC<IPlanTitle> = ({logo, title}) => {
  return (
    <div className='flex items-center justify-start gap-4'>
        {logo}
        <p>{title}</p>
    </div>
  )
}

export default PlanTitle