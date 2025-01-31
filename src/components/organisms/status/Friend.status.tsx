import React, { useState } from "react";
import ProfileIMG from "../../../assets/others/avatar.jpeg";
import CustomModal from "../../modal/CustomModal";
import ViewImage from "./ViewImage";
import ViewStatus from "./View.status";

const FriendStatus = ({ status }: { status: any }) => {
  const [showModal, setShowModal] = useState(false);
  const handleViewMyStatus = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="flex items-center justify-center">
      {status?.map((eachdata: any) => {
        return (
          <div className="sm:w-[120px] w-[60px] sm:h-[160px] h-[60px] relative carousel-item pl-10">
            <img
              onClick={handleViewMyStatus}
              className={`w-full cursor-pointer ${
                eachdata?.status?.length ? "border-4 border-darkBg" : ""
              } h-full object-cover sm:rounded-lg rounded-full cursor-pointer`}
              src={eachdata?.avatar || ProfileIMG}
              alt=""
            />
            <CustomModal
              size="md"
              className="min-h-[400px]"
              onClose={() => setShowModal(false)}
              isOpen={showModal}
            >
              <ViewStatus
                userStatus={eachdata?.status}
                close={() => {
                  setShowModal(false);
                }}
              />
            </CustomModal>
          </div>
        );
      })}
    </div>
  );
};

export default FriendStatus;
