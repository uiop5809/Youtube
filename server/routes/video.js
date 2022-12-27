const express = require("express");
const router = express.Router();
const multer = require("multer"); // 비디오를 서버에 저장하기 위해

// const { Video } = require("../models/Video");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  // mime type 체크하여 원하는 타입만 필터링
  if (file.mimetype == "video/mp4") {
    cb(null, true);
  } else {
    cb({ msg: "mp4 파일만 업로드 가능합니다." }, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  "file"
);

//=================================
//             Video
//=================================

router.post("/uploadfiles", (req, res) => {
  // 비디오를 서버에 저장한다.
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

module.exports = router;
