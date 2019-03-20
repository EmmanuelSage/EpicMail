import moment from 'moment';
import dbQuery from '../services/query';

const Messages = {
  async create(data) {
    const createQuery = `INSERT INTO
      messages(subject, message, createdOn, userId)
      VALUES($1, $2, $3, $4)
      returning *`;
    const createQueryInbox = `INSERT INTO
    inbox(status, parentMessageId, receiverId, messageId )
      VALUES($1, $2, $3, $4)`;
    const createQueryOutbox = `INSERT INTO
    outbox(status, parentMessageId, senderId, messageId )
      VALUES($1, $2, $3, $4)`;

    const values = [
      data.subject,
      data.message,
      moment(new Date()),
      data.senderId,
    ];
    const lastMsgIdreturn = await dbQuery.query(createQuery, values);

    const lastMsgId = lastMsgIdreturn.id;
    let setId;

    if (data.parentMessageId === -1) {
      setId = lastMsgId;
    } else {
      setId = data.parentMessageId;
    }
    const valuesInbox = [
      'Unread',
      setId,
      data.receiverId,
      lastMsgId,
    ];

    await dbQuery.query(createQueryInbox, valuesInbox);

    const valuesOutbox = [
      'Sent',
      setId,
      data.senderId,
      lastMsgId,
    ];

    await dbQuery.query(createQueryOutbox, valuesOutbox);

    return lastMsgIdreturn;
  },

  async getReceivedMessages(userId) {
    const findAllQuery = `SELECT * FROM inbox 
    INNER JOIN messages ON messages.id = inbox.messageid 
     WHERE receiverid = $1`;
    const rows = await dbQuery.queryAll(findAllQuery, [userId]);
    return rows;
  },

  async getUnreadMessages(userId) {
    const findAllQuery = `SELECT * FROM inbox 
    INNER JOIN messages ON messages.id = inbox.messageid 
     WHERE receiverid = $1 AND status = $2`;
    const rows = await dbQuery.queryAll(findAllQuery, [userId, 'Unread']);
    return rows;
  },

  async getSentMessages(userId) {
    const findAllQuery = `SELECT * FROM outbox 
    INNER JOIN messages ON messages.id = outbox.messageid 
     WHERE senderid = $1 AND status = $2`;
    const rows = await dbQuery.queryAll(findAllQuery, [userId, 'Sent']);
    return rows;
  },

  async getSpecificMessage(userId, messageId) {
    const findAllQuery = `SELECT * FROM messages 
    RIGHT JOIN inbox ON inbox.messageid = messages.id
    WHERE userid = $1 AND messages.id = $2`;
    // const findAllQuery = 'SELECT * FROM messages WHERE userid = $1 AND id = $2';
    const updateQuery = `UPDATE inbox
    SET status = 'Read'
    WHERE
     receiverid = $1 AND messageid = $2`;
    await dbQuery.query(updateQuery, [userId, messageId]);
    const rows = await dbQuery.query(findAllQuery, [userId, messageId]);
    return rows;
  },

  async deleteSpecificMessage(userId, messageId) {
    const findAllQuery = `DELETE FROM inbox
    WHERE receiverid = $1 AND messageid = $2;`;
    const rows = await dbQuery.query(findAllQuery, [userId, messageId]);
    return rows;
  },

  async getEmail(email) {
    let rows;
    try {
      const text = 'SELECT * FROM users WHERE email = $1';
      rows = await dbQuery.query(text, [email]);
      if (rows) {
        return rows;
      }
    } catch (err) {
      return err;
    }

    return -1;
  },
};

export default Messages;
