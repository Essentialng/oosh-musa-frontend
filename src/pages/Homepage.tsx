import { useRef, useState } from "react";
import "../styles/custom.css";

// ------ imports --------
import Feed from "../components/organisms/Feed";
import { useAppSelector } from "../redux/ReduxType";
import CreatePost from "../components/shared/CreatePost";
import { POST_URL, STATUS_URL } from "../constant/resource";
import ImageStatus from "../components/organisms/status/Image.status";
import CustomModal from "../components/modal/CustomModal";
import VideoStatus from "../components/organisms/status/Video.status";
import TextStatus from "../components/organisms/status/Text.status";
import CreateStatus from "../components/organisms/status/create.status";
import FriendStatus from "../components/organisms/status/Friend.status";
import ViewStatus from "../components/organisms/status/View.status";
import { useFetchData } from "../hooks/useFetchData";

// ------ imports --------

const Homepage = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDark = useAppSelector((state) => state?.theme?.isDark);
  const auth = useAppSelector((state) => state?.user);
  const userId: string | null = auth?._id;
  const [statusModal, setStatusModal] = useState(false);
  const [userStatus, setUserStatus] = useState([]);
  const [friendStatus, setFriendStatus] = useState([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [statusType, setStatusType] = useState<"image" | "video" | "text">(
    "image"
  );

  const {
    data: postData,
    error: postError,
    loading: loadingPost,
    refetch,
  } = useFetchData<any>(POST_URL + "/all");

  console.log('data -->', postData)

  const {
    data: statusData,
    error: statusError,
    loading: statusLoading,
  } = useFetchData<any>(STATUS_URL + `/${auth?._id}`);

  // ----------- scroll --------------
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // ----------- status ----------
  const handleStatusClick = (type: "image" | "video" | "text") => {
    setStatusType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleViewMyStatus = () => {
    if (userStatus?.length === 0) return;
    setStatusModal(true);
  };

  const renderStatusModalContent = () => {
    switch (statusType) {
      case "image":
        return <ImageStatus />;
        break;
      case "text":
        return <TextStatus />;
        break;
      case "video":
        return <VideoStatus />;
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`mb-10 ${
        isDark ? "text-darkText" : " text-deepBg"
      } sm:p-5 p-3 custom-scrollbar`}
    >
      {/* status */}
      {userId ? (
        <section
          ref={scrollContainerRef}
          className={`relative text-sm w-full carousel bg-transparent ${
            isDark ? "bg-deepBg" : "bg-lightBg"
          } rounded-box space-x-4`}
        >
          {/* ... scroll buttons ... */}

          {/* Status Creation Section */}
          <div className="flex items-center justify-center">
            <CreateStatus
              setShowModal={setShowModal}
              setStatusType={setStatusType}
              userStatus={statusData?.userStatus}
              setStatusModal={setStatusModal}
            />
            {friendStatus?.length ? (
              <FriendStatus status={statusData?.friendStatus} />
            ) : null}
          </div>
          {/* ... StatusImg components ... */}
        </section>
      ) : null}

      {/**----- Create a post ------ */}
      {userId ? <CreatePost refetch={refetch} userId={auth?._id} /> : null}

      {/**---- News feed ----- */}
      <section
        className={`text-xs mt-10 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100`}
      >
        {postData?.length > 0 ? (
          postData?.map((eachData: any) => {
            return (
              <Feed
                showAll={false}
                isDark={isDark}
                refetch={refetch}
                data={eachData}
              />
            );
          })
        ) : (
          <p>No feed found</p>
        )}
      </section>

      <CustomModal
        isOpen={statusModal}
        onClose={() => {
          setStatusModal(false);
        }}
        // title="Image Modal"
        size="md"
        className="min-h-[400px]"
      >
        <ViewStatus
          userStatus={userStatus as []}
          close={() => {
            setStatusModal(false);
          }}
        />
      </CustomModal>

      <CustomModal
        isOpen={showModal}
        onClose={closeModal}
        // title="Image Modal"
        size="lg"
        className="min-h-[400px]"
      >
        {renderStatusModalContent()}
      </CustomModal>
    </div>
  );
};

export default Homepage;
