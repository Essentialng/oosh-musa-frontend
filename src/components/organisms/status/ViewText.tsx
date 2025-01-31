import React from "react";

const ViewText = ({ status }: { status: any }) => {
  return (
    <div
      style={{
        backgroundColor: status?.backgroundColor,
        color: status?.textColor,
        height: "100%",
      }}
      className={`w-full h-full bg-[${status?.backgroundColor}] bg-[${status?.textColor}]`}
    >
      <p className="w-full min-h-[300px] flex items-center justify-center">
        {status?.text}
      </p>
    </div>
  );
};

export default ViewText;
