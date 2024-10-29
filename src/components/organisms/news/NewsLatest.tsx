import React from 'react'


interface INewsImage{
    newsImage:string,
    isDark:boolean,
    date:string,
    details:string,
    category:string,
    title:string
}


const NewsLatest:React.FC<INewsImage> = ({newsImage, isDark, title, date, details, category}) => {
  return (
    <div className={`flex flex-col items-center justify-start sm:w-1/3 w-1/2 gap-2 p-[4px] cursor-pointer mb-2 ${isDark ? 'hover:bg-darkBg' : 'hover:bg-lightBg'}`}>
              <img className='w-full' src={newsImage} alt="sampleNews" />
              <div className='w-full p-[4px]'>
                <h2 className='text-xs'>
                  {category} / {date}
                </h2>
                <h1 className='sm:text-lg text-sm font-semibold'>{title}</h1>
                <p className='sm:text-sm text-xs'>
                  {details}
                </p>
              </div>
            </div>
  )
}

export default NewsLatest