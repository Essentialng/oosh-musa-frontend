export const FILE_TYPES = {
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

  
export type FileTypeConfig = {
    acceptedFormats: string[];
    maxSize: number;
    cloudinaryFolder: string;
  };