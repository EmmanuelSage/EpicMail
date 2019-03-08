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
    return next();
  },
};


export default messagesValidator;
