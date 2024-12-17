import axios from "axios";
import toast from "react-hot-toast";

const FILE_TYPES = {
    image: {
      acceptedFormats: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      maxSize: 5 * 1024 * 1024, // 5MB
      cloudinaryFolder: 'images',
    },
    video: {
      acceptedFormats: ['video/mp4', 'video/quicktime', 'video/x-msvideo'],
      maxSize: 50 * 1024 * 1024, // 50MB
      cloudinaryFolder: 'videos',
    },
    document: {
      acceptedFormats: [
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ],
      maxSize: 10 * 1024 * 1024, // 10MB
      cloudinaryFolder: 'documents',
    }
  };
  
  // Type for file upload configuration
  type FileTypeConfig = {
    acceptedFormats: string[];
    maxSize: number;
    cloudinaryFolder: string;
  };
  
  // Cloudinary upload function
  export const uploadToCloudinary = async (
    file: File, 
    // fileType: keyof typeof FILE_TYPES
  ) => {
    // Validate file type and size
    const fileType = 'image'
    console.log(file)
    console.log(file.type)
    const config: FileTypeConfig = FILE_TYPES[fileType];
    
    if (!config.acceptedFormats.includes(file.type)) {
      throw new Error(`Invalid file type. Accepted types: ${config.acceptedFormats.join(', ')}`);
    }
  
    if (file.size > config.maxSize) {
      throw new Error(`File too large. Max size: ${config.maxSize / 1024 / 1024}MB`);
    }
  
    // Create a FormData object
    const formData = new FormData();
    
    // Add the file to the FormData
    formData.append('file', file);
    
    // Add upload preset, cloud name, and folder
    formData.append('upload_preset', `${process.env.REACT_APP_CLOUDINARY_PRESET}`);
    formData.append('cloud_name', `${process.env.REACT_APP_CLOUDINARY_NAME}`);
    formData.append('folder', config.cloudinaryFolder);
  
    try {
      // Upload to Cloudinary
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/upload`, 
        formData,
        {
          headers: { 
            'Content-Type': 'multipart/form-data' 
          }
        }
      );
  
      // Return upload details
      return {
        url: response.data.secure_url,
        publicId: response.data.public_id,
        format: response.data.format,
        resourceType: response.data.resource_type
      };
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }finally{
      toast.success('Upload success')
    }
  }