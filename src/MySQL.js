import mysql from 'mysql';
const MySQL = mysql.createConnection({
    host: '160.153.41.3',
    user: 'myblog',
    password: '545394',
    database: 'myblog'
});
export default MySQL;