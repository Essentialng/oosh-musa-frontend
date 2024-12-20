import React, { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../redux/ReduxType';
import { MdCancel, MdCreate, MdGpsFixed, MdImage, MdVideocam } from 'react-icons/md';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '../../constant/constants';
import { CgProfile } from 'react-icons/cg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { postSchema } from '../../validation/post.schema';
import toast from 'react-hot-toast';
import LoaderSpinner from '../molecules/Loader/Loader.spinner';
import { uploadToCloudinary } from '../../utils/upload.cloudinary';
// import { useMutation, useQuery } from '@apollo/client';
// import { CREATE_POST } from '../../graphql/mutation/post.mutation';
// import { GET_POST } from '../../graphql/query/post.query';
// import client from '../../graphql/client.apollo';
import { useMakeRequest } from '../../hooks/useMakeRequest';
import { POST_URL } from '../../constant/resource';
import { useDispatch } from 'react-redux';
import { addPost, setPosts } from '../../redux/slice/post.slice';

interface ICreatePost {
    userId?: string
}

const CreatePost:React.FC<ICreatePost> = ({
    userId
}) => {

    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [isVideo, setIsVideo] = useState(false);
    const isDark = useAppSelector(state=>state.theme.isDark)
    const User = useAppSelector((state)=>state.user)
    const [loading, setLoading] = useState(false)
    const postImageRef = useRef<HTMLInputElement>(null);
    const [postFile, setPostFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string | null>(null)
    const makeRequest = useMakeRequest()
    const dispatch = useDispatch()
    // const [createPost, {error}] = useMutation(CREATE_POST)


    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues: {
            author: User._id
        },
        resolver: yupResolver(postSchema)
    })

    const removeFile = () => {
        setPostFile(null);
        setFilePreview(null);
        setIsVideo(false);
        if (postImageRef.current) {
            postImageRef.current.value = '';
        }
    };


    // file handlers

    const handleUpload = () => {
        if (postImageRef.current) {
            postImageRef.current.click();
        }
    };


    const handleFile = (e:any) => {
        setFileError(null);
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            
            if (!ALLOWED_FILE_TYPES.includes(file.type)) {
                setFileError("Invalid file type. Please upload an image (JPEG, PNG, GIF) or video (MP4, QuickTime).");
                toast.error(`Invalid file type. Please upload an image (JPEG, PNG, GIF) or video (MP4, QuickTime).`)
                return;
            }
            
            
            
            if (file.size > MAX_FILE_SIZE) {
                setFileError(`File is too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
                toast.error(`File is too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)} MB.`)
                return;
            }

            setPostFile(file);
            const objectURL = URL.createObjectURL(file);
            setFilePreview(objectURL);
            setIsVideo(file.type.startsWith('video/'));
            
        }
    };

    const onSuccess = (data:any)=>{
        toast.success('Post created')
        dispatch(addPost(data.data))
    }
    
    const onSubmit = async(data:any)=>{
        setLoading(true)
        try {
            let payload = {...data, author: User._id,}
            if(!payload.author) return toast.error('Pls try again')
            if(postFile !== null){
                const fileURL = await uploadToCloudinary(postFile as File)  
                payload = {...data, media: fileURL.url}
            }
            await makeRequest(
                POST_URL + '/create',
                'POST',
                {...payload},
                onSuccess,
                console.log,
                ()=>{setLoading(false)}
            )
            // toast.success('Post created')

            // const postId = newPost?.data?.createPost?.id;
            // const postData = await getPost(newPost?.data?.createPost?.id)
            

        } catch (error:any) {
            toast.error(error.message || 'Error creating post, try again')
            console.log(error)
        }finally{
            setLoading(false)
            setFilePreview(null)
        }
    }

  return (
    <section className={`rounded-lg overflow-auto text-sm ${isDark ? 'bg-darkBg text-darkText' : 'bg-lightBg text-deepBg'} p-5 mt-10`}>
            
    {filePreview && (
        <div className='w-full h-[200px] overflow-hidden relative'>
            {isVideo ? (
                <video
                    src={filePreview}
                    controls
                    className='object-cover rounded-lg shadow-lg h-[230px] w-full'
                >
                    Your browser does not support the video tag.
                </video>
            ) : (
                <img src={filePreview} alt='post media' className='object-cover rounded-lg shadow-lg h-[230px] w-full' />
            )}
            <button 
                onClick={removeFile} 
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
            >
                <MdCancel size={24} />
            </button>
        </div>
        )}

       
        {fileError && (
            <div className="text-red-500 mt-2 mb-2">{fileError}</div>
        )}
        {/* post form */}
        <form 
            className='flex items-center mt-5 justify-center gap-3'
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* <img className='w-10 h-10 object-cover rounded-full' src={} alt="" /> */}
            {User?.avatar ? 
                <img src={User?.avatar} alt='post media' className='object-cover rounded-full shadow-lg h-[30px] w-[30px]' />
                :
                <CgProfile className='w-10 h-10'/>}
            <label className='p-3 bg-indigo-50 text-deepBg flex items-center gap-2 w-full rounded-full'>
            <input
                {...register('content')}
                type='text' 
                className='grow border-none outline-none bg-inherit' 
                placeholder="what's on your mind?" 
            />
                <MdCreate className='text-indigo-400 text-lg' />
            </label>
            <button className={`px-4 py-3 ${isDark ? 'bg-deepBg' : 'bg-deepLight'} rounded-full text-xs min-w-[100px]`}>
                {loading ? <LoaderSpinner color={'white'}/> : 'Create Post'}
            </button>
        </form>
        <div className='mt-4'>
            <div className={`px-5 w-full flex items-center justify-start gap-10`}>
                <div className='flex items-center gap-2 cursor-pointer hover:bg-gray-100 hover:text-gray-600 px-2 py-[2px] rounded-full'>
                    <MdImage className='text-blue-600 w-4 h-4' />
                    <input onChange={(e)=>{handleFile(e)}} className='hidden' ref={postImageRef} type='file' name='postAvatar' id='postAvatar' />
                    <span onClick={handleUpload}>Image/Video</span>
                </div>
                <div className='flex items-center gap-2 cursor-pointer hover:bg-gray-100 hover:text-gray-600 px-2 py-[2px] rounded-full'>
                    <MdVideocam className='text-red-600 w-4 h-4' />
                    Live
                </div>
                <div className='flex items-center gap-2 cursor-pointer hover:bg-gray-100 hover:text-gray-600 px-2 py-[2px] rounded-full'>
                    <MdGpsFixed className='text-indigo-600 w-4 h-4' />
                    Mention
                </div>
            </div>
        </div>
    </section>    
)
}

export default CreatePost