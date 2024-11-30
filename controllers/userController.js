const multer = require('multer');
const sharp = require('sharp');
const User = require('./../models/userModel');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: async (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      res.status(400).json({
        status: 'fail',
        message: 'Not an image! please upload only images.',
      }),
      false,
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.resizeUserPhoto = async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  console.log('done');
  next();
};

exports.uploadUserPhoto = upload.single('photo');

exports.changeUserRole = async (req, res) => {
  const user = req.user;
  const { email, role } = req.body;

  if (!email) {
    return res.status(400).json({
      status: 'fail',
      message: 'Email is required',
    });
  }

  if (!role) {
    return res.status(400).json({
      status: 'fail',
      message: 'User role is required',
    });
  }
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }

    checkUser.role = role;

    const updatedRole = await checkUser.save();

    return res.status(200).json({
      status: 'success',
      data: {
        updatedRole,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};
