import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../redux/ReduxType";
import Feed from "../components/organisms/Feed";
import { useMakeRequest } from "../hooks/useMakeRequest";
import { POST_URL } from "../constant/resource";
import toast from "react-hot-toast";
import { BsArrowLeft } from "react-icons/bs";
import { useFetchData } from "../hooks/useFetchData";

const SinglePost = () => {
  const { postId } = useParams();
  const isDark = useAppSelector((state) => state.theme.isDark);

  const { data, loading, refetch } = useFetchData(POST_URL + `/${postId}`);

  return loading ? (
    <div className="flex items-center justify-center">
      <p>Loading ...</p>
    </div>
  ) : (
    <div
      className={`rounded-lg text-sm relative mt-5 p-2 ${
        isDark ? "bg-darkBg text-darkText" : "bg-lightBg text-deepBg"
      }`}
    >
      <button className="absolute top-0 -left-10">
        <BsArrowLeft />
      </button>
      <Feed showAll={true} isDark={isDark} data={data} refetch={refetch} />
    </div>
  );
};

export default SinglePost;
