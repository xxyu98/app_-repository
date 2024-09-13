import mysql from 'mysql2';

export default mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'code1007',
  database: 'codex',
});
