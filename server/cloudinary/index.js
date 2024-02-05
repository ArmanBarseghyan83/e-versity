const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLAUDINARY_CLOUD_NAME,
  api_key: process.env.CLAUDINARY_KEY,
  api_secret: process.env.CLAUDINARY_SECRET,
});

// Defining cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'e-versity',
    allowedFormats: ['jpeg', 'png', 'jpg'],
  },
});

module.exports = { cloudinary, storage };