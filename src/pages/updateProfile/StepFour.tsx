import { BsUpload } from 'react-icons/bs'
import Background from '../../assets/profile/back1.jpeg'
import Avatar from '../../assets/others/avatar.jpeg'
import { useRef, useState } from 'react'
import { useAppSelector } from '../../redux/ReduxType'
import { useForm } from 'react-hook-form'
import { IStep } from '../../type/form.type'
import { IStepFour } from './types'
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '../../graphql/mutation/user.mutation'
import toast from 'react-hot-toast'
import LoaderSpinner from '../../components/molecules/Loader/Loader.spinner'
import { uploadToCloudinary } from '../../utils/upload.cloudinary'

const StepFour:React.FC<IStep> = ({
  step,
  id
}) => {
  const [backgroundFile, setBackgroundFile] = useState<string | Blob | null>(null)
  const [profileFile, setProfileFile] = useState<string | Blob | null>(null)
  const coverRef = useRef<HTMLInputElement>(null)
  const profileRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [coverPreview, setCoverPreview] = useState<string>(Background)
  const [profilePreview, setProfilePreview] = useState<string>(Avatar)
  const isDark = useAppSelector((state)=>state.theme.isDark)

  const {
    // control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IStepFour>({
    defaultValues: {
      avatar: undefined,
      profile: undefined,
      userId: id
    }
  });

  const [updateUser, {error}] = useMutation(UPDATE_USER)

  const handleCover = () => {
    coverRef.current?.click()
  }

  const handleProfile = () => {
    profileRef.current?.click()
  }

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>, 
    type: 'cover' | 'profile'
  ) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const selectedFile = files[0]
      
      if (type === 'cover') {
        setBackgroundFile(selectedFile)
        const previewCover = URL.createObjectURL(selectedFile)
        setCoverPreview(previewCover)
      } else {
        setProfileFile(selectedFile)
        console.log('second')
        const previewProfile = URL.createObjectURL(selectedFile)
        setProfilePreview(previewProfile)
      }
    }
  }

  const onSubmit =async (data: IStepFour) => {
    setLoading(true)
    let profile:any
    let avatar:any
    let payload = {...data}
    if(profileFile){
      avatar = await uploadToCloudinary(profileFile as File)
      payload = {...payload, avatar: avatar.url}
    }
    if(backgroundFile){
      profile = await uploadToCloudinary(backgroundFile as File)
      payload = {...payload, profile: profile.url}
    }
    try {
      await updateUser({
        variables: {
          ...payload
        }
      })
      toast.success('Update')
    } catch (error: any) {
      toast.error(error.message || 'Error try again')
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className='pb-8'>
      <h1 className='text-2xl font-bold mb-4'>Profile Image</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='relative flex items-center justify-center flex-col h-[250px] w-full overflow-hidden'>
          <img 
            className='object-cover h-[200px] w-full' 
            src={coverPreview} 
            alt="cover" 
          />
          <div className='absolute z-40 bottom-0 left-0'>
            <input 
              {...register('profile')}
              ref={coverRef}
              className='hidden' 
              type="file" 
              name='cover'
              onChange={(e) => handleFileChange(e, 'cover')}
            />
          </div>
          <div className='flex items-center justify-center gap-2 mt-2'>
            <BsUpload 
              onClick={handleCover} 
              className='border-2 cursor-pointer w-6 h-6 rounded-full text-white'
            />
            <span>Upload cover</span>
          </div>
          {errors?.profile && <p>{errors?.profile?.message}</p>}
        </div>

        <div className='relative flex items-center justify-center flex-col h-[250px] w-full overflow-hidden'>
          <img 
            className='object-cover h-[100px] w-[100px] rounded-full' 
            src={profilePreview} 
            alt="profile" 
          />
          <div className='absolute z-40 bottom-0 left-0'>
            <input 
              {...register('avatar')}
              ref={profileRef}
              className='hidden' 
              type="file" 
              name='profile'
              onChange={(e) => handleFileChange(e, 'profile')}
            />
          </div>
          <div className='flex items-center justify-center gap-2 mt-2'>
            <BsUpload 
              onClick={handleProfile} 
              className='border-2 cursor-pointer w-6 h-6 rounded-full text-white'
            />
            <span>Upload profile</span>
          </div>
          {errors?.avatar && <p>{errors?.avatar?.message}</p>}
        </div>
        {loading ? 
          <LoaderSpinner color={'blue'}/>
          :
        <button type='submit' className={`border-2 border-${isDark ? 'white' : 'bg-purple-600'} px-10 py-2 rounded-full`}>{loading ? <LoaderSpinner color='white'/> : 'Submit'}</button>}
      </form>
    </div>
  )
}

export default StepFour