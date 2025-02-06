import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import { LoginFormInputs } from "../type/auth.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation/auth.schema";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { LOGIN_USER } from "../graphql/mutation/user.mutation";
import FormInput from "../components/molecules/AuthInput/FormInput";
import AuthContext from "../context/AuthProvider";
import LoaderSpinner from "../components/molecules/Loader/Loader.spinner";
import { storeTokens } from "../utils/auth.utils";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slice/user.slice";
import { useMakeRequest } from "../hooks/useMakeRequest";
import { AUTH_URL, FORGET_URL } from "../constant/resource";
import { CiMail } from "react-icons/ci";
import MainModal from "../components/modal/Second.modal";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });
  const dispatch = useDispatch();
  const makeRequest = useMakeRequest();
  const [loading, setLoading] = useState<boolean>(false);
  const [forgetEmail, setForgetEmail] = useState("");
  const [forgetSuccess, setForgetSuccess] = useState(false);
  const [forgetLoading, setForgetLoading] = useState(false);

  const handleForget = async () => {
    if (!forgetEmail) return toast.error("Kindly provide an email");

    setForgetLoading(true);

    const onFinal = () => {
      setForgetLoading(false);
      setShowForget(false);
    };

    try {
      await makeRequest(
        AUTH_URL + "/forget",
        "POST",
        { email: forgetEmail },
        () => {
          setForgetSuccess(true);
        },
        () => {
          toast.error("Email not found");
        },
        onFinal
      );
    } catch (error) {}
    setForgetEmail("");
    setShowForget(false);
  };

  const [showForget, setShowForget] = useState(false);

  const handleLogin = async (formData: any) => {
    setLoading(true);
    try {
      await makeRequest(
        AUTH_URL + "/signin",
        "POST",
        formData,
        (data) => {
          // Handle successful login
          if (data) {
            // Do something with the data
            dispatch(setUser(data));
            navigate("/");
          }
        },
        (error) => {
          console.error("Login error:", error);
          // Handle login error
          toast.error(error?.message || "Login failed");
        },
        () => setLoading(false)
      );
    } catch (error) {
      console.error("Signin catch error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="w-screen sm:h-screen h-auto overflow-hidden flex flex-col sm:flex-row items-center justify-start">
      {/* left section */}
      <section className="relative bg-gradient-to-br from-indigo-600 to-red-500 sm:w-3/5 w-full h-full flex items-start sm:justify-center justify-start">
        {/* shape content */}
        <div className="w-full h-full absolute z-20 overflow-hidden">
          {/* Large floating orbs */}
          <div className="w-40 h-40 rounded-full absolute bg-gradient-to-tr from-indigo-400 to-transparent opacity-20 animate-float top-10 right-20"></div>
          <div className="w-32 h-32 rounded-full absolute bg-gradient-to-bl from-red-400 to-transparent opacity-30 animate-float-delayed top-40 left-20"></div>
          <div className="w-24 h-24 rounded-full absolute bg-gradient-to-tl from-purple-400 to-transparent opacity-25 animate-float-slow top-60 right-40"></div>

          {/* Narrow fireballs - creating a flow pattern */}
          <div className="absolute bottom-0 left-0 w-full h-full">
            {/* Layer 1 - Bottom */}
            <div className="absolute bottom-10 -left-20 bg-gradient-to-r from-red-400 to-transparent w-72 h-2 rounded-full transform -rotate-45 opacity-40 animate-pulse"></div>
            <div className="absolute bottom-20 left-40 bg-gradient-to-r from-red-400 to-transparent w-72 h-2 rounded-full transform -rotate-45 opacity-30 animate-pulse-slow"></div>
            <div className="absolute bottom-30 right-20 bg-gradient-to-l from-red-400 to-transparent w-72 h-2 rounded-full transform -rotate-45 opacity-40 animate-pulse"></div>

            {/* Layer 2 - Middle */}
            <div className="absolute bottom-1/3 -left-10 bg-gradient-to-r from-indigo-400 to-transparent w-72 h-3 rounded-full transform -rotate-45 opacity-30 animate-pulse-delayed"></div>
            <div className="absolute bottom-1/3 right-40 bg-gradient-to-l from-indigo-400 to-transparent w-72 h-3 rounded-full transform -rotate-45 opacity-25 animate-pulse-slow"></div>

            {/* Large fireballs with enhanced gradients */}
            <div className="absolute bottom-20 left-20 bg-gradient-to-tr from-red-400 via-indigo-400 to-transparent w-80 h-24 rounded-full transform -rotate-45 opacity-30 animate-glow"></div>
            <div className="absolute bottom-40 right-10 bg-gradient-to-tl from-indigo-400 via-red-400 to-transparent w-80 h-24 rounded-full transform -rotate-45 opacity-30 animate-glow-delayed"></div>
            <div className="absolute bottom-60 left-40 bg-gradient-to-br from-purple-400 via-red-400 to-transparent w-80 h-24 rounded-full transform -rotate-45 opacity-25 animate-glow-slow"></div>
          </div>
        </div>

        {/* text content */}
        <div className="relative z-30 sm:mt-40 mt-20 text-white sm:px-20 px-10 pb-20 sm:pb-0 text-balance">
          <h1 className="sm:text-[2rem] text-[1.5rem] font-semibold">
            Welcome to OOSH
          </h1>
          <p>
            Dive into a world where creativity meets connection. Whether you're
            here to share moments, catch up with friends, express your thoughts,
            or stay in touch, our platform brings together the best experience
          </p>
          <p className="mt-14">
            Your community is waiting. Log in to continue the adventure! 🚀
          </p>
        </div>
      </section>

      {/* Right section */}
      <section className="text-black flex items-center justify-center flex-col sm:w-2/5 w-full">
        <h1 className="mb-6 mt-10 sm:mt-0 sm:text-3xl text-2xl font-semibold text-indigo-400">
          User Login
        </h1>
        <form
          onSubmit={handleSubmit(handleLogin)}
          action=""
          className="flex flex-col items-center gap-2 sm:w-3/4 w-5/6 pb-10 sm:pb-0"
        >
          <FormInput
            required={true}
            icon={
              <MdMailOutline className="text-indigo-500 outline-none text-sm" />
            }
            placeholder="Email"
            name="email"
            type="text"
            register={register}
            errors={errors}
          />
          <FormInput
            required={true}
            icon={
              <FaLock className="text-indigo-500 outline-none focus:border-none text-sm" />
            }
            placeholder="password"
            name="password"
            type="password"
            register={register}
            errors={errors}
          />
          {/* <div></div> */}
          <div className="mt-2 flex items-center justify-between w-full">
            <Link className="text-indigo-300 underline" to="/register">
              Register
            </Link>
            <button
              type="button"
              onClick={() => {
                setShowForget(true);
              }}
              className="text-red-300 underline"
            >
              Forget Password
            </button>
          </div>
          <button className="mt-4 px-16 py-2 rounded-full sm:text-2xl text-xl font-semibold text-white bg-gradient-to-tr from-indigo-500 to-red-500 hover:bg-gradient-to-tl transition-all duration-500">
            {loading ? <LoaderSpinner color="white" /> : <span>Login</span>}
          </button>
        </form>

        {/* forget password modal */}
        <MainModal
          showModal={showForget}
          closeModal={() => {
            setShowForget(false);
          }}
        >
          <form className="flex flex-col items-center justify-center gap-3">
            <CiMail className="w-10 h-10 text-red-500" />
            <p className="py-[2px] text-sm">
              Kindly provide your email to continue
            </p>
            <input
              className="p-2 border-2 border-blue-400 rounded-sm w-full"
              type="email"
              onChange={(e) => {
                setForgetEmail(e.target.value);
              }}
              placeholder="enter your email"
            />
            <button
              type="button"
              onClick={handleForget}
              className="px-4 py-2 bg-blue-500 rounded-sm text-white"
            >
              Submit
            </button>
          </form>
        </MainModal>

        {/* forget response modal */}
        {/* <MainModal

        >

        </MainModal> */}
      </section>
    </div>
  );
};

export default Login;
