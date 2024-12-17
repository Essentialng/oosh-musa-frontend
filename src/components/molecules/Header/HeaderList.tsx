import { BsBriefcase, BsHouseCheck, BsMailbox } from "react-icons/bs";
import { FaShoppingCart, FaUserAstronaut } from "react-icons/fa";
import { IoBusiness, IoNavigateCircle } from "react-icons/io5";
import { TbCarSuv, TbCirclesRelation, TbWorld } from "react-icons/tb";
import { Link } from "react-router-dom";

export const headerItems = [
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