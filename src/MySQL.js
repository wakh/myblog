import mysql from 'mysql';
const MySQL = mysql.createPool({
    connectionLimit: 10,
    host: '160.153.41.3',
    user: 'myblog',
    password: '545394',
    database: 'myblog'
});
export default MySQL;