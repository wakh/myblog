import mysql from 'mysql';
const MySQL = mysql.createConnection({
    host: 'localhost',
    user: 'paoza',
    password: '545394',
    database: 'my_blog'
});
export default MySQL;