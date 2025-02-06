import React, { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { POST_URL } from "../../../constant/resource";
import { useAppSelector } from "../../../redux/ReduxType";
// import TextInput from "../../molecules/FormField/TextInput";
import { useForm } from "react-hook-form";
import PaystackPaymentHandler from "../../../services/paymentHandler";
import { useMakeRequest } from "../../../hooks/useMakeRequest";
import toast from "react-hot-toast";

const RegisterPost = () => {
  const { postId } = useParams();
  const makeRequest = useMakeRequest();
  const { data, error, loading } = useFetchData<any>(POST_URL + `/${postId}`);
  const isDark = useAppSelector((state) => state?.theme?.isDark);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      minimumFollower: 0,
      budget: 0,
      amountPerShare: 0,
    },
    mode: "onChange",
  });

  const budget = watch("budget");
  const amountPerShare = watch("amountPerShare");

  const totalReshares = useMemo(() => {
    return amountPerShare > 0 ? Math.floor(budget / amountPerShare) : 0;
  }, [budget, amountPerShare]);

  const handleSubmitForm = (data: any) => {
    data?.preventDefault();
  };

  const handlePaymnet = (data: any) => {
    console.log("payment reference -->", data);
    if (data?.status !== "success") {
      toast.error("error during payment pls try again");
      return;
    }

    // makeRequest();
  };

  if (loading) return <div>Loading post details...</div>;
  if (error) return <div>Error loading post</div>;

  return (
    <div className="pb-10 font-Mon">
      <div
        className={`rounded-lg overflow-auto text-sm ${
          isDark ? "bg-darkBg text-darkText" : "bg-lightBg text-deepBg"
        } p-5 my-2`}
      >
        <h1 className="text-lg">Post Registration</h1>
        <div className="mt-10 h-[400px]">
          <img
            className="h-full w-full object-cover"
            src={data?.media}
            alt="post"
          />
        </div>
        <p className="mt-5 text-lg">{data?.content}</p>
        <div className="mt-10 w-full">
          <h1 className="text-lg py-2 border-t-2">Budget</h1>
          <form
            onSubmit={handleSubmitForm}
            className="w-full mt-3 flex flex-col items-start justify-start gap-5"
            action=""
          >
            <div className="w-full flex flex-col items-start justify-start">
              <label className="text-md" htmlFor="minimumFollower">
                Minimum Followers (only user with this follower amount can
                repost).
              </label>
              <input
                className="p-2 w-full border-[2px] text-gray-700"
                type="number"
                {...register("minimumFollower")}
                id=""
              />
            </div>
            <div className="w-full flex flex-col items-start justify-start">
              <label className="text-md" htmlFor="budget">
                Budget (in Naira)
              </label>
              <input
                className="p-2 w-full border-[2px] text-gray-700"
                type="number"
                {...register("budget")}
                id=""
              />
            </div>
            <div className="w-full flex flex-col items-start justify-start">
              <label className="text-md" htmlFor="perShare">
                Earning Per Share/Post (in Naira)
              </label>
              <input
                className="p-2 w-full border-[2px] text-gray-700"
                type="number"
                {...register("amountPerShare")}
                id=""
              />
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Summary</h3>
              <p>
                Total Reshare:{" "}
                <strong>
                  {totalReshares} Reshare at {amountPerShare} Naira each
                </strong>
              </p>
            </div>
            {/* <button className="bg-blue-500 text-white px-4 py-2">
              Make Payment
            </button> */}
            <button type="submit">
              <PaystackPaymentHandler
                amount={Number(budget)}
                email={data?.author?.email}
                postId={data?._id}
                onSuccess={handlePaymnet}
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPost;

// -------- version 2 -----------
// import React, { useCallback, useEffect, useMemo } from "react";
// import { useParams } from "react-router-dom";
// import { useFetchData } from "../../../hooks/useFetchData";
// import { POST_URL } from "../../../constant/resource";
// import { useAppSelector } from "../../../redux/ReduxType";
// import { useForm } from "react-hook-form";
// import { FaMoneyBillWave, FaUsers, FaShareAlt } from "react-icons/fa";

// const RegisterPost = () => {
//   const { postId } = useParams();

//   const { data, error, loading } = useFetchData<any>(POST_URL + `/${postId}`);
//   const isDark = useAppSelector((state) => state?.theme?.isDark);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       minimumFollower: 0,
//       budget: 0,
//       amountPerShare: 0,
//     },
//     mode: "onChange",
//   });

//   const budget = watch("budget");
//   const amountPerShare = watch("amountPerShare");
//   // const minimumFollower = watch("minimumFollower");

//   const totalReshares = useMemo(() => {
//     return amountPerShare > 0 ? Math.floor(budget / amountPerShare) : 0;
//   }, [budget, amountPerShare]);

//   const handleSubmitForm = (data: any) => {
//     // Implement payment submission logic
//     console.log("Form Submitted:", data);
//   };

//   if (loading) return <div>Loading post details...</div>;
//   if (error) return <div>Error loading post</div>;

//   return (
//     <div
//       className={`min-h-screen p-6 ${
//         isDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
//       }`}
//     >
//       <div
//         className={`
//         max-w-2xl mx-auto
//         rounded-xl
//         shadow-lg
//         overflow-hidden
//         ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
//         border-2
//         transition-all duration-300
//       `}
//       >
//         <div className="p-6">
//           <h1 className="text-2xl font-bold mb-6 flex items-center gap-3">
//             <FaShareAlt className="text-blue-500" />
//             Post Registration
//           </h1>

//           {/* Post Image */}
//           <div className="mb-6 rounded-lg overflow-hidden shadow-md">
//             <img
//               className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-300"
//               src={data?.media}
//               alt="Post visual"
//             />
//           </div>

//           {/* Post Content */}
//           <div className="mb-6 bg-gray-100 p-4 rounded-lg">
//             <p className="italic text-gray-700">{data?.content}</p>
//           </div>

//           {/* Registration Form */}
//           <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
//             {/* Minimum Followers Input */}
//             <div>
//               <label
//                 htmlFor="minimumFollower"
//                 className="flex items-center gap-2 mb-2 font-semibold"
//               >
//                 <FaUsers className="text-gray-500" />
//                 Minimum Followers
//               </label>
//               <input
//                 {...register("minimumFollower", {
//                   required: "Minimum followers is required",
//                   min: { value: 0, message: "Followers cannot be negative" },
//                 })}
//                 type="number"
//                 className={`
//                   w-full p-3 rounded-lg
//                   ${isDark ? "bg-gray-700 text-white" : "bg-white"}
//                   border-2
//                   ${
//                     errors.minimumFollower
//                       ? "border-red-500"
//                       : "border-gray-300"
//                   }
//                   focus:outline-none focus:ring-2 focus:ring-blue-500
//                 `}
//                 placeholder="Enter minimum followers required"
//               />
//               {errors.minimumFollower && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.minimumFollower.message}
//                 </p>
//               )}
//             </div>

//             {/* Budget Input */}
//             <div>
//               <label
//                 htmlFor="budget"
//                 className="flex items-center gap-2 mb-2 font-semibold"
//               >
//                 <FaMoneyBillWave className="text-gray-500" />
//                 Budget (in Naira)
//               </label>
//               <input
//                 {...register("budget", {
//                   required: "Budget is required",
//                   min: { value: 0, message: "Budget cannot be negative" },
//                 })}
//                 type="number"
//                 className={`
//                   w-full p-3 rounded-lg
//                   ${isDark ? "bg-gray-700 text-white" : "bg-white"}
//                   border-2
//                   ${errors.budget ? "border-red-500" : "border-gray-300"}
//                   focus:outline-none focus:ring-2 focus:ring-blue-500
//                 `}
//                 placeholder="Enter total budget"
//               />
//               {errors.budget && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.budget.message}
//                 </p>
//               )}
//             </div>

//             {/* Amount Per Share Input */}
//             <div>
//               <label
//                 htmlFor="amountPerShare"
//                 className="flex items-center gap-2 mb-2 font-semibold"
//               >
//                 <FaShareAlt className="text-blue-500" />
//                 Earning Per Share/Post (in Naira)
//               </label>
//               <input
//                 {...register("amountPerShare", {
//                   required: "Amount per share is required",
//                   min: { value: 0, message: "Amount cannot be negative" },
//                 })}
//                 type="number"
//                 className={`
//                   w-full p-3 rounded-lg
//                   ${isDark ? "bg-gray-700 text-white" : "bg-white"}
//                   border-2
//                   ${
//                     errors.amountPerShare ? "border-red-500" : "border-gray-300"
//                   }
//                   focus:outline-none focus:ring-2 focus:ring-blue-500
//                 `}
//                 placeholder="Enter earning per share"
//               />
//               {errors.amountPerShare && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.amountPerShare.message}
//                 </p>
//               )}
//             </div>

//             {/* Calculation Summary */}
//             <div className="bg-blue-50 p-4 rounded-lg">
//               <h3 className="font-bold mb-2">Calculation Summary</h3>
//               <p>
//                 Total Reshares: <strong>{totalReshares}</strong> at{" "}
//                 <strong>{amountPerShare || 0} Naira</strong> each
//               </p>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={Object.keys(errors).length > 0}
//               className={`
//                 w-full p-3 rounded-lg
//                 transition-all duration-300
//                 ${
//                   Object.keys(errors).length > 0
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-blue-500 hover:bg-blue-600 text-white"
//                 }
//               `}
//             >
//               Make Payment
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPost;
