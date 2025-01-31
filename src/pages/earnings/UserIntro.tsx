import React from "react";

const UserIntro = () => {
  return (
    <div className="text-black font-Mon w-full">
      <h1 className="text-2xl mb-5 font-Mon mt-3 mx-auto text-center font-bold">
        Welcome to OOSH - Earn
      </h1>

      <h1 className="mb-2 text-lg">
        Turn Your Social Media Accounts into a Money Making Machine!
      </h1>
      <p className="text-sm mb-4">
        Do you know you can earn daily income by performing social media tasks
        such as likes, follows, comments, shares, retweets etc. That is one of
        the many benefits of becoming a member on OOSH-Earn
      </p>
      <p className="text-sm mb-4">
        When you activate your account with a one-time membership fee of ₦1,000,
        you get lifetime access to enjoy the following benefits:
      </p>
      <ul className="list-disc">
        <li>
          <strong>Earn steady daily figures </strong>
          by following, liking, commenting, sharing, retweeting or posting
          adverts for businesses on your social media. Click here to see what
          you will earn when you perform social tasks
        </li>
        <li>
          <strong>Earn an Instant Referral Commission of ₦500 </strong>
          when you refer someone to become a member on Hawkit. The more you
          refer, the more you earn. Click here to learn how referral works.
        </li>
        <li>
          <strong>
            Earn Social Boost Referral Commission of 20% of any amount paid{" "}
          </strong>
          when you refer someone to Buy Likes, Followers, Comments, Shares,
          Whatsapp Post Views etc. Click here to learn how referral works.
        </li>
        <li>
          <strong>Start Your Airtime/Data Business on OOSH-Earn. </strong>
          Buy Airtime or Data on Hawkit at up to 10% - 50% Discount and Sell to
          friends and family at normal prices. Click here to see airtime and
          data pricing
        </li>
        <li>
          <strong>Sell Anything on Hawkit Market. </strong>
          Buy Airtime or Data on Hawkit at up to 10% - 50% Discount and Sell to
          friends and family at normal prices. Click here to see airtime and
          data pricing
        </li>
      </ul>
      <p className="text-sm my-4">...and so much more benefits for you!</p>
      <p className="text-sm mb-4">
        What are you waiting for? Click the button below to make payments and
        activate your membership.
      </p>
      <div className="flex items-center justify-between border-t-2 mt-4 py-4">
        <div className="">
          <p className="text-xs">Membership fee</p>
          <h1 className="text-xl font-semibold">₦1,000</h1>
        </div>
        <button className="p-[10px] bg-blue-600 text-white font-semibold">
          Click Here To Pay
        </button>
      </div>
    </div>
  );
};

export default UserIntro;
