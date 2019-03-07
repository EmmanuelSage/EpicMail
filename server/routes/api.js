import express from 'express';
import user from '../controllers/user';
import userValidator from '../middlewares/validateUser';

const router = express.Router();

router.post('/auth/signup', userValidator.verifyUser, user.create);
router.post('/auth/login', userValidator.verifyLogin, user.login);

export default router;
