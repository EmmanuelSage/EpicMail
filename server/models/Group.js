import dbQuery from '../services/query';

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

    const returnQuery = `SELECT * FROM groups 
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

  async addMember(groupId, usersArray) {
    const addUserQuery = `INSERT INTO
    groupusers(groupid, groupusers, role)
    values(${groupId}, unnest(array[${usersArray}]), 'User')`;
    await dbQuery.queryAll(addUserQuery);

    const findAllQuery = ` SELECT * FROM groups 
    INNER JOIN groupusers ON groupusers.groupid = groups.id 
    WHERE groups.id = $1;`;
    const rows = await dbQuery.queryAll(findAllQuery, [groupId]);
    return rows;
  },
};

export default Group;
