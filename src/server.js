import express from 'express';
import MySQL from './MySQL.js';
import { join } from 'path';
import bodyParser from 'body-parser';

const app = express();

app.use(express.static(join(__dirname, '/build')));
app.use(express.json());

const resultHandle = (err, qres, res) => {
    if (err) res.status(500).send(err);
    else res.status(200).send({
        upvotes: qres[0][0].upvotes,
        comments: qres[1]
    });
}

app.get('/api/articles/:name', (req, res) => {
    const articleName = req.params.name;
    MySQL.query({
        sql: 'CALL GetArticle(?)',
        values: [articleName], timeout: 10000
    }, (err, qres) => resultHandle(err, qres, res));
});

app.get('/api/articles/:name/upvote', (req, res) => {
    MySQL.query({
        sql: 'CALL UpVote(?)',
        values: [req.params.name], timeout: 10000
    }, (err, qres) => resultHandle(err, qres, res));
});

app.post('/api/articles/:name/add-comment', (req, res) => {
    const { username, comment } = req.body;
    MySQL.query({
        sql: 'CALL AddComment(?, ?, ?)',
        values: [req.params.name, username, comment], timeout: 10000
    }, (err, qres) => resultHandle(err, qres, res));
});

app.get('/api/test', (req, res) => {
    MySQL.query({
        sql: 'SELECT JSON_OBJECT("id", id, "article", article, "upvotes", upvotes)git FROM articles',
        timeout: 10000
    }, (err, qres) => {
        if (err) res.send(err);
        else res.send(qres);
    })
})

app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '/build/index.html'));
});

app.listen(8000, () => console.log('Listening: 8000'));