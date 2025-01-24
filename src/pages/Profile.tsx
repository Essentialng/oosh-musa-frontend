import React, { useContext, useEffect, useRef, useState } from 'react'
import Background from '../assets/profile/back7.jpeg'
import Profile from '../assets/home/dog.svg'
import { FaChevronLeft, FaChevronRight, FaHashtag } from 'react-icons/fa'
// import { MdAdd } from 'react-icons/md'

// -----status--------
import Status1 from '../assets/home/game.svg'
import Status2 from '../assets/home/dog.svg'
import Status3 from '../assets/home/lantern.svg'
import Status4 from '../assets/home/game.svg'
import Status5 from '../assets/home/lantern.svg'
import Status6 from '../assets/home/map.svg'
import Status7 from '../assets/home/tower.svg'
import Feed from '../components/organisms/Feed'
import { useAppSelector } from '../redux/ReduxType'
import CreatePost from '../components/shared/CreatePost'
import { Link } from 'react-router-dom'
import { useMakeRequest } from '../hooks/useMakeRequest'
import { USER_URL } from '../constant/resource'
import { userInfo } from 'os'
import { useDispatch } from 'react-redux'
import { updateUserProfile } from '../redux/slice/user.slice'
// import { useQuery } from '@apollo/client'
// import { GET_USER } from '../graphql/query/user.query'
// import { GET_USER_POST } from '../graphql/query/post.query'
// -----status--------


interface IProfile{
    
}


const Proflle:React.FC<IProfile> = () => {
    
    const isDark = useAppSelector((state)=>state.theme.isDark)
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeSelection, setActiveSelection] = useState('post')
    const  auth = useAppSelector((state)=>state.user)
    const dispatch = useDispatch()
    const [userData, setUserData] = useState<any>({})
    // const [userPost, setUserPost] = useState<any>({})
    const post = useAppSelector((state)=>state.posts)
    const makeRequest = useMakeRequest()

    // const userQuery = useQuery(GET_USER, {
    //     variables: { id: auth.id }
    //   });
    
    useEffect(()=>{
        const fetchUserData = async()=>{
            const onSuccess = (data: any)=>{
                const userInfoData = data?.userExist
                setUserData({...userInfoData})
                dispatch(updateUserProfile(userInfoData))
            }
        
            const payload = {
                userId: auth._id
            }

            makeRequest(
                USER_URL + `/getUser`,
                'POST',
                payload,
                onSuccess,
                console.log,
                console.log
            )
        }
        fetchUserData()
    },[])


    const userPost = post?.posts?.filter((eachPost:any)=>{
        return eachPost?.author._id === auth?._id
    })


    // scroll functionality logic
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };


    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

     // selection functionality 
     const handleSelection = (selection:string)=>{
        setActiveSelection(selection)
    }


  return (
    <div className={`rounded-lg ${isDark ? 'text-darkText' : ' text-deepBg'} p-2 overflow-auto custom-scrollbar`}>
        {/* profile */}
        <section className='w-full h-[300px] relative bg-transparent'>
            <img className='object-cover h-full w-full' src={auth?.profile || Background} alt='background'/>
            <div className='absolute -bottom-8 left-0 flex items-start justify-start gap-5'>
                <img className='w-14 h-14 rounded-full object-cover shadow-md' src={auth?.avatar || Profile} alt="profile" />
                <div>
                    <h2 className={`text-2xl font-bold ${!isDark && 'text-lightText'} mb-2`}>{auth?.fullname || 'NA'}</h2>
                    <div className={`flex items-start flex-col shadow-md p-5 justify-start gap-2 font-semibold rounded-md ${isDark ? 'bg-deepBg text-lightText' : 'bg-deepLight text-deepBg'}`}>
                        <p className='text-sm'>{userData?.profession || 'N/A'}</p>
                        <p className='text-xs'>{userData?.username || 'NA'}</p>
                        <p className='text-xs'>{userData?.state}</p>
                        <p className='text-xs'>{userData?.country}</p>
                        <p className='text-xs'>{userData?.followers?.length || 0} <span className='text-blue-400'>followers</span></p>
                        <Link to={`/update/${auth._id}?id=${auth._id}&email=${auth.email}&step=stepOne`} className={`text-sm px-5 py-2 rounded-full ${isDark ? 'bg-lightBg text-deepBg' : 'bg-deepBg text-lightText'}`}>update</Link>
                    </div>
                </div>
            </div>
        </section>


    {/* create post */}
    <div className='pt-10'>
          <CreatePost userId={auth._id}/>
        </div>



    {/* status */}
    <section ref={scrollContainerRef} className={`mt-20 relative p-4 w-full carousel bg-transparent ${isDark? 'bg-deepBg':'bg-lightBg'} rounded-box space-x-4`}>
            {/* toggle button */}
            <button onClick={scrollLeft} className="sticky top-1/3 -left-4 z-10 p-2 btn btn-circle">
                <FaChevronLeft />
            </button>


            {/* status section */}
            <div className='w-[120px] h-[160px] carousel-item'>
                <img className='w-full h-full object-cover rounded-lg' src={Status1} alt="" />
                <p className='absolute bottom-0 text-center text-xs font-semibold'>Musa</p>
            </div>
            <div className='w-[120px] h-[160px] carousel-item'>
                <img className='w-full h-full object-cover rounded-lg' src={Status2} alt="" />
                <p className='absolute bottom-0 text-center text-xs font-semibold'>Galapagous</p>
            </div>
            <div className='w-[120px] h-[160px] carousel-item'>
                <img className='w-full h-full object-cover rounded-lg' src={Status3} alt="" />
                <p className='absolute bottom-0 text-center text-xs font-semibold'>Waqas</p>
            </div>
            <div className='w-[120px] h-[160px] carousel-item'>
                <img className='w-full h-full object-cover rounded-lg' src={Status4} alt="" />
                <p className='absolute bottom-0 text-center text-xs font-semibold'>Muze</p>
            </div>
            <div className='w-[120px] h-[160px] carousel-item'>
                <img className='w-full h-full object-cover rounded-lg' src={Status5} alt="" />
                <p className='absolute bottom-0 text-center text-xs font-semibold'>Dare</p>
            </div>
            <div className='w-[120px] h-[160px] carousel-item'>
                <img className='w-full h-full object-cover rounded-lg' src={Status6} alt="" />
                <p className='absolute bottom-0 text-center text-xs font-semibold'>Folawiyo</p>
            </div>
            <div className='w-[120px] h-[160px] carousel-item'>
                <img className='w-full h-full object-cover rounded-lg' src={Status7} alt="" />
                <p className='absolute bottom-0 text-center text-xs font-semibold'>Gbosko</p>
            </div>

            {/* toggle button */}
            <button onClick={scrollRight} className="sticky right-0 top-1/3 z-10 p-2 btn btn-circle">
                <FaChevronRight />
            </button>
        </section>


        {/* posts */}
        <section className='mt-20 text-sm'>
            <div className='w-full mt-20 border-b-2 sm:mb-10 mb-5 flex items-center justify-center gap-5'>
                <button onClick={()=>{handleSelection('post')}} className={`mb-5 ${activeSelection === 'post' ? 'border-b-2 border-b-indigo-500' : ""}`}>Posts</button>
                <button onClick={()=>{handleSelection('media')}} className={`mb-5 ${activeSelection === 'media' ? 'border-b-2 border-b-indigo-500' : ""}`}>Media</button>
                <button onClick={()=>{handleSelection('comments')}} className={`mb-5 ${activeSelection === 'comments' ? 'border-b-2 border-b-indigo-500' : ""}`}>Comments</button>
            </div>
            <div>
                {
                    activeSelection === 'post' && userPost?.map((post:any)=>{
                        return(
                            <Feed isDark={isDark} data={post}/>
                        )
                    })
                }
                {
                    activeSelection === 'media' && 
                    <div className='p-10 text-white'>
                        Media here
                    </div>
                }
                {
                    activeSelection === 'comments' &&
                    <div className='p-10 text-white'>
                        Comments here
                    </div>
                }
            </div>
        </section>
    </div>
  )
}

export default Proflle