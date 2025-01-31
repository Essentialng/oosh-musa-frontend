import React from "react";
import PostSample from "../../../assets/news/news1.jpg";
import { FaNairaSign } from "react-icons/fa6";
import { useAppSelector } from "../../../redux/ReduxType";
import { Link } from "react-router-dom";
import NoImage from "../../../assets/others/noimage.jpeg";

const Gig = ({ postId, data }: { postId: string; data: any }) => {
  const isDark = useAppSelector((state) => state.theme.isDark);

  return (
    <div>
      <div className="h-[180px] overflow-hidden">
        <img
          className="h-full w-full object-contain"
          src={data?.media || NoImage}
          alt="post"
        />
      </div>
      <h6>
        {data?.content?.length > 30
          ? data?.content?.split(" ").splice(0, 5).join(" ") + " ..."
          : data?.content}
      </h6>
      <h6 className="flex items-center">
        <FaNairaSign /> 18000
      </h6>
      <div className="flex items-center justify-start">
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
      <Link
        className={`px-4 text-center py-2 border-2 w-full mt-2 block ${
          isDark ? "hover:bg-blue-500" : "hover:bg-gray-400 text-black"
        }`}
        to={`/single-earn/${postId}`}
      >
        Proceed
      </Link>
    </div>
  );
};

export default Gig;
