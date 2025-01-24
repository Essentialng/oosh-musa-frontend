import ChannelList from '../ChannelList'
import ListLink from '../ListLink'
import { FaFire, FaHome, FaMeetup, FaUser } from 'react-icons/fa'
import { MdChat, MdGroup } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { BsMenuUp } from 'react-icons/bs'
import { TbCalendarEvent, TbNewSection, TbPrismOff } from 'react-icons/tb'
import { useAppSelector } from '../../../redux/ReduxType'
import { FaPowerOff } from 'react-icons/fa6'
import { removeTokens } from '../../../utils/auth.utils'
import { useDispatch } from 'react-redux'
import { initialState, setUser } from '../../../redux/slice/user.slice'


const SidebarWeb = () => {

    const isDark = useAppSelector((state)=>state.theme.isDark)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useAppSelector(state=>state.user)
    const userId:string | null = user?._id
    const handleSignout = ()=>{
      removeTokens()
      dispatch(setUser(initialState))
      return navigate('/')
    }

  return (
    <div className='mb-10'>
        <ul className={`w-full sm:px-4 py-2 flex sm:flex-col flex-row items-start sm:justify-start justify-between gap-5 z-50`}>
            <ListLink Title="Home" Logo={<FaHome className={`w-3 h-3 sm:group-hover:w-4 sm:group-hover:h-4 transition-all duration-500`}/>} link=""/>
            <ListLink Title="Reel" Logo={<FaFire className={`w-3 h-3 sm:group-hover:w-4 sm:group-hover:h-4 transition-all duration-500`}/>} link="reel"/>
            
            {userId ? 
            <ListLink Title="chat" Logo={<MdChat className={`w-3 h-3 sm:group-hover:w-4 sm:group-hover:h-4 transition-all duration-500`}/>} link={`chat/${user?._id}`}/>
            : null}
            {userId ?
            <ListLink Title="Profile" Logo={<FaUser className={`w-3 h-3 sm:group-hover:w-4 sm:group-hover:h-4 transition-all duration-500`}/>} link={`profile/1234`}/>
            : null}
          </ul>


          {/* step two for channel */}
          <h1 className={`mt-5 hidden sm:inline-block ml-5 mb-4`}>My Channel</h1>
          <ul className={`w-full sm:px-4 py-2 flex sm:flex-col flex-row items-start sm:justify-start justify-between gap-5 z-50`}>
            {/* ----------This is the channel list---------- */}
            <ChannelList link='timeline' title='Timeline' logo={<TbPrismOff/>} />
            {
              userId ?
              <ChannelList link='meet' title='Meeting' logo={<FaMeetup/>} />
              :
              null
            }
            {
              userId ? 
              <ChannelList link='plan' title='Planner' logo={<TbCalendarEvent/>} />
              :
              null
            }
            <ChannelList link='news' title='News' logo={<TbNewSection/>} />
            <ChannelList link='live' title='Live' logo={<MdGroup/>} />
            <li className={`sm:w-full sm:hidden inline-block group ${isDark ? 'hover:bg-darkBg hover:text-white' : 'hover:bg-white hover:text-deepBg'} px-2 py-[1px] rounded-sm`}>
                <Link className="flex items-center justify-start gap-2 flex-col sm:flex-row" to='/'>
                <BsMenuUp/>
                <span>Menu</span>
                </Link>
            </li>
            <li className={`group ${isDark ? 'hover:bg-darkBg hover:text-white' : 'hover:bg-white hover:text-deepBg'} p-2 rounded-sm w-full`}>
                <button className={`flex items-center justify-start gap-2 flex-col sm:flex-row`} onClick={handleSignout}>
                  <FaPowerOff/>
                  <span>Logout</span>
                </button>
            </li>
          </ul>
    </div>
  )
}

export default SidebarWeb