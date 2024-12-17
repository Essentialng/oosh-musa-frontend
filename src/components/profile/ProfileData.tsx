import React, { useContext } from 'react'
import Background from '../../assets/profile/back1.jpeg'
import { useAppSelector } from '../../redux/ReduxType'
import AuthContext from '../../context/AuthProvider'
import { CgProfile } from 'react-icons/cg'

const ProfileData = () => {
    const isDark = useAppSelector((state)=>state.theme.isDark)
    const  {auth} = useContext(AuthContext)

    // ----- fetch user details and fill the page ----------

  return (
    <div>
         <section className='w-full h-[300px] relative'>
            {
                auth?.cover ?
                <img className='object-cover h-full w-full' src={auth.cover} alt='background'/>
                :
                <img className='object-cover h-full w-full' src={Background} alt='background'/>
            }
            <div className='absolute -bottom-8 left-0 flex items-start justify-start gap-5'>
                {auth.avatar ?
                    <img className='w-10 h-10 rounded-full object-cover shadow-md' src={auth?.avatar} alt="profile" />
                    :
                    <CgProfile className='w-10 h-10 text-white'/>
                }
                <div>
                    <h2 className={`text-2xl font-bold ${!isDark && 'text-lightText'} mb-2`}>{auth?.fullname}</h2>
                    <div className={`flex items-start flex-col shadow-md p-5 justify-start gap-2 font-semibold rounded-md ${isDark ? 'bg-deepBg text-lightText' : 'bg-deepLight text-deepBg'}`}>
                          <p className='text-balance'>Software Engineer</p>
                          <p className='text-balance'>@galapagous</p>
                          <p className='text-balance'>Los Angeles, CA</p>
                          <p className='text-balance'>New York, NY</p>
                          <p className='text-balance'>100 <span className='text-blue-400'>followers</span></p>
                          <button onClick={()=>{alert('follow')}} className={`text-sm px-5 py-2 rounded-full ${isDark ? 'bg-lightBg text-deepBg' : 'bg-deepBg text-lightText'}`}>Follow</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
export default ProfileData