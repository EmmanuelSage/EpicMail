import moment from 'moment';
import dbQuery from '../services/query.test';

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

    const returnMessageQuery = `SELECT * FROM outbox 
    INNER JOIN messages ON messages.id = outbox.messageid 
     WHERE senderid = $1 AND messages.id = $2`;

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

    const rows = await dbQuery.queryAll(returnMessageQuery, [data.senderId, lastMsgIdreturn.id]);
    return rows;
  },

  async getReceivedMessages(userId) {
    const findAllQuery = `SELECT messages.id, status, parentmessageid, receiverid, 
    subject, message, createdon,
    userid as senderid FROM inbox 
    INNER JOIN messages ON messages.id = inbox.messageid 
     WHERE receiverid = $1`;
    const rows = await dbQuery.queryAll(findAllQuery, [userId]);
    return rows;
  },

  async getUnreadMessages(userId) {
    const findAllQuery = `SELECT messages.id, status, parentmessageid, receiverid, 
    subject, message, createdon,
    userid as senderid FROM inbox 
    INNER JOIN messages ON messages.id = inbox.messageid 
     WHERE receiverid = $1 AND status = $2`;
    const rows = await dbQuery.queryAll(findAllQuery, [userId, 'Unread']);
    return rows;
  },

  async getSentMessages(userId) {
    const findAllQuery = `SELECT messages.id, status, parentmessageid, 
    subject, message, createdon, senderid FROM outbox 
    INNER JOIN messages ON messages.id = outbox.messageid 
     WHERE senderid = $1 AND status = $2`;
    const rows = await dbQuery.queryAll(findAllQuery, [userId, 'Sent']);
    return rows;
  },

  async getSpecificMessage(userId, messageId) {
    const findAllQuery = `SELECT * FROM messages 
        RIGHT JOIN inbox ON inbox.messageid = messages.id
        JOIN outbox ON outbox.messageid = messages.id
        WHERE (senderid = $1 OR receiverid = $1) AND (messages.id = $2);`;
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
    const delOutboxQuery = `DELETE FROM outbox
    WHERE senderid = $1 AND messageid = $2;`;
    await dbQuery.query(delOutboxQuery, [userId, messageId]);
    return rows;
  },

  async retractMessage(userId, messageId) {
    const findQuery = `DELETE FROM messages
    WHERE userid = $1 AND id = $2;`;
    const rows = await dbQuery.query(findQuery, [userId, messageId]);
    return rows;
  },

  async createDraftMessage(data) {
    const createQuery = `INSERT INTO
      messages(subject, message, createdOn, userId)
      VALUES($1, $2, $3, $4)
      returning *`;

    const createQueryOutbox = `INSERT INTO
    outbox(status, parentMessageId, senderId, messageId )
      VALUES($1, $2, $3, $4)`;

    const returnMessageQuery = `SELECT * FROM outbox 
    INNER JOIN messages ON messages.id = outbox.messageid 
     WHERE senderid = $1 AND messages.id = $2`;

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

    const valuesOutbox = [
      'Draft',
      setId,
      data.senderId,
      lastMsgId,
    ];

    await dbQuery.query(createQueryOutbox, valuesOutbox);

    const rows = await dbQuery.queryAll(returnMessageQuery, [data.senderId, lastMsgIdreturn.id]);
    return rows;
  },

  async getDraftMessages(userId) {
    const findAllQuery = `SELECT messages.id, status, parentmessageid, 
    subject, message, createdon, senderid FROM outbox 
    INNER JOIN messages ON messages.id = outbox.messageid 
     WHERE senderid = $1 AND status = $2`;
    const rows = await dbQuery.queryAll(findAllQuery, [userId, 'Draft']);
    return rows;
  },

  async getSpecificDraft(userId, messageId) {
    const findAllQuery = `SELECT * FROM messages 
        JOIN outbox ON outbox.messageid = messages.id
        WHERE senderid = $1 AND messages.id = $2 AND status = 'Draft';`;

    const rows = await dbQuery.query(findAllQuery, [userId, messageId]);
    return rows;
  },
};

export default Messages;
