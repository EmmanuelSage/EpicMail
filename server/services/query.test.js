import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

export default {

  async query(text, params) {
    let res;
    try {
      res = await pool.query(text, params);
      return res.rows[0];
    } catch (err) {
      console.log(`\n\n\nError\n + ${err.stack} \nError end\n`);
    }
    return res.rows;
  },
  async queryAll(text, params) {
    let res;
    try {
      res = await pool.query(text, params);
      return res.rows;
    } catch (err) {
      console.log(`\n\n\nError\n + ${err.stack} \nError end\n`);
    }
    return res.rows;
  },
  async dbquery(text) {
    try {
      await pool.query(text);
    } catch (err) {
      console.log(`\n\n\nError\n + ${err} \nError end\n`);
    }
  },
};
