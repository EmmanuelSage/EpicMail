import express from 'express';
import user from '../controllers/user';
import userValidator from '../middlewares/validateUser';
import Auth from '../middlewares/Auth';
import messages from '../controllers/messages';
import validateMessages from '../middlewares/validateMessages';
import group from '../controllers/group';
import contact from '../controllers/contact';

const router = express.Router();

router.post('/auth/signup', userValidator.verifyUser, user.create);
router.post('/auth/login', userValidator.verifyLogin, user.login);
router.post('/messages', Auth.verifyToken, validateMessages.verifyMessage, messages.create);
router.get('/messages', Auth.verifyToken, messages.getUserReceivedMessages);
router.get('/messages/unread', Auth.verifyToken, messages.getUserUnreadMessages);
router.get('/messages/sent', Auth.verifyToken, messages.getUserSentMessages);
router.get('/messages/:id', Auth.verifyToken, messages.getUserSpecificMessage);
router.delete('/messages/:id', Auth.verifyToken, messages.deleteUserSpecificMessage);
router.post('/group', Auth.verifyToken, group.create);
router.post('/group/:groupid/users', Auth.verifyToken, group.addMember);
router.get('/group', Auth.verifyToken, group.getGroups);
router.patch('/group/:id/:name', Auth.verifyToken, group.updateName);
router.post('/contact', Auth.verifyToken, contact.create);

export default router;
