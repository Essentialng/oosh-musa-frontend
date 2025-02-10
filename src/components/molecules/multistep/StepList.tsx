import React from "react";

interface IStepList {
  stepNumber: number;
  currentStep: number;
  hasLink?: boolean;
  isDark: boolean;
  handleClick: (stepNumber: number) => void;
}

const StepList: React.FC<IStepList> = ({
  stepNumber,
  hasLink,
  currentStep,
  isDark,
  handleClick,
}) => {
  return (
    <div className="flex flex-col items-center h-full">
      <span
        onClick={() => handleClick(stepNumber)}
        className={`w-5 h-5 cursor-pointer ${
          stepNumber === currentStep
            ? `${isDark ? "bg-white text-darkBg" : "bg-white text-black"}`
            : "bg-newtral_pri text-darkText"
        } rounded-full text-center`}
      >
        {stepNumber}
      </span>
      <div
        className={`h-full w-[1px] ${hasLink ? "" : "hidden"} ${
          stepNumber === currentStep
            ? `${isDark ? "bg-white text-darkBg" : "bg-white text-black"}`
            : "bg-newtral_pri text-darkText"
        }`}
      ></div>
    </div>
  );
};

export default StepList;
