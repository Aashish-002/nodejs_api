const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/sliders")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" +file.originalname)
    },
});


const fileFilter = (req, file, callback) => {
  const fileExt = [".png", ".jpg"];
  if (!fileExt.includes(path.extname(file.originalname))) {
    return callback(new Error("Invalid File type"));
  }

  const fileSize = parseInt(req.headers["content-length"]);

  if (fileSize > 1048576) {
    return callback(new Error("Invalid File Size"));
  }
  callback(null, true);
};

let upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  fileSize: 1048576,
});


module.exports = upload.single("sliderImage");