import React from "react";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { POST_URL } from "../../../constant/resource";
import { useAppSelector } from "../../../redux/ReduxType";
import TextInput from "../../molecules/FormField/TextInput";

const RegisterPost = () => {
  const { postId } = useParams();

  const { data, error, loading } = useFetchData<any>(POST_URL + `/${postId}`);
  const isDark = useAppSelector((state) => state?.theme?.isDark);

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
            className="w-full mt-3 flex flex-col items-start justify-start gap-5"
            action=""
          >
            <div className="w-full flex flex-col items-start justify-start">
              <label className="text-md" htmlFor="minimumFollower">
                Minimum Followers
              </label>
              <input
                className="p-2 w-full border-[2px]"
                type="number"
                name="minimumFollower"
                id=""
              />
            </div>
            <div className="w-full flex flex-col items-start justify-start">
              <label className="text-md" htmlFor="budget">
                Budget (in Naira)
              </label>
              <input
                className="p-2 w-full border-[2px]"
                type="number"
                name="budget"
                id=""
              />
            </div>
            <div className="w-full flex flex-col items-start justify-start">
              <label className="text-md" htmlFor="perShare">
                Earning Per Share/Post (in Naira)hyper
              </label>
              <input
                className="p-2 w-full border-[2px]"
                type="number"
                name="perShare"
                id=""
              />
            </div>
            <button className="bg-blue-500 text-white px-4 py-2">
              Make Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPost;
