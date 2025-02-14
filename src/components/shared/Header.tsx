import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSearch } from "react-icons/fa";
import { TfiShine } from "react-icons/tfi";
import { useAppDispatch, useAppSelector } from "../../redux/ReduxType";
import { toggle } from "../../redux/slice/themeSlice";
import MovingMoneyRate from "../../services/ExchangeRate";
import AuthContext from "../../context/AuthProvider";
import { CgProfile } from "react-icons/cg";
import { headerItems } from "../molecules/Header/HeaderList";
import NewsCarossel from "../../services/NewsCarossel";
import { IUserState } from "../../redux/slice/user.slice";
import { BsBell } from "react-icons/bs";

const Header = () => {
  const auth = useAppSelector((state) => state.user) || {};
  const isDark = useAppSelector((state) => state.theme.isDark);

  const dispatch = useAppDispatch();
  const [currentMenu, setCurrentMenu] = useState("/");

  // menu section handler function
  const handleSelectedMenu = (selection: string) => {
    setCurrentMenu(selection);
  };

  // theme toggle handler function
  const handleDark = () => {
    dispatch(toggle());
  };

  return (
    <div
      className={`w-[100%] text-sm ${
        isDark
          ? "bg-darkBg transition-all duration-500 text-darkText"
          : "bg-lightBg text-left"
      } px-5 w-[100%] mx-auto shadow-md`}
    >
      <div className="navbar">
        {/* left section */}
        <div
          onClick={() => {
            handleSelectedMenu("/");
          }}
          className="navbar-start text-indigo-500"
        >
          <Link to="/" className="font-bold text-xl text-deepBg">
            OOSH
          </Link>
        </div>

        {/* middle section */}

        <div className="navbar-center lg:flex text-md">
          <label
            className={`input ${
              isDark ? "bg-deepLight text-deepBg" : "border-deepBg border-2"
            } sm:flex hidden items-center gap-2 w-[600px] rounded-full`}
          >
            <FaSearch
              className={`text-indigo-400 ${
                isDark ? "text-darkBg" : "text-[gray]"
              }`}
            />
            <input
              className="grow border-none outline-none"
              placeholder="search"
            />
          </label>
          <div
            className={`swap swap-rotate px-10 ${
              currentMenu === "notify" ? "text-indigo-500" : ""
            } w-fit`}
            onClick={handleDark}
          >
            {isDark ? (
              <TfiShine className="w-4 h-4 fill-current" />
            ) : (
              <FaMoon className="w-4 h-4 fill-current" />
            )}
          </div>
        </div>

        {/* right section */}
        <div className="navbar-end flex gap-2 items-center gap-2">
          {/* <div className="p-2 relative">
            <BsBell />
            <Link
              to={`notification/${auth._id}`}
              className="absolute top-0 right-0 p-2 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center"
            >
              {1}
            </Link>
          </div> */}
          <div className="avatar">
            <div className="w-6 rounded-full">
              {auth?.avatar ? (
                <img src={auth?.avatar} alt="avatar" />
              ) : (
                <CgProfile className="w-full h-full" />
              )}
            </div>
          </div>
          {auth?.fullname ? (
            <Link to={`/profile/${auth._id}`} className="">
              {auth.fullname.split(" ")[0]}
            </Link>
          ) : (
            <Link to="/login" className="">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* other products */}
      <MovingMoneyRate isDark={isDark} />

      {/* news carossel */}
      <NewsCarossel isDark={isDark} />

      {/* other products */}
      {/* <div className="w-full overflow-hidden flex items-center justify-center gap-10 text-sm p-2">
        {headerItems.map((eachItems, index) => {
          return (
            <Link
              to={`/${eachItems.id}`}
              key={eachItems.id}
              className={`flex-shrink-0 ${
                isDark ? "text-deepText" : "text-left"
              } hover:text-indigo-500`}
            >
              {eachItems.content}
            </Link>
          );
        })}
      </div> */}
    </div>
  );
};

export default Header;
