import React, { useCallback, useEffect, useState } from 'react'
import { MdMoreVert } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { FaHeart, FaShare } from 'react-icons/fa'
import { BsChatDots, BsCheck } from "react-icons/bs";
import Comment from '../molecules/Comment';
import '../../styles/custom.css'
import Reaction from '../molecules/Reaction/Reaction';
import { GoDotFill } from "react-icons/go";
import ProfileIMG from '../../assets/others/avatar.jpeg'
import { useAppDispatch, useAppSelector } from '../../redux/ReduxType';
import { useMakeRequest } from '../../hooks/useMakeRequest';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { commentSchema } from '../../validation/post.schema';
import { COMMENT_URL, POST_URL } from '../../constant/resource';
import toast from 'react-hot-toast';
import LoaderSpinner from '../molecules/Loader/Loader.spinner';
import { useFetchData } from '../../hooks/useFetchData';
import { getPostTimestamp } from '../../utils/day.format';
import { addComment, setPosts, updatePost } from '../../redux/slice/post.slice';


interface IFeedProps{
    isDark: boolean;
    data?:any
}


const Feed:React.FC<IFeedProps> = ({isDark, data}) => {

    const [showComment,setShowComment] = useState(false)
    const postURL = POST_URL + '/all'
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const user = useAppSelector(state=>state.user)
    const {data:refetchData, error, loading:refreshLoading, refetch, pagination} = useFetchData<any>(
        postURL
    )

    const makeRequest = useMakeRequest()
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: {errors}
    } = useForm({
        defaultValues: {
            post: data?._id,
            author: user?._id,
        },
        resolver: yupResolver(commentSchema)
    })
    const currentWord = watch('content')
    // ---- comment and refetch to update ----
    useEffect(()=>{
        
    }, [])

    const handleShow = ()=>{
        setShowComment(!showComment)
    }

    const handleShare = ()=>{
        alert('Share triggered')
    }


    const handleLike = ()=>{
        if(!user) return toast.error('Signin to continue')
        const payload = {
            userId: user._id,
            postId : data?._id
        }
        const onSuccess = (data:any)=>{
            dispatch(setPosts(data?.data?.allPost))
        }

        const onFailure = (data:any)=>{
            toast.error('faliure')
        }

        const onFinal = ()=>{
            console.log('done')
        }

        makeRequest(
            POST_URL + '/like',
            'POST',
            payload,
            onSuccess,
            onFailure,
            onFinal
        )
    }


    const handleMakeComment = useCallback((data:any)=>{
        setLoading(true)
        const payload = {
            ...data,
        }
        const onSuccess = async(data:any)=>{
            dispatch(setPosts(data?.data?.post))
            toast.success('success')
        }
        const onFinal = ()=>{
            reset()
            refetch()
            setLoading(false)
        }
        // --- make your API call here ---
        try {
            makeRequest(
                COMMENT_URL,
                "POST",
                payload,
                onSuccess,
                console.log,
                onFinal   
            )
        } catch (error) {
            toast.error('Error creating post. try again later')
        }
    }, [makeRequest,reset])

    const handleProfile = ()=>{
        if(user?._id === data?.author?._id){
            navigate(`/profile/user._id`)
        }else{
            navigate(`/user/${data.author._id}`)
        }
    }


    return (
    <div className={`rounded-lg mb-10 p-2 ${isDark ? 'bg-darkBg text-darkText' : 'bg-lightBg text-deepBg'}`}>
                {/* profile */}
                <div className='flex items-center justify-between'>
                    <div className='flex items-start justify-start gap-3'>
                        <img onClick={handleProfile} className='w-8 h-8 object-cover rounded-full cursor-pointer' src={data?.author?.avatar || ProfileIMG} alt="" />
                        <div className='flex flex-col items-start gap-[1px]'>
                            <div className='flex gap-[2px] items-center justify-center'>
                                <div className='flex'>
                                <BsCheck className='bg-blue-400 rounded-full w-3 h-3'/>
                                <BsCheck className='bg-green-400 rounded-full w-3 h-3'/>
                                </div>
                                <h3 className='font-semibold text-sm'>{data?.author?.username}</h3>
                            </div>
                            <div>
                                <div className='flex items-center justify-start gap-5'>
                                    <p className='text-xs'>{getPostTimestamp(data.created_at)} ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`dropdown dropdown-end ${isDark ? 'text-deepBg' : 'bg-lightBg'} relative z-50`}>
                        <div tabIndex={0} role="button" className="m-1">
                            <MdMoreVert className={`${isDark ? 'text-white' : 'text-deepBg'}`}/>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow">
                            <li><Link to='#'>Share</Link></li>
                            <li><Link to='#'>connect</Link></li>
                            <li><Link to='#'>report</Link></li>
                            <li><Link to='#'>block</Link></li>
                        </ul>
                    </div>
                </div>

                <div className='flex items-center justify-start gap-10 mt-2'>
                        <div className='flex items-center gap-5'>
                            <div className='flex items-center group'>
                                <GoDotFill className='group-hover:text-purple-500'/>
                                <Link to="#">Earn</Link>
                            </div>
                            <div className='flex items-center group'>
                                <GoDotFill className='group-hover:text-purple-500'/>
                                <Link to="#">Connect</Link>
                            </div>
                            <div className='flex items-center group'>
                                <GoDotFill className='group-hover:text-purple-500'/>
                                <Link to="#">Message</Link>
                            </div>
                        </div>
                    </div>



                {/* content */}
                <div className='mt-5'>
                    <p className='mb-2'>
                       {
                        data?.content
                       }
                    </p>
                    {data?.media && <img className='h-[350px] object-cover bg-center w-full' src={data?.media} alt="" />}
                </div>

                {/* comments */}
                <div className='mt-2 flex items-center justify-start'>
                    <Reaction onClick={handleLike} title='Like' value={data?.likes?.length} isDark={isDark} logo={<FaHeart className='text-red-500 w-4 h-4'/>}/>
                    <Reaction onClick={handleShow} title='Comment' value={data?.comment?.length} isDark={isDark} logo={<BsChatDots className='text-gray-300 w-4 h-4'/>}/>
                    <Reaction onClick={handleShare} title='Share' value={data?.share?.length} isDark={isDark} logo={<FaShare className='text-gray-300 w-4 h-4'/>}/>
                </div>


                {/* comments */}
                {showComment ? <div className='mt-5 px-4 transition-all duration-500 ease-linear'>
                    <hr className='h-auto bg-deepLight mb-2 rounded-full'/>
                    <div className='custom-scrollbar overflow-auto transition-all duration-500 h-[200px]'>
                        {
                            data?.comment?.map((eachComment: any)=>{
                                return(
                                    <Comment isDark={isDark} id={eachComment?._id} name={eachComment?.author?.fullname} authorId={eachComment?.author?._id} imgSrc={eachComment?.author?.avatar} timestamp={eachComment?.created_at} content={eachComment?.content} likes={eachComment?.likes} dislikes={eachComment?.dislikes}/>
                                )
                            })
                        }
                    </div>
                    <form onSubmit={handleSubmit(handleMakeComment)} className='flex items-center gap-3 justify-center py-3'>
                            <input
                                type='text'
                                className={`text-gray-600 flex items-center outline-none text-sm gap-2 w-full px-2 rounded-full ${isDark ? '' : 'border-darkBg border-2'} p-3`}
                                {...register("content")}
                                placeholder=''
                            />
                        <button
                            className={`flex items-center gap-2 border-[2px] rounded-full px-3 py-2 ${isDark ? 'text-lightBg border-lightBg hover:bg-deepLight hover:text-deepBg' : 'text-deepBg border-deepBg hover:bg-deepBg hover:text-darkText'}`}
                            type='submit'
                        >
                            {loading ? <LoaderSpinner color={'white'}/> : 'comment'}
                        </button>
                    </form>
                </div> : null}
                <div>
                    {errors?.content ? <p className='text-center text-red-500'>{errors?.content?.message}</p> : null}
                    {errors?.content ? <p>{100 - Number(currentWord?.length) || 0}</p> : null}
                </div>
            </div>
  )
}

export default Feed