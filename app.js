require('dotenv').config()

const express = require('express')
const http = require('http');
const morgan = require('morgan');
const api = require('./controllers/api');
const WebSocket = require('ws');


const app = express()
const port = process.env.PORT || 4000

app.use(morgan('combined'));
app.use(express.static('static/dist'))
app.use('/api', api);

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('got message', message);
  });
  ws.send('something');
});

server.listen(port, () => console.log(`app listening on port ${port}!`));


// app.listen(port, () => console.log(`app listening on port ${port}!`));

