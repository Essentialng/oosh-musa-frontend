// import React, { useRef, useState } from "react";
// import { MdOutlineUpload, MdClose, MdCheck } from "react-icons/md";
// import toast from "react-hot-toast";
// import VideoTrimmer from "react-video-trimmer";
// import axios from "axios";
// import {
//   ALLOWED_STATUS_VIDEO,
//   MAX_VIDEO_FILE_SIZE,
// } from "../../../constant/constants";

// const VideoStatus = () => {
//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [processedVideo, setProcessedVideo] = useState<string | null>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const fileRef = useRef<HTMLInputElement>(null);

//   const handleVideoSelect = (file: File | null) => {
//     if (file) {
//       // Validate file type and size
//       if (!ALLOWED_STATUS_VIDEO.includes(file.type)) {
//         toast.error("Invalid video type. Supported formats: MP4, WebM, MOV");
//         return;
//       }

//       if (file.size > MAX_VIDEO_FILE_SIZE) {
//         toast.error(
//           `Video too large. Maximum size is ${
//             MAX_VIDEO_FILE_SIZE / (1024 * 1024)
//           } MB`
//         );
//         return;
//       }

//       setVideoFile(file);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!processedVideo) {
//       toast.error("Please process your video first");
//       return;
//     }

//     setIsUploading(true);
//     try {
//       const response = await fetch(processedVideo);
//       const blob = await response.blob();

//       const formData = new FormData();
//       formData.append("video", blob, "status-video.mp4");

//       await axios.post("/api/status/upload-video", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast.success("Video status uploaded successfully");
//       resetVideo();
//     } catch (error) {
//       console.error("Upload failed", error);
//       toast.error("Failed to upload video status");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const resetVideo = () => {
//     setVideoFile(null);
//     setProcessedVideo(null);
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 text-black dark:text-white font-sans w-full max-w-md mx-auto rounded-xl shadow-lg p-6 transition-all duration-300">
//       {!videoFile ? (
//         <div className="flex items-center justify-center flex-col space-y-4">
//           <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
//             Choose A Video
//           </h2>
//           <div
//             onClick={() => fileRef?.current?.click()}
//             className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors duration-300"
//           >
//             <MdOutlineUpload className="w-10 h-10" />
//           </div>
//           <input
//             className="hidden"
//             ref={fileRef}
//             type="file"
//             accept={ALLOWED_STATUS_VIDEO.join(",")}
//             onChange={(e) => handleVideoSelect(e.target.files?.[0] || null)}
//           />
//         </div>
//       ) : (
//         <div className="flex flex-col items-center space-y-4">
//           <VideoTrimmer
//             value={videoFile}
//             onChange={(processedFile) =>
//               setProcessedVideo(URL.createObjectURL(processedFile))
//             }
//             showControls
//             showThumbnails
//             classes={{
//               trimmer: "w-full rounded-xl overflow-hidden",
//               thumb: "rounded-md",
//             }}
//           />

//           <div className="flex space-x-4 mt-4">
//             <button
//               onClick={resetVideo}
//               className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300 flex items-center"
//             >
//               <MdClose className="mr-2" /> Cancel
//             </button>

//             <button
//               onClick={handleSubmit}
//               disabled={isUploading || !processedVideo}
//               className={`bg-green-500 text-white p-2 rounded-full
//                 hover:bg-green-600 transition-colors duration-300
//                 flex items-center
//                 ${
//                   isUploading || !processedVideo
//                     ? "opacity-50 cursor-not-allowed"
//                     : ""
//                 }`}
//             >
//               <MdCheck className="mr-2" />
//               {isUploading ? "Uploading..." : "Upload Video"}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoStatus;

import React from "react";

const VideoStatus = () => {
  return <div>Video status</div>;
};

export default VideoStatus;
