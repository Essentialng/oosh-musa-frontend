import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '../../components/molecules/FormField/TextInput';
import { IStep } from '../../type/form.type';
// import { useMutation } from '@apollo/client';
import LoaderSpinner from '../../components/molecules/Loader/Loader.spinner';
import toast from 'react-hot-toast';
import { IStepOne } from './types';
import { useMakeRequest } from '../../hooks/useMakeRequest';
import { USER_URL } from '../../constant/resource';
// import { UPDATE_USER } from '../../graphql/mutation/user.mutation';

const StepOne:React.FC<IStep> = ({
  id, step
}) => {
  const isDark = false;
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IStepOne>({
    defaultValues: {
      profession: '',
      username: '',
      phoneNumber: '',
      country: '',
      state: '',
      bio: '',
      dateOfBirth: '',
      placeOfBirth: '',
      gender: ''
    }
  });
  const makeRequest = useMakeRequest()
  const [loading, setLoading] = useState(false)

  // const [updateUser, {loading, error}] = useMutation(UPDATE_USER)

  const onSuccess = (data:any)=>{
    toast.success('success')
    console.log('response', data)
  }

  const onSubmitForm = async (data: IStepOne) => {
    setLoading(true)
    const payload = {...data, userId: id}
    try {
      await makeRequest(
        USER_URL + '/update',
        'PUT',
        {...payload},
        onSuccess,
        console.log,
        ()=>setLoading(false)
      )
      toast.success('updated')
    } catch (error) {
      toast.error('Error try again')
      console.log(error)
    }
  };

  return (
    <div className="pb-10">
      <h1 className="text-2xl font-bold mb-4">Personal Information</h1>
      <form onSubmit={handleSubmit(onSubmitForm)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label='Profession' name='profession' type='text' register={register} errors={errors} placeholder='Profession' required={true}/>
          <TextInput label='Username' name='username' type='text' register={register} errors={errors} placeholder='Your Nick' required={true}/>
          <TextInput label='Phone Num' name='phoneNumber' type='number' register={register} errors={errors} placeholder='Phone Number' required={true}/>
          <TextInput label='Country' name='country' type='text' register={register} errors={errors} placeholder='New Zealand' required={true}/>
          <TextInput label='State' name='state' type='text' register={register} errors={errors} placeholder='moborrow' required={true}/>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            {...register('bio', { required: 'Bio is required' })}
            className="w-full p-2 border rounded text-gray-700"
            placeholder="Make it inspiring"
            rows={4}
          />
          {errors.bio && (
            <span className="text-red-500 text-sm">{errors.bio.message}</span>
          )}
        </div>

        <TextInput label='Date of birth' name='dateOfBirth' type='date' register={register} errors={errors} required={true}/>
        <TextInput label='Place of birth' name='placeOfBirth' type='text' register={register} errors={errors} placeholder='place of birth' required={true}/>

        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select
            {...register('gender', { required: 'Gender is required' })}
            className="w-full p-2 border rounded text-gray-700"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <span className="text-red-500 text-sm">{errors.gender.message}</span>
          )}
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className={`px-4 py-2 rounded ${
              isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
            }`}
          >
            {loading ? 
            <LoaderSpinner color='white'/> 
            :
            'Submit'  
          }
          </button>
        </div>
      </form>
      {/* {error && <Cust} */}
    </div>
  );
};

export default StepOne;