import React, { useState } from 'react'
import TextInput from '../../components/molecules/FormField/TextInput'
import Button from '../../components/atoms/Button/Button'
import { useAppSelector } from '../../redux/ReduxType'
import { useForm } from 'react-hook-form'
import { IStep } from '../../type/form.type'
import { IStepThree } from './types'
// import { useMutation } from '@apollo/client'
// import { CREATE_WORK } from '../../graphql/mutation/user.mutation'
import toast from 'react-hot-toast'
import LoaderSpinner from '../../components/molecules/Loader/Loader.spinner'
import { USER_WORK } from '../../constant/resource'
import { useMakeRequest } from '../../hooks/useMakeRequest'


const StepThree:React.FC<IStep> = ({
  step,
  id
}) => {
  
  const [loading, setLoading] = useState<boolean>(false)
  const makeRequest = useMakeRequest()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IStepThree>({
    defaultValues: {
      company: '',
    }
  });

  // const [createWork, {loading, error}] = useMutation(CREATE_WORK)
  const onSuccess = (data:any)=>{
    toast.success('success')
    console.log('response', data)
  }
  

  const onSubmit = async (data:IStepThree)=>{
    const payload = {...data, userId: id}

    try{
      await makeRequest(
              USER_WORK + '/create',
              'POST',
              {...payload},
              onSuccess,
              console.log,
              ()=>setLoading(false)
      )
      toast.success('updated')
    }catch(error:any){
      console.log(error.message || 'Error creating experience')
    }
  }

  const isDark = useAppSelector((state)=>state.theme.isDark)

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Education Information</h1>
      <form onSubmit={handleSubmit(onSubmit)} action="" className='flex flex-wrap items-start justify-start gap-5'>
        <div className=''>
          <TextInput errors={errors} label='Company' name='company' register={register} type='text' placeholder='' theme='start'/>
        </div>
        <div className=''>
          <TextInput errors={errors} label='Position' name='position' register={register} type='text' placeholder='' theme='start'/>
        </div>
        <div className=''>
          <TextInput errors={errors} label='Start Date' name='startDate' register={register} type='date' placeholder='' theme='start'/>
        </div>
        <div className=''>
          <TextInput errors={errors} label='End Date' name='endDate' register={register} type='date' placeholder='' theme='start'/>
        </div>
        <div className='block w-full'>
          {
            loading ? <LoaderSpinner color='blue'/>
            :
            <Button width='full' color='blue' text='Submit' isDark={isDark}/>
          }
        </div>
      </form>
    </div>
  )
}

export default StepThree