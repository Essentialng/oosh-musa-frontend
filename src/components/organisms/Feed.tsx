import React, { useCallback, useEffect, useState } from "react";
import { MdError, MdMoreVert } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaHeart, FaShare, FaWhatsapp } from "react-icons/fa";
import { BsChatDots, BsCheck } from "react-icons/bs";
import Comment from "../molecules/Comment";
import "../../styles/custom.css";
import Reaction from "../molecules/Reaction/Reaction";
import { GoDotFill } from "react-icons/go";
import ProfileIMG from "../../assets/others/avatar.jpeg";
import { useAppDispatch, useAppSelector } from "../../redux/ReduxType";
import { useMakeRequest } from "../../hooks/useMakeRequest";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { commentSchema } from "../../validation/post.schema";
import { COMMENT_URL, POST_URL } from "../../constant/resource";
import toast from "react-hot-toast";
import LoaderSpinner from "../molecules/Loader/Loader.spinner";
import { useFetchData } from "../../hooks/useFetchData";
import { getPostTimestamp, timeAgo } from "../../utils/day.format";
import { addComment, setPosts, updatePost } from "../../redux/slice/post.slice";
import { SiSimpleanalytics } from "react-icons/si";
import CustomModal from "../modal/CustomModal";
import { CgUserAdd } from "react-icons/cg";
import MainModal from "../modal/Second.modal";
import { FaXTwitter } from "react-icons/fa6";
import { IoLinkOutline } from "react-icons/io5";
import { handleSocial } from "../../utils/sharePost";

interface IFeedProps {
  isDark: boolean;
  data?: any;
  showAll: boolean;
  refetch?: () => void;
}

const Feed: React.FC<IFeedProps> = ({ isDark, data, showAll, refetch }) => {
  const [showComment, setShowComment] = useState(false);
  const postURL = POST_URL + "/all";
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [friendModal, setFriendModal] = useState(false);
  const [canEran, setCanEarn] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const baseURL = `${process.env.REACT_APP_BASE_URL}/post/${data?._id}`;

  const {
    data: refetchData,
    error,
    loading: refreshLoading,
    refetch: localRefetch,
    pagination,
  } = useFetchData<any>(postURL);

  const makeRequest = useMakeRequest();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      post: data?._id,
      author: user?._id,
    },
    resolver: yupResolver(commentSchema),
  });
  const currentWord = watch("content");
  // ---- comment and refetch to update ----

  const handleShow = () => {
    setShowComment(!showComment);
  };

  const handleCopy = async (url: string) => {
    console.log("first-->", url);
    try {
      await navigator.clipboard.writeText(url);
      toast.success("copied");
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewPost = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  const handleShare = () => {
    setShareModal(true);
  };

  const handleLike = () => {
    if (!user?._id) {
      toast.error("Signin to continue");
      navigate("/register");
      return;
    }
    const payload = {
      userId: user._id,
      postId: data?._id,
    };
    const onSuccess = (data: any) => {
      dispatch(setPosts(data?.data?.allPost));
      refetch && refetch();
      // localRefetch();
    };

    const onFailure = (data: any) => {
      toast.error("faliure");
    };

    const onFinal = () => {
      console.log();
    };

    makeRequest(
      POST_URL + "/like",
      "POST",
      payload,
      onSuccess,
      onFailure,
      onFinal
    );
  };

  const handleShowComment = (comment: any) => {
    // console.log("coment passed-->", comment);
    if (showAll) {
      return comment?.comment?.map((eachComment: any) => {
        return (
          <Comment
            isDark={isDark}
            key={eachComment._id}
            id={eachComment?._id}
            name={eachComment?.author?.fullname}
            authorId={eachComment?.author?._id}
            imgSrc={eachComment?.author?.avatar}
            timestamp={eachComment?.created_at}
            content={eachComment?.content}
            likes={eachComment?.likes}
            dislikes={eachComment?.dislikes}
          />
        );
      });
    } else {
      return (
        <Comment
          isDark={isDark}
          id={comment?.comment[0]?._id}
          name={comment?.comment[0]?.author?.fullname}
          authorId={comment?.comment[0]?.author?._id}
          imgSrc={comment?.comment[0]?.author?.avatar}
          timestamp={comment?.comment[0]?.created_at}
          content={comment?.comment[0]?.content}
          likes={comment?.comment[0]?.likes}
          dislikes={comment?.comment[0]?.dislikes}
          refetch={refetch}
          localRefetch={localRefetch}
        />
      );
    }
  };

  const handleMakeComment = useCallback(
    (data: any) => {
      if (!user?._id) {
        toast.error("Signin to comment");
        navigate("/register");
        return;
      }
      setLoading(true);
      const payload = {
        ...data,
      };
      const onSuccess = async (data: any) => {
        dispatch(setPosts(data?.data?.post));
        toast.success("success");
        if (refetch) refetch();
        localRefetch();
      };
      const onFinal = () => {
        reset();
        setLoading(false);
      };
      // --- make your API call here ---
      try {
        makeRequest(
          COMMENT_URL,
          "POST",
          payload,
          onSuccess,
          console.log,
          onFinal
        );
      } catch (error) {
        toast.error("Error creating post. try again later");
      }
    },
    [makeRequest, reset]
  );

  const handleProfile = () => {
    if (user?._id === data?.author?._id) {
      navigate(`/profile/user._id`);
    } else {
      navigate(`/user/${data.author._id}`);
    }
  };

  const handleMessage = () => {
    if (!user?._id) {
      toast.error("Signin to message user");
      navigate("/register");
      return;
    }
    if (data?.author?.friends?.includes(user?._id)) {
      navigate(`/chat/${user?._id}`);
    } else {
      setFriendModal(true);
    }
  };

  const handleEarn = () => {
    const followersLength = user?.followers?.length;
    if (!(followersLength < 1000)) {
      setCanEarn(true);
      return;
    } else {
      navigate(`/single-earn/${data?._id}`);
    }
  };

  const handleDeletePost = () => {
    if (!user) return toast.error("Signin to continue");
    const payload = {
      userId: user._id,
      postId: data?._id,
    };

    const onSuccess = async (data: any) => {
      // dispatch(setPosts(data?.data?.post));
      toast.success("success");
      if (refetch) refetch();
      localRefetch();
    };
    const onFinal = () => {
      reset();
      setLoading(false);
    };
    // --- make your API call here ---
    try {
      makeRequest(
        POST_URL + `/${data?._id}`,
        "DELETE",
        payload,
        onSuccess,
        console.log,
        onFinal
      );
    } catch (error) {
      toast.error("Error creating post. try again later");
    }
  };

  const handleAdvertisePost = () => {
    if (!user?._id) {
      toast.error("Signin to advertise post");
      navigate("/register");
      return;
    }
    navigate(`/register-post/${data?._id}`);
  };

  return (
    <div
      className={`rounded-lg mb-10 p-2 ${
        isDark ? "bg-darkBg text-darkText" : "bg-lightBg text-deepBg"
      }`}
    >
      {/* profile */}
      <div className="flex items-center justify-between">
        <div className="flex items-start justify-start gap-3">
          <img
            onClick={handleProfile}
            className="w-8 h-8 object-cover rounded-full cursor-pointer"
            src={data?.author?.avatar || ProfileIMG}
            alt=""
          />
          <div className="flex flex-col items-start gap-[1px]">
            <div className="flex gap-[2px] items-center justify-center">
              <div className="flex">
                <BsCheck className="bg-blue-400 rounded-full w-3 h-3" />
                <BsCheck className="bg-green-400 rounded-full w-3 h-3" />
              </div>
              <h3 className="font-semibold text-sm">
                {data?.author?.username}
              </h3>
            </div>
            <div>
              <div className="flex items-center justify-start gap-5">
                <p className="text-xs">{timeAgo(data?.created_at)}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`dropdown dropdown-end ${
            isDark ? "text-deepBg" : "bg-lightBg"
          } relative z-50`}
        >
          <div tabIndex={0} role="button" className="m-1">
            <MdMoreVert
              className={`${isDark ? "text-white" : "text-deepBg"}`}
            />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow"
          >
            {/* <li>
              <Link to="#">Share</Link>
            </li> */}
            {data?.author?._id !== user?._id &&
            !data?.author?.friends?.includes(user?._id) ? (
              <li>
                <Link to="#">connect</Link>
              </li>
            ) : null}
            {data?.author?._id !== user?._id ? (
              <li>
                <Link to="#">report</Link>
              </li>
            ) : null}
            {data?.author?._id !== user?._id ? (
              <li>
                <Link to="#">block</Link>
              </li>
            ) : null}
            {data?.author?._id === user?._id ? (
              <li>
                <button onClick={handleDeletePost}>delete</button>
              </li>
            ) : null}
            {data?.author?._id === user?._id ? (
              <li>
                <button onClick={handleAdvertisePost}>Advertise</button>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-start gap-10 mt-2">
        <div className="flex items-center gap-5">
          {data?.author?._id !== user?._id ? (
            <div className="flex items-center group">
              <GoDotFill className="group-hover:text-purple-500" />
              {user?._id ? <button onClick={handleEarn}>Earn</button> : null}
            </div>
          ) : null}
          {user?._id && data?.author?._id !== user?._id ? (
            <div className="flex items-center group">
              <GoDotFill className="group-hover:text-purple-500" />
              <button onClick={handleMessage}>Message</button>
            </div>
          ) : null}
        </div>
      </div>

      {/* content */}
      <div className="mt-5">
        <p
          onClick={() => {
            handleViewPost(data?._id);
          }}
          className="mb-2 cursor-pointer"
        >
          {data?.content}
        </p>
        {data?.media && (
          <img
            className={`${
              showAll ? "h-full" : "h-[350px]"
            } object-cover bg-center w-full`}
            src={data?.media}
            alt=""
          />
        )}
      </div>

      {/* comments */}
      <div className="mt-2 flex items-center justify-start">
        <Reaction
          onClick={handleLike}
          title="Like"
          value={data?.likes?.length}
          isDark={isDark}
          logo={<FaHeart className="text-red-500 w-4 h-4" />}
        />
        <Reaction
          onClick={handleShow}
          title="Comment"
          value={data?.comment?.length}
          isDark={isDark}
          logo={<BsChatDots className="text-gray-300 w-4 h-4" />}
        />
        <Reaction
          onClick={handleShare}
          title="Share"
          value={data?.share?.length}
          isDark={isDark}
          logo={<FaShare className="text-gray-300 w-4 h-4" />}
        />
        <Reaction
          title="views"
          value={data?.views?.length || 0}
          isDark={isDark}
          logo={<SiSimpleanalytics className="text-gray-300 w-4 h-4" />}
        />
      </div>

      {/* comments */}
      {/* {showComment ? ( */}
      <div className="mt-5 px-4 transition-all duration-500 ease-linear">
        <hr className="h-auto bg-deepLight mb-2 rounded-full" />
        <div className="custom-scrollbar overflow-auto transition-all duration-500">
          {data?.comment?.length ? (
            handleShowComment(data)
          ) : (
            <p>Be the first to comment</p>
          )}
        </div>
        <form
          onSubmit={handleSubmit(handleMakeComment)}
          className="flex items-center gap-3 justify-center py-3"
        >
          <input
            type="text"
            className={`text-gray-600 flex items-center outline-none text-sm gap-2 w-full px-2 rounded-full ${
              isDark ? "" : "border-darkBg border-2"
            } p-3`}
            {...register("content")}
            placeholder=""
          />
          <button
            className={`flex items-center gap-2 border-[2px] rounded-full px-3 py-2 ${
              isDark
                ? "text-lightBg border-lightBg hover:bg-deepLight hover:text-deepBg"
                : "text-deepBg border-deepBg hover:bg-deepBg hover:text-darkText"
            }`}
            type="submit"
          >
            {loading ? <LoaderSpinner color={"white"} /> : "comment"}
          </button>
        </form>
      </div>
      {/* ) : null} */}
      <div>
        {errors?.content ? (
          <p className="text-center text-red-500">{errors?.content?.message}</p>
        ) : null}
        {errors?.content ? (
          <p>{100 - Number(currentWord?.length) || 0}</p>
        ) : null}
      </div>
      <CustomModal
        isOpen={canEran}
        onClose={() => {
          setCanEarn(false);
        }}
        size="sm"
        className="text-sm text-white"
      >
        <div className="flex flex-col items-center justify-center gap-10">
          <MdError className="w-10 h-10 text-red-500" />
          <p className="text-lg text-center">
            You need to have up to 1000k followers to have access to this
            feature
          </p>
        </div>
      </CustomModal>
      <CustomModal
        isOpen={friendModal}
        onClose={() => {
          setFriendModal(false);
        }}
        size="sm"
        className="text-sm text-white"
      >
        <div className="w-full h-full flex items-center flex-col justify-center">
          <div className="border-2 rounded-full p-5 mb-10">
            <CgUserAdd className="w-10 h-10" />
          </div>
          <p className="text-lg mb-3">You are not yet friend with this user</p>
          <button className="px-5 py-2 mt-2 rounded-full bg-white text-deepBg">
            Send Friend Request
          </button>
        </div>
      </CustomModal>
      <MainModal showModal={shareModal} closeModal={() => setShareModal(false)}>
        <div className="bg-white">
          <div className="w-full flex flex-col items-start justify-center gap-3">
            <button
              onClick={() => {
                handleCopy(baseURL);
              }}
              className="font-semibold flex items-center justify-start gap-3 text-[14px] hover:bg-gray-100 p-2 rounded-full w-full"
            >
              <IoLinkOutline className="text-lg" /> Copy link
            </button>
            <button
              onClick={() => {
                handleSocial("hot topic on oosh", baseURL, "twitter");
              }}
              className="font-semibold flex items-center justify-start gap-3 text-[14px] hover:bg-gray-100 p-2 rounded-full w-full"
            >
              <FaXTwitter className="text-lg" /> X
            </button>
            <button
              onClick={() => {
                handleSocial("hot topic on oosh", baseURL, "facebook");
              }}
              className="font-semibold flex items-center justify-start gap-3 text-[14px] hover:bg-gray-100 p-2 rounded-full w-full"
            >
              <FaFacebook className="text-lg" /> Facebook
            </button>
            <button
              onClick={() => {
                handleSocial("hot topic on oosh", baseURL, "whatsApp");
              }}
              className="font-semibold flex items-center justify-start gap-3 text-[14px] hover:bg-gray-100 p-2 rounded-full w-full"
            >
              <FaWhatsapp className="text-lg" /> WhatsApp
            </button>
          </div>
        </div>
      </MainModal>
    </div>
  );
};

export default Feed;
