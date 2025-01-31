import React, { useEffect, useState } from "react";

const ViewImage = ({ status }: { status: any }) => {
  const [progressStatus, setProgressStatus] = useState(0);
  console.log("image -->", status);
  useEffect(() => {
    const intervalDuration = 3000;
    const progressInterval = setInterval(() => {
      setProgressStatus((prev) =>
        Math.min(prev + 100 / (intervalDuration / 100), 100)
      ); // Update progress every 100ms
    }, 100);

    return () => {
      clearInterval(progressInterval);
    };
  }, [status]);
  return (
    <div className="w-full">
      <div className="relative group h-[400px] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-80% bg-gray-300">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${progressStatus}%` }}
          ></div>
        </div>
        {status?.media ? (
          <img className="" src={status?.media} alt="status" />
        ) : null}
        <p className="absolute transition-all duration-500 hidden group-hover:inline bg-black opacity-75 w-full p-5 font-Mon text-sm bottom-0 left-0">
          {status?.text}
        </p>
      </div>
    </div>
  );
};

export default ViewImage;
