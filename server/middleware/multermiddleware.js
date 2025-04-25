
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Specify folder to store images
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname);
  }
});

// Initialize multer with storage settings
const upload = multer({ storage });

export default upload;
