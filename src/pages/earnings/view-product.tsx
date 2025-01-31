import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import SampleImage from "../../assets/news/news2.jpg";
import { useAppSelector } from "../../redux/ReduxType";
import { Link, useParams } from "react-router-dom";
import { FaNairaSign } from "react-icons/fa6";
import CustomModal from "../../components/modal/CustomModal";
import Earning from "./Earning";
import { useFetchData } from "../../hooks/useFetchData";
import { POST_URL } from "../../constant/resource";

const ViewProduct = () => {
  const [repostModal, setrepostModal] = useState(false);
  const isDark = useAppSelector((state) => state.theme.isDark);
  const { postId } = useParams();

  //   console.log("postid --->", postId);
  const { data, error, loading, refetch } = useFetchData<any>(
    POST_URL + `/${postId}`
  );
  //   console.log("postData --->", data);

  const handleRepost = () => {
    setrepostModal(true);
  };
  return (
    <div className="min-h-screen font-Mon mb-5 pb-10">
      <Link
        className={`rounded-lg overflow-auto text-sm ${
          isDark ? "bg-darkBg text-darkText" : "bg-lightBg text-deepBg"
        } p-5 mt-5 flex items-center justify-start gap-4`}
        to="/earn"
      >
        <IoIosArrowBack className="text-lg" />
        <p>Back</p>
      </Link>
      {/*  */}
      <div
        className={`rounded-lg overflow-auto text-sm ${
          isDark ? "bg-darkBg text-darkText" : "bg-lightBg text-deepBg"
        } p-5 mt-5 flex items-center justify-start gap-4 border-b-2`}
      >
        <img
          className="w-8 h-8 rounded-full"
          src={data?.author?.avatar || SampleImage}
          alt="post"
        />
        <div>
          <h4>
            Galapagous <span className="text-sm text-gray-400">3 days ago</span>
          </h4>
          <p>Kwara Nigeria</p>
        </div>
      </div>
      <div
        className={`rounded-lg overflow-auto text-sm ${
          isDark ? "bg-darkBg text-darkText" : "bg-lightBg text-deepBg"
        } p-5 mt-5 `}
      >
        <div className="flex items-center justify-center gap-2 p-2 h-[400px]">
          <img
            className="w-1/2 h-full object-cover"
            src={data?.media || SampleImage}
            alt="post"
          />
          <img
            className="w-1/2 h-full object-cover"
            src={data?.media || SampleImage}
            alt="post"
          />
        </div>
        <div>
          <h1 className="text-2xl">{data?.media?.content}</h1>
          <div className="my-2">
            <p className="flex items-center gap-2">
              <FaNairaSign /> 1800
            </p>
            <div className="flex items-center justify-start my-2">
              <p className="line-through text-gray-400 p-[1px] mr-2">1500</p>
              <p className="bg-yellow-600 text-yellow-900 rounded-md py-[2px] px-2">
                -13%
              </p>
            </div>
            <div className="flex items-center gap-2 text-[12px] font-bold">
              <p>36Likes</p>
              <p>3.4K Views</p>
              <p>200 Comments</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleRepost}
          className="px-4 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-200 hover:text-blue-900"
        >
          Repost This Product
        </button>
      </div>
      <CustomModal
        isOpen={repostModal}
        onClose={() => {
          setrepostModal(false);
        }}
        size="sm"
        className="w-[1200px] h-screen"
      >
        <Earning data={data} refetch={refetch} />
      </CustomModal>
    </div>
  );
};

export default ViewProduct;
