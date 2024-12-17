import React from 'react'
import NotFound from '../../../pages/404/NotFound'


interface INotFoundPage {
    children: React.ReactNode;
}


const CoverTemplate:React.FC<INotFoundPage> = ({children}) => {
  return (
    <div>
        {
            children
        }
    </div>
  )
}

export default CoverTemplate