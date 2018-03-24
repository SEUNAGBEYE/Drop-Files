import axios from 'axios';
import config from '../config/config';

const { cloudinaryUploadUrl, cloudinaryUploadPreset } = config;

/**
 * @description - Upload Media
 *
 * @param {Object} files
 * @returns {Promise} Promise
 */
const uploadToCloudinary = async (files) => {
  const formData = new FormData();
  var fileUrls = []
  return new Promise((resolve, reject) => {
    files.map(async (file) => {
      formData.append('file', file);
      formData.append('upload_preset', cloudinaryUploadPreset);
      
      try{
        const uploadedFile = await axios({
          url: cloudinaryUploadUrl,
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form.urlencoded',
            'X-Requested-With': 'XMLHttpRequest'
          },
          data: formData,
          return_delete_token: 1
        });
        fileUrls.push(uploadedFile.data.secure_url);
        if(files.length === fileUrls.length){
          return resolve(fileUrls);
        } 
      } catch (error) {
        return reject(error)
      }
    });

  })
};

export default uploadToCloudinary;