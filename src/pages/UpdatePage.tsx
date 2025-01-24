import { useState } from "react";
import { useAppSelector } from "../redux/ReduxType";
import StepOne from "./updateProfile/StepOne";
import StepTwo from "./updateProfile/StepTwo";
import StepThree from "./updateProfile/StepThree";
import StepFour from "./updateProfile/StepFour";
import StepList from "../components/molecules/multistep/StepList";
import Background from "../assets/profile/back5.jpeg";
import { useSearchParams } from "react-router-dom";
import StepFive from "./updateProfile/StepFive";
import { GoSidebarCollapse } from "react-icons/go";

const UpdatePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const isDark = useAppSelector((state) => state.theme.isDark);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCollapse, setIsCollapse] = useState(false);

  const id = searchParams.get("id") || "";
  const email = searchParams.get("email") || "";
  const step = searchParams.get("step");

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne id={id} step={step} />;
        break;
      case 2:
        return <StepTwo id={id} step={step} />;
        break;
      case 3:
        return <StepThree id={id} step={step} />;
        break;
      case 4:
        return <StepFour id={id} step={step} />;
        break;
      case 5:
        return <StepFive id={id} step={step} />;
        break;
      default:
        break;
    }
  };

  const handleSelect = (number: number) => {
    setCurrentStep(number);
  };

  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  return (
    <div className="w-full">
      <section
        className={`h-[450px] w-full overflow-auto relative text-sm border-l-2 flex items-start justify-start`}
      >
        {/* left side */}
        <div
          style={{ backgroundImage: `url(${Background})` }}
          className={`${
            isCollapse ? "w-fit" : "w-1/3"
          } flex items-start flex-col gap-10 justify-center w-1/3 p-5 text-white h-full overflow-y-hidden`}
        >
          <div className="flex items-center justify-between w-full transition-all duration-700">
            <h1
              className={`${
                isCollapse ? "hidden" : ""
              } transition-all duration-500`}
            >
              Update your profile
            </h1>
            <GoSidebarCollapse
              className="cursor-pointer"
              onClick={handleCollapse}
            />
          </div>

          {/* steps list */}
          <ul className="h-[500px]">
            <li className="flex items-start justify-start gap-2 h-1/5">
              <StepList
                handleClick={handleSelect}
                isDark={isDark}
                currentStep={currentStep}
                hasLink={true}
                stepNumber={1}
              />
              <span className={`${isCollapse ? "hidden" : ""}`}>
                Personal Information
              </span>
            </li>
            <li className="flex items-start justify-start gap-2 h-1/5">
              <StepList
                handleClick={handleSelect}
                isDark={isDark}
                currentStep={currentStep}
                hasLink={true}
                stepNumber={2}
              />
              <span className={`${isCollapse ? "hidden" : ""}`}>Eduaction</span>
            </li>
            <li className="flex items-start justify-start gap-2 h-1/5">
              <StepList
                handleClick={handleSelect}
                isDark={isDark}
                currentStep={currentStep}
                hasLink={true}
                stepNumber={3}
              />
              <span className={`${isCollapse ? "hidden" : ""} `}>
                Work Experience
              </span>
            </li>
            <li className="flex items-start justify-start gap-2 h-1/5">
              <StepList
                handleClick={handleSelect}
                isDark={isDark}
                currentStep={currentStep}
                hasLink={true}
                stepNumber={4}
              />
              <span className={`${isCollapse ? "hidden" : ""}`}>Photo</span>
            </li>
            <li className="flex items-start justify-start gap-2 h-1/5">
              <StepList
                handleClick={handleSelect}
                isDark={isDark}
                currentStep={currentStep}
                stepNumber={5}
              />
              <span className={`${isCollapse ? "hidden" : ""}`}>
                Preference
              </span>
            </li>
          </ul>
        </div>
        {/* right side */}
        <div
          className={`${isCollapse ? "w-full" : "w-2/3"} p-5 ${
            isDark ? "bg-darkBg" : "bg-white"
          }`}
        >
          {renderStep()}
        </div>
      </section>
    </div>
  );
};

export default UpdatePage;
