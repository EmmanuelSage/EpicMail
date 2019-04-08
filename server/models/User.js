import dbQuery from '../services/query.test';

const User = {
  async create(data) {
    const createQuery = `INSERT INTO
      users(email, firstName, lastName, password)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      data.email,
      data.firstName,
      data.lastName,
      data.password,
    ];
    const rows = await dbQuery.query(createQuery, values);
    return rows;
  },

  async getEmail(email) {
    const createQuery = `SELECT 
    (SELECT email FROM users WHERE email = $1) AS email;`;
    const rows = await dbQuery.query(createQuery, [email]);
    return rows.email;
  },

  async checkGroupUserEmail(groupid) {
    const createQuery = `SELECT groupusers.groupusers FROM groupusers 
    WHERE groupid = $1 And role = 'User';`;
    const rows = await dbQuery.queryAll(createQuery, [groupid]);
    return rows;
  },

  async getUserByEmail(email) {
    const createQuery = 'SELECT * FROM users WHERE email = $1;';
    const rows = await dbQuery.query(createQuery, [email]);
    return rows;
  },

  async findUserEmail(email) {
    const createQuery = `SELECT 
    (SELECT email FROM users WHERE email = $1) AS email;`;
    const rows = await dbQuery.query(createQuery, [email]);
    return rows.email;
  },

  async getUserEmailById(id) {
    const createQuery = 'SELECT email FROM users WHERE id = $1;';
    const rows = await dbQuery.query(createQuery, [id]);
    return rows;
  },

  async resetPassword(email, hashPassword) {
    const updatePasswordQuery = 'UPDATE users SET password=$1 WHERE email=$2 returning *';
    const row = await dbQuery.query(updatePasswordQuery, [hashPassword, email]);
    return row;
  },
};

export default User;
