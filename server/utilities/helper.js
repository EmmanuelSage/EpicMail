import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userDb from '../models/User';

dotenv.config();

const Helper = {

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  isRegisteredEmail(email) {
    const regUser = userDb.findUser(email);
    if (regUser) {
      return true;
    }
    return false;
  },

  isValidName(name) {
    return /^[a-zA-Z]+$/.test(name);
  },

  generateToken(id) {
    const token = jwt.sign({ userId: id },
      process.env.SECRET, { expiresIn: '7d' });
    return token;
  },
};

export default Helper;
