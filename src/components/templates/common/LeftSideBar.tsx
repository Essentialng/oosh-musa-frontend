import { useEffect, useState } from "react"
import { BsMenuUp } from "react-icons/bs"
import { Link } from "react-router-dom"
import ListLink from "../../organisms/ListLink"
import { FaFire, FaHome, FaMeetup, FaUser } from "react-icons/fa"
import {MdChat, MdGroup} from 'react-icons/md'
import ChannelList from "../../organisms/ChannelList"
import { TbCalendarEvent, TbNewSection, TbPrismOff } from "react-icons/tb"
import { useCheckScreenSize } from "../../../hooks/useCheckScreenSize"
import SidebarMobile from "../../organisms/sidebar/sidebar.mobile"
import SidebarWeb from "../../organisms/sidebar/sidebar.web"




export interface ILeftSideProps{
  isDark:boolean,
  currentSelection:string
  menu:any
}



const LeftSideBar:React.FC<ILeftSideProps> = ({isDark, currentSelection, menu}) => {

  const [currScreen, setCurrentScreen] = useState()
  const {isMobile} = useCheckScreenSize()

return (
  <div className={`text-sm`}>
    {
      isMobile ?
      <SidebarMobile/>
      : 
      <SidebarWeb/>
    }
  </div>
)
}

export default LeftSideBar


