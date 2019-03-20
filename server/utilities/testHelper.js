import dbQuery from '../services/query';

const Helper = {
  async clearEmailFromDb(email) {
    const createQuery = 'delete from users where email = $1';
    const rows = await dbQuery.query(createQuery, [email]);
    return rows;
  },
  async clearMessageFromDb(subject) {
    const createQuery = 'delete from messages where subject = $1';
    const rows = await dbQuery.query(createQuery, [subject]);
    return rows;
  },

  async clearUsersTable() {
    await dbQuery.query('delete from users');
    await dbQuery.query('SELECT SETVAL((SELECT pg_get_serial_sequence("users", "id")), 1, false)');
  },

  async clearMessagesTable() {
    await dbQuery.query('delete from messages');
    await dbQuery.query('SELECT SETVAL((SELECT pg_get_serial_sequence("messages", "id")), 1, false)');
  },
};

export default Helper;
