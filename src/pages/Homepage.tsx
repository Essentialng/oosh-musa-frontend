import React, { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { MdAdd, MdCancel, MdCreate, MdGpsFixed, MdImage, MdMoreVert, MdVideocam } from 'react-icons/md';
import '../styles/custom.css';

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
import { useAppDispatch, useAppSelector } from '../redux/ReduxType';
import CreatePost from '../components/shared/CreatePost';
import { CONVERSATION_URL } from '../constant/resource';
import { useMakeRequest } from '../hooks/useMakeRequest';
import { setConversations } from '../redux/slice/conversation.slice';
import { setCurrentConversation } from '../redux/slice/currentConversation.slice';
import { Link } from 'react-router-dom';
import Modal from '../components/modal/Modal';
import ImageStatus from '../components/organisms/status/Image.status';

// ------ imports --------

const Homepage = () => {

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isDark = useAppSelector(state=>state.theme.isDark)
    const  auth = useAppSelector((state)=>state.user)
    const post = useAppSelector((state)=>state.posts)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    const makeRequest = useMakeRequest()
    const dispatch = useAppDispatch()
    const [statusType, setStatusType] = useState<'image' | 'video' | 'text'>('image')

    // fetch all users conversation
    useEffect(() => {
        const onSuccess = (data: any) => {
            
          dispatch(setConversations(data.data));
          if (data.data.length > 0) {
            // console.log(data.data[0])
            dispatch(setCurrentConversation(data.data[0]));
          }
        };
      
        const fetchUserConversations = async () => {
          setLoading(true);
          const payload = {userId: auth._id};
          try {
            await makeRequest(
              CONVERSATION_URL + '/allConversation',
              'POST',
              payload,
              onSuccess,
              (error) => {console.log(error)},
              () => {setLoading(false)}
            );
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchUserConversations();
      }, []);

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

    // ----------- status ----------
    const handleStatusClick = (type: 'image' | 'video' | 'text') =>{
        setStatusType(type);
        setShowModal(true)
    }
    
    const closeModal = ()=>{
        setShowModal(false)
    }


    const renderStatusModalContent = ()=>{
        switch (statusType) {
            case 'image':
                return(
                    <ImageStatus/>
                )
                break;
            case 'text':
                return(
                    <h1>hello</h1>
                )
            default:
                break;
        }
    }


    return (
        <div className={`mb-10 ${isDark ? 'text-darkText' : ' text-deepBg'} sm:p-5 p-3 custom-scrollbar`}>
            {/* status */}
            <section ref={scrollContainerRef} className={`relative w-full carousel bg-transparent ${isDark ? 'bg-deepBg' : 'bg-lightBg'} rounded-box space-x-4`}>
                {/* ... scroll buttons ... */}

                {/* Status Creation Section */}
                <div className='sm:w-[120px] w-[60px] sm:h-[160px] h-[60px] relative carousel-item pl-10'>
                    <img 
                        className='w-full h-full object-cover sm:rounded-lg rounded-full' 
                        src={auth?.avatar || ProfileIMG} 
                        alt="" 
                    />
                    <div className={`dropdown dropdown-end ${isDark ? 'text-deepBg' : 'bg-lightBg'}`}>
                        <div 
                            tabIndex={0} 
                            role="button" 
                            className={`p-[4px] absolute -left-32 bottom-0 cursor-pointer w-8 h-8 rounded-full flex items-center justify-center
                                ${isDark ? 'bg-deepBg text-lightText' : 'bg-lightBg text-darkBg'}`}
                        >
                            <MdAdd />
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[100] w-32 p-2 shadow">
                            <li><button onClick={() => handleStatusClick('image')} className="flex items-center gap-2"><MdImage /> Image</button></li>
                            <li><button onClick={() => handleStatusClick('video')} className="flex items-center gap-2"><MdVideocam /> Video</button></li>
                            <li><button onClick={() => handleStatusClick('text')} className="flex items-center gap-2"><MdCreate /> Text</button></li>
                        </ul>
                    </div>
                </div>

                {/* ... StatusImg components ... */}
            </section>



            {/**----- Create a post ------ */}
             <CreatePost userId={auth?._id}/>

            {/**---- News feed ----- */}
            <section className={`text-xs mt-10 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100`}>
                {
                    post?.posts?.length > 0 ? (post?.posts?.map((eachData:any)=>{
                        return(
                            <Feed isDark={isDark} data={eachData} />
                        )
                    })): 
                    <p>No feed found</p>
                }
            </section>

            <Modal 
                showModal={showModal}
                toggler={closeModal}
                title={`Create ${statusType} Status`}
            >
                {renderStatusModalContent()}
            </Modal>
        </div>
    );
};

export default Homepage;
