import React from 'react'
import PlanLeftSidebar from './PlanLeftSidebar'
import PlanRightSidebar from './PlanRightSidebar'
import Header from '../../shared/Header'
import { useAppSelector } from '../../../redux/ReduxType'


interface IPlanLayout{
  children: React.ReactNode
}


const PlanTemplate:React.FC<IPlanLayout> = ({children}) => {

  const isDark = useAppSelector((state)=>state.toggleTheme.isDark)

  return (
    <div className={`w-[100%] h-[100vh] ${isDark ? 'bg-deepBg transition-all duration-500 text-darkText' : 'bg-deepLight text-left'} overflow-hidden custom-scrollbar`}>
        <Header/>
        <div className={`flex items-start justify-between relative`}>
            <div className={`custom-scrollbar sm:w-1/6 w-full sm:h-[calc(100vh-100px)] h-fit py-3 px-2 overflow-auto sm:relative absolute bottom-0 z-50 sm:block ${isDark ? 'sm:bg-inherit bg-deepBg' : 'sm:bg-inherit bg-white'}`}>
                <PlanLeftSidebar />
            </div>
            <div className={`relative z-30 sm:w-4/6 w-full ${isDark ? 'text-darkText' : 'text-deepBg'} bg-gray overflow-auto h-[calc(100vh-120px)] custom-scrollbar`}>
                {
                    children
                }
            </div>
            <div className={`custom-scrollbar px-2 w-[22%] ${isDark ? 'text-darkText' : ' text-deepBg'} h-[calc(100vh-100px)] py-5 overflow-auto hidden sm:block`}>
                <PlanRightSidebar/>
            </div>
        </div>
    </div>
  )
}

export default PlanTemplate