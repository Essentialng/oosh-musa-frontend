import React, { useState } from "react";
import { useAppSelector } from "../../redux/ReduxType";
import { FaMoneyBillTransfer, FaNairaSign } from "react-icons/fa6";
import { BsWallet } from "react-icons/bs";
import Modal from "../../components/modal/Modal";
import UserIntro from "./UserIntro";

const Home = () => {
  const User = useAppSelector((state) => state?.user);
  const isDark = useAppSelector((state) => state?.theme?.isDark);
  const [userType, setUserType] = useState("");
  const [showIntro, setShowIntro] = useState(false);

  const handlePreview = (userType: string) => {
    setUserType(userType);
    setShowIntro(true);
  };

  return (
    <div>
      <div
        className={`w-full border-b-2 py-2 border-${
          isDark ? "white" : "gray-700"
        }`}
      >
        <p>Welcome {User?.fullname}</p>
      </div>
      {/* ----- main section ----- */}
      <div className="flex flex-col items-center justify-center">
        <p className="text-lg my-2">My balance</p>
        <h1 className="flex text-[3rem] items-center justify-center">
          <FaNairaSign /> 0.00
        </h1>
        <div className="flex items-center justify-center gap-3 mt-3">
          <button
            className={`flex items-center justify-center gap-2 border-[2px] px-4 py-2 hover:bg-deepBg hover:text-white cursor-pointer`}
          >
            <BsWallet />
            Fund
          </button>
          <button className="flex items-center justify-center gap-2 border-[2px] px-4 py-2 hover:bg-deepBg hover:text-white cursor-pointer">
            <FaMoneyBillTransfer />
            Withdraw
          </button>
        </div>
      </div>
      {/* --- info --- */}
      <div className="mt-10">
        <p>For Advertisers</p>
        <h1>
          Buy Social Media Engagments and Get People to Post Your Adverts on
          their page
        </h1>
        <p>
          Get real people on various OOSH to post your adverts and perform
          engagement tasks for you on their OOSH account
        </p>
        <button
          onClick={() => [handlePreview("user")]}
          className="py-2 hover:bg-deepBg hover:text-white px-4 border-2 mt-2"
        >
          Get Started Now
        </button>
      </div>
      {/* --- Earners ---- */}
      <div className="mt-10 pt-2 border-t-2">
        <p>For Earners</p>
        <h1>
          Get Paid for Posting Adverts and Engagements on Your OOSH account
        </h1>
        <p>
          Earn steady income by reselling products and posting adverts and
          performing social media engagement tasks for businesses and top brands
          on your OOSH account.
        </p>
        <button
          onClick={() => [handlePreview("business")]}
          className="py-2 hover:bg-deepBg hover:text-white px-4 border-2 mt-2"
        >
          Become a member now
        </button>
      </div>
      <Modal
        showModal={showIntro}
        toggler={() => {
          setShowIntro(false);
        }}
      >
        {/* {userType === "user" ? (
          <p>User introduction</p>
        ) : (
          <p>Business introduction</p>
        )} */}
        <UserIntro />
      </Modal>
    </div>
  );
};

export default Home;
