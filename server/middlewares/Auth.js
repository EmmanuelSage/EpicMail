import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models/User';


dotenv.config();

const Auth = {
  verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).send({ message: 'Token is not provided' });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    const user = db.users.find(Iuser => Iuser.id === decoded.userId);
    if (!user) {
      return res.status(400).send({ message: 'The token you provided is invalid' });
    }
    req.user = { id: decoded.userId };
    return next();
  },
};

export default Auth;
