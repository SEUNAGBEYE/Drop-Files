import config from 'dotenv';

config.config()
export default {
  cloudinaryUploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
  cloudinaryUploadUrl: process.env.CLOUDINARY_UPLOAD_URL
};