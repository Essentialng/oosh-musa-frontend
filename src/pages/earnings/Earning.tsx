import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../redux/ReduxType";
import SampleImage from "../../assets/others/noimage.jpeg";
import { MdCreate } from "react-icons/md";
import LoaderSpinner from "../../components/molecules/Loader/Loader.spinner";
import { yupResolver } from "@hookform/resolvers/yup";
import { repostSchema } from "../../validation/post.schema";
import { useMakeRequest } from "../../hooks/useMakeRequest";
import { REPOST_URL } from "../../constant/resource";
import toast from "react-hot-toast";

const Earning = ({ data, refetch }: { data: any; refetch: () => void }) => {
  const User = useAppSelector((state) => state.user);
  const isDark = useAppSelector((state) => state?.theme?.isDark);
  const [loading, setLoading] = useState(false);
  const makeRequest = useMakeRequest();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user: User?._id,
      reposts: data?._id,
    },
    resolver: yupResolver(repostSchema),
  });

  const onSubmit = (data: any) => {
    setLoading(true);
    const onSuccess = (data: any) => {
      console.log(data);
      toast.success("reposted");
      refetch();
    };

    const onFailure = () => {
      toast.error("An error has occured, pls try again");
    };

    const onFinal = () => {
      setLoading(false);
    };

    try {
      makeRequest(REPOST_URL, "POST", data, onSuccess, onFailure, onFinal);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen w-full">
      <div
        className={`rounded-lg overflow-auto text-sm ${
          isDark ? "bg-darkBg text-darkText" : "bg-lightBg text-deepBg"
        } p-5 mt-10`}
      >
        <div className="mb-5">
          <img
            className="object-cover h-[300px] w-full rounded-sm"
            src={data?.media || SampleImage}
            alt="poster"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="p-3 bg-indigo-50 text-deepBg flex items-center gap-2 w-full rounded-full">
            <input
              {...register("content")}
              type="text"
              className="grow border-none outline-none bg-inherit"
              placeholder="what's on your mind?"
            />
            <MdCreate className="text-indigo-400 text-lg" />
          </label>
          {errors?.user ? (
            <p className="text-red-500">{errors?.user?.message}</p>
          ) : null}
          {errors?.content ? (
            <p className="text-red-500">{errors?.content?.message}</p>
          ) : null}
          {errors?.reposts ? (
            <p className="text-red-500">{errors?.reposts?.message}</p>
          ) : null}
          <button
            type="submit"
            className={`px-4 mt-2 py-3 ${
              isDark ? "bg-deepBg" : "bg-deepLight"
            } rounded-full text-xs min-w-[100px]`}
          >
            {loading ? <LoaderSpinner color={"white"} /> : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Earning;
