import React, { useContext, useState } from "react";
import Background from "../../assets/profile/back1.jpeg";
import { useAppSelector } from "../../redux/ReduxType";
import AuthContext from "../../context/AuthProvider";
import { CgProfile } from "react-icons/cg";
import { User } from "../../type/user.type";
import { POST_URL, USER_URL } from "../../constant/resource";
import toast from "react-hot-toast";
import { fetchData } from "../../utils/axisoCall";
import { from } from "@apollo/client";
import LoaderSpinner from "../molecules/Loader/Loader.spinner";
import { useNavigate } from "react-router-dom";

interface IProfileData {
  data: User | undefined;
}

const ProfileData: React.FC<IProfileData> = (data) => {
  const isDark = useAppSelector((state) => state.theme.isDark);
  const { auth } = useContext(AuthContext);
  const user = useAppSelector((state) => state.user);
  const [loadingFollow, setLoadingFollow] = useState<boolean>(false);
  const [loadingFriend, setLoadingFriend] = useState<boolean>(false);
  const navigate = useNavigate();
  // ----- fetch user details and fill the page ----------

  const isFollower = data.data?.followers?.includes(user._id);
  const isFreind = data?.data?.friends?.includes(user._id);

  const handleFollowRequest = () => {
    if (!user?._id) {
      toast.error("signin to continue");
      navigate("/register");
      return;
    }
    // (user._id, data?.data?._id)
    if (isFollower) return toast.custom("You already follow this person");
    const payload = {
      follower: user._id,
      following: data?.data?._id,
    };

    const onSuccess = (data: any) => {
      toast.success("success");
      console.log("follow response ---->", data);
    };

    const onFailure = (error: any) => {
      toast.error("error");
      console.log(error);
    };

    fetchData({
      url: `${POST_URL}/follow`,
      method: "PUT",
      payload,
      onSuccess,
      onFailure,
    });
  };

  const handleUnfollowRequest = () => {
    // (user._id, data?.data?._id)
    const payload = {
      follower: user._id,
      floowing: data?.data?._id,
    };

    const onSuccess = (data: any) => {
      toast.success("success");
      console.log("follow response ---->", data);
    };

    const onFailure = (error: any) => {
      toast.error("error");
      console.log(error);
    };

    fetchData({
      url: `${POST_URL}/follow`,
      method: "PUT",
      payload,
      onSuccess,
      onFailure,
    });
  };

  const handleFriendRequest = () => {
    if (!user?._id) {
      toast.error("signin to continue");
      navigate("/register");
      return;
    }
    if (isFreind)
      return toast.custom("You are already friend with this person");
    try {
      setLoadingFriend(true);
      const payload = {
        from: user._id,
        to: data?.data?._id,
      };

      console.log("data --->", payload);

      const onSuccess = (data: any) => {
        toast.success("success");
        console.log("follow response ---->", data);
      };

      const onFailure = (error: any) => {
        toast.error(error?.response?.data?.Message);
        console.log(error);
      };

      const final = () => {
        setLoadingFriend(false);
      };

      fetchData({
        url: `${USER_URL}/friend`,
        method: "POST",
        payload,
        onSuccess,
        onFailure,
        final,
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div>
      <section className="w-full h-[300px] relative text-sm">
        {data?.data?.profile ? (
          <img
            className="object-cover h-full w-full"
            src={data?.data?.profile}
            alt="background"
          />
        ) : (
          <img
            className="object-cover h-full w-full"
            src={Background}
            alt="background"
          />
        )}
        <div className="absolute -bottom-8 left-0 flex items-start justify-start gap-5">
          {data?.data?.avatar ? (
            <img
              className="w-10 h-10 rounded-full object-cover shadow-md"
              src={data?.data?.avatar}
              alt="profile"
            />
          ) : (
            <CgProfile className="w-10 h-10 text-white" />
          )}
          <div>
            <h2
              className={`text-2xl font-bold ${
                !isDark && "text-lightText"
              } mb-2`}
            >
              {auth?.fullname}
            </h2>
            <div
              className={`flex items-start flex-col shadow-md p-5 justify-start gap-2 font-semibold rounded-md ${
                isDark ? "bg-deepBg text-lightText" : "bg-deepLight text-deepBg"
              }`}
            >
              <p className="text-balance">{data?.data?.fullname || "N/A"}</p>
              <p className="text-balance">{data?.data?.username || "N/A"}</p>
              <p className="text-balance">{data?.data?.state || "N/A"}</p>
              {/* <p className='text-balance'>New York, NY</p> */}
              <p className="text-balance">
                {data?.data?.followers?.length}{" "}
                <span className="text-blue-400">followers</span>
              </p>
              <div className="flex items-center justify-center gap-3">
                {isFollower ? (
                  <button
                    onClick={() => {
                      handleUnfollowRequest();
                    }}
                    className={`text-sm px-5 py-2 rounded-full ${
                      isDark
                        ? "bg-lightBg text-deepBg"
                        : "bg-deepBg text-lightText"
                    }`}
                  >
                    UnFollow
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleFollowRequest();
                    }}
                    className={`text-sm px-5 py-2 rounded-full ${
                      isDark
                        ? "bg-lightBg text-deepBg"
                        : "bg-deepBg text-lightText"
                    }`}
                  >
                    Follow
                  </button>
                )}
                {!isFreind ? (
                  <button
                    onClick={handleFriendRequest}
                    className={`text-sm px-5 py-2 rounded-full ${
                      isDark
                        ? "bg-lightBg text-deepBg"
                        : "bg-deepBg text-lightText"
                    }`}
                  >{`${
                    loadingFriend ? (
                      <LoaderSpinner color="blue" />
                    ) : (
                      "Send Request"
                    )
                  }`}</button>
                ) : (
                  <button
                    onClick={handleFollowRequest}
                    className={`text-sm px-5 py-2 rounded-full ${
                      isDark
                        ? "bg-lightBg text-deepBg"
                        : "bg-deepBg text-lightText"
                    }`}
                  >
                    Block Friend
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ProfileData;
