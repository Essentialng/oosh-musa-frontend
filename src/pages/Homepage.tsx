import React, { ChangeEvent, useRef, useState } from 'react';
import { MdAdd, MdCancel, MdCreate, MdGpsFixed, MdImage, MdVideocam } from 'react-icons/md';
import '../styles/custom.css';

// post images
import PostImage from '../assets/home/lantern.svg';
import PostImage2 from '../assets/home/dog.svg';
import PostImage3 from '../assets/home/read.svg';
import PostImage5 from '../assets/home/tower.svg';

// ------ imports --------
import Status1 from '../assets/home/dew.jpg';
import Status2 from '../assets/home/dew2.jpg';
import Status3 from '../assets/home/map.svg';
import Status4 from '../assets/home/game.svg';
import Status5 from '../assets/home/lantern.svg';
import Status6 from '../assets/home/whale.svg';
import Status7 from '../assets/home/tower.svg';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Feed from '../components/organisms/Feed';
import StatusImg from '../components/molecules/StatusImg';
import { useAppSelector } from '../redux/ReduxType';
// ------ imports --------

const imgSrc: string = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";


const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/quicktime'];


const Homepage = () => {

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const postImageRef = useRef<HTMLInputElement>(null);
    const [postData, setPostData] = useState<string>('');
    const [postFile, setPostFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [fileError, setFileError] = useState<string | null>(null)
    const [isVideo, setIsVideo] = useState(false);
    const isDark = useAppSelector(state=>state.toggleTheme.isDark)

    // dummy data
    const [statusList] = React.useState([
        { id: 1, img: Status1, title: 'Camping' },
        { id: 2, img: Status2, title: 'Dog Walking' },
        { id: 3, img: Status3, title: 'Freelance' },
        { id: 4, img: Status4, title: 'Feestyle' }
    ]);

    const [statusList2] = React.useState([
        { id: 1, img: Status5, title: 'Camping' },
        { id: 2, img: Status6, title: 'Dog Walking' },
        { id: 3, img: Status7, title: 'Freelance' },
        { id: 4, img: Status4, title: 'Feestyle' }
    ]);



    // file handlers

    const handleUpload = () => {
        if (postImageRef.current) {
            postImageRef.current.click();
        }
    };


    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        setFileError(null);
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            
            if (!ALLOWED_FILE_TYPES.includes(file.type)) {
                setFileError("Invalid file type. Please upload an image (JPEG, PNG, GIF) or video (MP4, QuickTime).");
                return;
            }
            
            
            
            if (file.size > MAX_FILE_SIZE) {
                setFileError(`File is too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
                return;
            }

            setPostFile(file);
            const objectURL = URL.createObjectURL(file);
            setFilePreview(objectURL);
            setIsVideo(file.type.startsWith('video/'));
            
        }
    };


    const removeFile = () => {
        setPostFile(null);
        setFilePreview(null);
        setIsVideo(false);
        if (postImageRef.current) {
            postImageRef.current.value = '';
        }
    };


    // ----------- scroll --------------
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



    return (
        <div className={`mb-10 ${isDark ? 'text-darkText' : ' text-deepBg'} sm:p-5 p-3 custom-scrollbar`}>
            {/* status */}
            <section ref={scrollContainerRef} className={`relative w-full carousel bg-transparent ${isDark ? 'bg-deepBg' : 'bg-lightBg'} rounded-box space-x-4`}>
                {/* toggle button */}
                <button onClick={scrollLeft} className="sm:sticky hidden top-1/3 -left-4 z-10 p-2 btn btn-circle">
                    <FaChevronLeft />
                </button>

                {/* status section */}
                <div className='sm:w-[120px] w-[60px] sm:h-[160px] h-[60px] relative carousel-item pl-10'>
                    <img className='w-full h-full object-cover sm:rounded-lg rounded-full' src={imgSrc} alt="" />
                    <MdAdd className={`p-[4px] absolute left-8 bottom-1 cursor-pointer w-8 h-8 rounded-full ${isDark ? 'bg-deepBg border-lightText text-lightText' : 'bg-lightBg border-darkBg text-darkBg'}`} />
                </div>

                <StatusImg images={statusList} />
                <StatusImg images={statusList2} />

                {/* toggle button */}
                <button onClick={scrollRight} className="sm:sticky hidden right-0 top-1/3 z-10 p-2 btn btn-circle">
                    <FaChevronRight />
                </button>
            </section>



            {/**----- Create a post ------ */}
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
                <form className='flex items-center mt-5 justify-center gap-3'>
                    <img className='w-10 h-10 object-cover rounded-full' src={imgSrc} alt="" />
                    <label className='p-3 bg-indigo-50 text-deepBg flex items-center gap-2 w-full rounded-full'>
                    <input 
                        onChange={(e) => setPostData(e.target.value)} 
                        value={postData}
                        type='text' 
                        className='grow border-none outline-none bg-inherit' 
                        placeholder="what's on your mind?" 
                    />
                        <MdCreate className='text-indigo-400 text-lg' />
                    </label>
                    <button className={`px-4 py-3 ${isDark ? 'bg-deepBg' : 'bg-deepLight'} rounded-full text-xs min-w-[100px]`}>
                        Share Post
                    </button>
                </form>
                <div className='mt-4'>
                    <div className={`px-5 w-full flex items-center justify-start gap-10`}>
                        <div className='flex items-center gap-2 cursor-pointer hover:bg-gray-100 hover:text-gray-600 px-2 py-[2px] rounded-full'>
                            <MdImage className='text-blue-600 w-4 h-4' />
                            <input onChange={handleFile} className='hidden' ref={postImageRef} type='file' name='postAvatar' id='postAvatar' />
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


            {/**---- News feed ----- */}
            <section className={`text-xs mt-10 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100`}>
                <Feed isDark={isDark} PostImg={PostImage2} />
                <Feed isDark={isDark} PostImg={PostImage} />
                <Feed isDark={isDark} PostImg={PostImage3} />
                <Feed isDark={isDark} PostImg={PostImage5} />
            </section>
        </div>
    );
};

export default Homepage;
