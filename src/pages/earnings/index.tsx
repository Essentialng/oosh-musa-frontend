import React, { useState } from "react";
import { useAppSelector } from "../../redux/ReduxType";
import { CgHome } from "react-icons/cg";
import { IoWalletSharp } from "react-icons/io5";
import Earning from "./Earning";
import Market from "./Market";
import Home from "./Home";

const EarningHome = () => {
  const isDark = useAppSelector((state) => state?.theme?.isDark);
  const [activeNav, setActiveNav] = useState("home");

  const handleSelection = (selectedValue: any) => {
    setActiveNav(selectedValue);
  };

  const renderView = () => {
    switch (activeNav) {
      case "home":
        return <Home />;
        break;
      case "earning":
        return <Market />;
        break;

      default:
        break;
    }
  };

  return (
    <div className="h-screen">
      <div
        className={`rounded-lg overflow-auto text-sm ${
          isDark ? "bg-darkBg text-darkText" : "bg-lightBg text-deepBg"
        } p-5 mt-5`}
      >
        {/* top section/ nav section */}
        <div className="flex items-center justify-center gap-3">
          <div
            onClick={() => {
              handleSelection("home");
            }}
            className={`flex items-center ${
              activeNav === "home" ? "text-blue-400" : ""
            } justify-center gap-2 cursor-pointer`}
          >
            <h1>Home</h1>
            <CgHome />
          </div>
          <div
            onClick={() => {
              handleSelection("earning");
            }}
            className={`flex items-center ${
              activeNav === "earning" ? "text-blue-400" : ""
            } justify-center gap-2 cursor-pointer`}
          >
            <h1>Earnings</h1>
            <IoWalletSharp />
          </div>
        </div>
        {/* --- view section --- */}
        {renderView()}
      </div>
    </div>
  );
};

export default EarningHome;
