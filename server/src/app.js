
const express = require('express');
const app = express();
app.use(express.json());

const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);

app.get('/', (req, res) => res.json({ ok: true }));

module.exports = app;
