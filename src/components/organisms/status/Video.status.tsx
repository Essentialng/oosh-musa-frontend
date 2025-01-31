import React, { useRef, useState, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { FILE_TYPES } from "../../../config/cloudinary.config";
import toast from "react-hot-toast";
import { FaVideo } from "react-icons/fa";
import LoaderSpinner from "../../molecules/Loader/Loader.spinner";
import { uploadToCloudinary } from "../../../utils/upload.cloudinary";
import { useMakeRequest } from "../../../hooks/useMakeRequest";
import { STATUS_URL } from "../../../constant/resource";
import { useAppSelector } from "../../../redux/ReduxType";

const VideoStatus = () => {
  const ffmpeg = new FFmpeg();
  const [video, setVideo] = useState<File | null>(null);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [trimStart, setTrimStart] = useState(0);
  const [isTreaming, setIsTreaming] = useState(false);
  const [trimmedVideo, setTrimmedVideo] = useState<File | null>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const [caption, setCaption] = useState("");
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const makeRequest = useMakeRequest();
  const User = useAppSelector((state) => state.user);
  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!FILE_TYPES.video.acceptedFormats.includes(file.type)) {
      return toast.error("Please select a valid video file");
    }

    setVideo(file);
    const url = URL.createObjectURL(file);

    const videoElement = document.createElement("video");
    videoElement.src = url;
    videoElement.onloadedmetadata = () => {
      setVideoDuration(videoElement.duration);
    };
  };

  const handleTrimStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const maxStart = Math.max(0, videoDuration - 30);
    const newStart = Math.min(value, maxStart);

    setTrimStart(newStart);

    if (previewVideoRef.current) {
      previewVideoRef.current.currentTime = newStart;
    }
  };

  const handleFile = async () => {
    await ffmpeg.load();
    if (!video) return;

    const endTime = Math.min(trimStart + 30, videoDuration);

    try {
      setIsTreaming(true);
      ffmpeg.writeFile("input.mp4", await fetchFile(video));

      // Explicitly convert and re-encode video to ensure compatibility
      await ffmpeg.exec([
        "-i",
        "input.mp4",
        "-ss",
        `${trimStart}`,
        "-to",
        `${endTime}`,
        "-c:v",
        "libx264",
        "-preset",
        "ultrafast", // Fastest encoding
        "-crf",
        "28", // Slightly lower quality for faster processing
        "output.mp4",
      ]);

      const data: any = await ffmpeg.readFile("output.mp4");
      console.log("data --->", data);
      const trimmedVideoFile = new File(
        [data.buffer],
        `status_video_${new Date().toISOString()}.mp4`,
        { type: "video/mp4" }
      );

      setTrimmedVideo(trimmedVideoFile);
      toast.success("Video trimmed successfully!");
    } catch (error) {
      console.error("Trimming error:", error);
      toast.error("Failed to trim video");
    } finally {
      setIsTreaming(false);
    }
  };

  const handleUploadTrimmed = async () => {
    if (!trimmedVideo) {
      toast.error("No trimmed video to upload");
      return;
    }

    try {
      setIsUploading(true);
      const videoUrl = await uploadToCloudinary(trimmedVideo);

      const payload = {
        media: videoUrl?.url,
        text: caption,
        author: User?._id,
        statusType: "video",
      };

      await makeRequest(
        STATUS_URL,
        "POST",
        payload,
        () => toast.success("Status uploaded"),
        () => toast.error("Upload failed"),
        () => {
          setCaption("");
          setTrimmedVideo(null);
        }
      );
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("Video upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-4 space-y-4">
      {/* Video File Input */}
      {isUploading ? (
        // <p>loading ...</p>
        <LoaderSpinner color={"blue"} />
      ) : (
        <div className="h-[350px] overflow-auto">
          <div className="relative w-full max-w-md">
            <input
              ref={videoRef}
              onChange={handleVideo}
              type="file"
              name="videoFile"
              id="videoFile"
              className="hidden"
            />
            <div className="flex items-center justify-between">
              <FaVideo
                onClick={() => videoRef.current?.click()}
                className="w-10 h-10 cursor-pointer text-blue-600"
              />
              {video && (
                <span className="text-sm text-gray-600">{video.name}</span>
              )}
            </div>
          </div>

          {/* Video Preview */}
          {video && (
            <div className="w-full max-w-md">
              <video
                ref={previewVideoRef}
                className="w-full aspect-video border-2"
                src={URL.createObjectURL(video)}
                controls
              />

              {/* Custom Slider */}
              <div className="relative w-full h-10 mt-4">
                <div className="absolute w-full h-2 bg-gray-300 top-4 rounded-full">
                  <div
                    className="absolute h-2 bg-blue-500 rounded-full"
                    style={{
                      left: `${(trimStart / videoDuration) * 100}%`,
                      width: `${
                        (Math.min(30, videoDuration - trimStart) /
                          videoDuration) *
                        100
                      }%`,
                    }}
                  />
                </div>
                <input
                  type="range"
                  min={0}
                  max={videoDuration}
                  value={trimStart}
                  onChange={handleTrimStartChange}
                  className="absolute w-full h-8 opacity-0 cursor-pointer"
                />
                <div className="flex justify-between text-sm mt-2 text-deepBg">
                  <span>Start: {trimStart.toFixed(1)}s</span>
                  <span>
                    End: {Math.min(trimStart + 30, videoDuration).toFixed(1)}s
                  </span>
                </div>
              </div>

              {/* Trim Button */}
              <button
                onClick={handleFile}
                className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded flex items-center justify-center"
              >
                {isTreaming ? <LoaderSpinner color={"white"} /> : "Trim"}
              </button>
            </div>
          )}

          {/* Trimmed Video Preview */}
          {trimmedVideo && (
            <div className="mt-4 w-full max-w-md text-darkBg">
              <h3 className="text-sm font-medium mb-2">Trimmed Video:</h3>
              <video
                className="w-full aspect-video border-2"
                src={URL.createObjectURL(trimmedVideo)}
                controls
                autoPlay
              />
              <input
                className="w-full outline-none text-black p-2 my-2 border-[2px] border-gray-500 rounded-sm"
                type="text"
                placeholder="Say something ..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
              <button
                onClick={handleUploadTrimmed}
                disabled={isUploading}
                className={`px-4 py-2 rounded-sm ${
                  isUploading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-darkBg text-white"
                }`}
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoStatus;
