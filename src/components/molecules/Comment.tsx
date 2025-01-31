import React from "react";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa6";
import { useState } from "react";
import { useAppSelector } from "../../redux/ReduxType";
import { useMakeRequest } from "../../hooks/useMakeRequest";
import { COMMENT_URL } from "../../constant/resource";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setPosts } from "../../redux/slice/post.slice";
import { MdMoreVert } from "react-icons/md";
import LoaderSpinner from "./Loader/Loader.spinner";

interface CommentProps {
  id: number;
  name: string;
  authorId?: string;
  imgSrc?: string;
  timestamp: string;
  likes: string[];
  dislikes: string[];
  content: string;
  isDark?: boolean;
  initialLikes?: number;
  initialDislikes?: number;
  onLike?: (id: number) => void;
  // onDislike?: (id: number) => void;
  refetch?: () => void;
  localRefetch?: () => void;
}

const DEFAULT_AVATAR = "/api/placeholder/48/48";

const Comment: React.FC<CommentProps> = ({
  id,
  authorId,
  name,
  imgSrc = DEFAULT_AVATAR,
  timestamp,
  content,
  isDark = false,
  likes,
  dislikes,
  onLike,
  refetch,
  localRefetch,
}) => {
  const [isImageError, setIsImageError] = useState(false);
  const user = useAppSelector((state) => state.user);
  const [loadingDelete, setLoadingdelete] = useState<boolean>(false);
  const [openReport, setOpenReport] = useState<boolean>(false);
  const makeRequest = useMakeRequest();
  const dispatch = useDispatch();

  const handleLike = () => {
    console.log("likes", likes);
    if (likes.includes(user._id))
      return toast.error("You already like this post");
    const payload = {
      userId: user._id,
      commentId: id,
    };

    const onSuccess = (data: any) => {
      if (refetch) refetch();
      if (localRefetch) localRefetch();
      // dispatch(setPosts(data?.data?.post));
    };

    const onFailure = (error: any) => {
      console.log(error);
      toast.error("Error liking post");
    };

    const onFinal = () => {
      console.log("done");
    };

    makeRequest(
      COMMENT_URL + "/like",
      "POST",
      payload,
      onSuccess,
      onFailure,
      onFinal
    );
  };

  const handleDislike = () => {
    if (!likes.includes(user._id))
      return toast.error("You have not like this post");
    const payload = {
      userId: user._id,
      commentId: id,
    };

    const onSuccess = (data: any) => {
      if (refetch) refetch();
      if (localRefetch) localRefetch();
      // dispatch(setPosts(data?.data?.post));
    };

    const onFailure = (error: any) => {
      console.log(error);
      toast.error("Error liking post");
    };

    const onFinal = () => {
      console.log("done");
    };

    makeRequest(
      COMMENT_URL + "/dislike",
      "POST",
      payload,
      onSuccess,
      onFailure,
      onFinal
    );
  };

  const handleDeleteComment = () => {
    setLoadingdelete(true);
    const payload = {
      userId: user._id,
      author: authorId,
      commentId: id,
    };
    const onSuccess = (data: any) => {
      // console.log(data)
      if (refetch) refetch();
      if (localRefetch) localRefetch();
      // dispatch(setPosts(data?.data?.allPost));
    };

    const onFail = (error: any) => {
      toast.error("error deleting comment");
      console.log("error -->", error);
    };

    const onFinal = () => {
      setLoadingdelete(false);
    };

    // --- make request to delete comment
    makeRequest(
      COMMENT_URL + `/${user?._id}/${id}`,
      "DELETE",
      payload,
      onSuccess,
      onFail,
      onFinal
    );
  };

  const handleImageError = () => {
    setIsImageError(true);
  };

  return (
    <article
      className={`flex p-4 rounded-lg gap-4 mb-4 transition-colors ${
        isDark ? "bg-deepBg text-slate-100" : "bg-slate-100 text-slate-900"
      }`}
    >
      <img
        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        src={isImageError ? DEFAULT_AVATAR : imgSrc}
        alt={`${name}'s avatar`}
        onError={handleImageError}
      />

      <div className="flex-1 space-y-2">
        <header className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{name}</h3>
            <time className="text-sm text-slate-500" dateTime={timestamp}>
              {timestamp}
            </time>
          </div>
          <div
            className={`dropdown dropdown-end ${
              isDark ? "text-deepBg" : "bg-lightBg"
            }`}
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
              {authorId === user?._id ? (
                <li>
                  <button onClick={handleDeleteComment}>
                    {loadingDelete ? (
                      <LoaderSpinner color={"blue"} />
                    ) : (
                      "delete"
                    )}
                  </button>
                </li>
              ) : null}
              {authorId !== user?._id ? (
                <li>
                  <button
                    onClick={() => {
                      setOpenReport(true);
                    }}
                  >
                    report
                  </button>
                </li>
              ) : null}
            </ul>
          </div>
        </header>

        <p className="text-sm whitespace-pre-wrap break-words">{content}</p>

        <footer className="flex gap-6 pt-2">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-sm hover:text-blue-500 transition-colors"
            aria-label={`Like comment (${likes} likes)`}
          >
            <span>{likes?.length}</span>
            <FaRegThumbsUp className="w-4 h-4" />
          </button>

          <button
            onClick={handleDislike}
            className="flex items-center gap-2 text-sm hover:text-red-500 transition-colors"
            aria-label={`Dislike comment (${dislikes} dislikes)`}
          >
            <span>{dislikes?.length}</span>
            <FaRegThumbsDown className="w-4 h-4" />
          </button>
        </footer>
      </div>
    </article>
  );
};

export default Comment;
