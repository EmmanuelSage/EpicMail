import moment from 'moment';
import dbQuery from '../services/query.test';

const Group = {
  async create(data) {
    const createQuery = `INSERT INTO
      groups(name, adminid)
      VALUES($1, $2)
      returning *`;

    const createQueryGroupUsers = `INSERT INTO
      groupusers(groupid, groupusers, role)
        VALUES($1, $2, $3)
        returning *`;

    const returnQuery = `SELECT groups.id, groups.name, groups.adminid FROM groups 
      INNER JOIN groupusers ON groupusers.groupid = groups.id 
      WHERE adminid = $1 AND groups.id = $2`;

    const values = [
      data.name,
      data.adminid,
    ];
    const rows = await dbQuery.query(createQuery, values);
    const groupId = rows.id;

    const groupUsersValues = [
      groupId,
      data.adminid,
      'Admin',
    ];

    await dbQuery.query(createQueryGroupUsers, groupUsersValues);

    const returnValues = [
      data.adminid,
      groupId,
    ];

    const returnData = await dbQuery.query(returnQuery, returnValues);
    return returnData;
  },


  async getAllGroups(userId) {
    const findAllQuery = `SELECT * FROM groupusers 
    INNER JOIN groups ON groups.id = groupusers.groupId 
    WHERE groupUsers = $1`;
    const rows = await dbQuery.queryAll(findAllQuery, [userId]);
    return rows;
  },

  async updateGroupName(userId, groupId, newName) {
    const findAllQuery = `UPDATE groups
    SET name = $1
    WHERE
     adminid = $2 AND groups.id = $3`;
    const returnQuery = `SELECT * FROM groups 
      INNER JOIN groupusers ON groupusers.groupid = groups.id 
      WHERE groupUsers = $1`;

    const values = [
      newName,
      userId,
      groupId,
    ];

    await dbQuery.query(findAllQuery, values);

    const returnValues = [
      userId,
    ];

    const returnData = await dbQuery.query(returnQuery, returnValues);

    return returnData;
  },

  async deleteGroup(userId, groupId) {
    const findAllQuery = ` DELETE FROM groups
    WHERE adminid = $1 AND groups.id = $2;`;
    const rows = await dbQuery.queryAll(findAllQuery, [userId, groupId]);
    return rows;
  },

  async addMember(groupId, usersArray) {
    let addUserQuery = `INSERT INTO
    groupusers(groupid, groupusers, role)
    values`;
    usersArray.forEach((ele, idx) => {
      if (idx === usersArray.length - 1) {
        addUserQuery += `(${groupId}, '${ele}', 'User' );`;
      } else {
        addUserQuery += `(${groupId}, '${ele}', 'User' ),`;
      }
    });
    await dbQuery.queryAll(addUserQuery);

    const findAllQuery = ` SELECT * FROM groups 
    INNER JOIN groupusers ON groupusers.groupid = groups.id 
    WHERE groups.id = $1;`;
    const rows = await dbQuery.queryAll(findAllQuery, [groupId]);
    return rows;
  },

  async deleteGroupMember(currentUserId, groupId, userId) {
    const findAllQuery = `DELETE FROM groupusers
    USING groups
    WHERE groupusers.groupid = groups.id 
    AND groups.adminid = $1 
    AND groups.id = $2 
    AND groupusers.groupusers = $3;`;
    const rows = await dbQuery.queryAll(findAllQuery, [currentUserId, groupId, userId]);
    return rows;
  },

  async SendMessageGroup(data) {
    const createQuery = `INSERT INTO
      messages(subject, message, createdOn, userId)
      VALUES($1, $2, $3, $4)
      returning *`;

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

    const allGroupUsersQuery = `select groupUsers.groupUsers from groupUsers where groupid = ${data.groupId}`;
    const allGroupUsers = await dbQuery.queryAll(allGroupUsersQuery);

    const groupUsersarray = [];

    allGroupUsers.forEach((ele) => {
      groupUsersarray.push(ele.groupusers);
    });
    let createQueryInbox = `INSERT INTO
    inbox(status, parentMessageid, receiverid, messageid)
    values`;
    groupUsersarray.forEach((ele, idx) => {
      if (idx === groupUsersarray.length - 1) {
        createQueryInbox += `('Unread', ${setId}, '${ele}', ${lastMsgId} );`;
      } else {
        createQueryInbox += `('Unread', ${setId}, '${ele}', ${lastMsgId} ),`;
      }
    });
    const allSent = await dbQuery.queryAll(createQueryInbox);

    const valuesOutbox = [
      'Sent',
      setId,
      data.senderId,
      lastMsgId,
    ];

    await dbQuery.query(createQueryOutbox, valuesOutbox);

    return allSent;
  },

  async checkgroupName(groupName, adminid) {
    const findAllQuery = 'select name from groups where adminid = $1;';
    const rows = await dbQuery.queryAll(findAllQuery, [adminid]);
    const found = rows.some(ele => ele.name === groupName);
    if (found) {
      return 'duplicate';
    }

    return 'safe';
  },

  async checkgroupId(groupId, adminid) {
    const findAllQuery = 'select * from groups where id = $1 AND adminid = $2;';
    const rows = await dbQuery.queryAll(findAllQuery, [groupId, adminid]);
    return rows;
  },
};

export default Group;
