require('dotenv').config();
const express = require('express');
const app = express();


const port = 3000;

const username = "system";
const password = process.env.PASSWORD;
const secretMessage = process.env.SECRET_MESSAGE;

// Basic Auth middleware
function auth(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    res.set('WWW-Authenticate', 'Basic');
    return res.status(401).send('Authentication required');
  }

  const [scheme, encoded] = authHeader.split(' ');
  const [user, pass] = Buffer.from(encoded, 'base64').toString().split(':');

  if (user === username && pass === password) {
    return next();
  }

  return res.status(403).send('Invalid credentials');
}

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/secret', auth, (req, res) => {
  res.send(secretMessage);
});

app.listen(port, () => {
  console.log(`Server running on port :::${port}`);
});
