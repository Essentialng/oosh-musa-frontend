import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../redux/ReduxType'


interface IRequestProps{
  id: string,
  name:string,
  image:string,
  isDark:boolean,
}

const Chats:React.FC<IRequestProps> = ({name, image, isDark, id}) => {

  const user = useAppSelector(state=>state.user)

return (
  <Link to={`/chat/${user._id}?chat=${id}`} className={`flex items-center justify-start gap-4 text-sm cursor-pointer w-full ${isDark ? 'hover:bg-gray-200 hover:text-deepBg' : 'hover:bg-gray-200 hover:text-deepBg'} p-2 rounded-full mb-2`}>
        <img className='w-6 h-6 object-cover rounded-full' src={image} alt='group one'/>
        <p className='text-sm font-semibold'>{name}</p>
    </Link>
)
}

export default Chats