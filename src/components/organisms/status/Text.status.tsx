import React, { useState } from "react";
import { IoColorPalette } from "react-icons/io5";
import whatsAppStatusColors from "../../../constant/constants";
import { useAppSelector } from "../../../redux/ReduxType";
import { useMakeRequest } from "../../../hooks/useMakeRequest";
import { STATUS_URL } from "../../../constant/resource";
import toast from "react-hot-toast";
import LoaderSpinner from "../../molecules/Loader/Loader.spinner";

const TextStatus = () => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const User = useAppSelector((state) => state.user);
  const makeRequest = useMakeRequest();
  const [loading, setLoading] = useState(false);
  const handleColor = () => {
    setCurrentColorIndex((prev) =>
      prev === whatsAppStatusColors.length - 1 ? 0 : prev + 1
    );
  };

  const currentColor = whatsAppStatusColors[currentColorIndex];

  const handleChange = (e: any) => {
    const value = e.target.value;
    setCurrentText(value);
  };

  const handleSubmit = () => {
    console.log("curr -->", currentText);
    if (currentText === "") return;
    const payload = {
      author: User?._id,
      text: currentText,
      statusType: "text",
      backgroundColor: currentColor?.bg,
      textColor: currentColor?.text,
    };

    try {
      setLoading(true);
      const onSuccess = (data: any) => {
        toast.success("Done");

        // --- trigger refetch-------

        console.log(data);
      };
      const onFailure = (data: any) => {
        toast.error("Error try again later");
      };
      const onFinal = () => {
        setLoading(false);
        setCurrentText("");
      };
      makeRequest(STATUS_URL, "POST", payload, onSuccess, onFailure, onFinal);
    } catch (error) {}
  };
  return (
    <div
      className={`w-full h-[80%] rounded-lg relative flex flex-col items-center justify-center`}
    >
      <div>
        <IoColorPalette
          onClick={handleColor}
          className="w-6 h-6 absolute top-0 right-0 cursor-pointer"
        />
      </div>
      <form
        style={{
          backgroundColor: currentColor.bg,
          color: currentColor.text,
        }}
        onSubmit={handleSubmit}
        className="h-full w-full flex items-center justify-center rounded-sm p-2"
      >
        <input
          className="w-full text-center p-2 outline-none bg-inherit"
          type="text"
          placeholder="Make it inspiring"
          onChange={handleChange}
          value={currentText}
        />
      </form>
      <button
        className="bg-darkBg px-4 py-2 rounded-sm text-white mt-2"
        type="submit"
        onClick={handleSubmit}
      >
        {loading ? <LoaderSpinner color={"white"} /> : "Submit"}
      </button>
    </div>
  );
};

export default TextStatus;
