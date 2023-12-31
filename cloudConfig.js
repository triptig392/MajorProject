const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

//cloudinary package s configure krna aur join krna
cloudinary.config({
  cloud_name: 'dmpey0wqa',
  api_key: '743551957661133',
  api_secret: 'F_-L_mNJkYoIU-I-rdDWEN7efqQ',
});

//defining storage from multer storage cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "wanderlust_DEV", //kis folder m save kr rhe h
    allowedFormats: ["png", "jpg", "jpeg"],
  },
});

module.exports = {
  cloudinary,
  storage,
};
