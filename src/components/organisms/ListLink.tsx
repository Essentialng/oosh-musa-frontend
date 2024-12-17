import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../redux/ReduxType';



export interface ILink{
    Title:string;
    Logo?:any;
    link?:string
}


const ListLink:React.FC<ILink> = ({Logo, Title, link}) => {
  
    const isDark = useAppSelector((state)=>state.theme.isDark)

    return (
    <li className={`group ${isDark ? 'hover:bg-darkBg hover:text-white' : 'hover:bg-white hover:text-deepBg'} p-2 rounded-sm ${Title === 'More' ? 'sm:hidden' : ''} w-full`}>
        <Link className={`flex items-center sm:flex-row flex-col justify-start gap-2`} to={`/${link}`}>
            {Logo}
            <span className={``}>{Title}</span>
        </Link>
    </li>
  )
}

export default ListLink