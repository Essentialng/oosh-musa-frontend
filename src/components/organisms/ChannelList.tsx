import React from 'react'
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/ReduxType';




interface IChannel{
    title:string;
    image?:string;
    logo?:any;
    currentMenu:string;
    menu:any;
    link:string;
}


const ChannelList:React.FC<IChannel> = ({title, logo,currentMenu, image, menu, link}) => {
  
  const isDark = useAppSelector((state)=>state.toggleTheme.isDark)
  

  return (
    <li className={`group ${isDark ? 'hover:bg-darkBg hover:text-white' : 'hover:bg-white hover:text-deepBg'} p-2 rounded-sm w-full`} onClick={()=>{menu(title.toLowerCase())}}>
        <Link className={`flex items-center justify-start gap-2 flex-col sm:flex-row`} to={`/${link}`}>
        {image ? <img className={`w-3 h-3 rounded-full`} src={image} alt='group one'/> : logo}
        <span className={``}>{title}</span>
        </Link>
    </li>
  )
}

export default ChannelList