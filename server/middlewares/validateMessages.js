import db from '../models/User';

const messagesValidator = {
  verifyMessage(req, res, next) {
    if (!req.body.subject) {
      return res.status(400).send({ status: 400, error: 'Please enter a subject' });
    }
    if (!req.body.message) {
      return res.status(400).send({ status: 400, error: 'Please enter a message' });
    }
    if (!req.body.receiverId) {
      return res.status(400).send({ status: 400, error: 'Please enter a receiverId' });
    }
    if (!Number(req.body.receiverId)) {
      return res.status(400).send({ status: 400, error: 'Please enter a valid receiver Id' });
    }
    if (!db.findUserId(req.body.receiverId)) {
      return res.status(404).send({ status: 404, error: 'User with that receiver id was not found' });
    }
    return next();
  },
};


export default messagesValidator;
