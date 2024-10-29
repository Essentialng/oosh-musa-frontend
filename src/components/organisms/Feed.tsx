import React, { useState } from 'react'
import { MdMoreVert } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { FaHeart, FaShare } from 'react-icons/fa'
import { BsChatDots, BsCheck } from "react-icons/bs";
import Comment from '../molecules/Comment';
import '../../styles/custom.css'



interface IFeedProps{
    isDark: boolean;
    PostImg?:string
}

const imgSrc:string = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"

const Feed:React.FC<IFeedProps> = ({isDark, PostImg}) => {

    const [showComment,setShowComment] = useState(false)
    const navigate = useNavigate()

    const handleShow = ()=>{
        setShowComment(!showComment)
    }


    const handleProfile = ()=>{
        navigate('/user/1234')
    }


    return (
    <div className={`rounded-lg mb-10 p-2 ${isDark ? 'bg-darkBg text-darkText' : 'bg-lightBg text-deepBg'}`}>
                {/* profile */}
                <div className='flex items-center justify-between'>
                    <div className='flex items-center justify-start gap-3'>
                    <img onClick={handleProfile} className='w-8 h-8 object-cover rounded-full cursor-pointer' src={imgSrc} alt="" />
                    <BsCheck className='p-[1px] bg-blue-400 rounded-full w-4 h-4'/>
                    <BsCheck className='p-[1px] bg-green-400 rounded-full w-4 h-4'/>
                    <div>
                        <h3 className='font-semibold'>Galapagous</h3>
                        <p>2 days ago</p>
                    </div>
                    </div>
                    <div className={`dropdown dropdown-end ${isDark ? 'text-deepBg' : 'bg-lightBg'}`}>
                        <div tabIndex={0} role="button" className="m-1">
                            <MdMoreVert/>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow">
                            <li><Link to='#'>Share</Link></li>
                            <li><Link to='#'>connect</Link></li>
                            <li><Link to='#'>report</Link></li>
                            <li><Link to='#'>block</Link></li>
                        </ul>
                    </div>
                </div>



                {/* content */}
                <div className='mt-5'>
                    <p className='mb-2'>
                        Turn your condition into pain, turn your pain into determination, turn your determination into action, turn our action into knowledge, 
                        turn your knowledge into the life that you want. Its not hard to change your life, you just have to be completely fed up with where you are. 
                    </p>
                    <img className='h-[350px] object-cover w-full' src={PostImg || imgSrc} alt="" />
                </div>

                {/* comments */}
                <div className='mt-2 flex items-center justify-start'>
                    <div className={`flex items-center gap-1 cursor-pointer  px-4 py-[5px] ${isDark ? 'hover:bg-deepBg' : 'hover:bg-gray-100' } rounded-full`}>
                        35
                        <span>Like</span>
                        <FaHeart className='text-red-500 w-4 h-4'/>
                    </div>
                    <div className={`flex items-center gap-1 cursor-pointer px-4 py-[5px] ${isDark ? 'hover:bg-deepBg' : 'hover:bg-gray-100' } rounded-full`}>
                        20
                        <span>Comment</span>
                        <BsChatDots onClick={handleShow} className='text-gray-300 w-4 h-4'/>
                    </div>
                    <div className={`flex items-center gap-1 cursor-pointer px-4 py-[5px] ${isDark ? 'hover:bg-deepBg' : 'hover:bg-gray-100' } rounded-full`}>
                        5
                        <span>Share</span>
                        <FaShare className='text-gray-500 w-4 h-4'/>
                    </div>
                </div>


                {/* comments */}
                {showComment && <div className='mt-5 px-4 transition-all duration-500 ease-linear'>
                    <hr className='h-[2px] bg-deepLight mb-2 rounded-full'/>
                    <div className='custom-scrollbar h-[200px] overflow-auto'>
                    <Comment isDark={isDark} id={1} name='Muhammed Musa' imgSrc={imgSrc} timestamp='1 day ago' content='This reminded me of federich nitche statement on the essence of working with people. we all resent outselves.'/>
                    <Comment isDark={isDark} id={1} name='Muhammed Musa' imgSrc={imgSrc} timestamp='1 day ago' content='This reminded me of federich nitche statement on the essence of working with people. we all resent outselves.'/>
                    </div>
                    <div className='flex items-center gap-3 justify-center py-3'>
                    <label className='input text-gray-600 flex items-center gap-2 w-full px-2 rounded-full'>
                    <input type='text' className='w-full' placeholder=''/>
                     </label>
                    <button className={`mt-2 flex items-center gap-2 border-[2px] rounded-full px-3 py-2 ${isDark ? 'text-lightBg border-lightBg':'text-deepBg border-deepBg'}`}>
                        comment
                    </button>
                    </div>
                </div>}
            </div>
  )
}

export default Feed