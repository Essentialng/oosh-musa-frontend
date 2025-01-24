import React, { useEffect, useState } from 'react'
import Event1 from '../assets/home/dew2.jpg'
import { BsSearch } from 'react-icons/bs'
// import Event2 from '../assets/news/news1.jpg'
// import Event3 from '../assets/news/news2.jpg'
import Event from '../components/organisms/Event'
import { useAppSelector } from '../redux/ReduxType'
import Modal from '../components/modal/Modal'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { eventValidationSchema } from '../validation/live.schema'
import { useMakeRequest } from '../hooks/useMakeRequest'
import { LIVE_URL } from '../constant/resource'
import toast from 'react-hot-toast'
import LoaderSpinner from '../components/molecules/Loader/Loader.spinner'




interface ILive{
  
}

const Live:React.FC<ILive> = () => {

  const isDark = useAppSelector((state)=>state.theme.isDark)
  const User = useAppSelector(state=>state.user)
  const [openSchedule, setOpenSchedule] = useState(false)
  const [loading, setLoading] = useState(false)
  const [liveEvents, setLiveEvents] = useState([])
  const makeRequest = useMakeRequest()

  useEffect(() => {
    // Fetch events when the component mounts
    fetchEvents();
  }, []);

  const fetchEvents = ()=>{
    makeRequest(
      LIVE_URL,
      'GET',
      {},
      (data:any)=>{setLiveEvents(data?.data)},
      (error:any)=>{console.log(error)},
      ()=>{}
    )
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm({
    defaultValues: {
            author: User._id
        },
    resolver: yupResolver(eventValidationSchema)
  })

  const closeReel = () => {
    setOpenSchedule(false);
  };

  const createEvent = (data:any)=>{
    setLoading(true)

    const onSuccess = (data:any)=>{
      toast.success('Done')
    }

    const onFailure = (error:any)=>{
      toast.error('Failure pls try again')
      console.log(error)
    }

    const onFinal = ()=>{
      setLoading(false)
      reset()
      setOpenSchedule(false)
    }

    try {
      makeRequest(
        LIVE_URL,
        'POST',
        data,
        onSuccess,
        onFailure,
        onFinal
      )
    } catch (error:any) {
      console.log(error)
    }
    console.log(data)
  }

  return (
    <div className={`rounded-lg my-2 ${isDark ? 'bg-deepBg text-white' : 'bg-deepLight text-gray-800'} p-5 custom-scrollbar`}>
      <div className='w-full h-auto relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-b after:from-transparent after:to-black'>
          <img className='h-full object-cover' src={Event1} alt="politics" />
          <div className='text-white font-Mon z-30 absolute bottom-10 left-10'>
            <h1 className='text-[6rem] font-semibold'>
              Events 
            </h1>
            <h2 className='text-xl'>Live event across the globe</h2>
            <button onClick={()=>{setOpenSchedule(true)}} className='mt-2 p-2 bg-green-500 text-sm text-white font-semibold rounded-sm hover:bg-green-400'>Schedule Event</button>
          </div>

        </div>

          {/* list of events */}
          <div className='mt-10'>
            <div className='w-full flex items-center justify-center gap-10'>
            <label className="input input-bordered flex items-center gap-2 w-2/3">
            <BsSearch/>
            <input type="text" className={`grow ${isDark ? 'text-deepBg' : ''}`} placeholder="Search" />
          </label>
          <select className={`select w-1/3 max-w-xs ${isDark ? 'text-deepBg' : 'bg-gray-200'}`}>
          <option disabled selected>Category</option>
          <option>Live</option>
          <option>Upcoming</option>
        </select>
            </div>
          </div>

        {/* Event list */}
        <div className='mt-10'>
          {
            liveEvents.map((eachEvent:any)=>{
              console.log('each-event--->', eachEvent)
              return(
                <Event eventData={eachEvent} isDark={isDark}/>
              )
            })
          }
        </div>

      <Modal
        showModal={openSchedule}
        toggler={closeReel}
        >
          <div className="p-4 text-neutral-700 text-sm bg-slate-50 rounded-md">
              <h1 className='text-2xl font-semibold mb-10'>New Event</h1>
              <form onSubmit={handleSubmit(createEvent)} className='flex flex-col gap-5 w-full' action="">
                <div>
                  <input {...register('title')} className='border-2 outline-none border-neutral-400 rounded-md p-2 w-full' type='text' placeholder='Event Title'/>
                  {errors?.title ? <p className='text-red-500 w-full mx-auto'>{errors?.title?.message}</p> : null}
                </div>
                <textarea {...register('description')} className='w-full -mb-3 outline-none h-[150px] p-2 border-2 border-neutral-400' rounded-md name='description' placeholder='Description'/>
                {errors?.description ? <p className='text-red-500 w-full mx-auto'>{errors?.description?.message}</p> : null}
                
                <div className='flex items-center justify-between border-2 border-neutral-400 p-2 rounded-md'>
                  <div>
                    <div className='flex items-center justify-center'>
                      <label>Start Date</label>
                      <input {...register('startDate')} className='outline-none' type='date'/>
                    </div>
                      {errors?.startDate ? <p className='text-red-500 w-full mx-auto'>{errors?.startDate?.message}</p> : null}
                  </div>
                  <div className='text-neutral-500'>|</div>
                  <div>
                    <div className='flex items-center justify-between'>
                      <label>Start Time</label>
                      <input {...register('startTime')} className='outline-none' type='time'/>
                    </div>
                      {errors?.startTime ? <p className='text-red-500 w-full mx-auto'>{errors?.startTime?.message}</p> : null}
                  </div>
                </div>

                <div className='flex items-center justify-between border-2 border-neutral-400 p-2 rounded-md'>
                  <div>
                    <div className='flex items-center justify-between'>
                      <label>End Date</label>
                      <input {...register('endDate')} className='outline-none' type='date'/>
                    </div>
                    {errors?.endDate ? <p className='text-red-500 w-full mx-auto'>{errors?.endDate?.message}</p> : null}
                  </div>
                  <div className='text-neutral-500'>|</div>
                  <div>
                    <div className='flex items-center justify-between'>
                      <label>End Time</label>
                      <input {...register('endTime')} className='outline-none' type='time'/>
                    </div>
                    {errors?.endTime ? <p className='text-red-500 w-full mx-auto'>{errors?.endTime?.message}</p> : null}
                  </div>
                </div>

                <button className='bg-green-500 text-white font-semibold w-fit py-2 px-4 rounded-md mx-auto flex items-center justify-center'>
                  {loading ? <LoaderSpinner color={'white'}/> : 'Submit'}
                </button>
              </form>
          </div>
      </Modal>
    </div>
  )
}

export default Live
