import React from 'react'


interface INewsDeep{
    newsImage:string,
    isDark:boolean,
    date?:string,
    details?:string,
    category?:string,
    title:string,
    small?:boolean
}


const NewsDeep:React.FC<INewsDeep> = ({newsImage, isDark, date, details, category, title, small}) => {
  return (
    <div className={`${small ? 'h-[200px]' : 'h-[400px]'} relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-b after:from-transparent after:to-black`}>
          <img className='h-full object-cover' src={newsImage} alt="politics" />
          <div className={`text-white z-30 absolute ${small ? 'bottom-5 left-5':'bottom-10 left-10'}`}>
            {date && <h2 className={`${small ? 'text-xs' : 'text-sm'}`}>{category} / {date}</h2>}
            <h1 className={`${small ? 'sm:text-xl text-lg' : 'sm:text-3xl text-xl'} font-semibold`}>
              {title}
            </h1>
            <p className={`${small ? 'text-xs' : 'text-sm'}`}>
              {details}
            </p>
          </div>
        </div>
  )
}

export default NewsDeep