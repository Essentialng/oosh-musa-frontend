import { useParams } from "react-router-dom";
import { useAppSelector } from "../redux/ReduxType";
import Feed from "../components/organisms/Feed";
import { POST_URL } from "../constant/resource";
import { BsArrowLeft } from "react-icons/bs";
import { useFetchData } from "../hooks/useFetchData";
import LoaderSpinner from "../components/molecules/Loader/Loader.spinner";
import { useEffect } from "react";
import axios from "axios";
import { useMakeRequest } from "../hooks/useMakeRequest";

const SinglePost = () => {
  const { postId } = useParams();
  const isDark = useAppSelector((state) => state.theme.isDark);
  const makeRequest = useMakeRequest();

  const { data, loading, refetch } = useFetchData<any>(POST_URL + `/${postId}`);
  // --- getuser ip address and save as view

  useEffect(() => {
    const fetchUserIp = async () => {
      await axios
        .get("https://api.ipify.org?format=json")
        .then(async (response) => {
          const userIp = response?.data?.ip;
          await makeRequest(
            POST_URL + "/view",
            "POST",
            { userIp: userIp, postId: postId },
            () => {
              console.log();
            },
            () => {
              console.log();
            },
            () => {
              console.log();
            }
          );
        })
        .catch((error) => console.error("Error fetching IP:", error));
    };
    fetchUserIp();
  }, []);

  return loading ? (
    <div className="flex items-center justify-center">
      <LoaderSpinner color={"blue"} />
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
      {refetch ? (
        <Feed showAll={true} isDark={isDark} data={data} refetch={refetch} />
      ) : null}
    </div>
  );
};

export default SinglePost;
