import React from "react";

interface INewsImage {
  newsImage: string;
  isDark: boolean;
  date: string;
  details: string;
  category: string;
  small?: boolean;
}

const NewsCol: React.FC<INewsImage> = ({
  newsImage,
  isDark,
  date,
  details,
  category,
  small,
}) => {
  return (
    <div
      className={`flex items-center ${
        small ? "w-1/2" : ""
      } justify-start gap-2 p-[4px] cursor-pointer mb-2 ${
        isDark ? "hover:bg-darkBg" : "hover:bg-lightBg"
      }`}
    >
      <img className="sm:w-1/3 w-1/2" src={newsImage} alt="sampleNews" />
      <div className="w-2/3">
        <h2 className="sm:text-xs text-xs">
          {category} / {date}
        </h2>
        <p
          className={`${
            small ? "font-bold sm:text-lg text-sm" : "sm:text-sm text-xs"
          } text-xs`}
        >
          {details.length > 30
            ? details.split(" ").slice(0, 5).join(" ") + "..."
            : details}
        </p>
      </div>
    </div>
  );
};

export default NewsCol;
