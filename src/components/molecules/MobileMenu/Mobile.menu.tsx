import React from 'react'
import { Link } from 'react-router-dom'
import { ILink } from '../../organisms/ListLink'


const MobileMenu:React.FC<ILink> = ({Logo, Title, link}) => {
  return (
    <li className='list-none'>
        <Link className='flex flex-col items-center cursor-pointer w-8 h-8' to={`/${link}`}>
            <div className=''>
              {Logo}
            </div>
            <span className='text-xs'>{Title}</span>
        </Link>
    </li>
  )
}

export default MobileMenu