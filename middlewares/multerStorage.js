import multer from "multer";
import path from "path";

// setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder to save uploaded files
  },
  filename: function (req, file, cb) {
    // create unique suffix for the filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    // get the file extension
    const ext = path.extname(file.originalname);

    // set the filename to fieldname + unique suffix + extension
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });
export default upload;
