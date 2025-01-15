export const getCroppedImg = (imageSrc:any, crop:any) => {
    const canvas = document.createElement("canvas");
    const ctx:any = canvas.getContext("2d");
  
    const image = new Image();
    image.src = imageSrc;
  
    return new Promise((resolve, reject) => {
      image.onload = () => {
        canvas.width = crop.width;
        canvas.height = crop.height;
  
        ctx.drawImage(
          image,
          crop.x,
          crop.y,
          crop.width,
          crop.height,
          0,
          0,
          crop.width,
          crop.height
        );
  
        canvas.toBlob((blob:any) => {
          if (!blob) {
            console.error("Canvas is empty");
            return;
          }
          blob.name = "croppedImage.jpg";
          const croppedImageUrl = URL.createObjectURL(blob);
          resolve(croppedImageUrl);
        }, "image/jpeg");
      };
  
      image.onerror = (err) => reject(err);
    });
  };
  