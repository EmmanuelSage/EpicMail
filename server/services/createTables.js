import db from './query';

const seed = `INSERT INTO
    users(email, firstName, lastName, password)
    VALUES('sagewills@gmail.com', 'Sage', 'Wills', '$2b$08$uQOlhDGISd55L93BWRWRuuje3rqnb7rmjiLEjQOxLGzvm42nauxhe'),
  ('peterparker@gmail.com', 'Peter', 'Parker', '$2b$08$asNcvi/AnxsxXuRBaEHkOejxAbcEQWb79BkXN7qGM21eGNvk.5036'),
  ('clarkkent@gmail.com', 'Clark', 'Kent', '$2b$08$0YjUpkB9da0BEvP2QuNpv.ytCMS1l.sHQqoV0yb8PiE9/KyXD0qOa'),
  ('Kiesha@gmail.com', 'Kiesh', 'Loveth', 'lovekiesh'),
  ('perryfr@gmail.com', 'Perry', 'Jerry', 'jprryery'),
  ('monster@gmail.com', 'Kelvin', 'Nashs', 'iammonstrous'),
  ('theone@gmail.com', 'Neo', 'Matrix', 'iamtheone');
  
  `;

const createTable = `
    CREATE TABLE IF NOT EXISTS
      "users"(
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(128) NOT NULL,
        lastName VARCHAR(128) NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS
      messages(
        id SERIAL PRIMARY KEY,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        createdOn TIMESTAMP,
        userId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
      );
      
      CREATE TABLE IF NOT EXISTS
      outbox(
        id SERIAL PRIMARY KEY,
        status TEXT NOT NULL,
        parentMessageId INT NOT NULL,
        senderId INT NOT NULL,
        messageId INT NOT NULL,
        FOREIGN KEY (messageId) REFERENCES messages (id) ON DELETE CASCADE,
        FOREIGN KEY (senderId) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (parentMessageId) REFERENCES messages (id) ON DELETE CASCADE
      );
        
      CREATE TABLE IF NOT EXISTS
      inbox(
        id SERIAL PRIMARY KEY,
        status TEXT NOT NULL,
        parentMessageId INT NOT NULL,
        receiverId INT NOT NULL,
        messageId INT NOT NULL,
        FOREIGN KEY (messageId) REFERENCES messages (id) ON DELETE CASCADE,
        FOREIGN KEY (receiverId) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (parentMessageId) REFERENCES messages (id) ON DELETE CASCADE
      );
        
      CREATE TABLE IF NOT EXISTS
      groups(
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        adminId INT NOT NULL,
        FOREIGN KEY (adminId) REFERENCES users (id) ON DELETE CASCADE
      );
      
      CREATE TABLE IF NOT EXISTS
      groupusers(
        id SERIAL PRIMARY KEY,
        groupId INT NOT NULL,
        groupUsers INT NOT NULL,
        role VARCHAR(128) NOT NULL,
        FOREIGN KEY (groupId) REFERENCES groups (id) ON DELETE CASCADE,
        FOREIGN KEY (groupUsers) REFERENCES users (id) ON DELETE CASCADE
      );
        `;


const dropTable = `DROP TABLE IF EXISTS users CASCADE;
      DROP TABLE IF EXISTS messages CASCADE;
      DROP TABLE IF EXISTS outbox CASCADE;
      DROP TABLE IF EXISTS inbox CASCADE;
      DROP TABLE IF EXISTS groups CASCADE;
      DROP TABLE IF EXISTS groupUsers CASCADE;`;

const queries = `${dropTable}${createTable}${seed}`;

db.dbquery(queries);
