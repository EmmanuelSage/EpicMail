import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodeMailer from 'nodemailer';
import dbUser from '../models/User';

dotenv.config();

const Helper = {

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  isValidEmail(email) {
    return /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/.test(email);
  },

  async verifyEmail(email) {
    const userEmail = await dbUser.getEmail(email);
    if (userEmail) {
      return true;
    }
    return false;
  },

  async verifyGroupUser(groupId) {
    const groupUserEmail = await dbUser.checkGroupUserEmail(groupId);
    return groupUserEmail;
  },


  isValidName(name) {
    return /^[a-zA-Z]+$/.test(name);
  },

  async asyncForEach(array, callback) {
    for (let i = 0; i < array.length; i += 1) {
      await callback(array[i], i, array); // eslint-disable-line no-await-in-loop
    }
  },

  generateToken(id) {
    const token = jwt.sign({ userId: id },
      process.env.SECRET, { expiresIn: '2d' });
    return token;
  },

  sendEmail(userDetails, token) {
    const emailSettings = {
      from: 'EPICMAIL',
      to: userDetails.email,
      subject: 'Reset EpicMail password',
      html: `<h2> Hello ${userDetails.firstname} ${userDetails.lastname}, </h2>
         <p> you are receiving this mail because you requested for a password reset on the EpicMail application
         click
        <a href='https://emmanuelsage.github.io/EpicMail/UI/html/resetpassword.html?x-access-token=${token}'>Reset password </a>
        to reset your EpicMail password </p>
      `,
    };

    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    transporter.sendMail(emailSettings);
  },
};

export default Helper;
