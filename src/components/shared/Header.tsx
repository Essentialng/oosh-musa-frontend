import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {TbCarSuv, TbCirclesRelation, TbWorld} from 'react-icons/tb';
import {BsBriefcase, BsHouseCheck, BsMailbox} from 'react-icons/bs'
import {FaMoon, FaSearch, FaShoppingCart, FaUserAstronaut} from 'react-icons/fa'
import {IoBusiness, IoNavigateCircle} from 'react-icons/io5'
import { TfiShine } from "react-icons/tfi";
import { useAppDispatch, useAppSelector } from '../../redux/ReduxType';
import { toggle } from '../../redux/slice/themeSlice';
import MovingMoneyRate from '../../services/ExchangeRate';






const Header = () => {
  const imgSrc:string = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"


  // carossel items
  const items = [
      {id: 1, content: <div className='flex items-center gap-2'>
      <Link to='#'>ENews</Link>
      <TbWorld/>
  </div>},
  {id: 2, content: <div className='flex items-center gap-2'>
      <Link to='#'>EJobs</Link>
      <BsBriefcase/>
  </div>},
  {id: 3, content: <div className='flex items-center gap-2'>
      <Link to='#'>EStores</Link>
      <FaShoppingCart/>
  </div>},
  {id: 4, content: <div className='flex items-center gap-2'>
      <Link to='#'>ETalent</Link>
      <FaUserAstronaut/>
  </div>},
  {id: 5, content: <div className='flex items-center gap-2'>
      <Link to='#'>EBusiness</Link>
      <IoBusiness/>
  </div>},
  {id: 6, content: <div className='flex items-center gap-2'>
      <Link to='#'>EProperties</Link>
      <BsHouseCheck/>
  </div>},
  {id: 7, content: <div className='flex items-center gap-2'>
      <Link to='#'>ECars</Link>
      <TbCarSuv/>
  </div>},
  {id: 8, content: <div className='flex items-center gap-2'>
      <Link to='#'>Directory</Link>
      <IoNavigateCircle/>
  </div>},
  {id: 9, content: <div className='flex items-center gap-2'>
      <Link to='#'>Dating</Link>
      <TbCirclesRelation/>
  </div>},
  {id: 10, content: <div className='flex items-center gap-2'>
      <Link to='#'>Mail</Link>
      <BsMailbox/>
  </div>}
    ];




  // current state from redux
  const isDark = useAppSelector((state)=>state.toggleTheme.isDark)
  const dispatch = useAppDispatch()
  const [currentMenu, setCurrentMenu] = useState('/')


  // menu section handler function
  const handleSelectedMenu = (selection:string)=>{
      setCurrentMenu(selection)    
  }   



  // theme toggle handler function
  const handleDark = ()=>{
      dispatch(toggle())
  }




return (
  <div className={`w-[100%] text-sm ${isDark ? 'bg-darkBg transition-all duration-500 text-darkText' : 'bg-lightBg text-left'} px-10 w-[100%] mx-auto shadow-md`}>
   <div className='navbar'>
      {/* left section */}
      <div onClick={()=>{handleSelectedMenu('/')}} className="navbar-start text-indigo-500">
          <Link to='/' className="font-bold text-xl">OOSH</Link>
      </div>


      {/* middle section */}

      <div className="navbar-center lg:flex text-md">
          <label className={`input ${isDark ? 'bg-deepLight text-deepBg' : 'border-deepBg border-2'} sm:flex hidden items-center gap-2 w-[600px] rounded-full`}>
              <FaSearch className={`text-indigo-400 ${isDark ? 'text-darkBg' : 'text-[gray]'}`}/>
              <input className='grow' placeholder='search'/>
          </label>
          <div className={`swap swap-rotate px-10 ${currentMenu === 'notify' ? 'text-indigo-500' : ''}`} onClick={handleDark}>
              {isDark ? (
                  <TfiShine className='w-4 h-4 fill-current'/>
              ) : (
                  <FaMoon className='w-4 h-4 fill-current'/>
              )}
          </div>
      </div>

      {/* right section */}
  <div className="navbar-end flex items-center gap-2">
      <div className="avatar">
          <div className="w-6 rounded-full ring">
              <img src={imgSrc} alt='avatar'/>
          </div>
      </div>
      <Link to='/login' className="">Logout</Link>
  </div>
 

  </div>



  {/* other products */}
  <MovingMoneyRate isDark={isDark}/>

  {/* other products */}
  <div className="w-full overflow-hidden flex items-center justify-center gap-10 text-sm p-2">
      {items.map((eachItems, index)=>{
          return(
              <Link to={`/${eachItems.id}`} key={eachItems.id} className={`flex-shrink-0 ${isDark? 'text-deepText' : 'text-left'} hover:text-indigo-500`}>
                  {eachItems.content}
              </Link>
          )
      })}
  </div>
</div>
);
}

export default Header