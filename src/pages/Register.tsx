import { useForm } from 'react-hook-form';
import { FaLock, FaMask, FaUser } from 'react-icons/fa';
import { MdMailOutline } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../components/molecules/FormInput/FormInput.component';
import { useRef} from 'react';
import EmailVerification from '../components/modal/EmailVerification.modal';
import { toast } from 'react-hot-toast';
import { RegistrationFormInputs } from '../type/auth.types';
import { yupResolver } from '@hookform/resolvers/yup'
import { registrationSchema } from '../validation/auth.schema';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutation/user.mutation';


export interface EmailVerificationRef {
  showModal: () => void;
  closeModal: () => void;
}

// import { useToast } from '../context/Toast.context';


const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegistrationFormInputs>({
    resolver: yupResolver(registrationSchema)
  });


  const [createUser, {loading, error}] = useMutation(REGISTER_USER)


  // const emailRef = useRef<HTMLDialogElement>(null);
  const emailRef = useRef<EmailVerificationRef>(null);

  const openModal = () => {
        if (emailRef.current) {
            emailRef?.current?.showModal();
        }
    };


    const handleSignin = async (formData: any) => {
      try {
        await createUser({
          variables: {
            fullname: formData.fullname, 
            username: formData.username, 
            email: formData.email, 
            password: formData.password
          }
        });
          openModal();
      } catch (error) {
        toast.error('Registration failed! Please try again.');
        console.error(error);
      }
    };
   

  return (
    <div className="w-screen sm:h-screen h-auto overflow-hidden flex flex-col sm:flex-row items-center justify-start">
      {/* left section */}
      <section className="relative bg-gradient-to-br from-blue-800 to-cyan-500 sm:w-3/5 w-full sm:h-full h-full flex items-start sm:justify-center justify-start overflow-hidden">
      {/* Enhanced shape content */}
      <div className="w-full h-full absolute z-20">
        {/* Floating orbs */}
        <div className="w-40 h-40 rounded-full absolute bg-gradient-to-tr from-blue-400 to-transparent opacity-20 animate-float top-10 right-20"></div>
        <div className="w-32 h-32 rounded-full absolute bg-gradient-to-bl from-cyan-400 to-transparent opacity-30 animate-float-delayed top-40 left-20"></div>
        <div className="w-24 h-24 rounded-full absolute bg-gradient-to-tl from-blue-300 to-transparent opacity-25 animate-float-slow bottom-20 right-40"></div>

        {/* Wave effects */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-cyan-400 to-transparent opacity-20 animate-wave"></div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-blue-500 to-transparent opacity-15 animate-wave-slow"></div>

        {/* Floating particles */}
        <div className="particle-1"></div>
        <div className="particle-2"></div>
        <div className="particle-3"></div>

        {/* Dynamic light beams */}
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-cyan-300 to-transparent opacity-30 animate-beam"></div>
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-blue-300 to-transparent opacity-30 animate-beam-delayed"></div>

        {/* Pulsating circles */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-blue-400 opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-20 h-20 rounded-full bg-cyan-400 opacity-10 animate-pulse-delayed"></div>
      </div>

      {/* text content */}
      <div className="relative z-30 sm:mt-40 mt-20 text-white sm:px-20 px-10 pb-20 sm:pb-0 text-balance">
        <h1 className="sm:text-[2rem] text-[1.5rem] font-semibold mb-2">Join Us Today! 🌟</h1>
        <p>
          Experience the ultimate social media platform where you can create, share, connect, and chat all in one place. With the innovative spirit of our platform, its community feelings, its trending buzz, and personal chatting touch, you're set for an unparalleled social experience.
        </p>
        <p className="mt-14">Sign up now and be part of something extraordinary!</p>
      </div>
    </section>

      {/* Right section */}
      <section className="text-black flex items-center justify-center flex-col sm:w-2/5 w-full">
        <h1 className="mb-6 mt-10 sm:mt-0 sm:text-3xl text-2xl font-semibold text-blue-400">Register</h1>
        <form onSubmit={handleSubmit(handleSignin)} className="flex flex-col items-center gap-2 sm:w-3/4 w-5/6 pb-10 sm:pb-0">
          <FormInput required={true} icon={<FaUser className="text-blue-400 text-sm" />} placeholder="fullname (firstname lastname)" name="fullname" type="text" register={register} errors={errors} />
          <FormInput required={true} icon={<FaMask className="text-blue-400 text-sm" />} placeholder="username" name="username" type="text" register={register} errors={errors} />
          <FormInput required={true} icon={<MdMailOutline className="text-blue-400 text-sm" />} placeholder="email" name="email" type="email" register={register} errors={errors} />
          <FormInput required={true} icon={<FaLock className="text-blue-400 text-sm" />} placeholder="password" name="password" type="password" register={register} errors={errors} />
          <div className="mt-2 flex items-center justify-between w-full">
            <Link className="text-blue-600 underline" to="/login">Login</Link>
            <Link className="text-red-300 underline" to="/login">Forget Password</Link>
          </div>
          <button type="submit" className="mt-4 px-16 py-2 rounded-full sm:text-2xl text-xl font-semibold text-white bg-gradient-to-tr from-blue-800 to-cyan-500 hover:bg-gradient-to-tl transition-all duration-500">Register</button>
        </form>
      </section>
      <EmailVerification ref={emailRef}/>
      {/* <Toaster/> */}
    </div>
  );
};

export default Register;
