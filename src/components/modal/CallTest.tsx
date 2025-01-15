// import React, { useEffect, useRef } from 'react';
// import { FaVideo } from 'react-icons/fa';
// import { IoCall, IoClose } from 'react-icons/io5';

// interface CallModalProps {
//   callStatus: {
//     isOpen: boolean;
//     type?: 'audio' | 'video';
//     isIncoming: boolean;
//   };
//   localStream: MediaStream | null;
//   remoteStream: MediaStream | null;
//   onAccept: (data:any) => void;
//   onReject: () => void;
//   onEnd: () => void;
//   caller?:any;
//   otherUser?:any
// }

// const CallModal: React.FC<CallModalProps> = ({
//   callStatus,
//   localStream,
//   remoteStream,
//   onAccept,
//   onReject,
//   onEnd,
//   caller,
//   otherUser
// }) => {
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);
//   const localVideoRef = useRef<HTMLVideoElement>(null);

//   console.log('other--->', otherUser, 'user--->', caller)

//   useEffect(() => {
//     // Set remote stream
//     if (remoteVideoRef.current && remoteStream) {
//       remoteVideoRef.current.srcObject = remoteStream;
//     }

//     // Set local stream
//     if (localVideoRef.current && localStream) {
//       localVideoRef.current.srcObject = localStream;
//     }
//   }, [remoteStream, localStream]);

//   // Active call view
//   return (
//     <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
//       {/* Remote Video */}
//       {callStatus.type === 'video' && (
//         <video
//           ref={remoteVideoRef}
//           autoPlay
//           playsInline
//           className="w-full h-full object-cover"
//         />
//       )}

//       {/* Local Video (Picture-in-Picture) */}
//       {callStatus.type === 'video' && (
//         <video
//           ref={localVideoRef}
//           autoPlay
//           playsInline
//           muted
//           className="absolute bottom-4 right-4 w-1/4 h-1/4 bg-gray-800 rounded-lg"
//         />
//       )}

//       {/* Audio-only call */}
//       {callStatus.type === 'audio' ? (
//         <div className="text-white text-center">
//           <h2 className="text-2xl mb-4">Audio Call</h2>
//           <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center">
//             <span>In Call</span>
//           </div>
//         </div>
//       ) : null}

//       {/* End Call Button */}
//       <h3 className="font-bold text-lg top-6 absolute text-white">
//           {callStatus.isIncoming ? null : 'Calling...'}
//       </h3>
//       <button 
//         onClick={onEnd}
//         className="absolute bottom-8 bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600"
//       >
//         End Call
//       </button>
//     </div>
//   );
// };

// export { CallModal };


// -------- version 2 --------
import React, { useEffect, useRef, useState } from 'react';
import { FaVideo, FaMicrophone, FaMicrophoneSlash, FaVideoSlash } from 'react-icons/fa';
import { IoCall, IoClose } from 'react-icons/io5';

type CallType = 'audio' | 'video';

interface CallModalProps {
  callStatus: {
    isOpen: boolean;
    type: CallType | null;  // Allow null type
    isIncoming: boolean;
    isCaller: boolean;
  };
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  onAccept?: (data: any) => void;
  onReject?: () => void;
  onEnd?: () => void;
  otherUser?: any;
}

const CallModal: React.FC<CallModalProps> = ({
  callStatus,
  localStream,
  remoteStream,
  onAccept,
  onReject,
  onEnd,
  otherUser
}) => {
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [remoteStream, localStream]);

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(!isVideoEnabled);
      }
    }
  };

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(!isAudioEnabled);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center">
      {/* Call Status Header */}
      <div className="absolute top-6 flex flex-col items-center gap-4">
        <div className="flex flex-col items-center">
          <img 
            src={otherUser?.[0]?.avatar} 
            alt="caller" 
            className="w-20 h-20 rounded-full"
          />
          <h3 className="font-bold text-lg text-white mt-2">
            {otherUser?.[0]?.fullname}
          </h3>
          <p className="text-gray-300">
            {callStatus.isCaller ? 'calling...' : 'Incoming Call...'}
          </p>
        </div>
      </div>

      {/* Video Display Area */}
      {callStatus.type === 'video' && (
        <div className="relative w-full h-full">
          {/* Remote Video (Full Screen) */}
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          
          {/* Local Video (Picture-in-Picture) */}
          <div className="absolute bottom-24 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Audio-only call display */}
      {callStatus.type === 'audio' && (
        <div className="text-white text-center">
          <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center">
            <img 
              src={otherUser?.[0]?.avatar} 
              alt="caller"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Control Buttons */}
      <div className="absolute bottom-8 flex items-center gap-6">
        {callStatus.type === 'video' && (
          <button
            onClick={toggleVideo}
            className={`p-4 rounded-full ${
              isVideoEnabled ? 'bg-gray-600' : 'bg-red-500'
            }`}
          >
            {isVideoEnabled ? (
              <FaVideo className="text-white text-xl" />
            ) : (
              <FaVideoSlash className="text-white text-xl" />
            )}
          </button>
        )}

        <button
          onClick={toggleAudio}
          className={`p-4 rounded-full ${
            isAudioEnabled ? 'bg-gray-600' : 'bg-red-500'
          }`}
        >
          {isAudioEnabled ? (
            <FaMicrophone className="text-white text-xl" />
          ) : (
            <FaMicrophoneSlash className="text-white text-xl" />
          )}
        </button>

        <button 
          onClick={onEnd}
          className="p-4 bg-red-500 rounded-full hover:bg-red-600"
        >
          <IoClose className="text-white text-xl" />
        </button>

        {callStatus.isIncoming && (
          <button 
            onClick={onAccept}
            className="p-4 bg-green-500 rounded-full hover:bg-green-600"
          >
            <IoCall className="text-white text-xl" />
          </button>
        )}
      </div>
    </div>
  );
};

export { CallModal };