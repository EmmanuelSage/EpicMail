import db from '../models/Messages';

const Messages = {
  create(req, res) {
    const reqMessage = {
      subject: req.body.subject,
      message: req.body.message,
      senderId: parseInt(req.user.id, 10),
      receiverId: parseInt(req.body.receiverId, 10),
      parentMessageId: parseInt(req.body.parentMessageId, 10) || 0,
    };

    const newMessage = db.create(reqMessage);

    return res.status(201).send({
      status: 201,
      data: [{
        id: newMessage.id,
        createdOn: newMessage.createdOn,
        subject: newMessage.subject,
        message: newMessage.message,
        parentMessageId: newMessage.parentMessageId,
        status: newMessage.status,
      }],
    });
  },

  getUserReceivedMessages(req, res) {
    const currentUserId = req.user.id;
    const data = db.getReceivedMessages(currentUserId);
    return res.status(200).send({
      status: 200,
      data,
    });
  },

  getUserUnreadMessages(req, res) {
    const currentUserId = req.user.id;
    const data = db.getUnreadMessages(currentUserId);
    return res.status(200).send({
      status: 200,
      data,
    });
  },

  getUserSentMessages(req, res) {
    const currentUserId = req.user.id;
    const data = db.getSentMessages(currentUserId);
    return res.status(200).send({
      status: 200,
      data,
    });
  },

  getUserSpecificMessage(req, res) {
    const currentUserId = req.user.id;
    const specificMessage = db.getSpecificMessage(currentUserId, req.params.id);
    return res.status(200).send({
      status: 200,
      data: [specificMessage],
    });
  },
};

export default Messages;
