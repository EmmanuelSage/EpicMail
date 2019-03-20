import db from '../models/Messages';

const Messages = {
  async create(req, res) {
    const reqMessage = {
      subject: req.body.subject,
      message: req.body.message,
      senderId: parseInt(req.user.id, 10),
      receiverId: parseInt(req.body.receiverId, 10),
      parentMessageId: parseInt(req.body.parentMessageId, 10) || -1,
    };
    const newMessage = await db.create(reqMessage);
    return res.status(201).send({
      status: 201,
      data: [newMessage],
    });
  },

  async getUserReceivedMessages(req, res) {
    const currentUserId = req.user.id;
    const data = await db.getReceivedMessages(currentUserId);
    return res.status(200).send({
      status: 200,
      data,
    });
  },

  async getUserUnreadMessages(req, res) {
    const currentUserId = req.user.id;
    const data = await db.getUnreadMessages(currentUserId);
    return res.status(200).send({
      status: 200,
      data,
    });
  },

  async getUserSentMessages(req, res) {
    const currentUserId = req.user.id;
    const data = await db.getSentMessages(currentUserId);
    return res.status(200).send({
      status: 200,
      data,
    });
  },

  async getUserSpecificMessage(req, res) {
    const currentUserId = req.user.id;
    const paramsId = req.params.id;
    if (!Number(paramsId)) {
      return res.status(400).send({ status: 400, error: 'Please enter a valid message Id' });
    }
    const specificMessage = await db.getSpecificMessage(currentUserId, req.params.id);
    return res.status(200).send({
      status: 200,
      data: [specificMessage],
    });
  },

  deleteUserSpecificMessage(req, res) {
    const currentUserId = req.user.id;
    const paramsId = req.params.id;
    if (!Number(paramsId)) {
      return res.status(400).send({ status: 400, error: 'Please enter a valid message Id' });
    }
    db.deleteSpecificMessage(currentUserId, req.params.id);
    return res.status(200).send({
      status: 200,
      data: [{ message: 'Message has deleted' }],
    });
  },
};

export default Messages;
