const http = require('http');
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const build_dir = path.join(__dirname, 'build');
app.use(cors({ origin: "*" }));
app.use(express.static(build_dir));
app.get('/*', (req, res) => {
  res.sendFile(path.join(build_dir, 'index.html'));
});

const server = http.createServer(app);

server.listen(process.env.PORT || '8080', () => {
  console.log('Listening on port %s', server.address().port);
});