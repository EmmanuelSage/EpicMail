import multer from 'multer';
import fileSys from 'fs';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import db from '../models/User';
import Helper from '../utilities/helper';

dotenv.config();

/* istanbul ignore next */
const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    callback(null, `${file.originalname}-${req.user.id}`);
  },
});
/* istanbul ignore next */
const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
  return {};
};
/* istanbul ignore next */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const User = {
  async create(req, res) {
    const hashPassword = Helper.hashPassword(req.body.password);

    const reqUser = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashPassword,
      /* istanbul ignore next */
      image: 'https://res.cloudinary.com/emmanuelsage/image/upload/v1555262398/EpicMail/2019-04-14T17:19:53.321Z-defaultuser.jpg-xyemmanuel%40gmail.com.jpg',
    };

    const newUser = await db.create(reqUser);

    const token = Helper.generateToken(newUser.id);
    return res.status(201).send({
      status: 201,
      data: [{
        token,
        newUser: {
          id: newUser.id,
          firstName: newUser.firstname,
          lastName: newUser.lastname,
          email: newUser.email,

        },
        message: 'User sign up was succesfull',
      }],
    });
  },

  login(req, res) {
    const token = Helper.generateToken(req.user.id);
    return res.status(200).send({
      status: 200,
      data: [{
        token,
        message: 'User login was succesfull',
      }],
    });
  },

  async resetemail(req, res) {
    const { email } = req.body;
    const userDetails = await db.getUserByEmail(email);

    if (!userDetails) {
      return res.status(404).send({
        status: 404,
        error: 'User not found',
      });
    }
    const token = Helper.generateToken(userDetails.id);
    Helper.sendEmail(userDetails, token);
    return res.status(200).send({
      status: 200,
      data: {
        message: `Email has been sent to ${userDetails.email}`,
      },
    });
  },

  async resetpassword(req, res) {
    const email = req.user.id;
    const { password } = req.body;
    if (!password) {
      return res.status(400).send({
        status: 400,
        error: 'Password is required',
      });
    }
    const hashPassword = Helper.hashPassword(password);

    await db.resetPassword(email, hashPassword);
    return res.status(201).send({
      status: 201,
      data: {
        message: 'Password has been changed',
      },
    });
  },

  /* istanbul ignore next */
  async uploadImage(req, res) {
    let userImage;
    const upload = multer({ storage, fileFilter: imageFilter }).single('image');
    upload(req, res, () => {
      const isoDate = new Date().toISOString();
      cloudinary.v2.uploader.upload(req.file.path, { public_id: `EpicMail/${isoDate}-${req.file.filename}`, tags: 'EpicMail' }, async (error, image) => {
        if (error) {
          return res.status(500).send({
            status: 500,
            error: 'Something went wrong with the upload',
          });
        }
        fileSys.unlinkSync(req.file.path);
        userImage = image.secure_url;
        const userDetails = {
          id: req.user.id,
          image: userImage,
        };
        await db.updateImage(userDetails);
        return res.status(201).send({
          status: 201,
          data: {
            message: 'Image upload was successfull',
          },
        });
      });
    });
  },

  async getUser(req, res) {
    const email = req.user.id;
    const userDetails = await db.getUserByEmail(email);
    return res.status(200).send({
      status: 200,
      data: userDetails,
    });
  },

};

export default User;
