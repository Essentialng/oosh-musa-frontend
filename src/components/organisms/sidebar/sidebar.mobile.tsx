import React, { useCallback, useEffect, useState } from "react";
import { FaFire, FaHome, FaUser, FaMeetup } from "react-icons/fa";
import { TbCalendarEvent, TbNewSection, TbPrismOff } from "react-icons/tb";
import { MdChat, MdGroup } from "react-icons/md";
import { BsMenuApp } from "react-icons/bs";
import MobileMenu from "../../molecules/MobileMenu/Mobile.menu";

const SidebarMobile = () => {
  const [currentView, setCurrentView] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const menuData = [
    {
      Title: "Home",
      Logo: (
        <FaHome className="w-3 h-3 sm:group-hover:w-4 sm:group-hover:h-4 transition-all duration-500" />
      ),
      link: "",
    },
    {
      Title: "Reel",
      Logo: (
        <FaFire className="w-3 h-3 sm:group-hover:w-4 sm:group-hover:h-4 transition-all duration-500" />
      ),
      link: "reel",
    },
    {
      Title: "Chat",
      Logo: (
        <MdChat className="w-3 h-3 sm:group-hover:w-4 sm:group-hover:h-4 transition-all duration-500" />
      ),
      link: "chat/1234",
    },
    {
      Title: "Profile",
      Logo: (
        <FaUser className="w-3 h-3 sm:group-hover:w-4 sm:group-hover:h-4 transition-all duration-500" />
      ),
      link: "profile/1234",
    },
    // {
    //     Title: "Timeline",
    //     Logo: <TbPrismOff className="w-3 h-3 sm:group-hover:w-4 sm:group-hover:h-4 transition-all duration-500" />,
    //     link: "timeline"
    // },
    {
      Title: "Meeting",
      Logo: (
        <FaMeetup className="w-3 h-3 sm:group-hover:w-4 sm:group-hover:h-4 transition-all duration-500" />
      ),
      link: "meet",
    },
    {
      Title: "Planner",
      Logo: (
        <TbCalendarEvent className="w-3 h-3 sm:group-hover:w-4 sm:group-hover:h-4 transition-all duration-500" />
      ),
      link: "plan",
    },
    {
      Title: "News",
      Logo: (
        <TbNewSection className="w-3 h-3 sm:group-hover:w-4 sm:group-hover:h-4 transition-all duration-500" />
      ),
      link: "news",
    },
    {
      Title: "Live",
      Logo: (
        <MdGroup className="w-3 h-3 sm:group-hover:w-4 sm:group-hover:h-4 transition-all duration-500" />
      ),
      link: "live",
    },
  ];

  const ITEMS_PER_VIEW = 3;

  const filterList = useCallback(() => {
    const menuLength = menuData.length;
    const nextIndex = (currentIndex + ITEMS_PER_VIEW) % menuLength;

    // If we've reached or exceeded the end, wrap around to the beginning
    setCurrentIndex(nextIndex);

    // Calculate the slice of items to show
    const endIndex = nextIndex + ITEMS_PER_VIEW;
    const newList: any = menuData.slice(nextIndex, endIndex);

    // If we need to wrap around to complete the view
    if (newList.length < ITEMS_PER_VIEW) {
      const remainingItems = ITEMS_PER_VIEW - newList.length;
      newList.push(...menuData.slice(0, remainingItems));
    }

    setCurrentView(newList);
  }, [currentIndex]);

  useEffect(() => {
    // Initialize the first view
    const initialList: any = menuData.slice(0, ITEMS_PER_VIEW);
    setCurrentView(initialList);
  }, []);

  return (
    <div className="flex items-center justify-evenly w-full py-3">
      {currentView.map((item: any, index: number) => (
        <MobileMenu
          key={`${item.Title}-${index}`}
          Title={item.Title}
          Logo={item.Logo}
          link={item.link}
        />
      ))}
      <div
        className="flex flex-col items-center cursor-pointer w-8 h-8"
        onClick={filterList}
      >
        <BsMenuApp className="" />
        <span className="text-xs">Menu</span>
      </div>
    </div>
  );
};

export default SidebarMobile;
