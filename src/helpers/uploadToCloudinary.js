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
  const imageData = new FormData();
  var imageUrls = []
  return new Promise((resolve, reject) => {
    files.map(async (file) => {
      imageData.append('file', file);
      imageData.append('upload_preset', cloudinaryUploadPreset);
      
      try{
        var imageUrl = await axios({
          url: cloudinaryUploadUrl,
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form.urlencoded',
            'X-Requested-With': 'XMLHttpRequest'
          },
          data: imageData,
          return_delete_token: 1
        });
        imageUrls.push(imageUrl.data.secure_url);
        if(files.length === imageUrls.length){
          return resolve(imageUrls);
        } 
      } catch (error) {
        return reject(error)
      }
    });

  })
};

export default uploadToCloudinary;