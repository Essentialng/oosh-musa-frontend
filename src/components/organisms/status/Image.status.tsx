// import React from 'react'
// import { MdImage } from 'react-icons/md'

// const ImageStatus = () => {
//   return (
//     <div className='p-4'>
//         <h3 className='text-lg font-bold mb-4'>Create Image status</h3>
//         <div className='flex flex-col gap-4'>
//             <div className='flex items-center justify-center w-full'>
//                 <label className='flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700'>
//                 <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <MdImage className="w-10 h-10 mb-3" />
//                         <p className="mb-2 text-sm">Click to upload image</p>
//                     </div>
//                     <input type="file" className="hidden" accept="image/*" />
//                 </label>
//             </div>
//             <textarea 
//                 className="textarea textarea-bordered w-full" 
//                 placeholder="Add a caption..."
//             ></textarea>
//             <button className="btn btn-primary">Create Status</button>
//         </div>
//     </div>
//   )
// }

// export default ImageStatus

// -------- version ----------
import React, { useState } from "react";
import Cropper from 'react-easy-crop';
import { getCroppedImg } from "../../../utils/getCroppedImage.utils";

const ImageStatus = () => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const handleImageChange = (e:any) => {
    const file = e.target.files[0];
    const reader:any = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const cropImage = async () => {
    const croppedImg:any = await getCroppedImg(image, croppedAreaPixels);
    setCroppedImage(croppedImg);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && (
        <div className="cropper-container">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={(croppedAreaPixels:any) =>
              setCroppedAreaPixels(croppedAreaPixels)
            }
          />
        </div>
      )}
      {croppedImage && <img src={croppedImage} alt="Cropped" />}
      <button onClick={cropImage}>Crop</button>
      <button>Upload</button>
    </div>
  );
};

export default ImageStatus;
