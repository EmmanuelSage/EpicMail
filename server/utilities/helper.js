import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
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
};

export default Helper;
