const express = require('express');
const proxy = require('http-proxy-middleware');
const http = require('http');
const path = require('path');

const app = express();

app.use("/api/fights", proxy({
  target: 'https://fightstore.cfapps.io',
  secure: true,
  changeOrigin: true,
}));

app.use(express.static(__dirname));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Listening on ${port}`);
});


/*
Local proxy config:
  target: 'https://fightstore.cfapps.io',
  secure: false,
  changeOrigin: true,
*/
