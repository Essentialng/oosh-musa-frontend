import React, { useCallback, useState } from "react";
import "../styles/custom.css";
import { MdVideoCameraBack } from "react-icons/md";
import { TbBoxMultiple } from "react-icons/tb";
import { BsCameraReels, BsGrid } from "react-icons/bs";
import VideoReel from "../components/organisms/VideoReel";
import { MdMovieCreation } from "react-icons/md";
import { useAppSelector } from "../redux/ReduxType";
import { useFetchData } from "../hooks/useFetchData";
import { REEL_URL } from "../constant/resource";

const video2 = "hello";

interface ReelData {
  image: Array<{
    _id?: string;
    media?: string;
  }>;
  video: Array<{
    _id?: string;
    media?: string;
  }>;
  mixed: Array<{
    _id?: string;
    media?: string;
    statusType?: "image" | "video";
  }>;
}

const Reel = () => {
  const isDark = useAppSelector((state) => state.theme.isDark);

  const fetchReels = useCallback(() => {
    return REEL_URL;
  }, []);

  // Use the memoized fetch function
  const { data, loading, error } = useFetchData<ReelData>(fetchReels());

  const [currentSelection, setCurrentSelection] = useState("image");

  const handleSelection = (selection: string) => {
    setCurrentSelection(selection);
  };

  return (
    <div className="w-full my-2 flex flex-col items-center justify-center gap-5 mb-10">
      <div
        className={`flex items-end gap-3 rounded-lg ${
          isDark ? "bg-deepBg text-white" : "bg-white text-gray-800"
        } p-3 custom-scrollbar`}
      >
        {["image", "video", "mixed"].map((tab) => (
          <span
            key={tab}
            onClick={() => handleSelection(tab)}
            className={`cursor-pointer transition-all duration-300 pb-2 ${
              currentSelection === tab
                ? `border-b-2 ${isDark ? "border-white" : "border-gray-800"}`
                : ""
            }`}
          >
            {tab === "image" && <MdVideoCameraBack className="w-6 h-6" />}
            {tab === "video" && <BsCameraReels className="w-6 h-6" />}
            {tab === "mixed" && <BsGrid className="w-6 h-6" />}
          </span>
        ))}
      </div>

      {/** List of post */}
      {currentSelection === "image" ? (
        <div className="grid grid-cols-2 gap-4">
          {data?.image?.map((eachImageStatus: any) => {
            return (
              <div className="relative row-span-2 cursor-pointer after:absolute after:w-full after:h-full after:bg-black after:top-0 after:left-0 after:opacity-55">
                <img
                  className="h-full w-full object-cover rounded-lg"
                  src={eachImageStatus?.media}
                  alt="reel one"
                />
                {/* <TbBoxMultiple className="absolute z-20 top-5 left-5 text-white" /> */}
                <div className="absolute z-20 top-5 left-5">
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={eachImageStatus?.author?.avatar}
                    alt="owner"
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {/** Live video */}
      {currentSelection === "video" ? (
        <div className="flex flex-col gap-20">
          {data?.video?.map((eachVideoStatus: any) => {
            return (
              <VideoReel
                videoSrc={eachVideoStatus?.media}
                profile={eachVideoStatus?.author?.avatar}
                userName={eachVideoStatus?.author?.username}
                time={eachVideoStatus?.created_at}
              />
            );
          })}
        </div>
      ) : null}

      {/* Trend section */}
      {currentSelection === "mixed" ? (
        <div className="grid grid-cols-3 grid-rows-1 gap-4">
          {data?.mixed?.map((eachStatus: any) => {
            return eachStatus?.statusType === "image" ? (
              <div className="relative after:absolute after:w-full after:h-full after:bg-black after:top-0 after:left-0 after:opacity-55">
                <img
                  className="h-full w-full object-cover rounded-lg"
                  src={eachStatus?.media}
                  alt="reel one"
                />
                <TbBoxMultiple className="absolute z-20 top-5 left-5 text-white" />
              </div>
            ) : (
              <div
                className={`relative after:absolute hover:after:hidden after:w-full after:h-full after:bg-black after:top-0 after:left-0 after:opacity-55`}
              >
                <video
                  controls
                  className="object-cover rounded-lg shadow-lg h-[230px] w-full"
                >
                  <source src={eachStatus?.media} type="video/mp4" />
                </video>
                <MdMovieCreation className="absolute z-20 top-5 left-5 text-white" />
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Reel;
