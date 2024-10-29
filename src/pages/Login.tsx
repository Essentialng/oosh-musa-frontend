import React from 'react'
import { Link } from 'react-router-dom'
import { FaLock } from 'react-icons/fa';
import {MdMailOutline} from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { LoginFormInputs } from '../type/auth.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../validation/auth.schema';
import { useMutation} from '@apollo/client';
import toast from 'react-hot-toast';
import { LOGIN_USER } from '../graphql/mutation/user.mutation';
import ErrorText from '../components/molecules/ErrorText/ErrorText';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<LoginFormInputs>({
        resolver: yupResolver(loginSchema)
    })


    const [login, {loading, error}] = useMutation(LOGIN_USER)

    const handleLogin = async (formData: LoginFormInputs)=>{
        try{
            const userData = await login({
                variables: {
                    email: formData.email,
                    password: formData.password
                }
            })
            console.log(userData)
        }catch(error:any){
            toast.error('Error, try again later')
            console.log(error)
        }
    }

  return (
    <div className='w-screen sm:h-screen h-auto overflow-hidden flex flex-col sm:flex-row items-center justify-start'>
        {/* left section */}
        <section className='relative bg-gradient-to-br from-indigo-600 to-red-500 sm:w-3/5 w-full h-full flex items-start sm:justify-center justify-start'>
         {/* shape content */}
            <div className='w-full h-full absolute z-20 overflow-hidden'>
                {/* Large floating orbs */}
                <div className='w-40 h-40 rounded-full absolute bg-gradient-to-tr from-indigo-400 to-transparent opacity-20 animate-float top-10 right-20'></div>
                <div className='w-32 h-32 rounded-full absolute bg-gradient-to-bl from-red-400 to-transparent opacity-30 animate-float-delayed top-40 left-20'></div>
                <div className='w-24 h-24 rounded-full absolute bg-gradient-to-tl from-purple-400 to-transparent opacity-25 animate-float-slow top-60 right-40'></div>

                {/* Narrow fireballs - creating a flow pattern */}
                <div className='absolute bottom-0 left-0 w-full h-full'>
                    {/* Layer 1 - Bottom */}
                    <div className='absolute bottom-10 -left-20 bg-gradient-to-r from-red-400 to-transparent w-72 h-2 rounded-full transform -rotate-45 opacity-40 animate-pulse'></div>
                    <div className='absolute bottom-20 left-40 bg-gradient-to-r from-red-400 to-transparent w-72 h-2 rounded-full transform -rotate-45 opacity-30 animate-pulse-slow'></div>
                    <div className='absolute bottom-30 right-20 bg-gradient-to-l from-red-400 to-transparent w-72 h-2 rounded-full transform -rotate-45 opacity-40 animate-pulse'></div>

                    {/* Layer 2 - Middle */}
                    <div className='absolute bottom-1/3 -left-10 bg-gradient-to-r from-indigo-400 to-transparent w-72 h-3 rounded-full transform -rotate-45 opacity-30 animate-pulse-delayed'></div>
                    <div className='absolute bottom-1/3 right-40 bg-gradient-to-l from-indigo-400 to-transparent w-72 h-3 rounded-full transform -rotate-45 opacity-25 animate-pulse-slow'></div>

                    {/* Large fireballs with enhanced gradients */}
                    <div className='absolute bottom-20 left-20 bg-gradient-to-tr from-red-400 via-indigo-400 to-transparent w-80 h-24 rounded-full transform -rotate-45 opacity-30 animate-glow'></div>
                    <div className='absolute bottom-40 right-10 bg-gradient-to-tl from-indigo-400 via-red-400 to-transparent w-80 h-24 rounded-full transform -rotate-45 opacity-30 animate-glow-delayed'></div>
                    <div className='absolute bottom-60 left-40 bg-gradient-to-br from-purple-400 via-red-400 to-transparent w-80 h-24 rounded-full transform -rotate-45 opacity-25 animate-glow-slow'></div>
                </div>
            </div>



         {/* text content */}
         <div className='relative z-30 sm:mt-40 mt-20 text-white sm:px-20 px-10 pb-20 sm:pb-0 text-balance'>
            <h1 className='sm:text-[2rem] text-[1.5rem] font-semibold'>Welcome to OOSH</h1>
            <p>
                Dive into a world where creativity meets connection. Whether you're here to share moments, catch up with friends, express your thoughts, or stay in touch, our platform brings together the best experience
            </p>
            <p className='mt-14'>Your community is waiting. Log in to continue the adventure! 🚀</p>
         </div>
        </section>


        {/* Right section */}
        <section className='text-black flex items-center justify-center flex-col sm:w-2/5 w-full'>
            <h1 className='mb-6 mt-10 sm:mt-0 sm:text-3xl text-2xl font-semibold text-indigo-400'>User Login</h1>
            <form onSubmit={handleSubmit(handleLogin)} action="" className='flex flex-col items-center gap-2 sm:w-3/4 w-5/6 pb-10 sm:pb-0'>
                <label className='input bg-indigo-50 flex items-center gap-2 w-full rounded-full'>
                    <MdMailOutline className='text-indigo-400 text-lg'/>
                    <input id='email' {...register('email', {required: true})} type='email' className='grow' placeholder='email'/>
                </label>
                <div>
                {errors?.email && <ErrorText message={errors.email?.message || 'This field is required'} />}
                </div>
                <label className='input bg-indigo-50 flex items-center gap-2 w-full rounded-full'>
                    <FaLock className='text-indigo-400'/>
                    <input id='password' {...register('password', {required: true})} type='password' className='grow' placeholder='password'/>
                </label>
                <div>
                {errors?.password && <ErrorText message={errors.password?.message || 'This field is required'} />}
                </div>
                <div className='mt-2 flex items-center justify-between w-full'>
                    <Link className='text-indigo-300 underline' to='/register'>Register</Link>
                    <Link className='text-red-300 underline' to='/register'>Forget Password</Link>
                </div>
                <button className='mt-4 px-16 py-2 rounded-full sm:text-2xl text-xl font-semibold text-white bg-gradient-to-tr from-indigo-500 to-red-500 hover:bg-gradient-to-tl transition-all duration-500'>Login</button>
            </form>
        </section>
    </div>
  )
}

export default Login