const express = require('express');
const server = express();
const routes = require('./routes')

server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + '/public'));

server.use("/api", routes)
