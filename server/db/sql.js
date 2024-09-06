import mysql from 'mysql';

export default mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'codex',
});
