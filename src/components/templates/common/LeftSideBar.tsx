import { useState } from "react"
import { BsMenuUp } from "react-icons/bs"
import { Link } from "react-router-dom"
import ListLink from "../../organisms/ListLink"
import { FaFire, FaHome, FaMeetup, FaUser } from "react-icons/fa"
import {MdChat, MdGroup} from 'react-icons/md'
import ChannelList from "../../organisms/ChannelList"
import { TbCalendarEvent, TbNewSection, TbPrismOff } from "react-icons/tb"




interface ILeftSideProps{
  isDark:boolean,
  currentSelection:string
  menu:any
}



const LeftSideBar:React.FC<ILeftSideProps> = ({isDark, currentSelection, menu}) => {

  const [toggleMenu, setToggleMenu] = useState(true)


  const openMenu = ()=>{
      setToggleMenu(!toggleMenu)
  }


return (
  <div className={`text-sm`}>
          <ul className={`w-full sm:px-4 py-2 flex sm:flex-col flex-row items-start sm:justify-start justify-between gap-5 z-50 ${toggleMenu ? '' : 'hidden sm:flex'}`}>
            <ListLink Title="Home" Logo={<FaHome className={`w-3 h-3 sm:group-hover:w-4 sm:group-hover:h-4 transition-all duration-500`}/>} link=""/>
            <ListLink Title="Reel" Logo={<FaFire className={`w-3 h-3 sm:group-hover:w-4 sm:group-hover:h-4 transition-all duration-500`}/>} link="reel"/>
            <ListLink Title="chat" Logo={<MdChat className={`w-3 h-3 sm:group-hover:w-4 sm:group-hover:h-4 transition-all duration-500`}/>} link={`chat/1234`}/>
            <ListLink Title="Profile" Logo={<FaUser className={`w-3 h-3 sm:group-hover:w-4 sm:group-hover:h-4 transition-all duration-500`}/>} link={`profile/1234`}/>
            <li className={`sm:hidden inline-block group ${isDark ? 'hover:bg-darkBg hover:text-white' : 'hover:bg-white hover:text-deepBg'} px-2 py-[1px] rounded-sm`} onClick={openMenu}>
                <Link className="flex items-center justify-start gap-2 flex-col sm:flex-row" to='/'>
                <BsMenuUp/>
                <span>Menu</span>
                </Link>
            </li>
          </ul>


          {/* step two for channel */}
          <h1 className={`mt-5 hidden sm:inline-block ml-5 mb-4`}>My Channel</h1>
          <ul className={`w-full sm:px-4 py-2 flex sm:flex-col flex-row items-start sm:justify-start justify-between gap-5 z-50 ${toggleMenu ? 'hidden sm:flex sm:flex-col' : ''}`}>
           {/* <ul className={`w-full flex sm:px-4 items-start sm:justify-start justify-between gap-5 py-2 sm:flex-col z-50 px-5 sm:bg-inherit ${toggleMenu ? 'hidden sm:flex sm:flex-col' : ''}`}>  */}
            <ChannelList currentMenu={currentSelection} link='timeline' title='Timeline' logo={<TbPrismOff/>} menu={menu} />
            <ChannelList currentMenu={currentSelection} link='meet' title='Meeting' logo={<FaMeetup/>} menu={menu} />
            <ChannelList currentMenu={currentSelection} link='plan' title='Planner' logo={<TbCalendarEvent/>} menu={menu} />
            <ChannelList currentMenu={currentSelection} link='news' title='News' logo={<TbNewSection/>} menu={menu} />
            <ChannelList currentMenu={currentSelection} link='live' title='Live' logo={<MdGroup/>} menu={menu} />
            <li className={`sm:w-full sm:hidden inline-block group ${isDark ? 'hover:bg-darkBg hover:text-white' : 'hover:bg-white hover:text-deepBg'} px-2 py-[1px] rounded-sm`} onClick={openMenu}>
                <Link className="flex items-center justify-start gap-2 flex-col sm:flex-row" to='/'>
                <BsMenuUp/>
                <span>Menu</span>
                </Link>
            </li>
          </ul>
        </div>
)
}

export default LeftSideBar


