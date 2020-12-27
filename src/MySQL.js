import mysql from 'mysql';
const MySQL = mysql.createConnection({
    host: 'localhost',
    user: 'myblog',
    password: '545394',
    database: 'myblog'
});
export default MySQL;