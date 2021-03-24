const express = require("express");
const cors = require("cors");
const http = require("http");
require('dotenv').config();
const { StartServices } = require("./StartServices");

const app = express();
const httpServer = http.createServer(app);
app.set('port', process.env.PORT || 3003)

if (process.env.NODE_ENV === 'DEV') {
  const morgan = require('morgan');
  app.use(morgan('tiny'))
}

// SETTING UP MIDDLEWARES
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors());

// IMPORTING APP ROUTER
const { RouterV1 } = require("../router");
const { _404 } = require("./_404");

(async () => {
  await StartServices(app, httpServer);

  app.use('/api/v1', RouterV1)
  app.use('/ping', (req, res) => res.send('pong!').status(200).end());
  app.use('*', _404);

  httpServer.listen(app.get('port'), () => {
    console.log(`[App] Running on port ${app.get('port')}`)
  })

})();