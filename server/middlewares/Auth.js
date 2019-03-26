import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models/User';


dotenv.config();

const Auth = {
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({ status: 401, error: 'Token is not provided' });
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      const userId = { id: decoded.userId };
      const useremail = await db.getUserEmailById(userId.id);
      req.user = { id: useremail.email };
      return next();
    } catch (error) {
      return res.status(401).send({ status: 401, error: 'Token is incorrect' });
    }
  },
};

export default Auth;
