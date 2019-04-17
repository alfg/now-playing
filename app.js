require('dotenv').config()

const express = require('express')
const http = require('http');
const morgan = require('morgan');
const api = require('./controllers/api');
const history = require('connect-history-api-fallback');


const app = express()
const port = process.env.PORT || 4000

app.use(morgan('combined'));

app.use('/api', api);
app.use(history());
app.use(express.static('static/dist'));

app.listen(port, () => console.log(`app listening on port ${port}!`));

