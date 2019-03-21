import express from 'express';
import user from '../controllers/user';
import userValidator from '../middlewares/validateUser';
import Auth from '../middlewares/Auth';
import messages from '../controllers/messages';
import validateMessages from '../middlewares/validateMessages';
import group from '../controllers/group';
import Gvalidate from '../middlewares/validateGroups';

const router = express.Router();

router.post('/auth/signup', userValidator.verifyUser, user.create);
router.post('/auth/login', userValidator.verifyLogin, user.login);
router.post('/messages', Auth.verifyToken, validateMessages.verifyMessage, messages.create);
router.get('/messages', Auth.verifyToken, messages.getUserReceivedMessages);
router.get('/messages/unread', Auth.verifyToken, messages.getUserUnreadMessages);
router.get('/messages/sent', Auth.verifyToken, messages.getUserSentMessages);
router.get('/messages/:id', Auth.verifyToken, messages.getUserSpecificMessage);
router.delete('/messages/:id', Auth.verifyToken, messages.deleteUserSpecificMessage);
router.post('/groups', Auth.verifyToken, Gvalidate.createGroup, group.create);
router.get('/groups', Auth.verifyToken, group.getGroups);
router.patch('/groups/:id/name', Auth.verifyToken, Gvalidate.updateName, group.updateName);
router.delete('/groups/:id', Auth.verifyToken, group.deleteGroup);
router.post('/groups/:groupid/users', Auth.verifyToken, Gvalidate.addMember, group.addMember);
router.delete('/groups/:groupid/users/:userid', Auth.verifyToken, group.deleteGroupMember);
router.post('/groups/:id/messages', Auth.verifyToken, Gvalidate.sendMessageToGroup, group.SendMessageGroup);

export default router;
