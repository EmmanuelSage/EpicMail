const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

pool.on('connect', () => {
  console.log('connected to the db');
});


// Create User Table
const createUserTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  users(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(128) NOT NULL,
    lastName VARCHAR(128) NOT NULL,
    email VARCHAR(128) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL
  )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createMessageTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      messages(
        id SERIAL PRIMARY KEY,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        createdOn TIMESTAMP,
        userId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createOutboxTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      outbox(
        id SERIAL PRIMARY KEY,
        status TEXT NOT NULL,
        parentMessageId INT NOT NULL,
        senderId INT NOT NULL,
        messageId INT NOT NULL,
        FOREIGN KEY (messageId) REFERENCES messages (id) ON DELETE CASCADE,
        FOREIGN KEY (senderId) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (parentMessageId) REFERENCES messages (id) ON DELETE CASCADE
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createInboxTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      inbox(
        id SERIAL PRIMARY KEY,
        status TEXT NOT NULL,
        parentMessageId INT NOT NULL,
        receiverId INT NOT NULL,
        messageId INT NOT NULL,
        FOREIGN KEY (messageId) REFERENCES messages (id) ON DELETE CASCADE,
        FOREIGN KEY (receiverId) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (parentMessageId) REFERENCES messages (id) ON DELETE CASCADE
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropMessagesTable = () => {
  const queryText = 'DROP TABLE IF EXISTS messages returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
const dropOutboxTable = () => {
  const queryText = 'DROP TABLE IF EXISTS outbox returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
const dropInboxTable = () => {
  const queryText = 'DROP TABLE IF EXISTS inbox returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// Create All Tables
const createAllTables = () => {
  createUserTable();
  createMessageTable();
  createOutboxTable();
  createInboxTable();
};


const dropAllTables = () => {
  dropUserTable();
  dropMessagesTable();
  dropOutboxTable();
  dropInboxTable();
};

pool.on('remove', () => {
  console.log('removed from pool');
  process.exit(0);
});


module.exports = {
  createUserTable,
  createMessageTable,
  createOutboxTable,
  createInboxTable,
  createAllTables,
  dropUserTable,
  dropAllTables,
};

require('make-runnable');
