import express from 'express';
import user from '../controllers/user';
import userValidator from '../middlewares/validateUser';
import Auth from '../middlewares/Auth';
import messages from '../controllers/messages';
import validateMessages from '../middlewares/validateMessages';

const router = express.Router();

router.post('/auth/signup', userValidator.verifyUser, user.create);
router.post('/auth/login', userValidator.verifyLogin, user.login);
router.post('/auth/messages', Auth.verifyToken, validateMessages.verifyMessage, messages.create);

export default router;
