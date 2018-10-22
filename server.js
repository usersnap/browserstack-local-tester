var express = require('express');
var app = express();
var server

module.exports = {
  startServer() {
    app.get('/', function (req, res) {
      res.send(`
    <html>
      <head>
        <title>Hello world from server!</title>
      </head>
      <body>
        Hello world from server!
      </body>
    </html>
    `);
    });

    server = app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
    });
  },

  stopServer() {
    if (server) {
      server.close()
    }
  }
}
