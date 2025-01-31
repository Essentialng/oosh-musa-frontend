import { useEffect, useState } from "react";
import VideoStatus from "./Video.status";
import TextStatus from "./Text.status";
import ViewImage from "./ViewImage";
import ViewText from "./ViewText";

interface Status {
  type: "image" | "video" | "text";
  // Add other status properties here
}

const ViewStatus = ({
  userStatus,
  close,
}: {
  userStatus: any;
  close: () => void;
}) => {
  const [statusIndex, setStatusIndex] = useState(0);
  const [progressStatus, setProgressStatus] = useState(0);

  // Get current status based on index
  const currentStatus = userStatus[statusIndex];
  const type = currentStatus?.statusType;

  useEffect(() => {
    const intervalDuration = 3000;
    if (statusIndex === userStatus?.length) {
      close();
      return;
    }

    // Reset states when userStatus changes
    setStatusIndex(0);
    setProgressStatus(0);

    const statusInterval = setInterval(() => {
      setStatusIndex((prevIndex) => {
        const nextIndex =
          statusIndex === userStatus?.length ? 0 : prevIndex + 1;
        return nextIndex;
      });
      setProgressStatus(0); // Reset progress when status changes
    }, intervalDuration);

    const progressInterval = setInterval(() => {
      setProgressStatus((prev) =>
        Math.min(prev + 100 / (intervalDuration / 100), 100)
      );
    }, 100);

    return () => {
      clearInterval(statusInterval);
      clearInterval(progressInterval);
    };
  }, [userStatus]);

  const renderStatus = () => {
    if (!currentStatus) return null;
    // console.log("return -->", currentStatus, "type -->", type);
    switch (type) {
      case "image":
        return <ViewImage status={currentStatus} />;
      case "video":
        return <VideoStatus />;
      case "text":
        return <ViewText status={currentStatus} />;
      default:
        return <ViewText status={currentStatus} />;
    }
  };

  return (
    <div className="min-h-[300px] w-full">
      {renderStatus()}
      <div className="progress" style={{ width: `${progressStatus}%` }} />
      <div className="progress-bar"></div>
    </div>
  );
};

export default ViewStatus;
