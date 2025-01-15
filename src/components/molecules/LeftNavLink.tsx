import React from 'react'

interface ILeftNavLink{
    Icon: any,
    handleSelection:any,
    label:string,
    value?:string,
    isActive?:boolean
    isDark?:boolean
}


const LeftNavLink:React.FC<ILeftNavLink> = ({Icon, value, handleSelection, label, isActive, isDark}) => {
 

    
 
    return (
    <div>
        <div onClick={()=>{handleSelection(label)}} className='relative cursor-pointer'>
            {Icon}
            <span className={`absolute -top-2 -right-2 bg-blue-500 text-white p-[2px] rounded-full text-xs`}>{value}</span>
        </div>
    </div>
  )
}

export default LeftNavLink