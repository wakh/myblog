import express from 'express';
import MySQL from './MySQL.js';
import { join } from 'path';

const app = express();

app.use(express.static(join(__dirname, '/build')));
app.use(express.json());

const resultHandle = (res, qres) => {
    res.status(200).send({
        upvotes: qres[0][0].upvotes,
        comments: qres[1]
    });
}

app.get('/api/articles/:name', async (req, res) => {
    await MySQL({
        sql: 'CALL GetArticle(?)',
        values: [req.params.name], timeout: 10000
    }, qres => resultHandle(res, qres), err => res.status(500).send(err));
});

app.get('/api/articles/:name/upvote', async (req, res) => {
    await MySQL({
        sql: 'CALL UpVote(?)',
        values: [req.params.name], timeout: 10000
    }, qres => resultHandle(res, qres), err => res.status(500).send(err));
});

app.post('/api/articles/:name/add-comment', async (req, res) => {
    const { username, comment } = req.body;
    await MySQL({
        sql: 'CALL AddComment(?, ?, ?)',
        values: [req.params.name, username, comment], timeout: 10000
    }, qres => resultHandle(res, qres), err => res.status(500).send(err));
});

app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '/build/index.html'));
});

app.listen(3000, () => console.log('listening on port 3000'));