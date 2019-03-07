import express from 'express';
import user from '../controllers/user';
import userValidator from '../middlewares/validateUser';
import Auth from '../middlewares/Auth';
import messages from '../controllers/messages';

const router = express.Router();

router.post('/auth/signup', userValidator.verifyUser, user.create);
router.post('/auth/login', userValidator.verifyLogin, user.login);
router.post('/messages', Auth.verifyToken, messages.create);

export default router;
