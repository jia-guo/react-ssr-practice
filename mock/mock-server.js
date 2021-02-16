const express = require('express');
// const cors = require('cors');

const app = express();

// app.use(cors());

app.get('/api/greeting', (req, res) => {
  res.json({ msg: 'Hello! Hug hug!' });
});

app.get('/api/list', (req, res) => {
  res.json(['apple', 'banana', 'cabbage']);
});

app.get('/api/user', (req, res) => {
  res.json({
    name: 'jia',
    admin: true
  });
});

app.listen(9003, () => {
  'mock server running at 9003';
});
