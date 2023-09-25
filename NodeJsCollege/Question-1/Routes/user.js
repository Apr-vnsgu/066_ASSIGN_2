const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../Models/User');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './Public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, '-') +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../Views/index.html'));
});

router.post('/register', upload.single('avatar'), async (req, res) => {
  try {
    const { username, email } = req.body;
    const avatarPath = req.file.path;

    const newUser = new User({
      username,
      email,
      avatar: avatarPath,
    });

    await newUser.save();

    res.sendFile(path.join(__dirname, '../Views/success.html'));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
