import axios from 'axios';

export const uploadImageToCloudinary = async (file) => {
  // Create a FormData object
  const formData = new FormData();
  formData.append('file', file); // Append the single file
  formData.append('upload_preset', 'votingApp_preset'); // Cloudinary upload preset
  formData.append('cloud_name', `${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}`); // Cloudinary cloud name
  console.log('response.data',file,formData);
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, 
      formData
    );

    console.log(response.data);
    return response.data.secure_url; // This is the URL of the uploaded image
  } catch (error) {
    console.log('Error uploading to Cloudinary', error);
    return null;
  }
};