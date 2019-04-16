require('dotenv').config()

const express = require('express')
const http = require('http');
const morgan = require('morgan');
const api = require('./controllers/api');
const WebSocket = require('ws');
const history = require('connect-history-api-fallback');


const app = express()
const port = process.env.PORT || 4000

app.use(history());
app.use(morgan('combined'));
app.use(express.static('static/dist'))
app.use('/api', api);

app.listen(port, () => console.log(`app listening on port ${port}!`));

