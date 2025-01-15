import React, { useState } from 'react'
import { MdCancel } from 'react-icons/md'
import {IoMdCheckmark} from 'react-icons/io'
import { fetchData } from '../../utils/axisoCall'
import { USER_URL } from '../../constant/resource'
import { useAppSelector } from '../../redux/ReduxType'
import LoaderSpinner from '../molecules/Loader/Loader.spinner'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'



interface IRequestProps{
    id: string,
    name:string,
    image:string,
    isDark:boolean
}

const Request:React.FC<IRequestProps> = ({name, image, isDark, id}) => {
  
  const user = useAppSelector((state)=>state.user)
  const [loadingRequest, setLoadingRequest] = useState<boolean>(false)
  const dispatch = useDispatch()

  const handleAccept = (requestId:string)=>{
    setLoadingRequest(true)
    const payload = {userId: user._id, status: 'ACCEPTED', requestId }
    
    const onSuccess = (data:any)=>{
      toast.success('success')
      // pull from request lists
      dispatch(data.data)
    }

    const onFailure = (data:any)=>{
      console.log(data)
      toast.error(data?.message)
    }

    const final = ()=>{
      setLoadingRequest(false)
    }
    
    try {
      fetchData({
        url: USER_URL + '/acceptFriend',
        method: 'PUT',
        payload,
        onSuccess: onSuccess,
        onFailure: onFailure,
        final
      })
      
    } catch (error) {
      
    }
  }
  const handleReject = ()=>{
    alert('reject requested')
  }
  
  return (
    
    <div className={`flex items-center justify-between gap-4 w-full p-2 rounded-full mb-2 text-xs`}>
      <div className='flex items-center justify-between gap-2'>
        <img className='w-6 h-6 object-cover rounded-full cursor-pointer' src={image} alt='group one'/>
        <p className='text-xs font-normal'>{name}</p>
      </div>
      <div className='flex items-center justify-between gap-2 cursor-pointer '>
        <button onClick={()=>{handleAccept(id)}} className='text-green-500 hover:scale-110 hover:text-green-300'>
          {loadingRequest ? 
          <LoaderSpinner color='blue'/>  
        : 
          <IoMdCheckmark/>
        }
          </button>
        <button onClick={handleReject} className='text-red-500 hover:scale-110 hover:text-red-300'><MdCancel/></button>
      </div>
  </div>
  )
}

export default Request