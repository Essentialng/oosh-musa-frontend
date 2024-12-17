import React from 'react'
import Header from '../../shared/Header'
import { useAppSelector } from '../../../redux/ReduxType'
import LeftSideBar from '../common/LeftSideBar'
import RightSideBar from '../common/RightSideBar'

interface IFeedLayout{
    children: React.ReactNode
}

const FeedTemplate:React.FC<IFeedLayout> = ({children}) => {

  const isDark = useAppSelector((state)=>state.theme.isDark)
    const handleMenu = (path: string) => {
    }


    return (
    <div className={`w-[100%] h-[100vh] ${isDark ? 'bg-deepBg transition-all duration-500 text-darkText' : 'bg-deepLight text-left'} overflow-hidden custom-scrollbar`}>
        <Header/>
        <div className={`flex items-start justify-between relative`}>
            <div className={`custom-scrollbar sm:w-1/6 w-full sm:h-[calc(100vh-100px)] h-fit py-3 px-2 overflow-auto sm:relative absolute bottom-0 z-50 sm:block ${isDark ? 'sm:bg-inherit bg-deepBg' : 'sm:bg-inherit bg-white'}`}>
                <LeftSideBar isDark={isDark} currentSelection='/' menu={handleMenu}/>
            </div>
            <div className={`relative z-30 sm:w-3/5 w-full rounded-lg ${isDark ? 'text-darkText' : 'text-deepBg'} bg-gray overflow-auto h-[calc(100vh-120px)] custom-scrollbar`}>
                {
                    children
                }
            </div>
            <div className={`custom-scrollbar w-1/6 ${isDark ? 'text-darkText' : ' text-deepBg'} h-[calc(100vh-100px)] py-5 px-2 overflow-auto hidden sm:block`}>
                <RightSideBar/>
            </div>
        </div>
    </div>
  )
}

export default FeedTemplate