import React, { useState } from 'react';
import TextInput from '../../components/molecules/FormField/TextInput';
import { useAppSelector } from '../../redux/ReduxType';
import { useForm } from 'react-hook-form';
import { IStep } from '../../type/form.type';
import { IStepOne, IStepTwo } from './types';
import toast from 'react-hot-toast';
// import { CREATE_EDUCATION } from '../../graphql/mutation/user.mutation';
// import { useMutation } from '@apollo/client';
import LoaderSpinner from '../../components/molecules/Loader/Loader.spinner';
import { useMakeRequest } from '../../hooks/useMakeRequest';
import { USER_EDUCATION, USER_URL } from '../../constant/resource';


const StepTwo:React.FC<IStep> = ({
  id, step
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IStepTwo>({
    defaultValues: {
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
    },
  });
  const makeRequest = useMakeRequest()
  const [loading, setLoading] = useState<boolean>(false)

  const onSuccess = (data:any)=>{
    toast.success('success')
    console.log('response', data)
  }

  const onSubmit = async (data: IStepTwo) => {
    setLoading(true)
    const payload = {...data, userId: id}
    try {
      await makeRequest(
        USER_EDUCATION + '/create',
        'POST',
        {...payload},
        onSuccess,
        console.log,
        ()=>setLoading(false)
      )
      toast.success('created')
    } catch (error) {
      toast.error('Error try again')
      console.log(error)
    }
  };

  const isDark = useAppSelector((state) => state.theme.isDark);

  return (
    <div className='pb-5'>
      <h2 className='text-2xl font-bold mb-4'>Education Information</h2>
      <form className='flex flex-wrap items-start justify-start gap-5' onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Institution"
          name="institution"
          type="text"
          placeholder="Enter institution"
          register={register}
          errors={errors}
          required
        />
        <TextInput
          label="Degree"
          name="degree"
          type="text"
          placeholder="Enter degree"
          register={register}
          errors={errors}
          required
        />
        <TextInput
          label="Field of Study"
          name="fieldOfStudy"
          type="text"
          placeholder="Enter field of study"
          register={register}
          errors={errors}
          required
        />
        <TextInput
          label="Start Date"
          name="startDate"
          type="date"
          register={register}
          errors={errors}
          required
        />
        <TextInput
          label="End Date"
          name="endDate"
          type="date"
          register={register}
          errors={errors}
          required
        />
        <button className={`px-4 block w-full py-2 rounded ${
              isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
            }`} type="submit">
              {loading ? <LoaderSpinner color={'white'}/> : 'Submit'}
            </button>
      </form>
      {/* timeline */}
    </div>
  );
};

export default StepTwo;