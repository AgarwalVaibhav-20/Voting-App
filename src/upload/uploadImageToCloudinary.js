import axios from 'axios';

export const uploadImageToCloudinary = async (file) => {
  
  const formData = new FormData();
  formData.append('file', file); 
  formData.append('upload_preset', 'votingApp_preset'); 
  formData.append('cloud_name', `${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}`); 
  console.log('response.data',file,formData);
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, 
      formData
    );

    console.log(response.data);
    return response.data.secure_url; 
  } catch (error) {
    console.log('Error uploading to Cloudinary', error);
    return null;
  }
};

export const deleteImageFromCloudinary = async (imgUrl) => {
  try {
    
    const publicId = imgUrl.split('/').pop().split('.')[0];
    const data =  {
      public_id: publicId,
      api_key: process.env.VITE_CLOUDINARY_API_KEY,
      timestamp: Math.floor(Date.now() / 1000),
      signature: generateSignature(publicId, import.meta.env.VITE_CLOUDINARY_API_SECRET) 
    }

    const response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/destroy`, 
      data
    );

    console.log('Delete response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw error;
  }
}


const generateSignature = (publicId, apiSecret) => {
  const crypto = require('crypto');
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = crypto.createHash('sha1')
    .update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
    .digest('hex');
  return signature;
};
