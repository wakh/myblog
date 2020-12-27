import mysql from 'mysql2/promise';

const MySQL = async (sql, resHandler, errHandler) => {
    try {
        const conn = await mysql.createConnection({
            host: '160.153.41.3',
            user: 'myblog',
            password: '545394',
            database: 'myblog'
        });
        const [res, fie] = await conn.execute(sql);
        resHandler(res);
        await conn.end();
    } catch (err) { errHandler(err) }
}

export default MySQL;