import React from "react";
import { useAppSelector } from "../../../redux/ReduxType";
import { MdAdd, MdCreate, MdImage, MdVideocam } from "react-icons/md";
import ProfileIMG from "../../../assets/others/avatar.jpeg";

const CreateStatus = ({
  setShowModal,
  setStatusType,
  userStatus,
  setStatusModal,
}: {
  setShowModal: any;
  setStatusType: any;
  userStatus: any;
  setStatusModal: any;
}) => {
  const isDark = useAppSelector((state) => state.theme.isDark);
  const auth = useAppSelector((state) => state.user);
  const handleStatusClick = (type: "image" | "video" | "text") => {
    setStatusType(type);
    setShowModal(true);
  };

  const handleViewMyStatus = () => {
    if (userStatus?.length === 0) return;
    setStatusModal(true);
  };

  return (
    <div className="sm:w-[120px] w-[60px] sm:h-[160px] h-[60px] relative carousel-item pl-10">
      <img
        className={`w-full ${
          userStatus?.length ? "border-4 border-darkBg" : ""
        } h-full object-cover sm:rounded-lg rounded-full cursor-pointer`}
        src={auth?.avatar || ProfileIMG}
        onClick={handleViewMyStatus}
        alt=""
      />
      <div
        className={`dropdown dropdown-end ${
          isDark ? "text-deepBg" : "bg-lightBg"
        }`}
      >
        <div
          tabIndex={0}
          role="button"
          className={`p-[4px] absolute -left-32 bottom-0 cursor-pointer w-8 h-8 rounded-full flex items-center justify-center
                                ${
                                  isDark
                                    ? "bg-deepBg text-lightText"
                                    : "bg-lightBg text-darkBg"
                                }`}
        >
          <MdAdd />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[100] w-32 p-2 shadow"
        >
          <li>
            <button
              onClick={() => handleStatusClick("image")}
              className="flex items-center gap-2"
            >
              <MdImage /> Image
            </button>
          </li>
          <li>
            <button
              onClick={() => handleStatusClick("video")}
              className="flex items-center gap-2"
            >
              <MdVideocam /> Video
            </button>
          </li>
          <li>
            <button
              onClick={() => handleStatusClick("text")}
              className="flex items-center gap-2"
            >
              <MdCreate /> Text
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CreateStatus;
