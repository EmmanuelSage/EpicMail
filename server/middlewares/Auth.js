import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const Auth = {
  verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({ status: 401, error: 'Token is not provided' });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = { id: decoded.userId };
    return next();
  },
};

export default Auth;