import React from 'react'

interface IButton{
    text: string,
    type?: string,
    isDark: boolean
    gradient?:boolean,
    from?: string,
    to?: string,
    color?: string,
    transition?: boolean,
    transitionDuration?: string,
    rounded?: boolean
    width?: string,
    border?:boolean,
}

const Button:React.FC<IButton> = ({
    text,
    type,
    isDark,
    gradient,
    from,
    to,
    color,
    transition,
    transitionDuration,
    width,
    border
}) => {
    if(type === 'submit'){
        return (
        <div className={`w-full`}>
            <button className={`mt-4 w-${width} ${border ? 'border-neutral border-2' : ''} px-16 py-2 rounded-full sm:text-2xl text-xl font-semibold text-white bg-gradient-to-tr from-${from} to-${to} hover:bg-gradient-to-tl transition-${transition ? 'all' : ''} duration-${transitionDuration ? transitionDuration : ''}`}>{text}</button>
        </div>
      ) 
    }else{
        return (
            <div>
                <button className={`px-4 py-3 ${isDark ? 'bg-darkText text-deepBg' : 'bg-darkBg text-darkText'} rounded-full text-xs min-w-[100px]`}>{text}</button>
            </div>
        )
    }
}

export default Button