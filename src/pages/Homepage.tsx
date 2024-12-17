import React, { ChangeEvent, useCallback, useContext, useRef, useState } from 'react';
import { MdAdd, MdCancel, MdCreate, MdGpsFixed, MdImage, MdVideocam } from 'react-icons/md';
import '../styles/custom.css';

// post images
import PostImage from '../assets/home/lantern.svg';
import PostImage2 from '../assets/home/dog.svg';
import PostImage3 from '../assets/home/read.svg';
import PostImage5 from '../assets/home/tower.svg';

// ------ imports --------
import ProfileIMG from '../assets/others/avatar.jpeg';
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
import CreatePost from '../components/shared/CreatePost';

// ------ imports --------

const Homepage = () => {

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isDark = useAppSelector(state=>state.theme.isDark)
    const  auth = useAppSelector((state)=>state.user)
    const post = useAppSelector((state)=>state.posts)


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
                    <img className='w-full h-full object-cover sm:rounded-lg rounded-full' src={auth?.avatar || ProfileIMG} alt="" />
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
             <CreatePost userId={auth?._id}/>

            {/**---- News feed ----- */}
            <section className={`text-xs mt-10 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100`}>
                {
                    post?.posts?.map((eachData:any)=>{
                        return(
                            <Feed isDark={isDark} data={eachData} />
                        )
                    })
                }
            </section>
        </div>
    );
};

export default Homepage;
