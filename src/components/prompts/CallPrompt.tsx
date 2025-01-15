import React from 'react';
import { IoCall, IoClose } from 'react-icons/io5';
import { FaVideo } from 'react-icons/fa';

interface CallModalProps {
  isOpen: boolean;
  type?: 'audio' | 'video';
  isIncoming: boolean;
  caller?: any;
  onAccept: () => void;
  onReject: () => void;
  otherUser: any;
}

const CallModal: React.FC<CallModalProps> = ({
  isOpen,
  type,
  isIncoming,
  onAccept,
  onReject,
  otherUser,
  caller
}) => {
  if (!isOpen) return null;
  console.log('other--->', otherUser, 'user--->', caller)

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
      
      {/* Modal */}
      <dialog className="modal modal-bottom sm:modal-middle" open={isOpen}>
        <div className="modal-box bg-base-200 relative z-50 shadow-xl">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="animate-pulse">
              {/* <img 
                src={otherUser[0]?.avatar} 
                alt={otherUser[0]?.fullname} 
                className="w-24 h-24 object-cover rounded-full border-4 border-base-300"
              /> */}
            </div>
            
            <h3 className="font-bold text-lg">
              {isIncoming ? 'Incoming Call' : 'Calling...'}
            </h3>
            
            <p className="text-base">
              {otherUser?.fullname}
            </p>

            <div className="text-sm text-gray-500">
              {type === 'video' ? 'Video Call' : 'Voice Call'}
            </div>

            <div className="flex items-center justify-center gap-8 mt-4">
              {/* Reject Call Button */}
              <button
                onClick={onReject}
                className="btn btn-circle btn-error text-white hover:btn-error hover:scale-110 transition-transform"
              >
                <IoClose className="w-6 h-6" />
              </button>

              {/* Accept Call Button - Only show for incoming calls */}
              {isIncoming && (
                <button
                  onClick={onAccept}
                  className="btn btn-circle btn-success text-white hover:btn-success hover:scale-110 transition-transform"
                >
                  {type === 'video' ? (
                    <FaVideo className="w-6 h-6" />
                  ) : (
                    <IoCall className="w-6 h-6" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CallModal;