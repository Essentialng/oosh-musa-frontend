import React, { useRef, useState } from "react";
import { useAppSelector } from "../../../redux/ReduxType";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import { MdOutlineUpload, MdClose, MdCheck } from "react-icons/md";
import {
  ALLOWED_STATUS_IMAGE,
  MAX_FILE_SIZE,
} from "../../../constant/constants";
import toast from "react-hot-toast";
import { uploadToCloudinary } from "../../../utils/upload.cloudinary";
import { useMakeRequest } from "../../../hooks/useMakeRequest";
import { STATUS_URL } from "../../../constant/resource";
import LoaderSpinner from "../../molecules/Loader/Loader.spinner";

const ImageStatus = () => {
  // const isDark = useAppSelector((state) => state.theme.isDark);
  const [statusFile, setStatusFile] = useState<string | null>(null);
  const [postFile, setPostFile] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [statusText, setStatusText] = useState("");
  const User = useAppSelector((state) => state.user);
  const makeRequest = useMakeRequest();

  const createImage = (url: string) =>
    new Promise<HTMLImageElement>((resolve) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.src = url;
    });

  const getCroppedImg = async (imageSrc: string, pixelCrop: Area) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise<string>((resolve) => {
      canvas.toBlob((file) => {
        if (file) {
          resolve(URL.createObjectURL(file));
        }
      }, "image/jpeg");
    });
  };

  const onCropComplete = async (croppedArea: Area, croppedAreaPixels: Area) => {
    try {
      const croppedImageUrl = await getCroppedImg(
        statusFile!,
        croppedAreaPixels
      );
      setCroppedImage(croppedImageUrl);
    } catch (e) {
      console.error(e);
      toast.error("Error cropping image");
    }
  };

  const handleFile = (file: React.ChangeEvent<HTMLInputElement>) => {
    if (file?.target?.files?.[0]) {
      const imageFile = file.target.files[0];

      if (!ALLOWED_STATUS_IMAGE?.includes(imageFile.type)) {
        toast.error(
          "Invalid file type. Please upload an image (JPEG, PNG, GIF)"
        );
        return;
      }

      if (imageFile.size > MAX_FILE_SIZE) {
        toast.error(
          `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)} MB.`
        );
        return;
      }

      setPostFile(imageFile);
      const objectURL = URL.createObjectURL(imageFile);
      setStatusFile(objectURL);
      setCroppedImage(null);
    }
  };

  const handleSubmit = async () => {
    if (!croppedImage) {
      toast.error("Please crop your image first");
      return;
    }
    // alert(statusText);
    if (postFile === null) return;
    setIsUploading(true);
    try {
      const fileURL = await uploadToCloudinary(postFile as File);
      const payload = {
        author: User?._id,
        text: statusText,
        media: fileURL?.url,
        statusType: "image",
      };

      const onSuccess = () => {
        toast.success("success");
      };

      const onFailure = () => {
        toast.error("Error, try again");
      };

      const onFinal = () => {
        setStatusFile(null);
        setCroppedImage(null);
        setIsUploading(false);
      };

      await makeRequest(
        STATUS_URL,
        "POST",
        payload,
        onSuccess,
        onFailure,
        onFinal
      );

      // Reset state after successful upload
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("Failed to upload status");
    }
  };

  const resetImage = () => {
    setStatusFile(null);
    setCroppedImage(null);
  };

  const handleText = (e: any) => {
    const value = e?.target?.value;
    setStatusText(value);
    console.log(statusText);
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 text-black dark:text-white 
      font-sans w-full max-w-md mx-auto rounded-xl shadow-lg p-6 transition-all duration-300`}
    >
      {!statusFile ? (
        <div className="flex items-center justify-center flex-col space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Choose An Image
          </h2>
          <div
            onClick={() => fileRef?.current?.click()}
            className={`w-20 h-20 rounded-full bg-blue-500 text-white 
              flex items-center justify-center cursor-pointer 
              hover:bg-blue-600 transition-colors duration-300`}
          >
            <MdOutlineUpload className="w-10 h-10" />
          </div>
          <input
            className="hidden"
            ref={fileRef}
            type="file"
            name="status"
            accept={ALLOWED_STATUS_IMAGE.join(",")}
            onChange={handleFile}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <div className="w-full aspect-video relative">
            <Cropper
              image={statusFile}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              classes={{
                containerClassName: "rounded-xl overflow-hidden",
                mediaClassName: "w-full h-full object-cover",
              }}
            />
          </div>

          <div className="w-full flex items-center space-x-4">
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-grow appearance-none 
                bg-gray-200 dark:bg-gray-700 
                h-[2px] rounded-full 
                focus:outline-none"
            />
          </div>

          <input
            className="w-full text-sm p-2 h-20 rounded-md bg-neutral-300 outline-none"
            onChange={handleText}
            type="text"
            placeholder="something about the post"
          />

          <div className="flex space-x-4">
            <button
              onClick={resetImage}
              className="bg-blue-500 text-white p-2 rounded-sm hover:bg-red-600 
                transition-colors duration-300 flex items-center"
            >
              <MdClose className="mr-2" /> Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={isUploading}
              className={`bg-blue-500 text-white p-2 rounded-sm 
                hover:bg-green-600 transition-colors duration-300 
                flex items-center 
                ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <MdCheck className="mr-2" />
              {isUploading ? (
                <LoaderSpinner color={"white"} />
              ) : (
                "Upload Status"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageStatus;
